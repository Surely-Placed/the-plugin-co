/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CALENDLY_30_URL?: string;
  readonly VITE_CALENDLY_60_URL?: string;
  readonly VITE_HUBSPOT_PORTAL_ID?: string;
  readonly VITE_HUBSPOT_FORM_ID?: string;
  readonly VITE_LEAD_API_URL?: string;
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_PAYMENTS_API_URL?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_CLARITY_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
