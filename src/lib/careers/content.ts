import { careerServices } from "./services";
import { successStories } from "./success-stories";
import type {
  HowItWorksContent,
  LandingContent,
  PricingContent,
  ServicesContent,
  StoriesContent,
  Testimonial,
} from "../content-types";

export const careersContent = {
  landing: {
    hero: {
      title:
        "You worked hard to get your UK degree. Now let's get you the career to match.",
      subtitle:
        "The Plugin · For Talent is the UK's specialist coaching platform for international graduates. We give you the strategy, CV, interviews, and connections to land a UK role. Not someday, but in the next 90 days.",
      trustBar: [
        "300+ graduates placed in UK roles",
        "Visa-friendly employer network",
        "Graduate Route & Skilled Worker expertise",
        "Graduates from 40+ countries",
      ],
    },
    problem: {
      title: "The UK job market is brilliant. But nobody told you the rules.",
      body: "You landed a place at a UK university. You earned your degree. And then the job search felt like walking into a game where everyone else already knew the rules. Which employers sponsor visas? What even is a graduate scheme? Why does your CV keep getting rejected before a human ever reads it? The Plugin · For Talent was built by people who have been exactly where you are. We know the UK system inside-out. And we teach it to you.",
      painPoints: [
        {
          title: "Which employers sponsor visas?",
          body: "Graduate schemes, ATS filters, assessment centres, visa-eligible employers. A whole hidden playbook that domestic candidates often pick up by osmosis.",
        },
        {
          title: "Why does your CV keep getting rejected?",
          body: "Most CVs from international graduates fail before a human ever reads them. Blocked by ATS systems or dismissed in 6 seconds.",
        },
        {
          title: "Where do you even start?",
          body: "We know the UK system inside-out. And we teach it to you with strategy, coaching, and connections that create momentum fast.",
        },
      ],
    },
    servicesPreview: {
      title: "Your career plugins",
      linkLabel: "See all services →",
    },
    processPreview: {
      title: "How it works",
      linkLabel: "See full process →",
    },
    results: {
      title: "Graduates who plugged in",
      stats: [
        { value: "300+", label: "Graduates placed" },
        { value: "90 days", label: "Avg. to first interview" },
        { value: "40+", label: "Nationalities served" },
      ],
      linkLabel: "See success stories →",
    },
    testimonialsTitle: "What graduates say",
    ctaBanner: {
      title: "Ready to Plug In?",
      subtitle:
        "Book a free 30-minute strategy call. No commitment, no pitch. Just an honest conversation about where you are and what you need.",
    },
  } satisfies LandingContent,

  process: {
    title: "Your Path from Application to Offer.",
    subtitle: "A 4-step process. From your first call to your first day in a UK role.",
    steps: [
      {
        step: "01",
        title: "Free Career Strategy Call",
        timing: "30 minutes · No commitment",
        description:
          "We start by understanding you: background, degree, visa situation, target sectors, where you are in your search. By the end of the call you have a clear view of what is blocking you and what The Plugin · For Talent can do about it.",
      },
      {
        step: "02",
        title: "Build Your Foundations",
        timing: "Weeks 1–2",
        description:
          "CV rewrite. LinkedIn overhaul. Job search strategy. We lay the groundwork in the first two weeks so every application you send after this point is working at full strength.",
      },
      {
        step: "03",
        title: "Go to Market",
        timing: "Weeks 3–10",
        description:
          "Targeted applications, networking outreach, and interview preparation running in parallel. We track everything in a shared dashboard, analyse your data weekly, and adjust strategy in real time.",
      },
      {
        step: "04",
        title: "Land & Negotiate",
        timing: "From first offer to first day",
        description:
          "Mock interviews for every stage. Offer evaluation and salary negotiation coaching. Visa transition support. First-90-days onboarding prep. We do not stop when you get the offer.",
      },
    ],
  } satisfies HowItWorksContent,

  services: {
    title: "Your Career System. Built for the UK.",
    subtitle:
      "We don't offer a CV review and send you on your way. Every service is part of a connected system designed to get you from application to offer.",
    intro: [
      "Use one service or run the full system. Every piece connects to get you hired faster.",
    ],
    services: careerServices.map((s) => ({
      title: s.title,
      tagline: s.tagline,
      description: s.intro,
      slug: s.slug,
      deliverables: s.deliverables,
    })),
    callout: {
      title: "Graduate Route vs Skilled Worker",
      body: "The Graduate Route gives you time post-study to work without sponsorship. Skilled Worker requires employer sponsorship from a licensed company. We build your strategy around your visa timeline. Not as an afterthought.",
    },
  } satisfies ServicesContent,

  pricing: {
    title: "Invest in Your Career.",
    subtitle:
      "Three plans for different needs and timelines. All begin with a free 30-minute career strategy call.",
    tiers: [
      {
        name: "Starter",
        price: "£349",
        planSlug: "talent-starter",
        period: "One-time payment",
        description:
          "Best for students with time to spare who need their foundations built.",
        features: [
          "CV rewrite (1 revision)",
          "LinkedIn profile overhaul",
          "1 x 60-min strategy session",
          "Job search action plan",
          "Email support for 30 days",
        ],
      },
      {
        name: "Accelerator",
        price: "£749/mo",
        planSlug: "talent-accelerator",
        period: "3-month commitment. Most popular",
        description:
          "Best for graduates on a visa deadline who need results fast.",
        popular: true,
        features: [
          "Everything in Starter, plus:",
          "Unlimited CV & cover letter iterations",
          "Weekly 45-min 1:1 coaching sessions",
          "Interview coaching (4 mock sessions)",
          "Graduate scheme strategy & calendar",
          "Application tracking dashboard",
          "WhatsApp support (Mon–Fri)",
          "Networking & referral access",
          "Visa strategy integrated throughout",
        ],
      },
      {
        name: "Elite",
        price: "£1,299/mo",
        planSlug: "talent-elite",
        period: "6-month engagement",
        description:
          "Best for MBAs, LLMs, and senior professionals targeting competitive firms.",
        features: [
          "Everything in Accelerator, plus:",
          "2 x weekly coaching sessions",
          "Unlimited mock interviews",
          "Direct referrals to partner recruiters",
          "Offer negotiation coaching",
          "First-90-days onboarding support",
          "Priority WhatsApp (7 days/week)",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need to commit upfront?",
        answer:
          "All plans begin with a free strategy call. We recommend the plan that fits your situation. No pressure on the call.",
      },
      {
        question: "Can I switch plans?",
        answer:
          "Yes. If you start on Starter and upgrade to Accelerator, we credit what you have already paid.",
      },
      {
        question: "What if I get a job before my plan ends?",
        answer:
          "Remaining sessions carry over as post-offer and onboarding support. Nothing is wasted.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "7-day money-back guarantee after your first session. Sessions completed after that are non-refundable.",
      },
      {
        question: "Is this a guarantee I will get a job?",
        answer:
          "No. We are honest about this. We cannot guarantee outcomes. What we guarantee is that every decision in your job search will be informed and strategic.",
      },
    ],
    footnote:
      "Prices in GBP, excluding VAT. Payment plans on request. All plans begin with a free 30-minute strategy call.",
  } satisfies PricingContent,

  stories: {
    title: "International Graduates. UK Talent.",
    subtitle:
      "These are not cherry-picked outliers. They are the people who committed to the process.",
  } satisfies StoriesContent,

  testimonials: [
    {
      quote:
        "Before The Plugin, I'd been applying for 6 months and heard nothing. In 8 weeks I had three interviews and two offers. The strategy they gave me was genuinely game-changing.",
      name: "Priya M.",
      role: "MSc Data Science, University of Manchester → HSBC London",
    },
    {
      quote:
        "I came to The Plugin with 3 months left on my Graduate Route Visa, completely lost. They helped me identify the right roles, rewrite my CV, and coached me through the McKinsey process. I got the offer.",
      name: "Ahmed K.",
      role: "MBA, Imperial College London → McKinsey & Company",
    },
    {
      quote:
        "The graduate scheme market was a mystery to me. The Plugin made it simple and I landed a place on the Deloitte UK Technology graduate scheme.",
      name: "Jin L.",
      role: "BSc Computer Science, University of Edinburgh → Deloitte UK",
    },
  ] satisfies Testimonial[],

  successStories: successStories.map((s) => ({
    slug: s.slug,
    name: s.name,
    role: s.role,
    result: s.result,
  })),
};
