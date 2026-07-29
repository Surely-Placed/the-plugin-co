/** Image-only media map. One still per slot where possible. */
const m = (file: string) => `/media/${file}`;

export type VisualAsset = { image?: string; alt: string };

export type PageHeroKey =
  | "home"
  | "services"
  | "about"
  | "pricing"
  | "portfolio"
  | "team"
  | "contact"
  | "resources"
  | "blog";

/** One unique hero image per top-level page (image omitted = gradient-only hero) */
export const pageHeroImages: Record<PageHeroKey, VisualAsset> = {
  home: { image: m("industries.jpg"), alt: "Home" },
  services: { alt: "Services" },
  about: { alt: "About" },
  pricing: { image: m("pricing-hero.jpg"), alt: "Pricing" },
  portfolio: { image: m("client-success.jpg"), alt: "Portfolio" },
  team: { image: m("pricing.jpg"), alt: "Team" },
  contact: { alt: "Contact" },
  resources: { image: m("blog.png"), alt: "Resources" },
  blog: { image: m("process-hero.jpg"), alt: "Blog" },
};

/** @deprecated Use pageHeroImages */
export const pageHeroVideos = pageHeroImages;

export const caseStudyHeroImages = [
  m("client-success.jpg"),
  m("process-hero.jpg"),
  m("team-hero.jpg"),
  m("footer-hero.jpg"),
] as const;

export const blogPostHeroImages = [
  m("process-hero.jpg"),
  m("industries-c.jpg"),
  m("portfolio.jpg"),
  m("contact-hero.jpg"),
] as const;

function hashSlug(slug: string) {
  return slug.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
}

export function getCaseStudyHeroImage(slug: string) {
  return caseStudyHeroImages[hashSlug(slug) % caseStudyHeroImages.length];
}

/** @deprecated Use getCaseStudyHeroImage */
export function getCaseStudyHeroVideo(slug: string) {
  return getCaseStudyHeroImage(slug);
}

export function getBlogPostHeroImage(slug: string) {
  return blogPostHeroImages[hashSlug(slug) % blogPostHeroImages.length];
}

/** @deprecated Use getBlogPostHeroImage */
export function getBlogPostHeroVideo(slug: string) {
  return getBlogPostHeroImage(slug);
}

export const visuals = {
  hero: { image: m("portfolio.jpg"), alt: "Hero" },
  heroDashboard: { alt: "Dashboard" },
  manifesto: { image: m("industries-d.jpg"), alt: "Manifesto" },
  benefits: { image: m("process.jpg"), alt: "Benefits" },
  blogFeatured: { image: m("process-hero.jpg"), alt: "Featured blog insight" },
  industries: { image: m("industries-c.jpg"), alt: "Industries" },
  servicesBand: { image: m("portfolio.jpg"), alt: "Services band" },
  servicesPage: { image: m("portfolio.jpg"), alt: "Services" },
  process: { image: m("process.jpg"), alt: "Process" },
  featuredWork: { image: m("team-hero.jpg"), alt: "Featured work" },
  testimonials: { image: m("team.jpg"), alt: "Testimonials" },
  finalCta: { image: m("footer-hero.jpg"), alt: "Final CTA" },
  about: { image: m("contact-hero.jpg"), alt: "About" },
  philosophy: { image: m("industries-d.jpg"), alt: "Philosophy" },
  pricing: { image: m("pricing-hero.jpg"), alt: "Pricing" },
  pricingBand: { image: m("industries-b.jpg"), alt: "Pricing band" },
  portfolio: { image: m("client-success.jpg"), alt: "Portfolio" },
  team: { image: m("pricing.jpg"), alt: "Team" },
  resources: { image: m("blog.png"), alt: "Resources" },
  contact: { image: m("contact.jpg"), alt: "Contact" },
  footer: { image: m("footer.jpg"), alt: "Footer" },
  blog: { image: m("process-hero.jpg"), alt: "Blog" },
  cta: { alt: "CTA" },
  performanceMarketing: { image: m("process-hero.jpg"), alt: "Performance marketing" },
  seo: { image: m("industries-b.jpg"), alt: "SEO & content" },
  social: { image: m("team.jpg"), alt: "Social media" },
  webDevelopment: { image: m("portfolio.jpg"), alt: "Web development" },
  branding: { image: m("client-success.jpg"), alt: "Branding" },
  ai: { image: m("contact-hero.jpg"), alt: "AI workflows" },
} as const;

export type VisualKey = keyof typeof visuals;

const serviceVisualMap: Record<string, VisualKey> = {
  "performance-marketing": "performanceMarketing",
  "seo-content": "seo",
  "social-media": "social",
  "web-development": "webDevelopment",
  "branding-design": "branding",
  "ai-workflows": "ai",
  "data-intelligence": "servicesPage",
  "content-systems": "blog",
};

export function getServiceVisual(slug: string): VisualAsset {
  return visuals[serviceVisualMap[slug] ?? "servicesPage"];
}
