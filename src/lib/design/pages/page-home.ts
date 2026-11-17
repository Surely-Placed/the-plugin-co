import type { DesignMarketingPage } from "../types";

/**
 * Home v2.dc.html is not in the design export zip.
 * Copy, markets and plugin list match services.dc.html / seo/llms.txt until Home v2 is added.
 */
export const pageHome: DesignMarketingPage = {
  seoTitle: "The Plugin | Growth & Performance Marketing Agency",
  hero: {
    eyebrow: "GROWTH · PERFORMANCE MARKETING AGENCY",
    title: "Plug In. Grow.",
    lead:
      "The Plugin is a growth and performance marketing agency serving businesses in India, the United Kingdom, the United States, the UAE, Australia and Canada. One accountable team runs paid media, ad creative, AI content, websites, brand strategy and CRM systems.",
    inShort:
      "Start with a free growth audit. Then run two-week sprints across the plugins you need, reported on revenue.",
    image: "",
  },
  sections: {
    Plugins: {
      title: "Pick your growth plugins.",
      paragraphs: [
        "Growth isn't a single lever. It's a system: acquisition, conversion, retention and operations.",
      ],
      bullets: [],
      cards: [],
    },
    Markets: {
      title: "Built for global growth teams.",
      paragraphs: [],
      bullets: ["India", "United Kingdom", "United States", "UAE", "Australia", "Canada"],
      cards: [],
    },
  },
  faq: [
    {
      question: "What does The Plugin do?",
      answer:
        "We run performance marketing, AI content, performance creative, website development, content and creative strategy, brand strategy, and custom CRM systems under one accountable team.",
    },
    {
      question: "Where do we start?",
      answer:
        "Every engagement starts with a free growth audit of your website, tracking, ads, creative and search visibility. You get a written review in five working days.",
    },
  ],
  finalCta: {
    title: "Make your mark in the digital world.",
    body: "Book a call, or start with a free growth audit. No commitment, just clarity on your next move.",
  },
};