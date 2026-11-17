export interface DesignHero {
  eyebrow: string;
  title: string;
  lead: string;
  inShort: string;
  image?: string;
}

export interface DesignServicePage {
  seoTitle: string;
  breadcrumbLabel: string;
  hero: DesignHero;
  problem: { title: string; paragraphs: string[] };
  deliver: { title: string; items: { title: string; body: string }[] };
  process: {
    title: string;
    steps: { num: string; eyebrow?: string; title: string; body: string }[];
  };
  who: { title: string; bullets: string[] };
  faq: { question: string; answer: string }[];
  finalCta: { title: string; body: string };
}

export interface DesignSectionBlock {
  title: string;
  paragraphs: string[];
  bullets: string[];
  cards: { eyebrow: string; title: string; body: string }[];
}

export interface DesignMarketingPage {
  seoTitle: string;
  hero: DesignHero;
  sections: Record<string, DesignSectionBlock>;
  faq: { question: string; answer: string }[];
  finalCta: { title: string; body: string };
}