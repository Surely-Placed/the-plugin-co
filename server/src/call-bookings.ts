import crypto from "node:crypto";
import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { db } from "./db.js";
import { env } from "./env.js";
import { Sentry } from "./instrument.js";

export const COUNTRIES = [
  "India",
  "United Kingdom",
  "United States",
  "UAE",
  "Australia",
  "Canada",
  "Other",
] as const;

export const SERVICES = [
  "Performance Marketing",
  "Ad Creative",
  "AI Content",
  "SEO & AEO",
  "Website",
  "Brand Strategy",
  "CRM & Automation",
] as const;

export const BUDGETS = [
  "Under ₹1L / $1.5k",
  "₹1L–3L / $1.5k–4k",
  "₹3L–10L / $4k–12k",
  "₹10L+ / $12k+",
  "Not sure yet",
] as const;

export const TIMELINES = ["This month", "In 1–3 months", "Just exploring"] as const;

const DEDUPE_WINDOW_MINUTES = 30;
const RETRY_INTERVAL_MS = 10 * 60_000;
const RETRY_LOOKBACK_DAYS = 7;

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .nullable()
    .transform((v) => (v ? v : null));

const bookingSchema = z.object({
  full_name: text(120).min(2),
  work_email: text(254).toLowerCase().pipe(z.string().email()),
  phone: text(20).regex(/^[0-9+\-\s]{7,20}$/),
  company: text(160).min(1),
  website: optionalText(200),
  country: z.enum(COUNTRIES),
  services: z
    .array(z.enum(SERVICES))
    .max(SERVICES.length)
    .default([])
    .transform((list) => [...new Set(list)]),
  monthly_budget: z.enum(BUDGETS),
  start_timeline: z.enum(TIMELINES).default("This month"),
  problem_statement: optionalText(1000),
  source_page: optionalText(300),
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
});

const meetingSchema = z.object({
  meeting_link: z
    .string()
    .trim()
    .max(2000)
    .url()
    .refine((v) => new URL(v).protocol === "https:", "meeting_link must be https"),
  meeting_start: z.string().datetime({ offset: true }).optional().nullable(),
  calendar_event_id: z.string().trim().max(1024).optional().nullable(),
});

type BookingRow = z.infer<typeof bookingSchema> & {
  id: string;
  created_at: Date;
  status: string;
  meeting_link: string | null;
  meeting_start: Date | null;
  calendar_event_id: string | null;
};

const bookingLimiter = rateLimit({
  windowMs: 10 * 60_000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again in a few minutes." },
});

function secretMatches(provided: string | undefined) {
  const expected = env.CALL_BOOKINGS_SECRET;
  if (!expected || !provided) return false;
  const a = crypto.createHash("sha256").update(provided).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

function toSheetBooking(row: BookingRow) {
  return {
    booking_id: row.id,
    created_at: new Date(row.created_at).toISOString(),
    full_name: row.full_name,
    work_email: row.work_email,
    phone: row.phone,
    company: row.company,
    website: row.website ?? "",
    country: row.country,
    services: (row.services ?? []).join(", "),
    monthly_budget: row.monthly_budget,
    start_timeline: row.start_timeline,
    problem_statement: row.problem_statement ?? "",
    source_page: row.source_page ?? "",
    utm_source: row.utm_source ?? "",
    utm_medium: row.utm_medium ?? "",
    utm_campaign: row.utm_campaign ?? "",
    status: row.status,
    meeting_link: row.meeting_link ?? "",
    meeting_start: row.meeting_start ? new Date(row.meeting_start).toISOString() : "",
    calendar_event_id: row.calendar_event_id ?? "",
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function postToSheet(row: BookingRow) {
  // fetch follows the Apps Script 302 to script.googleusercontent.com by default.
  const res = await fetch(env.SHEETS_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: env.CALL_BOOKINGS_SECRET,
      action: "append",
      booking: toSheetBooking(row),
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`sheet webhook HTTP ${res.status}`);
  const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!body?.ok) throw new Error(`sheet webhook rejected: ${body?.error ?? "invalid response"}`);
}

export async function syncBookingToSheet(id: string) {
  if (!env.SHEETS_WEBHOOK_URL || !env.CALL_BOOKINGS_SECRET) return;
  const row = (await db("call_bookings").where({ id }).first()) as BookingRow | undefined;
  if (!row) return;

  let lastError = "unknown error";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await postToSheet(row);
      await db("call_bookings")
        .where({ id })
        .update({ sheet_synced_at: db.fn.now(), sheet_sync_error: null });
      return;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      if (attempt < 3) await sleep(1000 * 3 ** (attempt - 1));
    }
  }
  console.warn(`[call-bookings] sheet sync failed for ${id}: ${lastError}`);
  await db("call_bookings")
    .where({ id })
    .update({ sheet_sync_error: lastError.slice(0, 500) })
    .catch(() => {});
}

let retryRunning = false;

async function retryUnsyncedBookings() {
  if (retryRunning) return;
  retryRunning = true;
  try {
    const rows = await db("call_bookings")
      .select("id")
      .whereNull("sheet_synced_at")
      .where("created_at", ">", db.raw(`now() - interval '${RETRY_LOOKBACK_DAYS} days'`))
      .orderBy("created_at", "asc")
      .limit(50);
    for (const { id } of rows) await syncBookingToSheet(id);
  } catch (err) {
    Sentry.captureException(err);
    console.error("[call-bookings] retry sweep failed", err instanceof Error ? err.message : err);
  } finally {
    retryRunning = false;
  }
}

export function startSheetRetryLoop() {
  if (!env.SHEETS_WEBHOOK_URL || !env.CALL_BOOKINGS_SECRET) return;
  setInterval(() => void retryUnsyncedBookings(), RETRY_INTERVAL_MS).unref();
}

export const callBookingsRouter = express.Router();

callBookingsRouter.post("/api/call-bookings", bookingLimiter, async (req, res, next) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    if (typeof body.hp === "string" && body.hp.trim() !== "") {
      return res.json({ id: crypto.randomUUID() });
    }

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? "")))];
      return res.status(400).json({ error: "Invalid request", fields });
    }
    const data = parsed.data;
    const record = { ...data, services: JSON.stringify(data.services) };

    const { id, created } = await db.transaction(async (trx) => {
      await trx.raw("select pg_advisory_xact_lock(hashtext(?))", [`call_bookings:${data.work_email}`]);
      const recent = await trx("call_bookings")
        .select("id")
        .where({ work_email: data.work_email })
        .whereNot({ status: "booked" })
        .where("created_at", ">", trx.raw(`now() - interval '${DEDUPE_WINDOW_MINUTES} minutes'`))
        .orderBy("created_at", "desc")
        .first();

      if (recent) {
        await trx("call_bookings")
          .where({ id: recent.id })
          .update({ ...record, updated_at: trx.fn.now() });
        return { id: recent.id as string, created: false };
      }

      const [row] = await trx("call_bookings").insert(record).returning("id");
      return { id: row.id as string, created: true };
    });

    res.status(created ? 201 : 200).json({ id });
    void syncBookingToSheet(id).catch((err) => Sentry.captureException(err));
  } catch (err) {
    next(err);
  }
});

callBookingsRouter.post("/api/call-bookings/:id/meeting", async (req, res, next) => {
  try {
    if (!secretMatches(req.header("x-webhook-secret"))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const id = z.string().uuid().safeParse(req.params.id);
    if (!id.success) return res.status(400).json({ error: "Invalid id" });

    const parsed = meetingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid request" });

    const updated = await db("call_bookings")
      .where({ id: id.data })
      .update({
        meeting_link: parsed.data.meeting_link,
        meeting_start: parsed.data.meeting_start ?? null,
        calendar_event_id: parsed.data.calendar_event_id ?? null,
        status: "booked",
        updated_at: db.fn.now(),
      })
      .returning("id");

    if (!updated.length) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true, id: id.data });
  } catch (err) {
    next(err);
  }
});
