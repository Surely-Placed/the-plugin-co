export const blogFilters = [
  "All",
  "For Businesses",
  "For Talent",
  "AI & Automation",
  "Graduate Schemes",
  "SEO & Content",
  "UK Job Market",
  "Visa Strategy",
] as const;

export type BlogFilter = (typeof blogFilters)[number];
export type BlogDivision = "growth" | "careers";

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  division: BlogDivision;
  topics: string[];
  keyword: string;
  date: string;
  readingTime: string;
  excerpt: string;
  featured?: boolean;
  content: { heading?: string; paragraphs: string[] }[];
  tableOfContents: { id: string; title: string }[];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function makePost(
  title: string,
  division: BlogDivision,
  topics: string[],
  keyword: string,
  excerpt: string,
  sections: { heading: string; paragraphs: string[] }[],
  opts?: { featured?: boolean; date?: string }
): BlogPost {
  const slug = slugify(title);
  return {
    slug,
    title,
    author: "The Plugin Team",
    division,
    topics,
    keyword,
    date: opts?.date ?? "2026-06-01",
    readingTime: "10 min",
    excerpt,
    featured: opts?.featured,
    tableOfContents: sections.map((s) => ({
      id: slugify(s.heading),
      title: s.heading,
    })),
    content: sections,
  };
}

const growthArticles = [
  makePost(
    "How to Build an AI Content Workflow for Your Business (2026)",
    "growth",
    ["AI & Automation", "SEO & Content"],
    "AI content workflow for business",
    "A practical framework for businesses to produce on-brand content at scale. Without sacrificing quality or compliance.",
    [
      {
        heading: "Why workflows beat tools",
        paragraphs: [
          "Buying another AI subscription does not fix content chaos. A workflow does. Mapping brief, draft, edit, approve, and publish with clear owners at each step.",
          "Businesses need workflows that respect brand voice, applicable privacy requirements, and the reality of small marketing teams.",
        ],
      },
      {
        heading: "The 5-step pipeline",
        paragraphs: [
          "Start with a content brief template tied to search intent and funnel stage. Use AI for first drafts, humans for editing and fact-checking.",
          "Automate distribution: one pillar article becomes email snippets, LinkedIn posts, and ad copy variants.",
        ],
      },
    ],
    { featured: true, date: "2026-06-10" }
  ),
  makePost(
    "Performance Marketing in 2026: What's Actually Working",
    "growth",
    ["For Businesses"],
    "performance marketing strategies 2026",
    "Paid media is more expensive and more competitive. Here is what is still driving ROAS for SMEs and scale-ups.",
    [
      {
        heading: "Channel mix in 2026",
        paragraphs: [
          "Google Search still captures high intent. But creative and landing page quality matter more than bid tweaks alone.",
          "Meta prospecting works when offers are clear and creative refreshes are systematic, not sporadic.",
        ],
      },
    ]
  ),
  makePost(
    "AEO vs SEO: How to Get Your Brand Cited by AI Search in 2026",
    "growth",
    ["AI & Automation", "SEO & Content"],
    "answer engine optimisation 2026",
    "Answer Engine Optimisation is the next layer on top of SEO. Here is how brands get cited in ChatGPT and Google AI Overviews.",
    [
      {
        heading: "What AEO means",
        paragraphs: [
          "AEO is about structuring content so AI systems can extract, cite, and recommend your brand as an authoritative answer.",
          "It complements SEO. You still need technical health and backlinks, but you also need clear, quotable definitions and structured data.",
        ],
      },
    ]
  ),
  makePost(
    "Why Your Google Ads Are Wasting Money (And How to Fix It)",
    "growth",
    ["For Businesses"],
    "Google Ads optimisation for small businesses",
    "The five leaks we see in almost every Google Ads audit. And the fixes that recover budget fast.",
    [
      {
        heading: "Common leaks",
        paragraphs: [
          "Broad match without negatives. Landing pages that do not match ad copy. Conversion tracking that double-counts or misses key events.",
          "Fix message match first. It is the highest-ROI change most accounts skip.",
        ],
      },
    ]
  ),
  makePost(
    "How to Build a LinkedIn Strategy That Generates B2B Leads",
    "growth",
    ["For Businesses", "SEO & Content"],
    "LinkedIn B2B lead generation",
    "LinkedIn is not a posting schedule problem. It is a positioning and distribution problem. Here is the B2B playbook.",
    [
      {
        heading: "Founder-led demand",
        paragraphs: [
          "B2B buyers trust people before brands. Founder and leadership content outperforms corporate pages for pipeline creation.",
          "Pair organic thought leadership with targeted LinkedIn Ads for account-based campaigns.",
        ],
      },
    ]
  ),
  makePost(
    "The Complete Guide to Marketing Attribution for SMEs",
    "growth",
    ["For Businesses"],
    "marketing attribution models 2026",
    "Most SMEs cannot answer which channel drove revenue. This guide covers practical attribution without enterprise complexity.",
    [
      {
        heading: "Start simple",
        paragraphs: [
          "UTM discipline, CRM source fields, and a single dashboard beat over-engineered multi-touch models for teams under 20 people.",
          "Review weekly: which campaigns influenced pipeline, not just clicks.",
        ],
      },
    ]
  ),
  makePost(
    "Agency vs. In-House: What Businesses Get Wrong",
    "growth",
    ["For Businesses"],
    "marketing agency vs in-house",
    "The agency vs in-house debate misses the point. What businesses need is accountable execution. However it is structured.",
    [
      {
        heading: "The hybrid model",
        paragraphs: [
          "In-house owns strategy and brand. Agencies or embedded partners own sprint execution and specialist channels.",
          "The failure mode is outsourcing thinking. Not outsourcing doing.",
        ],
      },
    ]
  ),
  makePost(
    "10 AI Tools That Save Marketing Teams 10+ Hours Per Week",
    "growth",
    ["AI & Automation"],
    "AI tools for marketing teams 2026",
    "Ten AI tools marketing teams are using in 2026 to automate reporting, repurposing, and campaign analysis.",
    [
      {
        heading: "Categories that matter",
        paragraphs: [
          "Content repurposing, ad creative iteration, reporting automation, and CRM enrichment deliver the fastest time savings.",
          "Pick one workflow to automate fully before adding more tools.",
        ],
      },
    ]
  ),
  makePost(
    "How to Run a Growth Audit on Your Own Business (Free Template)",
    "growth",
    ["For Businesses"],
    "business growth audit template",
    "A 50-point self-assessment covering ads, SEO, website, analytics, and content. Free template included.",
    [
      {
        heading: "The audit framework",
        paragraphs: [
          "Score each area 1–5: acquisition, conversion, retention, and operations. The lowest score is your starting point.",
          "Download our Free Growth Audit Template from the Resource Hub to work through it systematically.",
        ],
      },
    ]
  ),
  makePost(
    "Data Intelligence for SMEs: Turning Numbers Into Decisions",
    "growth",
    ["For Businesses", "AI & Automation"],
    "data intelligence for SME marketing",
    "SMEs collect more data than ever but make fewer clear decisions. Here is how to build intelligence, not just dashboards.",
    [
      {
        heading: "Insight over charts",
        paragraphs: [
          "A dashboard without a weekly review ritual is decoration. Pair KPIs with anomaly thresholds and named owners.",
          "Connect ad platforms, GA4, and CRM before building anything custom.",
        ],
      },
    ]
  ),
];

const careersArticles = [
  makePost(
    "The Complete Guide to UK Graduate Schemes 2026 (International Students)",
    "careers",
    ["Graduate Schemes", "UK Job Market"],
    "UK graduate schemes international students 2026",
    "Everything international students need to know about UK graduate schemes. Deadlines, stages, and visa considerations.",
    [
      {
        heading: "The graduate scheme calendar",
        paragraphs: [
          "Most UK graduate schemes open August–November for the following year's intake. Missing this window is the most common mistake international students make.",
          "Build a sector-specific shortlist early. Finance, consulting, tech, and engineering run on different timelines.",
        ],
      },
    ],
    { date: "2026-06-08" }
  ),
  makePost(
    "Graduate Route Visa vs Skilled Worker Visa: Which Path Is Right for You?",
    "careers",
    ["Visa Strategy", "UK Job Market"],
    "Graduate Route vs Skilled Worker Visa UK",
    "A clear comparison of the Graduate Route and Skilled Worker Visa. And how to plan your job search around each.",
    [
      {
        heading: "Graduate Route",
        paragraphs: [
          "The Graduate Route gives eligible graduates time to work in the UK without employer sponsorship after completing a UK degree.",
          "Use this period to gain UK experience and target sponsors before your visa expires.",
        ],
      },
      {
        heading: "Skilled Worker",
        paragraphs: [
          "From 2026, the minimum salary threshold for Skilled Worker sponsorship is £41,700. Factor this into your target role strategy.",
          "Prioritise employers on the official Home Office sponsor register who have sponsored in the last 12 months.",
        ],
      },
    ]
  ),
  makePost(
    "How to Write a UK CV in 2026: Format, Examples & ATS Tips",
    "careers",
    ["UK Job Market"],
    "UK CV format 2026",
    "UK CV rules are different from most countries. Two pages, no photo, ATS-friendly formatting. Here is the complete guide.",
    [
      {
        heading: "UK format essentials",
        paragraphs: [
          "No photo, no date of birth, no marital status. Reverse chronological structure with quantified achievements.",
          "Tailor keywords to each job description, ATS systems filter before humans read.",
        ],
      },
    ]
  ),
  makePost(
    "50 UK Employers Who Sponsor Skilled Worker Visas in 2026",
    "careers",
    ["Visa Strategy", "UK Job Market"],
    "UK Skilled Worker Visa sponsors 2026",
    "A curated starting list of UK employers actively sponsoring international graduates. Updated for 2026.",
    [
      {
        heading: "How to use the sponsor register",
        paragraphs: [
          "The official UK Home Office sponsor register is the source of truth. But it is hard to navigate alone.",
          "We maintain a curated 2026 edition PDF in our Resource Hub with employers who have sponsored recently.",
        ],
      },
    ]
  ),
  makePost(
    "How to Pass a UK Assessment Centre: The Complete Guide",
    "careers",
    ["Graduate Schemes", "UK Job Market"],
    "UK assessment centre tips international graduate",
    "Group exercises, presentations, in-tray tasks, and partner interviews. Demystified for international graduates.",
    [
      {
        heading: "What assessors look for",
        paragraphs: [
          "Collaboration beats dominance in group exercises. Structure beats speed in case presentations.",
          "Mock assessment centres are the highest-ROI prep you can do before the real thing.",
        ],
      },
    ]
  ),
  makePost(
    "UK Job Search: Why You're Getting Rejected (And How to Fix It)",
    "careers",
    ["UK Job Market"],
    "UK job search rejection reasons international student",
    "The five most common reasons international graduates get rejected. And the fixes that create momentum fast.",
    [
      {
        heading: "Common blockers",
        paragraphs: [
          "Applying to non-sponsor employers. CV format that fails ATS. Volume without strategy. No UK network. Missing graduate scheme windows.",
          "Fix foundations first, CV, LinkedIn, and target employer list. Before increasing application volume.",
        ],
      },
    ]
  ),
  makePost(
    "How to Use LinkedIn to Get a UK Job as an International Graduate",
    "careers",
    ["UK Job Market"],
    "LinkedIn UK job search international graduate",
    "LinkedIn is the primary recruiter channel in the UK. Here is how international graduates use it to get found and referred.",
    [
      {
        heading: "Profile optimisation",
        paragraphs: [
          "Headline, About section, and experience must be written for UK recruiters. Not copied from a home-country format.",
          "Outbound outreach with personalised templates beats passive applying alone.",
        ],
      },
    ]
  ),
  makePost(
    "Goldman Sachs, McKinsey, Deloitte: What They're Actually Looking For",
    "careers",
    ["Graduate Schemes"],
    "UK top graduate employer requirements",
    "Insider intelligence on what top UK graduate employers assess at each stage. And how to prepare.",
    [
      {
        heading: "Consulting and finance",
        paragraphs: [
          "Commercial awareness, structured thinking, and competency evidence matter more than degree prestige alone.",
          "Case study practice and STAR-method answers are non-negotiable for McKinsey, BCG, and Bain.",
        ],
      },
    ]
  ),
  makePost(
    "The STAR Method Explained: UK Competency Interview Guide With Examples",
    "careers",
    ["UK Job Market", "Graduate Schemes"],
    "STAR method UK interview examples",
    "The STAR method is the framework behind most UK competency interviews. Here is how to use it with real examples.",
    [
      {
        heading: "STAR structure",
        paragraphs: [
          "Situation, Task, Action, Result. Keep answers under two minutes with quantified outcomes where possible.",
          "Download our STAR Answer Bank PDF with 20 pre-built competency answers for UK interviews.",
        ],
      },
    ]
  ),
  makePost(
    "How to Build a Professional Network in the UK When You Know Nobody",
    "careers",
    ["UK Job Market"],
    "UK professional networking tips international graduate",
    "Practical networking tactics for international graduates starting from zero UK connections.",
    [
      {
        heading: "Start warm",
        paragraphs: [
          "Alumni networks, university careers events, and LinkedIn informational interviews create momentum without cold spam.",
          "One genuine conversation per week compounds faster than 50 blind applications.",
        ],
      },
    ]
  ),
];

export const blogPosts: BlogPost[] = [...growthArticles, ...careersArticles];

export const POSTS_PER_PAGE = 10;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function filterBlogPosts(filter: BlogFilter): BlogPost[] {
  if (filter === "All") return blogPosts;
  if (filter === "For Businesses") return blogPosts.filter((p) => p.division === "growth");
  if (filter === "For Talent") return blogPosts.filter((p) => p.division === "careers");
  return blogPosts.filter((p) => p.topics.includes(filter));
}
