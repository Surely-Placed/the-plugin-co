export const aboutPage = {
  title: "About The Plugin, Built by People Who Have Been There",
  subtitle: "Two missions. One standard. Zero generic advice.",
  story: [
    "The Plugin exists because two problems kept repeating themselves, and both had the same root cause: a gap between talented people and the systems that help them succeed.",
    "On the business side: too many companies with real potential were spending money on marketing without a coherent strategy. Relying on agencies that sent monthly reports instead of driving monthly results. Falling behind competitors who had invested in proper growth systems.",
    "On the careers side: too many international graduates. Brilliant, hardworking, and degree-qualified. Were invisible in the UK job market because nobody had taught them how the system worked. Graduate schemes, ATS filters, assessment centres, visa-eligible employers. A whole hidden playbook that domestic candidates often pick up by osmosis.",
    "We built The Plugin to close both gaps. The same obsession with data and specificity runs through both divisions. The same refusal to offer generic solutions. The same commitment to being a genuine partner. Not a vendor.",
  ],
  values: [
    {
      num: "01",
      title: "Specificity",
      description:
        "Generic advice is everywhere and it is useless. We build specific strategies for specific situations.",
    },
    {
      num: "02",
      title: "Transparency",
      description:
        "No black boxes. Real-time reporting, honest conversations, and clear metrics on both sides.",
    },
    {
      num: "03",
      title: "Relentlessness",
      description:
        "We don't stop when things get hard. Growth and job searches are rarely straight lines.",
    },
    {
      num: "04",
      title: "Data-first",
      description:
        "Every decision. For businesses and for job seekers. Is based on evidence, not gut feeling.",
    },
    {
      num: "05",
      title: "Empathy",
      description:
        "We have been in our clients' positions. We do not judge starting points. We work with them.",
    },
  ],
  dualOrigin: {
    title: "Dual-Division Origin",
    growth: {
      title: "For Businesses",
      body: "Founded by digital marketers who saw the gap between what agencies promised and what they delivered. Built on sprint methodology, obsessive measurement, and a belief that marketing should be held accountable to revenue outcomes. Not vanity metrics.",
    },
    careers: {
      title: "For Talent",
      body: "Founded by international graduates who navigated the UK job market the hard way. And built the coaching service they wish had existed. Powered by the same methodology behind Surely Placed, which has placed 300+ graduates in US tech roles.",
    },
  },
} as const;

export const aboutStory = aboutPage.story;

export const philosophyCards = aboutPage.values;

export const companyStats = [
  { value: "50+", label: "Businesses grown" },
  { value: "300+", label: "Graduates placed" },
  { value: "40+", label: "Nationalities served" },
  { value: "24/7", label: "Global operations" },
  { value: "100%", label: "Transparency" },
] as const;

export const whyDifferent = [
  {
    title: "Dual expertise",
    description: "Growth systems and career systems under one brand, one standard.",
  },
  {
    title: "Data-first",
    description: "Evidence over opinions. For marketing spend and job search strategy.",
  },
  {
    title: "Founder-led",
    description: "Direct access to decision-makers on both sides of the business.",
  },
  {
    title: "Dual-market expertise",
    description: "Global growth systems for businesses. UK-specialist career coaching for international graduates.",
  },
  {
    title: "Partner, not vendor",
    description: "We integrate into your world instead of creating dependency.",
  },
] as const;
