export const brand = {
  name: "The Plugin",
  tagline: "Plug In. Grow.",
  email: "grow@theplugin.world",
  logo: "/the-plugin-logo.png",
  logoIcon: "/logo-icon.png",
  calendlyUrl: "https://calendar.app.google/YnhGuG8LxzMBsAEeA",
  cta: {
    label: "Book a Free Consultation",
    labelShort: "Book",
    defaultSubtitle: "Book a free consultation and we'll map your next step.",
    blockTitle: "Ready to Plug In?",
  },
  social: {
    linkedin: "https://linkedin.com/company/theplugincorp",
    instagram: "https://www.instagram.com/theplugin.world/",
    twitter: "https://x.com/theplugincorp",
  },
} as const;

export const navLinks = [
  { label: "For Businesses", href: "/for-businesses" },
  { label: "For Talent", href: "/for-talent" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const benefits = [
  {
    num: "01",
    title: "Plug & Play Growth",
    description: "No rebuilding. No disruption. No learning curve. Just growth.",
  },
  {
    num: "02",
    title: "Full Stack Solution",
    description: "Marketing. Development. AI. Branding. Everything under one roof.",
  },
  {
    num: "03",
    title: "Data Driven Decisions",
    description: "Every action measured. Every improvement tracked. Every result visible.",
  },
  {
    num: "04",
    title: "Built for Speed",
    description: "Fast execution. Fast communication. Fast iteration. Fast growth.",
  },
] as const;

export const services = [
  {
    title: "Performance Marketing",
    description: "Turn ad spend into predictable revenue.",
    slug: "performance-marketing",
  },
  {
    title: "SEO & Content",
    description: "Get discovered by people actively searching.",
    slug: "seo-content",
  },
  {
    title: "Social Media",
    description: "Build a community that sells.",
    slug: "social-media",
  },
  {
    title: "Web Development",
    description: "Your website should sell while you sleep.",
    slug: "web-development",
  },
  {
    title: "Branding & Design",
    description: "Become impossible to ignore.",
    slug: "branding-design",
  },
  {
    title: "AI Workflows",
    description: "Work smarter. Scale faster.",
    slug: "ai-workflows",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understand business. Identify bottlenecks. Define growth goals.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Build custom growth plan.",
  },
  {
    step: "03",
    title: "Execution",
    description: "Deploy systems. Launch campaigns. Implement automation.",
  },
  {
    step: "04",
    title: "Analysis",
    description: "Track everything. Provide visibility.",
  },
  {
    step: "05",
    title: "Optimization",
    description: "Continuous improvement. Continuous growth.",
  },
] as const;

export const testimonials = [
  { role: "SaaS Founder", quote: "The Plugin became an extension of our team." },
  { role: "E-Commerce Owner", quote: "Best investment we made all year." },
  { role: "Startup CEO", quote: "They move faster than anyone we've worked with." },
  { role: "Real Estate Founder", quote: "Our lead volume doubled." },
  { role: "Agency Owner", quote: "Transparent. Reliable. Effective." },
  { role: "Marketing Director", quote: "They execute without excuses." },
] as const;

export const featuredProjects = [
  { metric: "420%", label: "Organic Growth" },
  { metric: "650%", label: "ROAS" },
  { metric: "150%", label: "Lead Increase" },
  { metric: "80%", label: "Time Saved" },
] as const;

export const trustFactors = [
  { title: "AI-First.", subtitle: "Not hype-first." },
  { title: "Young Founders.", subtitle: "Deep expertise." },
  { title: "Transparent.", subtitle: "No black boxes." },
  { title: "Global.", subtitle: "24/7 operations." },
] as const;
