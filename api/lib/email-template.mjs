const SITE_URL = process.env.SITE_URL ?? "https://theplugin.world";
const LOGO_URL = `${SITE_URL}/the-plugin-logo.png`;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.08);vertical-align:top;width:140px;">
        <span style="font-family:'Roboto Mono',Consolas,monospace;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#1b68cf;">${escapeHtml(label)}</span>
      </td>
      <td style="padding:14px 0 14px 16px;border-bottom:1px solid rgba(255,255,255,0.08);font-family:'Roboto Mono',Consolas,monospace;font-size:15px;line-height:1.6;color:#ffffff;">
        ${escapeHtml(value)}
      </td>
    </tr>`;
}

export function buildContactEmailHtml({ name, contact, email, website, serviceRequirement, pageUrl }) {
  const websiteDisplay = website?.startsWith("http") ? website : website ? `https://${website}` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New consultation request — The Plugin</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#000000;background-image:linear-gradient(180deg,#000000 0%,#050a12 35%,#0a2d5c 55%,#050a12 78%,#000000 100%);">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <img src="${LOGO_URL}" alt="The Plug In" width="220" style="display:block;height:auto;max-width:220px;" />
            </td>
          </tr>
          <tr>
            <td style="border-radius:24px;border:1px solid rgba(255,255,255,0.15);background-color:#050a12;padding:32px 28px;box-shadow:0 24px 64px rgba(0,0,0,0.45);">
              <p style="margin:0 0 8px;font-family:'Roboto Mono',Consolas,monospace;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.7);">New Lead</p>
              <h1 style="margin:0 0 24px;font-family:Montserrat,'Segoe UI',Arial,sans-serif;font-size:28px;font-weight:800;line-height:1.15;color:#ffffff;">Consultation Request</h1>
              <p style="margin:0 0 28px;font-family:'Roboto Mono',Consolas,monospace;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.75);">
                Someone submitted the contact form on <strong style="color:#ffffff;">theplugin.world</strong>. Details below.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                ${row("Name", name)}
                ${row("Contact", contact)}
                ${row("Email", email)}
                ${row("Website", websiteDisplay || website)}
                ${row("Service need", serviceRequirement)}
              </table>
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius:9999px;background:linear-gradient(90deg,#1454a8 0%,#1b68cf 100%);">
                    <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:14px 28px;font-family:'Roboto Mono',Consolas,monospace;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to ${escapeHtml(name.split(" ")[0] || "lead")}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:28px 8px 0;">
              <p style="margin:0;font-family:'Roboto Mono',Consolas,monospace;font-size:11px;line-height:1.6;color:rgba(255,255,255,0.45);">
                The Plugin · Plug In. Amplify. Grow.<br />
                ${pageUrl ? `<a href="${escapeHtml(pageUrl)}" style="color:#1b68cf;text-decoration:none;">${escapeHtml(pageUrl)}</a>` : ""}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactEmailText({ name, contact, email, website, serviceRequirement, pageUrl }) {
  return [
    "New consultation request — The Plugin",
    "",
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Email: ${email}`,
    `Website: ${website || "—"}`,
    "",
    "Service requirement:",
    serviceRequirement,
    "",
    pageUrl ? `Submitted from: ${pageUrl}` : "",
  ].join("\n");
}
