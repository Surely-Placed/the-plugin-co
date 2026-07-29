import type { ServiceSlug } from "./service-icons";

export type PortfolioFilterKey = "industry" | "service" | "resultType" | "platform";

export interface CaseStudy {
  slug: string;
  name: string;
  industry: string;
  service: ServiceSlug;
  resultType: string;
  platform: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
  thumbnailGradient: string;
  strategy: string[];
  execution: string[];
  results: { metric: string; label: string }[];
  testimonial?: { quote: string; role: string };
  relatedServices: ServiceSlug[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "hillstreet-industries",
    name: "Hillstreet Industries",
    industry: "Consumer",
    service: "branding-design",
    resultType: "ROAS",
    platform: "Meta + Google",
    challenge:
      "Scattered visual identity and underperforming ad spend. No coherent brand story across channels.",
    solution:
      "Full brand identity redesign. Rebuilt Meta and Google Ads campaigns aligned to new brand. Created a landing page suite and offer hierarchy.",
    result: "ROAS improved within 60 days. Brand recall increased.",
    metric: "60 days",
    metricLabel: "ROAS Improvement",
    thumbnailGradient: "from-accent to-accent-blue",
    strategy: [
      "Audited brand touchpoints across paid and organic channels",
      "Defined positioning and visual identity system",
      "Mapped offer hierarchy to funnel stages",
    ],
    execution: [
      "Delivered brand guidelines and creative templates",
      "Rebuilt Meta and Google Ads campaign structure",
      "Launched conversion-focused landing page suite",
    ],
    results: [
      { metric: "60 days", label: "ROAS Improvement" },
      { metric: "↑", label: "Brand Recall" },
      { metric: "3x", label: "Creative Testing Velocity" },
    ],
    testimonial: {
      quote: "They brought our vision to life.",
      role: "Leslie Boatwright, CEO",
    },
    relatedServices: ["branding-design", "performance-marketing", "web-development"],
  },
  {
    slug: "northline-saas",
    name: "Northline SaaS",
    industry: "SaaS",
    service: "seo-content",
    resultType: "Organic Growth",
    platform: "Web + LinkedIn",
    challenge: "Strong product, zero organic visibility. Marketing team of 1, stretched thin.",
    solution:
      "Built a topical authority SEO engine. Set up an AI content workflow producing 12 high-quality articles per month. Integrated LinkedIn distribution.",
    result: "Organic traffic up 340% in 6 months. MQL volume from content up 4x.",
    metric: "340%",
    metricLabel: "Organic Traffic",
    thumbnailGradient: "from-accent-blue to-accent-highlight",
    strategy: [
      "Mapped topical authority clusters around core product categories",
      "Designed AI-assisted content production workflow",
      "Built LinkedIn distribution layer for founder-led demand",
    ],
    execution: [
      "Fixed technical SEO and site architecture issues",
      "Published 12 optimised articles per month via content system",
      "Integrated CRM tracking for content-sourced pipeline",
    ],
    results: [
      { metric: "340%", label: "Organic Traffic" },
      { metric: "4x", label: "Content MQLs" },
      { metric: "6 mo", label: "Time to Scale" },
    ],
    testimonial: {
      quote: "The Plugin became an extension of our team.",
      role: "Marcus Chen, Founder",
    },
    relatedServices: ["seo-content", "ai-workflows", "social-media"],
  },
  {
    slug: "summit-realty-group",
    name: "Summit Realty Group",
    industry: "Real Estate",
    service: "web-development",
    resultType: "Lead Generation",
    platform: "Webflow + Google",
    challenge: "Outdated website. Low lead volume despite active ad spend.",
    solution:
      "Rebuilt website on Webflow with conversion architecture. Restructured ad funnel. Added AI lead qualification. Scoring enquiries before they reach the sales team.",
    result: "Lead volume doubled. Sales team now speak only to qualified prospects.",
    metric: "2x",
    metricLabel: "Lead Volume",
    thumbnailGradient: "from-dark to-accent",
    strategy: [
      "Audited funnel from ad click to sales handoff",
      "Designed conversion architecture for property types",
      "Mapped AI qualification rules to sales criteria",
    ],
    execution: [
      "Rebuilt site on Webflow with mobile-first UX",
      "Restructured Google Ads and landing page flow",
      "Deployed AI lead scoring before CRM routing",
    ],
    results: [
      { metric: "2x", label: "Lead Volume" },
      { metric: "↓", label: "Unqualified Enquiries" },
      { metric: "45%", label: "Faster Response Time" },
    ],
    testimonial: {
      quote: "Our lead volume doubled after replatforming with The Plugin.",
      role: "Daniel Reyes, Founder",
    },
    relatedServices: ["web-development", "performance-marketing", "ai-workflows"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getFilterOptions(key: PortfolioFilterKey): string[] {
  const values = caseStudies.map((c) => c[key]);
  return ["All", ...Array.from(new Set(values))];
}
