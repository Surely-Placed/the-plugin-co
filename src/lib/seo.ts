import { siteConfig } from "./config";

export interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/** Absolute clean URL (e.g. https://theplugin.world/services) */
export function buildCanonical(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "/" ? `${base}/` : `${base}${p}`;
}

export const staticPageSEO: Record<string, Omit<PageSEOProps, "path">> = {
  "/": {
    title: "The Plugin | Plug In. Grow. Get Hired.",
    description:
      "The Plugin: digital marketing and AI for businesses, career coaching for international graduates. One brand. Two journeys.",
    keywords: [
      "digital marketing agency",
      "graduate careers UK",
      "performance marketing",
      "career coaching",
      "growth partner",
    ],
  },
  "/for-businesses": {
    title: "The Plugin · For Businesses | Digital Marketing & Growth Agency",
    description:
      "Performance marketing, AI workflows, SEO, and content systems for ambitious businesses. Your embedded growth team.",
  },
  "/for-businesses/services": {
    title: "Business Services | Pick Your Plugin, The Plugin",
    description:
      "8 growth services: paid media, SEO, social, web dev, AI workflows, data intelligence, content systems. See what fits.",
  },
  "/for-businesses/how-it-works": {
    title: "How We Work | The Plugin for Businesses",
    description:
      "Discovery audit → strategy roadmap → sprint execution → ongoing optimisation. Transparent. Measurable. No black boxes.",
  },
  "/for-businesses/case-studies": {
    title: "Client Results | The Plugin · For Businesses",
    description:
      "Real results: ROAS improvements, organic traffic growth, lead volume increases. Built on specific strategies.",
  },
  "/for-businesses/pricing": {
    title: "Business Pricing | From £1,500/mo | The Plugin",
    description:
      "Foundation, Solution, and Full Stack growth plans. Transparent GBP pricing. Free discovery consultation always included.",
  },
  "/book/for-businesses": {
    title: "Book a Free Business Consultation | The Plugin",
    description: "Free 30-minute business consultation with The Plugin team.",
  },
  "/for-talent": {
    title: "The Plugin · For Talent | UK Coaching for International Graduates",
    description:
      "Career coaching for international graduates in the UK. CV, interviews, graduate schemes, visa strategy. Book a free call.",
  },
  "/for-talent/services": {
    title: "Talent Coaching Services | The Plugin",
    description:
      "CV optimisation, interview coaching, graduate scheme strategy, 1:1 mentorship, and visa guidance for UK graduates.",
  },
  "/for-talent/how-it-works": {
    title: "How Talent Coaching Works | The Plugin",
    description:
      "4-step career coaching process for international graduates in the UK. Strategy call to job offer.",
  },
  "/for-talent/success-stories": {
    title: "Graduate Success Stories | The Plugin",
    description:
      "International graduates placed at HSBC, McKinsey, Deloitte, Clifford Chance, and more. Read their stories.",
  },
  "/for-talent/pricing": {
    title: "Talent Coaching Pricing | From £349 | The Plugin",
    description:
      "Starter, Accelerator, and Elite coaching plans for UK international graduates. Free strategy call before you commit.",
  },
  "/book/for-talent": {
    title: "Book a Free Talent Strategy Call | The Plugin",
    description: "Free 30-minute talent strategy call with The Plugin team.",
  },
  "/about": {
    title: "About The Plugin | For Businesses + For Talent",
    description:
      "Built by marketers and graduates who've been there. The story behind both divisions of The Plugin.",
  },
  "/team": {
    title: "Team | Meet The Founders | The Plugin",
    description: "Young, hungry, obsessed with growth. Meet the team behind The Plugin.",
  },
  "/blog": {
    title: "Blog & Resources | The Plugin",
    description:
      "Free guides on marketing, AI automation, graduate schemes, CV writing, and visa strategy. For Businesses & For Talent.",
  },
  "/contact": {
    title: "Book a Free Call | The Plugin",
    description:
      "Book a free Business Consultation or Talent Strategy Call. No commitment. Just honest advice on what you need.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | The Plugin",
    description:
      "How The Plugin collects, uses, stores, and protects your personal and business information.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | The Plugin",
    description:
      "Terms and conditions for using The Plugin website and services across career coaching and growth agency work.",
  },
  "/refund-cancellation-policy": {
    title: "Refund & Cancellation Policy | The Plugin",
    description:
      "Refund and cancellation terms for The Plugin career coaching programs and marketing agency services.",
  },
  "/payment/success": {
    title: "Payment Successful | The Plugin",
    description: "Your payment was received. We'll be in touch shortly.",
  },
  "/payment/failure": {
    title: "Payment Failed | The Plugin",
    description: "Your payment was not completed. Try again or contact us.",
  },
};
