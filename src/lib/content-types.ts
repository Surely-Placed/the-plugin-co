export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  timing?: string;
}

export interface ServiceItem {
  title: string;
  tagline: string;
  description: string;
  slug?: string;
  deliverables?: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  popular?: boolean;
  features: string[];
  planSlug?: string;
}

export interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    trustBar: string[];
  };
  problem: {
    title: string;
    body: string;
    painPoints?: { title: string; body: string }[];
  };
  ctaBanner?: {
    title: string;
    subtitle: string;
  };
  servicesPreview: {
    title: string;
    linkLabel: string;
  };
  processPreview: {
    title: string;
    linkLabel: string;
  };
  results: {
    title: string;
    stats: Stat[];
    linkLabel: string;
  };
  testimonialsTitle: string;
  packagesPreview?: {
    tiers: { name: string; price: string }[];
    linkLabel: string;
  };
}

export interface HowItWorksContent {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface PricingContent {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  faq: { question: string; answer: string }[];
  footnote?: string;
}

export interface ServicesContent {
  title: string;
  subtitle: string;
  intro: string[];
  services: ServiceItem[];
  combos?: { title: string; body: string }[];
  callout?: { title: string; body: string };
}

export interface StoriesContent {
  title: string;
  subtitle: string;
}
