import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { blogPosts } from "../src/lib/blog";
import { brand } from "../src/lib/brand";
import { serviceListings } from "../src/lib/services";
import { staticPageSEO } from "../src/lib/seo";
import { SITE_URL } from "../src/lib/site-url";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}

function buildCanonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "/" ? `${base}/` : `${base}${p}`;
}

const defaultOgImage = `${SITE_URL}${brand.logo}`;

function fullTitle(title: string): string {
  return title.includes(brand.name) ? title : `${title} | ${brand.name}`;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function upsertMeta(html: string, attr: "name" | "property", key: string, content: string): string {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertLink(html: string, rel: string, href: string): string {
  const re = new RegExp(`<link rel="${rel}" href="[^"]*"\\s*/?>`);
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function patchHtml(html: string, meta: RouteMeta): string {
  const title = fullTitle(meta.title);
  const canonical = buildCanonical(meta.path);
  const image = defaultOgImage;
  const type = meta.type ?? "website";

  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  out = upsertMeta(out, "name", "description", meta.description);
  out = upsertMeta(out, "name", "robots", "index, follow");
  out = upsertLink(out, "canonical", canonical);
  out = upsertMeta(out, "property", "og:title", title);
  out = upsertMeta(out, "property", "og:description", meta.description);
  out = upsertMeta(out, "property", "og:url", canonical);
  out = upsertMeta(out, "property", "og:image", image);
  out = upsertMeta(out, "property", "og:type", type);
  out = upsertMeta(out, "property", "og:site_name", brand.name);
  out = upsertMeta(out, "name", "twitter:card", "summary_large_image");
  out = upsertMeta(out, "name", "twitter:title", title);
  out = upsertMeta(out, "name", "twitter:description", meta.description);
  out = upsertMeta(out, "name", "twitter:image", image);
  return out;
}

export function collectRouteMeta(): RouteMeta[] {
  const routes: RouteMeta[] = Object.entries(staticPageSEO).map(([path, seo]) => ({
    path,
    title: seo.title,
    description: seo.description,
  }));

  for (const service of serviceListings) {
    routes.push({
      path: `/services/${service.slug}`,
      title: service.title,
      description: service.description,
    });
  }

  for (const post of blogPosts) {
    routes.push({
      path: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      type: "article",
    });
  }

  return routes;
}

export function routeMetaPlugin(): Plugin {
  return {
    name: "route-meta-static-html",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve("dist");
      const baseHtmlPath = path.join(distDir, "index.html");
      if (!fs.existsSync(baseHtmlPath)) return;

      const baseHtml = fs.readFileSync(baseHtmlPath, "utf8");
      const routes = collectRouteMeta();

      for (const route of routes) {
        const patched = patchHtml(baseHtml, route);
        const outPath =
          route.path === "/"
            ? baseHtmlPath
            : path.join(distDir, route.path.replace(/^\//, ""), "index.html");

        if (route.path !== "/") {
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
        }
        fs.writeFileSync(outPath, patched, "utf8");
      }

      console.log(`route-meta: wrote ${routes.length} static HTML shells for crawlers`);
    },
  };
}
