import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";
import { env } from "./env.js";

// Embed the logo inline (CID) so it renders even when the mail client blocks
// remote images. Falls back to the public URL if the file isn't found.
const LOGO_CID = "theplugin-logo";
const LOGO_PATH = path.resolve(process.cwd(), "assets/logo.png");
const HAS_LOGO_FILE = fs.existsSync(LOGO_PATH);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.08);vertical-align:top;width:140px;">
      <span style="font-family:monospace;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#1b68cf;">${escapeHtml(label)}</span>
    </td>
    <td style="padding:14px 0 14px 16px;border-bottom:1px solid rgba(255,255,255,0.08);font-family:monospace;font-size:15px;line-height:1.6;color:#fff;">${escapeHtml(value)}</td>
  </tr>`;
}

// Always use the public production domain for email assets — a broken
// localhost image is a strong spam signal.
const PUBLIC_SITE = "https://theplugin.world";

function shell(title: string, intro: string, rows: string) {
  const logo = HAS_LOGO_FILE ? `cid:${LOGO_CID}` : `${PUBLIC_SITE}/the-plugin-logo.png`;
  return `<!DOCTYPE html><html><body style="margin:0;background:#050a12;">
  <table width="100%" style="background:linear-gradient(180deg,#050a12,#0a2d5c,#050a12);padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;">
        <tr><td align="center" style="padding-bottom:24px;"><img src="${logo}" alt="The Plugin" width="200" /></td></tr>
        <tr><td style="border-radius:24px;border:1px solid rgba(255,255,255,0.15);background:#050a12;padding:32px 28px;">
          <h1 style="margin:0 0 16px;font-family:sans-serif;font-size:26px;color:#fff;">${escapeHtml(title)}</h1>
          <p style="margin:0 0 24px;font-family:monospace;font-size:14px;color:rgba(255,255,255,0.75);">${intro}</p>
          <table width="100%">${rows}</table>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function transporter() {
  if (!env.SMTP_USER || !env.SMTP_APP_PASSWORD) {
    throw new Error("SMTP not configured");
  }
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_APP_PASSWORD },
  });
}

export interface PaymentMailData {
  name: string;
  email: string;
  contact: string;
  website?: string;
  serviceRequirement: string;
  planName: string;
  division: string;
  amountLabel: string;
  orderId: string;
  paymentId?: string;
}

function logoAttachment() {
  if (!HAS_LOGO_FILE) return [];
  return [
    {
      filename: "the-plugin-logo.png",
      path: LOGO_PATH,
      cid: LOGO_CID,
      contentDisposition: "inline" as const,
    },
  ];
}

function domainOf(address: string) {
  return address.split("@")[1] ?? "theplugin.world";
}

function messageId(address: string) {
  return `<${crypto.randomUUID()}@${domainOf(address)}>`;
}

function customerRows(data: PaymentMailData) {
  return [
    row("Plan", data.planName),
    row("Amount", data.amountLabel),
    row("Order ID", data.orderId),
    data.paymentId ? row("Payment ID", data.paymentId) : "",
  ].join("");
}

export async function sendPaymentEmails(data: PaymentMailData) {
  const tx = transporter();
  // The From address MUST be the authenticated mailbox so SPF/DKIM align.
  const from = env.SMTP_USER ?? env.CONTACT_FROM_EMAIL;
  const teamTo = env.CONTACT_TO_EMAIL;

  const rows = [
    row("Plan", data.planName),
    row("Division", data.division),
    row("Amount", data.amountLabel),
    row("Name", data.name),
    row("Contact", data.contact),
    row("Email", data.email),
    row("Website", data.website ?? "—"),
    row("Notes", data.serviceRequirement),
    row("Order ID", data.orderId),
    data.paymentId ? row("Payment ID", data.paymentId) : "",
  ].join("");

  await tx.sendMail({
    from: `"The Plugin" <${from}>`,
    sender: from,
    to: teamTo,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `New payment — ${data.planName} · ${data.name}`,
    messageId: messageId(from),
    attachments: logoAttachment(),
    text: `Payment received\nPlan: ${data.planName}\nAmount: ${data.amountLabel}\nCustomer: ${data.name} <${data.email}>`,
    html: shell("New payment received", "A customer completed checkout on theplugin.world.", rows),
  });

  await tx.sendMail({
    from: `"The Plugin" <${from}>`,
    sender: from,
    to: data.email,
    replyTo: `"The Plugin" <${from}>`,
    subject: `Payment confirmed — ${data.planName} | The Plugin`,
    messageId: messageId(from),
    attachments: logoAttachment(),
    text: `Hi ${data.name.split(" ")[0] || "there"},\n\nThank you for your payment for ${data.planName} (${data.amountLabel}).\n\nOrder ID: ${data.orderId}${data.paymentId ? `\nPayment ID: ${data.paymentId}` : ""}\n\nOur team will be in touch shortly.\n\nThe Plugin\n${PUBLIC_SITE}`,
    html: shell(
      "Payment confirmed",
      `Hi ${escapeHtml(data.name.split(" ")[0] || "there")}, thank you for your payment. We've received it and will follow up soon.`,
      customerRows(data)
    ),
  });
}
