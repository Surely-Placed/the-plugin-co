/** Primary production domain for canonical URLs, sitemap, and structured data. */
export const SITE_URL = "https://theplugin.world";

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}`;
}
