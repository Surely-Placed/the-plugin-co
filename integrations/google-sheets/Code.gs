/**
 * The Plugin — "Book a call" Google Sheet sync.
 *
 * What must be configured (no secrets live in this file):
 *
 * 1. Advanced Calendar service
 *    Editor → Services (+) → "Google Calendar API" → identifier "Calendar".
 *
 * 2. Script properties (Project Settings → Script properties)
 *    BACKEND_URL           e.g. https://the-plugin-payments.fly.dev (no trailing slash)
 *    CALL_BOOKINGS_SECRET  same value as the backend's CALL_BOOKINGS_SECRET Fly secret
 *    CALENDAR_ID           optional, defaults to "primary" (the calendar that owns the
 *                          appointment schedule)
 *
 * 3. Run setup() once from the editor (authorise when prompted). It creates the
 *    "Call Bookings" tab header row and a 5-minute trigger for syncMeetingLinks().
 *
 * 4. Deploy → New deployment → Web app
 *    Execute as: Me · Who has access: Anyone
 *    Copy the /exec URL into the backend's SHEETS_WEBHOOK_URL Fly secret.
 *    After editing this file, use Deploy → Manage deployments → Edit → New version,
 *    so the /exec URL stays the same.
 */

var SHEET_NAME = "Call Bookings";

var HEADERS = [
  "booking_id",
  "created_at",
  "full_name",
  "work_email",
  "phone",
  "company",
  "website",
  "country",
  "services",
  "monthly_budget",
  "start_timeline",
  "problem_statement",
  "source_page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "status",
  "meeting_link",
  "meeting_start",
  "calendar_event_id",
];

var COL = {};
HEADERS.forEach(function (h, i) {
  COL[h] = i + 1;
});

function props_() {
  var p = PropertiesService.getScriptProperties();
  return {
    backendUrl: (p.getProperty("BACKEND_URL") || "").replace(/\/+$/, ""),
    secret: p.getProperty("CALL_BOOKINGS_SECRET") || "",
    calendarId: p.getProperty("CALENDAR_ID") || "primary",
  };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

/** Neutralise spreadsheet formula injection. */
function safe_(value) {
  var s = value === null || value === undefined ? "" : String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function findRowByBookingId_(sheet, bookingId) {
  if (sheet.getLastRow() < 2) return 0;
  var match = sheet
    .getRange(2, COL.booking_id, sheet.getLastRow() - 1, 1)
    .createTextFinder(String(bookingId))
    .matchEntireCell(true)
    .findNext();
  return match ? match.getRow() : 0;
}

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var cfg = props_();
    if (!cfg.secret || body.secret !== cfg.secret) return json_({ ok: false, error: "unauthorized" });
    if (body.action !== "append") return json_({ ok: false, error: "unknown action" });

    var booking = body.booking || {};
    if (!booking.booking_id) return json_({ ok: false, error: "missing booking_id" });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sheet = sheet_();
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      if (findRowByBookingId_(sheet, booking.booking_id)) return json_({ ok: true, duplicate: true });
      sheet.appendRow(
        HEADERS.map(function (h) {
          return safe_(booking[h]);
        })
      );
      return json_({ ok: true });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    console.error("doPost failed: " + err);
    return json_({ ok: false, error: "server error" });
  }
}

function setup() {
  var sheet = sheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
  sheet.setFrozenRows(1);

  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "syncMeetingLinks") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("syncMeetingLinks").timeBased().everyMinutes(5).create();
}

function meetLinkOf_(event) {
  if (event.hangoutLink) return event.hangoutLink;
  var points = (event.conferenceData && event.conferenceData.entryPoints) || [];
  for (var i = 0; i < points.length; i++) {
    if (points[i].entryPointType === "video" && points[i].uri) return points[i].uri;
  }
  return "";
}

function findEventForEmail_(calendarId, email, from) {
  var timeMax = new Date(from.getTime() + 90 * 24 * 60 * 60 * 1000);
  var pageToken;
  do {
    var resp = Calendar.Events.list(calendarId, {
      timeMin: from.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      q: email,
      maxResults: 250,
      pageToken: pageToken,
    });
    var items = resp.items || [];
    for (var i = 0; i < items.length; i++) {
      var ev = items[i];
      if (ev.status === "cancelled") continue;
      var attendees = ev.attendees || [];
      for (var j = 0; j < attendees.length; j++) {
        if (String(attendees[j].email || "").toLowerCase() === email) return ev;
      }
    }
    pageToken = resp.nextPageToken;
  } while (pageToken);
  return null;
}

function notifyBackend_(cfg, bookingId, payload) {
  if (!cfg.backendUrl || !cfg.secret) {
    console.warn("BACKEND_URL or CALL_BOOKINGS_SECRET not set; skipping backend update");
    return;
  }
  var res = UrlFetchApp.fetch(cfg.backendUrl + "/api/call-bookings/" + encodeURIComponent(bookingId) + "/meeting", {
    method: "post",
    contentType: "application/json",
    headers: { "x-webhook-secret": cfg.secret },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  if (res.getResponseCode() >= 300) {
    console.warn("backend meeting update failed for " + bookingId + ": HTTP " + res.getResponseCode());
  }
}

function syncMeetingLinks() {
  try {
    var cfg = props_();
    var sheet = sheet_();
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    var rows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    var cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;

    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      var bookingId = String(r[COL.booking_id - 1] || "");
      var email = String(r[COL.work_email - 1] || "").replace(/^'/, "").trim().toLowerCase();
      var status = String(r[COL.status - 1] || "");
      var created = new Date(r[COL.created_at - 1]);
      if (!bookingId || !email || status === "booked" || isNaN(created.getTime())) continue;
      if (created.getTime() < cutoff) continue;

      try {
        var ev = findEventForEmail_(cfg.calendarId, email, created);
        if (!ev) continue;

        var link = meetLinkOf_(ev);
        var start = (ev.start && (ev.start.dateTime || ev.start.date)) || "";
        var rowNum = i + 2;
        sheet.getRange(rowNum, COL.status).setValue("booked");
        sheet.getRange(rowNum, COL.meeting_link).setValue(safe_(link));
        sheet.getRange(rowNum, COL.meeting_start).setValue(safe_(start));
        sheet.getRange(rowNum, COL.calendar_event_id).setValue(safe_(ev.id));

        if (link) {
          notifyBackend_(cfg, bookingId, {
            meeting_link: link,
            meeting_start: start ? new Date(start).toISOString() : null,
            calendar_event_id: ev.id,
          });
        } else {
          console.warn("event for " + bookingId + " has no meeting link; backend not updated");
        }
      } catch (rowErr) {
        console.error("syncMeetingLinks row " + bookingId + " failed: " + rowErr);
      }
    }
  } catch (err) {
    console.error("syncMeetingLinks failed: " + err);
  }
}
