export interface LegalSubsection {
  id: string;
  title: string;
  paragraphs: string[];
  list: string[];
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  subsections: LegalSubsection[];
  list: string[];
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  sections: LegalSection[];
}
