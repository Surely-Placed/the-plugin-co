const api = import.meta.env.VITE_PAYMENTS_API_URL ?? "http://localhost:8080";

export const COUNTRY_OPTIONS = [
  "India",
  "United Kingdom",
  "United States",
  "UAE",
  "Australia",
  "Canada",
  "Other",
] as const;

export const SERVICE_OPTIONS = [
  "Performance Marketing",
  "Ad Creative",
  "AI Content",
  "SEO & AEO",
  "Website",
  "Brand Strategy",
  "CRM & Automation",
] as const;

export const BUDGET_OPTIONS = [
  "Under ₹1L / $1.5k",
  "₹1L–3L / $1.5k–4k",
  "₹3L–10L / $4k–12k",
  "₹10L+ / $12k+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = ["This month", "In 1–3 months", "Just exploring"] as const;

export const PROBLEM_MAX = 1000;

export interface BookCallForm {
  full_name: string;
  work_email: string;
  phone: string;
  company: string;
  website: string;
  country: string;
  services: string[];
  monthly_budget: string;
  start_timeline: string;
  problem_statement: string;
  hp: string;
}

export type BookCallErrors = Partial<Record<keyof BookCallForm, string>>;

export const emptyBookCallForm: BookCallForm = {
  full_name: "",
  work_email: "",
  phone: "",
  company: "",
  website: "",
  country: "",
  services: [],
  monthly_budget: "",
  start_timeline: "This month",
  problem_statement: "",
  hp: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s]{7,20}$/;

export function validateBookCall(form: BookCallForm): BookCallErrors {
  const errors: BookCallErrors = {};
  if (form.full_name.trim().length < 2) errors.full_name = "Please enter your full name.";
  if (!EMAIL_RE.test(form.work_email.trim())) errors.work_email = "Please enter a valid email address.";
  if (!PHONE_RE.test(form.phone.trim()))
    errors.phone = "Use 7–20 characters: digits, +, spaces or dashes.";
  if (!form.company.trim()) errors.company = "Please enter your company name.";
  if (!form.country) errors.country = "Please select a country.";
  if (!form.monthly_budget) errors.monthly_budget = "Please select a budget range.";
  if (form.problem_statement.length > PROBLEM_MAX)
    errors.problem_statement = `Keep it under ${PROBLEM_MAX} characters.`;
  return errors;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const UTM_STORAGE_KEY = "tp-utm";

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function readStoredUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) ?? "{}") as Utm;
  } catch {
    return {};
  }
}

/** Persist any UTM params on the current URL for the rest of the session. */
export function captureUtm(search: string = window.location.search): Utm {
  const params = new URLSearchParams(search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value.slice(0, 200);
  }
  const merged = { ...readStoredUtm(), ...fromUrl };
  if (Object.keys(fromUrl).length) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* storage unavailable */
    }
  }
  return merged;
}

export async function submitBookCall(form: BookCallForm): Promise<{ id: string }> {
  const utm = captureUtm();
  const res = await fetch(`${api}/api/call-bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: form.full_name.trim(),
      work_email: form.work_email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      website: form.website.trim() || undefined,
      country: form.country,
      services: form.services,
      monthly_budget: form.monthly_budget,
      start_timeline: form.start_timeline,
      problem_statement: form.problem_statement.trim() || undefined,
      source_page: window.location.pathname,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      hp: form.hp,
    }),
  });
  const body = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
  if (!res.ok || !body.id) {
    throw new Error(
      res.status === 429
        ? "Too many attempts. Please wait a few minutes and try again."
        : "We couldn't save your details right now."
    );
  }
  return { id: body.id };
}
