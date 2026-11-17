import type { DesignMarketingPage } from "../types";

export const pageInsights: DesignMarketingPage = {
  "seoTitle": "Marketing Insights: Performance, AI Content & SEO | The Plugin",
  "hero": {
    "eyebrow": "INSIGHTS \u00b7 RESOURCE HUB",
    "title": "Marketing intelligence, written down.",
    "lead": "",
    "inShort": "",
    "image": ""
  },
  "sections": {
    "Articles": {
      "title": "{{ featured.title }}",
      "paragraphs": [
        "{{ featured.excerpt }}"
      ],
      "bullets": [],
      "cards": [
        {
          "eyebrow": "{{ p.meta }}",
          "title": "{{ p.title }}",
          "body": "{{ p.excerpt }}"
        }
      ]
    }
  },
  "faq": [],
  "finalCta": {
    "title": "Make your mark in the digital world.",
    "body": "Book a call, or start with a free growth audit. No commitment, just clarity on your next move."
  }
};
