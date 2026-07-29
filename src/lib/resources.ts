export type ResourceDivision = "growth" | "careers";

export interface Resource {
  slug: string;
  title: string;
  division: ResourceDivision;
  description: string;
  gated: boolean;
  format: "PDF" | "Newsletter";
}

export const resources: Resource[] = [
  {
    slug: "growth-audit-template",
    title: "Free Growth Audit Template",
    division: "growth",
    description: "50-point self-assessment covering ads, SEO, website, analytics, and content.",
    gated: true,
    format: "PDF",
  },
  {
    slug: "ai-tool-stack-2026",
    title: "The AI Tool Stack for Marketing Teams 2026",
    division: "growth",
    description: "Curated AI tools and integration guide for marketing teams.",
    gated: true,
    format: "PDF",
  },
  {
    slug: "growth-brief-newsletter",
    title: "The Plugin · For Businesses Brief",
    division: "growth",
    description: "Monthly newsletter, marketing intelligence for growing businesses.",
    gated: false,
    format: "Newsletter",
  },
  {
    slug: "graduate-job-search-checklist",
    title: "UK Graduate Job Search Checklist",
    division: "careers",
    description: "50 steps from first application to offer. Built for international graduates.",
    gated: true,
    format: "PDF",
  },
  {
    slug: "visa-sponsors-2026",
    title: "Which UK Employers Sponsor Visas? 2026 Edition",
    division: "careers",
    description: "Curated sponsor list of UK employers actively sponsoring Skilled Worker visas.",
    gated: true,
    format: "PDF",
  },
  {
    slug: "star-answer-bank",
    title: "The STAR Answer Bank",
    division: "careers",
    description: "20 pre-built competency answers for UK interviews using the STAR method.",
    gated: true,
    format: "PDF",
  },
  {
    slug: "career-brief-newsletter",
    title: "The Plugin Career Brief",
    division: "careers",
    description: "Monthly newsletter. Graduate scheme deadlines, employer news, and visa updates.",
    gated: false,
    format: "Newsletter",
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByDivision(division: ResourceDivision): Resource[] {
  return resources.filter((r) => r.division === division);
}
