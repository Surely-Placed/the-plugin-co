/** Fire GA4/GTM events for design CTAs (data-cta attributes) */
export function trackCtaClick(cta: string, page?: string): void {
  try {
    (window.dataLayer = window.dataLayer || []).push({
      event: "cta_click",
      cta,
      page: page ?? window.location.pathname,
    });
  } catch {
    /* ignore */
  }
}