/**
 * Headless CMS content models (Strapi / Sanity / Payload).
 * Front-end uses static data today; map these shapes when CMS is connected.
 */

export interface CMSSeo {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface CMSService {
  title: string;
  slug: string;
  shortDescription: string;
  heroContent: string;
  process: string[];
  deliverables: string[];
  results: string[];
  faqs: { question: string; answer: string }[];
  seo: CMSSeo;
  featuredImage?: string;
  relatedServices: string[];
  published: boolean;
}

export interface CMSCaseStudy {
  clientName: string;
  slug: string;
  industry: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  metrics: { value: string; label: string }[];
  images: string[];
  testimonial?: { quote: string; role: string };
  relatedServices: string[];
  seo: CMSSeo;
  published: boolean;
}

export interface CMSBlogPost {
  title: string;
  slug: string;
  category: string;
  author: string;
  featuredImage?: string;
  readingTime: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  publishedDate: string;
  published: boolean;
}

export interface CMSAuthor {
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
}

export interface CMSTeamMember {
  name: string;
  role: string;
  bio: string;
  focusAreas: string[];
  image?: string;
  linkedin?: string;
  twitter?: string;
}

export interface CMSResource {
  title: string;
  slug: string;
  type: string;
  description: string;
  gated: boolean;
  fileUrl?: string;
}

export interface CMSGlobalSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  socialLinks: Record<string, string>;
  navigation: { label: string; href: string }[];
}

export type CMSContentType =
  | "service"
  | "case-study"
  | "blog-post"
  | "author"
  | "team-member"
  | "resource"
  | "testimonial"
  | "faq"
  | "industry"
  | "global-settings";
