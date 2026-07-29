import { brand } from "../../lib/brand";
import { siteConfig } from "../../lib/config";
import { buildCanonical } from "../../lib/seo";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: buildCanonical("/"),
    logo: `${siteConfig.url}${brand.logo}`,
    email: brand.email,
    description: brand.tagline,
    sameAs: [
      brand.social.linkedin,
      brand.social.instagram,
      brand.social.twitter,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: buildCanonical("/"),
    description: brand.tagline,
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: `${siteConfig.url}${brand.logo}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: buildCanonical("/"),
      logo: `${siteConfig.url}${brand.logo}`,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: name,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
}

export function ArticleJsonLd({
  title,
  description,
  datePublished,
  author,
  url,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${brand.logo}` },
    },
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FAQJsonLdProps {
  items: { question: string; answer: string }[];
}

export function FAQJsonLd({ items }: FAQJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
