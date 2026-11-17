/** Production service URL slugs from the design handoff */
export const designServiceSlugs = [
  "performance-marketing",
  "ai-content",
  "performance-creative",
  "website-development",
  "content-creative-strategy",
  "brand-strategy",
  "software-crm-development",
] as const;

export type DesignServiceSlug = (typeof designServiceSlugs)[number];

/** Legacy growth service slugs → design slugs */
export const legacyServiceSlugRedirect: Record<string, DesignServiceSlug> = {
  "performance-marketing": "performance-marketing",
  "seo-content": "content-creative-strategy",
  "social-media": "performance-creative",
  "web-development": "website-development",
  "branding-design": "brand-strategy",
  "ai-workflows": "ai-content",
  "data-intelligence": "software-crm-development",
  "content-systems": "content-creative-strategy",
};

export function resolveDesignServiceSlug(slug: string): DesignServiceSlug | undefined {
  if ((designServiceSlugs as readonly string[]).includes(slug)) {
    return slug as DesignServiceSlug;
  }
  return legacyServiceSlugRedirect[slug];
}