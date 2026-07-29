import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { buildContactEmailHtml, buildContactEmailText } from "./email-template.mjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(body) {
  const name = String(body?.name ?? "").trim();
  const contact = String(body?.contact ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const website = String(body?.website ?? "").trim();
  const serviceRequirement = String(body?.serviceRequirement ?? "").trim();
  const pageUrl = String(body?.pageUrl ?? "").trim();

  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!contact || contact.length < 6) {
    return { ok: false, error: "Please enter a valid phone or contact number." };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!serviceRequirement || serviceRequirement.length < 10) {
    return { ok: false, error: "Please describe your service requirement (at least 10 characters)." };
  }

  return {
    ok: true,
    data: { name, contact, email, website, serviceRequirement, pageUrl },
  };
}

function getTransporter() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_USER and SMTP_APP_PASSWORD in your environment."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendContactEmail(payload) {
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER ?? "grow@theplugin.world";
  // From MUST be the authenticated mailbox so SPF/DKIM align (not the visitor).
  const from = process.env.SMTP_USER ?? process.env.CONTACT_FROM_EMAIL ?? "grow@theplugin.world";
  const domain = from.split("@")[1] ?? "theplugin.world";

  const transporter = getTransporter();
  const subject = `New consultation request — ${payload.name}`;

  await transporter.sendMail({
    from: `"The Plugin Website" <${from}>`,
    sender: from,
    to,
    replyTo: `"${payload.name}" <${payload.email}>`,
    subject,
    messageId: `<${randomUUID()}@${domain}>`,
    text: buildContactEmailText(payload),
    html: buildContactEmailHtml(payload),
  });

  return { success: true };
}

export async function handleContactRequest(body) {
  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return { status: 400, body: { error: validation.error } };
  }

  try {
    await sendContactEmail(validation.data);
    return { status: 200, body: { success: true } };
  } catch (err) {
    console.error("[contact]", err);
    const message =
      err instanceof Error && err.message.includes("not configured")
        ? err.message
        : "Unable to send your message. Please email grow@theplugin.world directly.";
    return { status: 500, body: { error: message } };
  }
}
