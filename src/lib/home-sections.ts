/** Home page copy aligned to Canva section flow */

export const painPointIntro = {
  line1: "Digital marketing doesn't have to be difficult.",
  line2: "We're here to help.",
} as const;

export const painPointCards = [
  {
    title: "Getting lost in the digital maze?",
    body: "At The Plugin, we don't just offer a clear roadmap. We navigate strategy, marketing, and technology alongside your team.",
  },
  {
    title: "Frustrated with cut-and-paste models?",
    body: "Every business is different. We build tailor-made growth systems for your company and its evolving needs.",
  },
  {
    title: "Feeling like you're left in the dark?",
    body: "We work with complete transparency. Real-time reporting, intuitive dashboards, and a dedicated team.",
  },
] as const;

export const growPresence = {
  title: "Grow your presence.",
  body: "We'll help put your company on the digital map, through websites, campaigns, and social platforms.",
} as const;

export const whatWeOffer = {
  title: "What we offer",
  pills: [
    "Data-driven strategies",
    "Monitoring dashboards",
    "Dedicated teams",
  ] as const,
} as const;

export const packagesSection = {
  title: "Our packages",
  subtitle:
    "Choose the level of support that fits. From foundation to full-stack growth execution.",
  tiers: [
    {
      label: "Foundation",
      items: [
        "Discovery & growth audit",
        "Strategy roadmap",
        "Basic performance dashboard",
      ],
    },
    {
      label: "Solution",
      items: [
        "Targeted service deployment",
        "Campaign & channel setup",
        "Monthly optimization sprints",
      ],
    },
    {
      label: "Full stack",
      items: [
        "End-to-end execution",
        "Marketing + dev + automation",
        "Dedicated growth team",
      ],
    },
  ] as const,
} as const;

export const customerTestimonials = [
  {
    quote:
      "Their creativity, attention to detail, and ability to bring our vision to life made us feel like we finally had a partner who got it.",
    name: "Leslie Boatwright, CEO",
    company: "Hillstreet Industries",
  },
  {
    quote:
      "The team at The Plugin took our scattered ideas and turned them into a polished, cohesive growth system.",
    name: "Carly Ferris, Founder",
    company: "Vivarily",
  },
  {
    quote:
      "I've worked with other agencies before, but The Plugin delivered fresh, creative concepts that blew us away.",
    name: "Gabriel Shelby, Owner",
    company: "Stipple Unlimited",
  },
  {
    quote:
      "The Plugin became an extension of our team. Not a vendor, a true growth partner from day one.",
    name: "Marcus Chen, Founder",
    company: "Northline SaaS",
  },
  {
    quote:
      "Best investment we made all year. ROAS improved within the first 60 days of launch.",
    name: "Priya Sharma, Owner",
    company: "Verde Home Co.",
  },
  {
    quote:
      "They move faster than anyone we've worked with. Strategy on Monday, live campaigns by Friday.",
    name: "Jordan Ellis, CEO",
    company: "Atlas Startup Labs",
  },
  {
    quote:
      "Our lead volume doubled after replatforming and restructuring our ad funnel with The Plugin.",
    name: "Daniel Reyes, Founder",
    company: "Summit Realty Group",
  },
  {
    quote:
      "Transparent, reliable, effective. No black boxes, just clear metrics and honest recommendations.",
    name: "Aisha Khan, Marketing Director",
    company: "Brightpath Agency",
  },
  {
    quote:
      "They execute without excuses. Every sprint delivers something measurable we can show leadership.",
    name: "Tom Whitfield, COO",
    company: "Forge Industrial",
  },
] as const;

export const finalCta = {
  title: "Make your mark in the digital world",
} as const;

export const footerContact = {
  title: "Questions?",
  lines: ["grow@theplugin.world", brandPlaceholder()],
} as const;

function brandPlaceholder() {
  return "Book a free consultation. We'll respond within 24 hours.";
}
