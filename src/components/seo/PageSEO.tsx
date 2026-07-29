import { useEffect } from "react";
import { buildCanonical, type PageSEOProps } from "../../lib/seo";
import { siteConfig } from "../../lib/config";

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function PageSEO({
  title,
  description,
  path,
  keywords,
  ogImage,
  type = "website",
  noindex = false,
}: PageSEOProps) {
  const canonical = buildCanonical(path);
  const image = ogImage ?? siteConfig.defaultOgImage;
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("description", description);
    if (keywords?.length) setMeta("keywords", keywords.join(", "));
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");

    setLink("canonical", canonical);

    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonical, true);
    setMeta("og:image", image, true);
    setMeta("og:type", type, true);
    setMeta("og:site_name", siteConfig.name, true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [fullTitle, description, canonical, image, keywords, type, noindex]);

  return null;
}
