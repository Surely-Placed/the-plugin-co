import type { DesignServiceSlug } from "./service-slugs";

export interface DesignServiceRow {
  num: string;
  title: string;
  tagline: string;
  slug: DesignServiceSlug;
  image: string;
  imageAlt: string;
  body: string;
  reverse?: boolean;
}

/** Copy and structure from services.dc.html */
export const servicesPageHero = {
  eyebrow: "SERVICES · 7 CORE PLUGINS",
  title: "Pick your growth plugins.",
  lead: "Growth isn't a single lever. It's a system: acquisition, conversion, retention and operations. Use one plugin, combine several, or run the full stack.",
  inShortLabel: "IN SHORT · WHAT SERVICES DOES THE PLUGIN OFFER?",
  inShort:
    "Seven core services: performance marketing, AI content, performance creative, website development, content and creative strategy, brand strategy, and software and CRM development. Supporting services include SEO, AEO and GEO, AI workflow automation, analytics and social media management.",
  heroImage: "/assets/photo-4-strategy-workshop.webp",
  heroImageAlt: "Strategy team mapping a growth plan",
  stats: [
    { label: "CORE", value: "7 plugins" },
    { label: "SUPPORTING", value: "4 plugins" },
    { label: "STARTS WITH", value: "Free audit" },
  ],
};

export const serviceRows: DesignServiceRow[] = [
  {
    num: "01",
    title: "Performance Marketing",
    tagline: "Turn ad spend into revenue.",
    slug: "performance-marketing",
    image: "/assets/photo-1-marketer-dashboard.webp",
    imageAlt: "Performance marketer reviewing Meta and Google ads dashboards on two monitors",
    body: "Performance marketing is paid advertising that is planned, bought and judged on measurable outcomes such as leads, sales and booked calls. The Plugin runs it end to end: account structure, tracking, creative, budget pacing and weekly optimisation across Meta, Google, LinkedIn and TikTok, reported on ROAS, CPA and revenue.",
  },
  {
    num: "02",
    title: "AI Content",
    tagline: "Content at the speed of the feed. Still on brand.",
    slug: "ai-content",
    image: "/assets/photo-3-phone-feed-ad.webp",
    imageAlt: "Hand scrolling a vertical social feed showing a sponsored product video ad",
    body: "AI content creation uses generative models to produce images, video, voiceover and copy variations from your brand assets. The Plugin directs every output against your brand guidelines, edits and reviews it by hand, and cuts it for each ad placement. AI for speed, humans for taste.",
    reverse: true,
  },
  {
    num: "03",
    title: "Performance Creative",
    tagline: "Creative that's built to be tested.",
    slug: "performance-creative",
    image: "/assets/photo-2-content-shoot.webp",
    imageAlt: "Creator filming a product ad on a phone gimbal in a studio",
    body: "Performance creative is advertising content designed to be tested and measured: multiple hooks, angles and formats produced together so the ad platforms can find winners. The Plugin plans creative from performance data, produces it in batches, cuts it for each placement and refreshes it every two weeks based on hook rate, hold rate, CTR and CPA.",
  },
  {
    num: "04",
    title: "Website Development",
    tagline: "A website that actually sells.",
    slug: "website-development",
    image: "/assets/photo-5-dev-crm-desk.webp",
    imageAlt: "Developer workstation with code editor and live website analytics",
    body: "A website development agency plans, designs and builds websites and landing pages. The Plugin builds sites that load fast, convert visitors into leads or sales, and are structured for SEO and AI search with schema, clean architecture and Core Web Vitals in the green. Tracking and analytics are set up before launch.",
    reverse: true,
  },
  {
    num: "05",
    title: "Content & Creative Strategy",
    tagline: "Know what to make before you make it.",
    slug: "content-creative-strategy",
    image: "/assets/photo-4-strategy-workshop.webp",
    imageAlt: "Two strategists mapping a marketing funnel on a glass wall",
    body: "Content and creative strategy decides what to say, to whom, in which format and on which channel, before anything is produced. The Plugin builds it from audience, competitor and performance research, then turns it into messaging pillars, a creative angles library and a calendar that every ad, post and article follows.",
  },
  {
    num: "06",
    title: "Brand Strategy",
    tagline: "Become impossible to ignore.",
    slug: "brand-strategy",
    image: "/assets/photo-6-brand-workspace.webp",
    imageAlt: "Brand guidelines, colour swatches and type specimens laid out on a desk",
    body: "Brand strategy defines who you are for, what you stand for and why customers should choose you over alternatives, then expresses it through messaging and visual identity. The Plugin builds positioning, messaging architecture, naming and brand guidelines designed to make your performance marketing, website and content work harder.",
    reverse: true,
  },
  {
    num: "07",
    title: "Software & CRM Development",
    tagline: "Systems that turn leads into revenue.",
    slug: "software-crm-development",
    image: "/assets/photo-5-dev-crm-desk.webp",
    imageAlt: "Developer desk with a CRM sales pipeline board on screen",
    body: "Custom CRM development builds or configures the system your team uses to capture, qualify and close leads. The Plugin sets up HubSpot, Zoho or Salesforce, or builds a custom CRM, then connects it to your ads, website and WhatsApp with automated routing, follow-ups and AI qualification so no lead goes cold.",
  },
];

export const serviceStacks = [
  {
    eyebrow: "LAUNCH STACK",
    title: "Launch Stack",
    body: "For new brands and new offers that need to look right, convert and get traffic from day one.",
    slugs: ["brand-strategy", "website-development", "performance-marketing"] as DesignServiceSlug[],
    labels: ["Brand Strategy", "Website Development", "Performance Marketing"],
  },
  {
    eyebrow: "SCALE STACK",
    title: "Scale Stack",
    body: "For brands already spending on ads that want more winning creative and lower acquisition costs.",
    slugs: ["performance-marketing", "performance-creative", "ai-content"] as DesignServiceSlug[],
    labels: ["Performance Marketing", "Performance Creative", "AI Content"],
  },
  {
    eyebrow: "SYSTEMS STACK",
    title: "Systems Stack",
    body: "For lead-driven businesses that lose deals between the ad click and the sales call.",
    slugs: ["website-development", "software-crm-development", "content-creative-strategy"] as DesignServiceSlug[],
    labels: ["Website Development", "Software & CRM Development", "Content & Creative Strategy"],
  },
];

export const supportingCards = [
  {
    num: "01",
    title: "SEO, AEO & GEO",
    body: "Rank on Google and get cited by ChatGPT, Gemini, Perplexity and Google AI Mode.",
  },
  {
    num: "02",
    title: "AI Workflow Automation",
    body: "n8n, Zapier and Make workflows that remove manual work from marketing and sales.",
  },
  {
    num: "03",
    title: "Analytics & Attribution",
    body: "GA4, server-side tracking and dashboards that tie spend to revenue.",
  },
  {
    num: "04",
    title: "Social Media Management",
    body: "Calendars, Reels, carousels and community management across platforms.",
  },
];

export const servicesFaq = [
  {
    question: "What digital marketing services does The Plugin offer?",
    answer:
      "Seven core services: performance marketing, AI content, performance creative, website development, content and creative strategy, brand strategy, and software and CRM development. Supporting services include SEO, AEO and GEO, AI workflow automation, analytics and social media management.",
  },
  {
    question: "Can I hire you for just one service?",
    answer: "Yes. Each service works on its own, and they are designed to connect when you add more.",
  },
  {
    question: "How do you decide which services I need?",
    answer:
      "We start every engagement with a free growth audit of your website, tracking, ads and search presence, then recommend the services that fix the biggest revenue leaks first.",
  },
  {
    question: "Which markets do you work in?",
    answer: "India, the United Kingdom, the United States, the UAE, Australia and Canada.",
  },
];

export const finalCta = {
  title: "Make your mark in the digital world.",
  body: "Book a call, or start with a free growth audit. No commitment, just clarity on your next move.",
};