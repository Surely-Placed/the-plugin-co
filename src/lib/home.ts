import { divisions } from "./divisions";

export const parentHome = {
  hero: {
    eyebrow: "The Plugin · Digital Solutions Agency",
    title: ["Plug In.", "Grow your business. Get hired."],
    subtitle:
      "The Plugin builds marketing systems for ambitious businesses worldwide and career systems for international graduates in the UK. Under one roof, to one standard.",
    trustBar: [
      "50+ businesses grown",
      "300+ graduates placed",
      "One platform. Global business growth. UK talent coaching.",
      "Visa-friendly employer network",
    ],
  },
  divisionSection: {
    title: "Two ways to plug\u00A0in.",
  },
  divisionCards: [
    {
      division: "growth" as const,
      title: "The Plugin · For Businesses",
      tagline: "For businesses that want to dominate their market.",
      audience: "For Businesses",
      description:
        "We build performance marketing campaigns, SEO engines, AI automation systems, content workflows, and data intelligence dashboards. We become your embedded growth team. Faster, smarter, and more accountable than a traditional agency.",
      services: [
        "Performance Marketing",
        "SEO & Content",
        "Social Media",
        "Web Dev",
        "Branding",
        "AI Workflows",
        "Data Intelligence",
        "Content Systems",
      ],
      href: divisions.growth.routes.landing,
      cta: "Explore Business Services →",
    },
    {
      division: "careers" as const,
      title: "The Plugin · For Talent",
      tagline: "For international graduates building a career in the UK.",
      audience: "For Talent",
      description:
        "We give international talent the CV, strategy, interview coaching, and connections they need to land UK roles. With visa support built in from day one. We are the unfair advantage you didn't know you were allowed to have.",
      services: [
        "CV & LinkedIn",
        "Graduate Schemes",
        "Interview Coaching",
        "Job Search Strategy",
        "Networking & Referrals",
        "Visa Guidance",
        "1:1 Mentorship",
      ],
      href: divisions.careers.routes.landing,
      cta: "Explore Talent Services →",
    },
  ],
  stats: [
    { value: "50+", label: "Businesses grown" },
    { value: "300+", label: "Graduates placed in UK roles" },
    { value: "60 days", label: "Avg. ROAS improvement (For Businesses)" },
    { value: "90 days", label: "Avg. to first interview (For Talent)" },
  ],
  testimonialsTitle: "Don't take our word for it.",
  testimonials: [
    {
      quote:
        "Their creativity, attention to detail, and ability to bring our vision to life made us feel like we finally had a partner who got it.",
      name: "Leslie Boatwright",
      role: "CEO · Hillstreet Industries",
      division: "growth" as const,
    },
    {
      quote:
        "Before The Plugin, I'd been applying for 6 months and heard nothing. In 8 weeks I had three interviews and two offers. The strategy they gave me was genuinely game-changing.",
      name: "Priya M.",
      role: "MSc Data Science, University of Manchester → HSBC London",
      division: "careers" as const,
    },
    {
      quote:
        "They move faster than anyone we've worked with. Strategy on Monday, live campaigns by Friday.",
      name: "Jordan Ellis",
      role: "CEO · Atlas Startup Labs",
      division: "growth" as const,
    },
    {
      quote:
        "The Plugin understood things about the UK job market that my university career service had never mentioned.",
      name: "Sofia R.",
      role: "LLM, UCL → Trainee Solicitor, Clifford Chance",
      division: "careers" as const,
    },
  ],
  ctaBanner: {
    title: "One brand. Two ways to plug in.",
    subtitle:
      "Whether you're a business ready to grow or a graduate ready to launch your career, The Plugin has the system, the team, and the track record.",
  },
} as const;
