import { brand } from "./brand";
import { growthContent } from "./growth/content";
import { careersContent } from "./careers/content";

export type DivisionId = "growth" | "careers";

export interface DivisionRoute {
  landing: string;
  services: string;
  howItWorks: string;
  stories: string;
  pricing: string;
  book: string;
}

export interface DivisionMeta {
  id: DivisionId;
  label: string;
  audience: string;
  routes: DivisionRoute;
  email: string;
  bookUrl: string;
  ctaLabel: string;
  ctaShort: string;
  /** Tailwind classes for accent styling */
  accent: {
    border: string;
    text: string;
    card: string;
  };
}

const growthMeta: DivisionMeta = {
  id: "growth",
  label: "For Businesses",
  audience: "For Businesses",
  routes: {
    landing: "/",
    services: "/services",
    howItWorks: "/how-we-work",
    stories: "/work",
    pricing: "/pricing",
    book: "/free-growth-audit",
  },
  email: "grow@theplugin.world",
  bookUrl: brand.calendlyUrl,
  ctaLabel: "Book a Free Business Consultation",
  ctaShort: "Grow",
  accent: {
    border: "border-flow-mid",
    text: "text-flow-light",
    card: "border-flow-mid/40 bg-flow-mid/10",
  },
};

const careersMeta: DivisionMeta = {
  id: "careers",
  label: "For Talent",
  audience: "For Talent",
  routes: {
    landing: "/for-talent",
    services: "/for-talent/services",
    howItWorks: "/for-talent/how-it-works",
    stories: "/for-talent/success-stories",
    pricing: "/for-talent/pricing",
    book: "/book/for-talent",
  },
  // email: "careers@theplugin.world",
  email: "",
  bookUrl: brand.calendlyUrl,
  ctaLabel: "Book a Free Talent Strategy Call",
  ctaShort: "Get Hired",
  accent: {
    border: "border-flow-mid",
    text: "text-flow-light",
    card: "border-flow-mid/40 bg-flow-mid/10",
  },
};

export const divisions: Record<DivisionId, DivisionMeta> = {
  growth: growthMeta,
  careers: careersMeta,
};

export function getDivision(id: DivisionId) {
  const meta = divisions[id];
  const content = id === "growth" ? growthContent : careersContent;
  return { ...meta, content };
}

export function getDivisionNav(id: DivisionId) {
  const { routes } = divisions[id];
  return [
    { label: "Overview", href: routes.landing },
    { label: "Services", href: routes.services },
    { label: "How It Works", href: routes.howItWorks },
    { label: id === "growth" ? "Case Studies" : "Success Stories", href: routes.stories },
    { label: "Pricing", href: routes.pricing },
  ] as const;
}

export function matchDivision(pathname: string): DivisionId | null {
  if (
    pathname === "/" ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/how-we-work") ||
    pathname.startsWith("/work") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/free-growth-audit") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/insights") ||
    pathname.startsWith("/for-businesses") ||
    pathname.startsWith("/book/for-businesses") ||
    pathname.startsWith("/growth") ||
    pathname.startsWith("/book/growth")
  ) {
    return "growth";
  }
  if (
    pathname.startsWith("/for-talent") ||
    pathname.startsWith("/book/for-talent") ||
    pathname.startsWith("/careers") ||
    pathname.startsWith("/book/careers")
  ) {
    return "careers";
  }
  return null;
}
