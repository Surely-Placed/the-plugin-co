import { brand } from "./brand";

import { SITE_URL } from "./site-url";

const env = typeof import.meta !== "undefined" ? import.meta.env : undefined;
const siteUrl = env?.VITE_SITE_URL ?? SITE_URL;

export const siteConfig = {
  url: siteUrl,
  name: brand.name,
  defaultOgImage: `${siteUrl}${brand.logo}`,
  calendly: {
    consultation30: env?.VITE_CALENDLY_30_URL ?? brand.calendlyUrl,
    strategy60: env?.VITE_CALENDLY_60_URL ?? brand.calendlyUrl,
  },
  hubspot: {
    portalId: env?.VITE_HUBSPOT_PORTAL_ID ?? "",
    formId: env?.VITE_HUBSPOT_FORM_ID ?? "",
  },
  analytics: {
    gtmId: env?.VITE_GTM_ID ?? "",
    ga4Id: env?.VITE_GA4_ID ?? "",
    clarityId: env?.VITE_CLARITY_ID ?? "",
    metaPixelId: env?.VITE_META_PIXEL_ID ?? "",
    linkedInPartnerId: env?.VITE_LINKEDIN_PARTNER_ID ?? "",
  },
  leadApiUrl: env?.VITE_LEAD_API_URL ?? "",
  contactApiUrl: env?.VITE_CONTACT_API_URL ?? "/api/contact",
} as const;

export const contactFormOptions = {
  industries: [
    "SaaS / Technology",
    "E-Commerce",
    "Real Estate",
    "Healthcare",
    "Professional Services",
    "Agency",
    "Finance",
    "Education",
    "Other",
  ],
  revenue: [
    "Pre-revenue",
    "Under $10k/mo",
    "$10k – $50k/mo",
    "$50k – $250k/mo",
    "$250k – $1M/mo",
    "$1M+/mo",
  ],
  budgets: [
    "Under $5k",
    "$5k – $15k",
    "$15k – $50k",
    "$50k – $100k",
    "$100k+",
    "Not sure yet",
  ],
} as const;
