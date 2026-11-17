import { divisions } from "../divisions";
import type { DesignServiceSlug } from "./service-slugs";
import { growthRoutes } from "./routes";

const growth = growthRoutes;

export const primaryNav = [
  { label: "Services", href: growth.services, megaKey: "services" as const },
  { label: "How We Work", href: growth.howItWorks },
  { label: "Work", href: growth.work },
  { label: "Pricing", href: growth.pricing },
  { label: "Insights", href: growth.insights },
  { label: "About", href: growth.about },
  { label: "Contact", href: growth.contact },
] as const;

export interface DesignServiceNavItem {
  num: string;
  title: string;
  tagline: string;
  slug: DesignServiceSlug;
}

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
    slug: "ai-content",
  },
  {
    num: "03",
    title: "Performance Creative",
    tagline: "Creative that's built to be tested.",
    slug: "performance-creative",
  },
  {
    num: "04",
    title: "Website Development",
    tagline: "A website that actually sells.",
    slug: "website-development",
  },
  {
    num: "05",
    title: "Content & Creative Strategy",
    tagline: "Know what to make before you make it.",
    slug: "content-creative-strategy",
  },
  {
    num: "06",
    title: "Brand Strategy",
    tagline: "Become impossible to ignore.",
    slug: "brand-strategy",
  },
  {
    num: "07",
    title: "Software & CRM Development",
    tagline: "Systems that turn leads into revenue.",
    slug: "software-crm-development",
  },
];

export const supportingPlugins = [
  "SEO & AEO/GEO",
  "AI Workflow Automation",
  "Analytics & Attribution",
  "Social Media Management",
] as const;

export function serviceDetailHref(slug: DesignServiceSlug): string {
  return `${growth.services}/${slug}`;
}

export const footerCompanyLinks = [
  { label: "How We Work", href: growth.howItWorks },
  { label: "Work", href: growth.work },
  { label: "Pricing", href: growth.pricing },
  { label: "Insights", href: growth.insights },
  { label: "About", href: growth.about },
  { label: "Contact", href: growth.contact },
  { label: "For Talent", href: divisions.careers.routes.landing },
] as const;

export const footerServiceLinks = designCoreServices.map((s) => ({
  label: s.title,
  href: serviceDetailHref(s.slug),
}));