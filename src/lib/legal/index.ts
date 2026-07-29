import type { LegalPageContent } from "./types";
import { privacyPolicy } from "./privacy-policy";
import { termsAndConditions } from "./terms-and-conditions";
import { refundCancellationPolicy } from "./refund-cancellation-policy";

export const legalPages: Record<string, LegalPageContent> = {
  "/privacy-policy": privacyPolicy,
  "/terms-and-conditions": termsAndConditions,
  "/refund-cancellation-policy": refundCancellationPolicy,
};

export const legalPageLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Cancellation", href: "/refund-cancellation-policy" },
] as const;
