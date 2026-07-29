export interface SuccessStory {
  slug: string;
  name: string;
  role: string;
  headline: string;
  background: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
  thumbnailGradient: string;
  strategy: string[];
  execution: string[];
  results: { metric: string; label: string }[];
}

export const successStories: SuccessStory[] = [
  {
    slug: "priya-m-hsbc",
    name: "Priya M.",
    role: "Data Analyst · HSBC London",
    headline: "Data Analyst, HSBC London",
    background:
      "MSc Data Science, University of Manchester (India). 6 months of failed applications before joining The Plugin · For Talent.",
    challenge:
      "CV not passing ATS. No UK network. Applying to roles that did not sponsor visas.",
    solution:
      "Full CV and LinkedIn overhaul. Reoriented strategy toward active Skilled Worker sponsors. Interview-coached through three technical rounds.",
    result:
      "Three interviews in 8 weeks. Two offers. HSBC London at £42,000 with Skilled Worker Visa sponsored.",
    metric: "8 weeks",
    metricLabel: "To First Interviews",
    thumbnailGradient: "from-accent to-accent-blue",
    strategy: [
      "Audited CV against ATS requirements for finance and data roles",
      "Built target employer list from Home Office sponsor register",
      "Mapped application cadence to high-probability roles only",
    ],
    execution: [
      "Rewrote CV to UK format with quantified achievements",
      "Overhauled LinkedIn for recruiter discoverability",
      "Ran three mock technical interview sessions with written feedback",
    ],
    results: [
      { metric: "3", label: "Interviews in 8 Weeks" },
      { metric: "2", label: "Job Offers" },
      { metric: "£42k", label: "HSBC London Offer" },
    ],
  },
  {
    slug: "ahmed-k-mckinsey",
    name: "Ahmed K.",
    role: "Business Analyst · McKinsey & Company",
    headline: "Business Analyst, McKinsey & Company",
    background:
      "MBA, Imperial College London (Jordan). 3 months remaining on Graduate Route Visa.",
    challenge:
      "Racing against visa expiry. No consulting experience. Zero case study practice.",
    solution:
      "Consulting CV rewrite. 6 case study sessions in 3 weeks. McKinsey-specific PEI and case coaching.",
    result:
      "Offer from McKinsey in 10 weeks. Skilled Worker Visa sponsored. Started within Graduate Route period.",
    metric: "10 weeks",
    metricLabel: "To McKinsey Offer",
    thumbnailGradient: "from-accent-blue to-accent-highlight",
    strategy: [
      "Prioritised consulting firms with active Skilled Worker sponsorship",
      "Built intensive case study practice schedule around visa deadline",
      "Aligned CV narrative to consulting competency frameworks",
    ],
    execution: [
      "Delivered consulting-format CV and cover letter suite",
      "Ran 6 case study coaching sessions in 3 weeks",
      "Mock PEI and partner interview preparation",
    ],
    results: [
      { metric: "10 wks", label: "To Offer" },
      { metric: "6", label: "Case Study Sessions" },
      { metric: "✓", label: "Skilled Worker Sponsored" },
    ],
  },
  {
    slug: "jin-l-deloitte",
    name: "Jin L.",
    role: "Technology Analyst · Deloitte UK",
    headline: "Technology Analyst, Deloitte UK Graduate Scheme",
    background:
      "BSc Computer Science, University of Edinburgh (China). Final year student.",
    challenge:
      "Missed two graduate scheme deadlines. Did not understand assessment centre format.",
    solution:
      "Full graduate scheme calendar. 4 mock assessment centres. End-to-end Deloitte process coaching.",
    result:
      "Deloitte Technology Graduate Scheme. £32,000 + £3,000 joining bonus. Graduate Route Visa.",
    metric: "Deloitte",
    metricLabel: "Graduate Scheme Offer",
    thumbnailGradient: "from-accent-blue to-accent-highlight",
    strategy: [
      "Mapped full graduate scheme calendar for technology sector",
      "Identified Deloitte as primary target with backup programmes",
      "Designed assessment centre prep schedule from scratch",
    ],
    execution: [
      "Built custom application timeline with deadline alerts",
      "Ran 4 full mock assessment centres with written debriefs",
      "Coached through Deloitte online tests and video interviews",
    ],
    results: [
      { metric: "£32k", label: "Graduate Salary" },
      { metric: "£3k", label: "Joining Bonus" },
      { metric: "✓", label: "Graduate Route Visa" },
    ],
  },
];

export function getSuccessStory(slug: string): SuccessStory | undefined {
  return successStories.find((s) => s.slug === slug);
}
