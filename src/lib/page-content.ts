import type { ServiceSlug } from "./service-icons";
import { aboutPage } from "./about";

export const homeExtended = {
  manifesto: [
    "The Plugin was built for founders who are tired of agency theater. Decks without delivery, reports without revenue, and strategies that sound impressive but change nothing on the ground.",
    "We operate like a technology partner, not a vendor. That means we embed into how your business already works: your CRM, your ad accounts, your site, your sales motion. We don't rip and replace. We plug in, amplify what's working, and systematically remove what's slowing you down.",
    "Every engagement starts with clarity: where growth is leaking, where automation creates leverage, and where marketing spend should compound instead of evaporate. From there we build. Fast, transparently, and with metrics you can actually trust.",
    "Plug In. Grow. Get Hired. isn't a tagline. It's how we structure every engagement: integrate first, measure everything, then scale what works.",
  ],
  pillars: [
    {
      title: "Strategy That Ships",
      body: "We don't disappear into months of planning. Discovery is sharp, timelines are aggressive, and the first measurable movement typically shows within weeks. Not quarters.",
    },
    {
      title: "Full-Stack Under One Roof",
      body: "Performance marketing, SEO, development, branding, and AI automation aren't siloed departments here. One team owns the outcome, which eliminates the blame game and speeds execution dramatically.",
    },
    {
      title: "Transparent By Default",
      body: "You see what we see: live dashboards, weekly reporting, and direct access to the people doing the work. No black boxes. No mystery invoices. No 'trust us' without proof.",
    },
  ],
} as const;

export const industriesList = {
  intro:
    "We work across SaaS, e-commerce, professional services, real estate, healthcare, and high-growth startups. The common thread: leaders who want measurable outcomes, fast execution, and a partner that integrates instead of overwhelms.",
  sectors: [
    "SaaS & Technology",
    "E-Commerce & DTC",
    "Real Estate",
    "Healthcare",
    "Professional Services",
    "Agencies & B2B",
    "Finance & Fintech",
    "Education",
  ],
} as const;

export const processExtended = {
  intro: [
    "Our process is designed to move fast without breaking what already works. Every phase has clear deliverables, owners, and metrics. So you always know what's happening and why.",
    "You'll never wonder where your budget went. We document decisions, share dashboards, and iterate in tight cycles so learning compounds week over week.",
  ],
  steps: [
    "We audit your funnel, tech stack, and data layer. Stakeholder interviews reveal where revenue leaks and where automation creates the highest leverage.",
    "We build a prioritized roadmap with quick wins and structural improvements. You approve the plan before we touch campaigns or code.",
    "We deploy in focused sprints: campaigns, content, development, and automation shipped in parallel. Not sequential handoffs.",
    "Live dashboards track KPIs daily. Weekly reviews keep alignment tight and decisions data-backed.",
    "We double down on winners and cut waste. Systems get tighter, costs drop, and growth compounds.",
  ],
} as const;

export const aboutExtended = {
  origin: aboutPage.story.slice(1),
  belief: [
    "We believe the best partners don't create dependency. They create leverage. When we plug into your business or your career search, the goal is simple: you should be stronger when we're involved, and even stronger when you're operating the systems we built together.",
    "That philosophy shapes everything. How we price, how we report, how we hire, and how we say no to work that doesn't move a real metric.",
  ],
  operations: [
    "We're founder-led, which means you talk to decision-makers. Not account managers reading from a script. We run global operations with async-friendly processes, so momentum doesn't die when time zones shift.",
    "We invest heavily in AI-assisted workflows internally, which is why we can move faster than traditional agencies without sacrificing quality.",
  ],
} as const;

export const servicesExtended = {
  intro: [
    "Growth isn't a single lever. It's a system. Acquisition, conversion, retention, and operational efficiency all feeding each other. Our services are designed to work independently when you need a surgical fix, or stack together when you're ready to build a complete engine.",
    "Below you'll find how each 'plugin' fits into that system, what we actually deliver week to week, and the outcomes we hold ourselves accountable to. If you're unsure where to start, book a consultation. We'll map the highest-ROI path for your stage.",
  ],
  compoundDetail: [
    {
      title: "Brand + Performance",
      body: "Recognition compounds ad efficiency. When your visual identity, offer, and landing experience are aligned, CAC drops and conversion rates climb without increasing spend.",
    },
    {
      title: "SEO + Content + Social",
      body: "Organic channels reinforce each other. Search captures intent, content builds authority, social creates distribution. Together they produce momentum that paid channels alone can't replicate.",
    },
    {
      title: "Web + AI",
      body: "Your site becomes an active sales and ops layer: intelligent forms, automated qualification, and reporting that surfaces what matters before you ask for it.",
    },
  ],
} as const;

export const serviceLongForm: Record<ServiceSlug, string[]> = {
  "performance-marketing": [
    "Every unit of ad spend should be working harder. We build, manage, and optimise paid campaigns that generate measurable business outcomes. Across Google, Meta, LinkedIn, and emerging channels where ROI is justified.",
    "Our team owns the full stack: strategy, build, launch, optimisation, and reporting. You get one accountable partner instead of juggling freelancers, platforms, and conflicting advice.",
    "Typical clients see meaningful signal in 30–60 days and scalable efficiency by day 90. Assuming tracking is clean and offers are market-ready.",
  ],
  "seo-content": [
    "Organic growth compounds over time. We help your customers find you before they find your competitors. Through technical SEO, topical authority, and content that matches your audience's search intent.",
    "We fix crawlability and site architecture first, then build pillar pages and cluster content mapped to how your buyers actually search.",
    "AEO (Answer Engine Optimisation) is built in from day one. Getting your brand cited in AI-generated answers across ChatGPT and Google AI Overviews.",
  ],
  "social-media": [
    "Social should create demand. Not just activity. We build content systems: strategy, creative direction, production cadence, and community loops that turn attention into pipeline.",
    "Short-form video, Reels, TikToks, and narrative posts are engineered for your platform mix, LinkedIn, Instagram, TikTok, X, and Facebook.",
    "Reporting ties social metrics to business outcomes: reach, engagement, follower growth, and conversions. Not vanity likes alone.",
  ],
  "web-development": [
    "We build sites that sell while you sleep: fast load times, clear narrative, conversion-focused UX, and analytics that tell you what's working.",
    "Whether WordPress, Webflow, or Next.js. We pick the stack that matches your team and growth stage, not our preference.",
    "Every build includes SEO foundations, Core Web Vitals optimisation, and integration hooks for GA4, Hotjar, Microsoft Clarity, and Google Tag Manager.",
  ],
  "branding-design": [
    "Brand is the multiplier on everything else. We define positioning, messaging, and visual systems so your market knows why you're different in seconds.",
    "Deliverables include identity, templates, ad creative, and guidelines your team can actually use. Not a PDF that collects dust.",
    "Strong brands shorten sales cycles, improve ad performance, and command premium pricing.",
  ],
  "ai-workflows": [
    "Automate repetitive work. Save time. Reduce costs. Increase output. AI multiplies your team. It does not replace them.",
    "We map processes across sales, marketing, and ops. Then automate with Make, Zapier, n8n, OpenAI API, and Claude integrations your team trusts.",
    "Use cases include lead qualification, reporting, content automation, support triage, and CRM workflows. Always tied to hours saved or revenue gained.",
  ],
  "data-intelligence": [
    "Most businesses drown in data and starve for insight. We build dashboards, attribution models, and decision frameworks that turn your data into clear action.",
    "We connect GA4, Meta, Google Ads, and CRM into custom dashboards, Looker Studio, Power BI, or bespoke. So you see what actually drives revenue.",
    "Monthly data reviews cover KPIs, anomaly detection, and strategic recommendations. Not just charts nobody reads.",
  ],
  "content-systems": [
    "Great content is not a one-off. It is a system. We build the processes that allow your business to produce and distribute content consistently.",
    "We audit where content gets created, approved, and distributed. Then fix the breakdowns with editorial calendars, governance frameworks, and repurposing pipelines.",
    "AI-assisted production setup takes you from brief → draft → edit → publish, semi-automated. With team training and SOP documentation included.",
  ],
};

export const pricingExtended = {
  intro: [
    "We don't publish one-size-fits-all price tags because every business has different complexity, channels, and goals. What we do publish is how we think about value: transparent scopes, clear deliverables, and pricing that scales with outcomes. Not hours billed.",
    "Starter engagements focus on one high-impact plugin. Growth engagements combine multiple services into a unified system. Enterprise programs are custom-built for multi-market, multi-team operations.",
  ],
  tiers: [
    {
      name: "Starter",
      detail:
        "Ideal for early-stage companies validating channels. One primary service, monthly reporting, and direct founder access.",
    },
    {
      name: "Scale",
      detail:
        "Our most popular tier. Multi-channel execution, automation layers, and quarterly planning cycles tied to revenue goals.",
    },
    {
      name: "Enterprise",
      detail:
        "Custom scopes for larger teams: dedicated pods, advanced analytics, international support, and SLA-backed delivery.",
    },
  ],
} as const;

export const portfolioExtended = {
  intro: [
    "Results below are representative of the outcomes we optimize for. Revenue efficiency, organic scale, lead quality, and operational leverage. Every engagement starts with baselines so improvement is undeniable.",
    "Filter by industry or service to find stories closest to your business. Want something in your vertical? Book a call. We'll walk through relevant work under NDA when needed.",
  ],
} as const;

export const blogExtended = {
  intro: [
    "Free knowledge from both sides of The Plugin. Marketing intelligence for businesses, career intelligence for graduates.",
    "Filter by For Businesses, For Talent, AI & Automation, graduate schemes, SEO, UK job market, and visa strategy.",
  ],
} as const;

export const contactPage = {
  title: "Book Your Free Call",
  subtitle: "Tell us which side of The Plugin you need. We will take it from there.",
  growth: {
    title: "Business Consultation",
    description:
      "For businesses that want to grow through marketing, AI systems, content workflows, or data-driven strategy.",
    cta: "Book Business Consultation →",
  },
  careers: {
    title: "Talent Strategy Call",
    description:
      "For international graduates who want a UK job, visa strategy, and a coaching system that actually works.",
    cta: "Book Talent Strategy Call →",
  },
} as const;

export const contactExtended = {
  promise: [
    "This isn't a high-pressure sales call. We'll understand your situation and give you an honest read on whether we're the right fit.",
    "If we are, you'll leave with a clear picture of priorities and next steps. If we're not, we'll still point you in a useful direction.",
  ],
  faq: [
    {
      q: "Which call should I book?",
      a: "Businesses and founders should book a Business Consultation. International graduates job hunting in the UK should book a Talent Strategy Call.",
    },
    {
      q: "How quickly can you start?",
      a: "Most growth engagements kick off within 1–2 weeks after discovery. Career coaching can begin within days of your strategy call.",
    },
    {
      q: "Is the first call really free?",
      a: "Yes. Both the Business Consultation and Talent Strategy Call are 30 minutes, free, and with no obligation.",
    },
  ],
} as const;
