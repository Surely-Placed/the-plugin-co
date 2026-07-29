import { siteConfig } from "./config";

export interface ContactPayload {
  name: string;
  contact: string;
  email: string;
  website: string;
  serviceRequirement: string;
  pageUrl: string;
}

const contactApiUrl = siteConfig.contactApiUrl;

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const res = await fetch(contactApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? "Unable to send your message. Please try again.");
  }
}

/** @deprecated Use submitContactForm */
export type LeadPayload = ContactPayload & Record<string, string>;
export async function submitLead(payload: ContactPayload): Promise<void> {
  return submitContactForm(payload);
}
