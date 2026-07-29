export interface CareerService {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  deliverables: string[];
}

export const careerServices: CareerService[] = [
  {
    slug: "cv-linkedin",
    title: "CV & LinkedIn Optimisation",
    tagline: "Your first impression with every UK employer.",
    intro:
      "Your CV is not just a document. It is your first impression with every UK employer. Most CVs from international graduates fail before a human ever reads them: blocked by ATS systems or dismissed in 6 seconds.",
    deliverables: [
      "Reformat to UK standards: 2 pages, no photo, clean chronological structure",
      "ATS optimisation: keyword matching to specific role and sector job descriptions",
      "Quantify achievements: e.g. 'Managed project' → 'Managed a 6-person project delivering £120k in cost savings'",
      "Tailor CVs for different sectors: finance, tech, consulting, supply chain, law, and more",
      "Personal statement crafted for UK hiring manager expectations",
      "LinkedIn: headline, About section, experience, skills. Recruiter-findability optimised",
    ],
  },
  {
    slug: "graduate-schemes",
    title: "Graduate Scheme Strategy",
    tagline: "Target the big programmes.",
    intro:
      "The UK graduate scheme season is one of the most competitive and time-sensitive hiring processes in the world. Most international students miss it entirely because nobody explained the system.",
    deliverables: [
      "Full graduate scheme calendar for your target sectors (deadlines typically August–November)",
      "Shortlist the right schemes for your degree, skills, and visa situation",
      "Prepare you for every stage: online tests, video interviews, assessment centres, partner interviews",
      "Insider intelligence on Goldman Sachs, Deloitte, Amazon, Google DeepMind, PwC, KPMG, EY, McKinsey, BCG, Barclays, HSBC, JP Morgan, Rolls-Royce, and 50+ others",
      "Custom application timeline so you never miss a deadline",
    ],
  },
  {
    slug: "interview-coaching",
    title: "Interview Coaching",
    tagline: "Win the interview.",
    intro:
      "Getting the interview is half the battle. Winning it is the other half. Our coaching is built around the exact frameworks UK employers use.",
    deliverables: [
      "Behavioural / Competency: STAR method, strength-based, values-based interviews",
      "Technical: case studies, commercial awareness, industry-specific technical rounds",
      "Video & Virtual: HireVue, recorded responses, async interview platforms",
      "Assessment Centres: group exercises, presentations, in-tray exercises, partner interviews",
      "Live mock interviews with detailed written feedback after each session",
      "Offer negotiation coaching: salary, start date, Skilled Worker Visa sponsorship",
    ],
  },
  {
    slug: "job-search-strategy",
    title: "Job Search Strategy",
    tagline: "Quality over volume.",
    intro:
      "Sending 200 applications and hoping for the best is not a strategy. We give you a targeted, evidence-based approach that creates momentum fast.",
    deliverables: [
      "Identify your highest-probability target roles, sectors, and employers",
      "Build a structured weekly application cadence. Quality over volume",
      "Identify visa-friendly employers using the official UK Home Office sponsor register",
      "Track and analyse your application data: response rates, interview conversion, time invested",
      "Adapt strategy in real time based on what the data shows",
    ],
  },
  {
    slug: "networking-referrals",
    title: "Networking & Referrals",
    tagline: "Open doors early.",
    intro:
      "In the UK job market, who you know still matters. We help you build a genuine professional network from scratch. Even if you arrived in the UK knowing nobody.",
    deliverables: [
      "LinkedIn outreach templates that actually get responses",
      "Warm introductions to our network of alumni, recruiters, and hiring managers",
      "Guidance on informational interviews and coffee chats",
      "Targeted referrals for companies actively seeking international talent",
    ],
  },
  {
    slug: "visa-guidance",
    title: "Visa Guidance (Integrated)",
    tagline: "Built into every engagement.",
    intro:
      "Visa anxiety is one of the biggest blockers for international graduates. We address it directly. Baked into every coaching engagement.",
    deliverables: [
      "Graduate Route Visa: 18 months post-study (apply by 31 Dec 2026 for 2-year duration where eligible)",
      "Skilled Worker Visa: minimum salary £41,700 from 2026. We factor this into your target role strategy",
      "Official UK Home Office sponsor register: which employers have actively sponsored in the last 12 months",
      "Realistic timeline planning: when to prioritise speed vs. quality",
      "Referrals to regulated immigration advisers when legal advice is needed",
    ],
  },
  {
    slug: "mentorship",
    title: "Ongoing 1:1 Mentorship",
    tagline: "Someone in your corner.",
    intro:
      "Weekly coaching, async support, and accountability through every stage of your search. From first application to first day on the job.",
    deliverables: [
      "Weekly 45-minute video sessions with your dedicated career coach",
      "WhatsApp / email support between sessions (Mon–Fri)",
      "Accountability check-ins and shared progress tracker",
      "Real-time feedback as you go through live application processes",
      "Post-offer support: negotiation, onboarding prep, first-90-days coaching",
    ],
  },
];

export function getCareerService(slug: string): CareerService | undefined {
  return careerServices.find((s) => s.slug === slug);
}
