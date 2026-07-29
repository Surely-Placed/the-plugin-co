import { serviceListings } from "../services";
import type {
  HowItWorksContent,
  LandingContent,
  PricingContent,
  ServicesContent,
  StoriesContent,
  Testimonial,
} from "../content-types";

export const growthContent = {
  landing: {
    hero: {
      title: "Your Growth System Is Here.",
      subtitle:
        "We don't just run campaigns. We build the systems that make your business grow sustainably. From ad spend to AI automation, from content to conversion. We're your embedded growth team.",
      trustBar: [
        "50+ businesses grown",
        "Avg 60-day ROAS improvement",
        "Data-driven sprint methodology",
        "Multi-market campaigns",
      ],
    },
    problem: {
      title: "Digital marketing doesn't have to be difficult.",
      body: "Getting lost in the digital maze? At The Plugin, we don't just offer a clear roadmap. We navigate strategy, marketing, and technology for you.",
      painPoints: [
        {
          title: "Getting lost in the digital maze?",
          body: "At The Plugin, we don't just offer a clear roadmap. We navigate strategy, marketing, and technology for you.",
        },
        {
          title: "Frustrated with cut-and-paste models?",
          body: "Every business is different. We build tailor-made growth systems for your company and its evolving needs.",
        },
        {
          title: "Feeling left in the dark?",
          body: "We work with complete transparency. Real-time reporting, intuitive dashboards, and a dedicated team always available.",
        },
      ],
    },
    servicesPreview: {
      title: "Pick your growth plugins",
      linkLabel: "See all services →",
    },
    processPreview: {
      title: "Grow your presence, step by step.",
      linkLabel: "See full process →",
    },
    results: {
      title: "Results that compound",
      stats: [
        { value: "50+", label: "Businesses grown" },
        { value: "60 days", label: "Avg. ROAS improvement" },
      ],
      linkLabel: "See case studies →",
    },
    testimonialsTitle: "What clients say",
    packagesPreview: {
      tiers: [
        { name: "Foundation", price: "£1,500/mo" },
        { name: "Solution", price: "£3,500/mo" },
        { name: "Full Stack", price: "£6,500+/mo" },
      ],
      linkLabel: "See full pricing →",
    },
    ctaBanner: {
      title: "Make your mark in the digital world.",
      subtitle: "Book a free business consultation. No commitment, just clarity on your next move.",
    },
  } satisfies LandingContent,

  process: {
    title: "How We Work. How You Grow.",
    subtitle:
      "We are not a black box. Here is exactly what happens from your first call to your first measurable results.",
    steps: [
      {
        step: "01",
        title: "Free Business Consultation",
        timing: "30 minutes · Free",
        description:
          "We start with a free consultation to understand your business, goals, and current marketing setup. We ask sharp questions. We tell you what we see. By the end of the call, you have a clear view of where the gaps are. Whether you work with us or not.",
      },
      {
        step: "02",
        title: "Discovery & Business Audit",
        timing: "Week 1",
        description:
          "If we're a fit, we conduct a full growth audit. Covering ad accounts, SEO health, website performance, analytics setup, and content. You receive a written audit report with a prioritised recommendations matrix. This forms the foundation of everything we build next.",
      },
      {
        step: "03",
        title: "Strategy Roadmap",
        timing: "Week 2",
        description:
          "Based on the audit, we build a 90-day growth roadmap: which channels, which services, which sequence, and which KPIs. We present this to your team and align on priorities before we spend any of your budget. You approve everything before we act.",
      },
      {
        step: "04",
        title: "Build & Sprint",
        timing: "Weeks 3 onwards",
        description:
          "Two-week sprints: clear objectives, defined deliverables, and a brief you approve before we execute. Every sprint ends with a review. What we shipped, what the data says, what we're doing next. No surprises. No excuses. Just measurable progress.",
      },
      {
        step: "05",
        title: "Optimise & Scale",
        timing: "Ongoing",
        description:
          "Month over month, we analyse performance, identify what's working, and double down. Your live dashboard gives you full visibility at all times. Your dedicated team is available Monday to Friday.",
      },
    ],
  } satisfies HowItWorksContent,

  services: {
    title: "Pick Your Growth Plugin.",
    subtitle:
      "Growth isn't a single lever. It's a system. Acquisition, conversion, retention, and operational efficiency. Every service plugs into that system.",
    intro: [
      "Eight growth services that plug into one system. Use one, combine several, or run the full stack.",
    ],
    services: serviceListings.map((s) => ({
      title: s.title,
      tagline: s.tagline,
      description: s.description,
      slug: s.slug,
    })),
    combos: [
      {
        title: "Brand + Performance",
        body: "Recognition compounds ad efficiency. Visual identity, offer, and landing experience aligned = more conversions at lower CPAs.",
      },
      {
        title: "SEO + Content + Social",
        body: "Organic channels reinforce each other. Search captures intent, content builds authority, social creates loyalty.",
      },
      {
        title: "Web + AI",
        body: "Your site becomes an active sales and ops layer. Intelligent forms, automated qualification, no extra headcount.",
      },
      {
        title: "Data Intelligence + All Channels",
        body: "The 20% of activity driving 80% of results becomes visible. And scalable.",
      },
    ],
  } satisfies ServicesContent,

  pricing: {
    title: "Choose the Level of Support That Fits.",
    subtitle:
      "Foundation to Full Stack. All plans include a free Discovery Consultation. No locked-in contracts after the first 3 months.",
    tiers: [
      {
        name: "Foundation",
        price: "£1,500/mo",
        planSlug: "growth-foundation",
        period: "3-month minimum",
        description:
          "Best for businesses that need a clear strategy and baseline infrastructure before scaling.",
        features: [
          "Free Discovery Consultation",
          "Full growth audit + written report",
          "90-day strategy roadmap",
          "Basic performance dashboard",
          "1 active channel (your choice)",
          "Monthly strategy review session",
          "Email support",
        ],
      },
      {
        name: "Solution",
        price: "£3,500/mo",
        planSlug: "growth-solution",
        period: "3-month minimum. Most popular",
        description:
          "Best for growing businesses ready to activate multiple channels with a dedicated team.",
        popular: true,
        features: [
          "Everything in Foundation, plus:",
          "2–3 channels active concurrently",
          "Campaign & channel setup",
          "Fortnightly sprint reviews",
          "Ad creative and content production",
          "Full analytics & attribution setup",
          "WhatsApp team access (Mon–Fri)",
          "Monthly data intelligence report",
        ],
      },
      {
        name: "Full Stack",
        price: "£6,500+/mo",
        planSlug: "growth-full-stack",
        period: "6-month engagement",
        description:
          "Best for ambitious businesses wanting complete end-to-end execution.",
        features: [
          "Everything in Solution, plus:",
          "All channels active",
          "AI workflow builds included",
          "Content systems implementation",
          "Dedicated team: PM + specialists",
          "Weekly sprint meetings",
          "Real-time monitoring dashboard",
          "Priority access 7 days/week",
        ],
      },
    ],
    faq: [
      {
        question: "How quickly will I see results?",
        answer:
          "For paid media: most clients see measurable ROAS improvement within 60 days. For SEO and content: meaningful organic growth typically emerges at months 3–6. We are honest about timelines before you sign.",
      },
      {
        question: "Do I need to provide creative assets?",
        answer:
          "No. We produce all ad creative, content, and copy. You provide brand access and approve before we publish.",
      },
      {
        question: "What if I only need one service?",
        answer:
          "We accommodate single-service retainers, especially where clients have most of the stack in place. Book a consultation and we'll scope accordingly.",
      },
      {
        question: "Can I scale up or down?",
        answer:
          "Yes. Plans are reviewed every 3 months and adjusted based on performance and business needs.",
      },
      {
        question: "What makes The Plugin different from other agencies?",
        answer:
          "We execute in two-week sprints with clear deliverables and written briefs. You see exactly what we built and why it matters. Every fortnight.",
      },
    ],
    footnote:
      "Prices shown in GBP and exclude applicable taxes. Custom quotes are available for international engagements. Discovery consultation is always free.",
  } satisfies PricingContent,

  stories: {
    title: "Results. Not Promises.",
    subtitle:
      "Every client story below is built on a specific strategy, a specific problem, and a specific outcome.",
  } satisfies StoriesContent,

  testimonials: [
    {
      quote:
        "Their creativity, attention to detail, and ability to bring our vision to life made us feel like we finally had a partner who got it.",
      name: "Leslie Boatwright",
      role: "CEO · Hillstreet Industries",
    },
    {
      quote:
        "Best investment we made all year. ROAS improved within the first 60 days of launch.",
      name: "Priya Sharma",
      role: "Owner · Verde Home Co.",
    },
    {
      quote:
        "Transparent, reliable, effective. No black boxes, just clear metrics and honest recommendations.",
      name: "Aisha Khan",
      role: "Marketing Director · Brightpath Agency",
    },
  ] satisfies Testimonial[],
};
