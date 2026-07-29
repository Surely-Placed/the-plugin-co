import type { ServiceSlug } from "./service-icons";

export interface ServiceListing {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  description: string;
  shortDescription: string;
}

export interface ServiceDetail extends ServiceListing {
  heroHeadline: string;
  heroSubheadline?: string;
  problem: string[];
  deliverables: string[];
  process: { step: string; title: string }[];
  faq: { question: string; answer: string }[];
  relatedSlugs: ServiceSlug[];
}

export const serviceListings: ServiceListing[] = [
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Turn Ad Spend Into Revenue.",
    description:
      "Every unit of ad spend should be working harder. We build, manage, and optimise paid campaigns that generate measurable business outcomes.",
    shortDescription: "Turn ad spend into predictable revenue.",
  },
  {
    slug: "seo-content",
    title: "SEO & Content Strategy",
    tagline: "Get Found. Get Chosen.",
    description:
      "Organic growth compounds over time. We help your customers find you before they find your competitors.",
    shortDescription: "Get discovered by people actively searching.",
  },
  {
    slug: "social-media",
    title: "Social Media Management",
    tagline: "Build a Community That Sells.",
    description:
      "Full social management: strategy, content calendar, creation, scheduling, and community management.",
    shortDescription: "Build a community that sells.",
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "A Website That Actually Sells.",
    description:
      "New website builds, landing pages, performance optimisation, and analytics integration. Matched to your needs and team.",
    shortDescription: "Your website should sell while you sleep.",
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    tagline: "Become Impossible to Ignore.",
    description:
      "Brand strategy, visual identity, guidelines, and creative systems your team actually uses.",
    shortDescription: "Become impossible to ignore.",
  },
  {
    slug: "ai-workflows",
    title: "AI Workflows & Automation",
    tagline: "Work Smarter. Scale Faster.",
    description:
      "Automate repetitive work. Save time. Reduce costs. Increase output. AI multiplies your team. It does not replace them.",
    shortDescription: "Work smarter. Scale faster.",
  },
  {
    slug: "data-intelligence",
    title: "Data & Marketing Intelligence",
    tagline: "Solve Business Problems with Data.",
    description:
      "Most businesses drown in data and starve for insight. We build dashboards, attribution models, and decision frameworks that turn your data into clear action.",
    shortDescription: "Turn numbers into decisions.",
  },
  {
    slug: "content-systems",
    title: "Content Workflows & Systems",
    tagline: "Content at Scale, Without the Chaos.",
    description:
      "Great content is not a one-off. It is a system. We build the processes that allow your business to produce and distribute content consistently.",
    shortDescription: "Content at scale, without the chaos.",
  },
];

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  "performance-marketing": {
    ...serviceListings[0],
    heroHeadline: "Performance Marketing, Turn Ad Spend Into Revenue.",
    heroSubheadline:
      "Every unit of ad spend should be working harder. We build, manage, and optimise paid campaigns that generate measurable business outcomes.",
    problem: [
      "Most businesses waste money on ads.",
      "Bad targeting. Weak creatives. Poor optimisation.",
      "We fix that with sprint-based execution and weekly accountability.",
    ],
    deliverables: [
      "Google Ads: Search, Shopping, Display, YouTube, precision targeting and audience strategies",
      "Meta Ads: Facebook & Instagram. Prospecting and retargeting funnels",
      "LinkedIn Ads: B2B demand generation for global markets",
      "TikTok and Pinterest: emerging channel deployment where ROI-justified",
      "Landing page creation and CRO. Conversion rate optimisation tied directly to paid traffic",
      "Weekly sprint reports: ROAS, CPA, CTR, revenue attribution",
    ],
    process: [
      { step: "01", title: "Discovery" },
      { step: "02", title: "Research" },
      { step: "03", title: "Launch" },
      { step: "04", title: "Optimisation" },
      { step: "05", title: "Scale" },
    ],
    faq: [
      {
        question: "How long before results?",
        answer:
          "For paid media, most clients see measurable ROAS improvement within 60 days. We are honest about timelines before you sign.",
      },
      {
        question: "Do you need our creative assets?",
        answer:
          "No. We produce all ad creative, content, and copy. You provide brand access and approve before we publish.",
      },
    ],
    relatedSlugs: ["seo-content", "branding-design", "web-development"],
  },
  "seo-content": {
    ...serviceListings[1],
    heroHeadline: "SEO & Content Strategy, Get Found. Get Chosen.",
    heroSubheadline:
      "Organic growth compounds over time. We help your customers find you before they find your competitors.",
    problem: [
      "Your customers are searching.",
      "But they are finding your competitors first.",
      "We build topical authority that compounds month over month.",
    ],
    deliverables: [
      "Technical SEO: Core Web Vitals, crawlability, indexation, schema markup, site architecture",
      "Keyword research and topical authority mapping for your audience's search intent",
      "Content strategy: pillar pages, cluster content, blog programme",
      "On-page SEO across all existing and new pages",
      "Link building and digital PR. Domain authority growth through earned coverage",
      "AEO (Answer Engine Optimisation): getting your brand cited in AI-generated answers (ChatGPT, Google AI Overviews)",
      "Monthly ranking and organic revenue dashboard",
    ],
    process: [
      { step: "01", title: "Audit" },
      { step: "02", title: "Strategy" },
      { step: "03", title: "Content" },
      { step: "04", title: "Optimise" },
      { step: "05", title: "Scale" },
    ],
    faq: [
      {
        question: "How long does SEO take?",
        answer:
          "Meaningful organic growth typically emerges at months 3–6. SEO compounds over time. The earlier you start, the harder it is for competitors to catch you.",
      },
      {
        question: "Do you write the content?",
        answer:
          "Yes. We handle strategy and production, aligned to your brand voice and business goals.",
      },
    ],
    relatedSlugs: ["web-development", "social-media", "content-systems"],
  },
  "social-media": {
    ...serviceListings[2],
    heroHeadline: "Social Media Management, Build a Community That Sells.",
    problem: [
      "Most brands post.",
      "Few brands grow demand.",
      "We build content systems that turn attention into pipeline.",
    ],
    deliverables: [
      "Full social management: strategy, content calendar, creation, scheduling, community management",
      "Platforms: LinkedIn, Instagram, TikTok, X, Facebook. Channel selection based on your audience",
      "Short-form video strategy: Reels, TikToks, YouTube Shorts",
      "Brand voice development and content guidelines",
      "Influencer and creator partnership strategy",
      "Monthly analytics: reach, engagement, follower growth, conversions",
    ],
    process: [
      { step: "01", title: "Discovery" },
      { step: "02", title: "Strategy" },
      { step: "03", title: "Create" },
      { step: "04", title: "Publish" },
      { step: "05", title: "Optimise" },
    ],
    faq: [
      {
        question: "Which platforms do you manage?",
        answer:
          "LinkedIn, Instagram, TikTok, X, and Facebook. Channel selection is based on where your audience actually spends time.",
      },
      {
        question: "Do you create video content?",
        answer:
          "Yes. Short-form video, Reels, TikToks, and YouTube Shorts are core to our social strategy.",
      },
    ],
    relatedSlugs: ["branding-design", "performance-marketing", "content-systems"],
  },
  "web-development": {
    ...serviceListings[3],
    heroHeadline: "Web Development, A Website That Actually Sells.",
    problem: [
      "Most websites look good.",
      "Few websites convert.",
      "We build sites that sell while you sleep.",
    ],
    deliverables: [
      "New website builds: WordPress, Webflow, or Next.js. Matched to your needs and team",
      "Landing page and funnel builds optimised for conversion",
      "Website performance optimisation: Core Web Vitals, page speed, mobile UX",
      "E-commerce: Shopify and WooCommerce builds and optimisation",
      "Ongoing maintenance, hosting support, and iterative improvement",
      "Analytics integration: GA4, Hotjar, Microsoft Clarity, Google Tag Manager",
    ],
    process: [
      { step: "01", title: "Discovery" },
      { step: "02", title: "Design" },
      { step: "03", title: "Develop" },
      { step: "04", title: "Launch" },
      { step: "05", title: "Optimise" },
    ],
    faq: [
      {
        question: "What tech stack do you use?",
        answer:
          "WordPress, Webflow, or Next.js. We pick the stack that matches your team and growth stage, not our preference.",
      },
      {
        question: "Will my site be mobile-friendly?",
        answer:
          "Every site we build is fully responsive and optimised for Core Web Vitals on all devices.",
      },
    ],
    relatedSlugs: ["ai-workflows", "seo-content", "performance-marketing"],
  },
  "branding-design": {
    ...serviceListings[4],
    heroHeadline: "Branding & Design, Become Impossible to Ignore.",
    problem: [
      "People buy brands.",
      "Not products.",
      "We build identity systems that compound across every channel.",
    ],
    deliverables: [
      "Brand strategy: positioning, messaging framework, tone of voice guide",
      "Logo design and visual identity: colours, typography, iconography, imagery style",
      "Brand guidelines document. The rulebook your team actually uses",
      "Social media creative templates",
      "Ad creative: static and motion graphics for paid campaigns",
      "Pitch decks, presentations, and sales collateral",
    ],
    process: [
      { step: "01", title: "Discovery" },
      { step: "02", title: "Strategy" },
      { step: "03", title: "Design" },
      { step: "04", title: "Refine" },
      { step: "05", title: "Deliver" },
    ],
    faq: [
      {
        question: "Do you only do logos?",
        answer:
          "No. We build complete brand systems. Strategy, messaging, identity, templates, and guidelines.",
      },
      {
        question: "Can you refresh an existing brand?",
        answer:
          "Absolutely. We work with startups and established businesses looking to evolve without losing recognition.",
      },
    ],
    relatedSlugs: ["performance-marketing", "web-development", "social-media"],
  },
  "ai-workflows": {
    ...serviceListings[5],
    heroHeadline: "AI Workflows & Automation, Work Smarter. Scale Faster.",
    heroSubheadline:
      "Automate repetitive work. Save time. Reduce costs. Increase output. AI multiplies your team. It does not replace them.",
    problem: [
      "Your team spends too much time on repetitive work.",
      "Manual reporting. Manual qualification. Manual follow-ups.",
      "We automate what machines should do. So humans do what only humans can.",
    ],
    deliverables: [
      "AI audit: map your current processes, identify automation opportunities and ROI",
      "Custom workflow builds: Make, Zapier, n8n, OpenAI API, Claude. Matched to your stack",
      "Content automation: AI-assisted pipelines that produce on-brand output at scale",
      "Lead qualification and CRM automation. No more manually logging calls",
      "Customer support automation: AI chatbots, FAQ handlers, ticket routing",
      "Reporting workflows: raw data → structured weekly business intelligence summaries",
      "AI tool stack consulting: which tools, which integrations, which order to implement",
    ],
    process: [
      { step: "01", title: "Audit" },
      { step: "02", title: "Design" },
      { step: "03", title: "Build" },
      { step: "04", title: "Deploy" },
      { step: "05", title: "Optimise" },
    ],
    faq: [
      {
        question: "Will AI replace my team?",
        answer:
          "No. We automate repetitive tasks so your team can focus on high-value work.",
      },
      {
        question: "What tools do you integrate with?",
        answer:
          "Make, Zapier, n8n, OpenAI API, Claude, HubSpot, Salesforce, and custom APIs. Whatever your stack requires.",
      },
    ],
    relatedSlugs: ["web-development", "data-intelligence", "content-systems"],
  },
  "data-intelligence": {
    ...serviceListings[6],
    heroHeadline: "Data & Marketing Intelligence, Solve Business Problems with Data.",
    heroSubheadline:
      "Most businesses drown in data and starve for insight. We build dashboards, attribution models, and decision frameworks that turn your data into clear action.",
    problem: [
      "You have more data than ever.",
      "But less clarity on what to do next.",
      "We make the 20% driving 80% of results visible. And scalable.",
    ],
    deliverables: [
      "Marketing data audit: what you're tracking, what you're missing, what actually matters",
      "Custom dashboards: Looker Studio, Power BI, or bespoke. Connecting GA4, Meta, Google Ads, CRM",
      "Attribution modelling: which channels and touchpoints actually drive revenue",
      "Customer segmentation and audience intelligence",
      "A/B test design, execution, and analysis",
      "Monthly data review: KPIs, anomaly detection, strategic recommendations",
    ],
    process: [
      { step: "01", title: "Audit" },
      { step: "02", title: "Connect" },
      { step: "03", title: "Model" },
      { step: "04", title: "Report" },
      { step: "05", title: "Optimise" },
    ],
    faq: [
      {
        question: "Do we need a data team already?",
        answer:
          "No. We work with whatever you have. Spreadsheets, GA4, ad platforms, CRM. And build from there.",
      },
      {
        question: "Which dashboards do you build?",
        answer:
          "Looker Studio, Power BI, or bespoke dashboards connecting your marketing and sales data in one place.",
      },
    ],
    relatedSlugs: ["performance-marketing", "ai-workflows", "seo-content"],
  },
  "content-systems": {
    ...serviceListings[7],
    heroHeadline: "Content Workflows & Systems, Content at Scale, Without the Chaos.",
    heroSubheadline:
      "Great content is not a one-off. It is a system. We build the processes that allow your business to produce and distribute content consistently.",
    problem: [
      "Content gets created in silos.",
      "Approvals stall. Distribution is inconsistent.",
      "We build systems so content compounds instead of chaos.",
    ],
    deliverables: [
      "Content workflow audit: where content gets created, approved, and distributed. And where it breaks down",
      "Editorial calendar and content governance framework",
      "Multi-channel repurposing: one piece → blog + social + newsletter + podcast notes",
      "AI-assisted production setup: brief → draft → edit → publish, semi-automated",
      "Team training and SOP documentation",
      "Content performance tracking and iterative optimisation",
    ],
    process: [
      { step: "01", title: "Audit" },
      { step: "02", title: "Design" },
      { step: "03", title: "Build" },
      { step: "04", title: "Train" },
      { step: "05", title: "Optimise" },
    ],
    faq: [
      {
        question: "Is this only for large teams?",
        answer:
          "No. Systems help teams of one as much as teams of twenty. Consistency is the multiplier.",
      },
      {
        question: "Do you use AI in content production?",
        answer:
          "Yes. Semi-automated pipelines with human review, so output stays on-brand at scale.",
      },
    ],
    relatedSlugs: ["seo-content", "social-media", "ai-workflows"],
  },
};

export const compoundingEffects = [
  {
    combo: "Brand + Performance",
    outcome: "Recognition compounds ad efficiency. Visual identity, offer, and landing experience aligned = more conversions at lower CPAs.",
  },
  {
    combo: "SEO + Content + Social",
    outcome: "Organic channels reinforce each other. Search captures intent, content builds authority, social creates loyalty.",
  },
  {
    combo: "Web + AI",
    outcome: "Your site becomes an active sales and ops layer. Intelligent forms, automated qualification, no extra headcount.",
  },
  {
    combo: "Data Intelligence + All Channels",
    outcome: "The 20% of activity driving 80% of results becomes visible. And scalable.",
  },
] as const;

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug as ServiceSlug];
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return Object.keys(serviceDetails) as ServiceSlug[];
}
