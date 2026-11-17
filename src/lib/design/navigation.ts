import { divisions } from "../divisions";
import type { ServiceSlug } from "../service-icons";

const growth = divisions.growth.routes;

export const BOOK_CALL_URL = "https://calendar.app.google/YnhGuG8LxzMBsAEeA";

/** Primary nav aligned with design, mapped to existing routes */
export const primaryNav = [
  { label: "Services", href: growth.services, megaKey: "services" as const },
  { label: "How We Work", href: growth.howItWorks },
  { label: "Work", href: growth.stories },
  { label: "Pricing", href: growth.pricing },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export interface DesignServiceNavItem {
  num: string;
  title: string;
  tagline: string;
  /** Existing app route slug */
  slug: ServiceSlug;
}

/** Seven core plugins from design → existing service detail routes */
export const designCoreServices: DesignServiceNavItem[] = [
  {
    num: "01",
    title: "Performance Marketing",
    tagline: "Turn ad spend into revenue.",
    slug: "performance-marketing",
  },
  {
    num: "02",
    title: "AI Content",
    tagline: "Content at the speed of the feed. Still on brand.",
    slug: "ai-workflows",
  },
  {
    num: "03",
    title: "Performance Creative",
    tagline: "Creative that's built to be tested.",
    slug: "social-media",
  },
  {
    num: "04",
    title: "Website Development",
    tagline: "A website that actually sells.",
    slug: "web-development",
  },
  {
    num: "05",
    title: "Content & Creative Strategy",
    tagline: "Know what to make before you make it.",
    slug: "content-systems",
  },
  {
    num: "06",
    title: "Brand Strategy",
    tagline: "Become impossible to ignore.",
    slug: "branding-design",
  },
  {
    num: "07",
    title: "Software & CRM Development",
    tagline: "Systems that turn leads into revenue.",
    slug: "data-intelligence",
  },
];

export const supportingPlugins = [
  "SEO & AEO/GEO",
  "AI Workflow Automation",
  "Analytics & Attribution",
  "Social Media Management",
] as const;

export function serviceDetailHref(slug: ServiceSlug): string {
  return `${growth.services}/${slug}`;
}

export const footerCompanyLinks = [
  { label: "How We Work", href: growth.howItWorks },
  { label: "Work", href: growth.stories },
  { label: "Pricing", href: growth.pricing },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "For Talent", href: divisions.careers.routes.landing },
] as const;

export const footerServiceLinks = designCoreServices.map((s) => ({
  label: s.title,
  href: serviceDetailHref(s.slug),
}));