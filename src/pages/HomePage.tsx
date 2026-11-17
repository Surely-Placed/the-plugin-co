import { Link } from "react-router-dom";
import { PageSEO } from "../components/seo/PageSEO";
import { TpBookCallLink, TpAuditLink } from "../components/design/TpButtons";
import { TpFaq } from "../components/design/TpFaq";
import { TpFinalCta } from "../components/design/TpFinalCta";
import { TpInShort } from "../components/design/TpInShort";
import { PluginCubeHero } from "../components/effects/plugin-cube/PluginCubeHero";
import { pageHome } from "../lib/design/pages/page-home";
import { serviceRows } from "../lib/design/growth-services-page";
import { serviceDetailHref } from "../lib/design/navigation";
import { growthRoutes } from "../lib/design/routes";
import { staticPageSEO } from "../lib/seo";

export function HomePage() {
  const seo = staticPageSEO["/"] ?? {
    title: pageHome.seoTitle,
    description: pageHome.hero.lead,
  };
  const markets = pageHome.sections.Markets?.bullets ?? [];

  return (
    <>
      <PageSEO {...seo} path="/" title={pageHome.seoTitle} description={pageHome.hero.lead} />

      <section className="tp-hero">
        <div className="tp-container tp-hero__grid">
          <div className="flex min-w-0 flex-col gap-5">
            <p className="tp-eyebrow">{pageHome.hero.eyebrow}</p>
            <h1 className="tp-heading-hero text-balance">{pageHome.hero.title}</h1>
            <p className="max-w-[560px] font-mono text-sm leading-relaxed text-tp-muted-strong md:text-[15px]">
              {pageHome.hero.lead}
            </p>
            <TpInShort label="IN SHORT">{pageHome.hero.inShort}</TpInShort>
            <div className="flex flex-wrap gap-3">
              <TpBookCallLink cta="hero-book" />
              <TpAuditLink href={growthRoutes.audit} cta="hero-audit" />
            </div>
          </div>
          <PluginCubeHero />
        </div>
      </section>

      <section className="tp-section border-t border-tp-border-subtle">
        <div className="tp-container flex flex-col gap-5">
          <p className="tp-eyebrow">7 CORE PLUGINS</p>
          <h2 className="tp-heading-section text-balance">{pageHome.sections.Plugins.title}</h2>
          <p className="m-0 max-w-2xl text-base text-tp-muted-strong">
            {pageHome.sections.Plugins.paragraphs[0]}
          </p>
          {serviceRows.map((row) => (
            <article key={row.num} className="tp-service-row">
              <div className="tp-service-row__media">
                <img src={row.image} alt={row.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                <div className="tp-service-row__media-shade" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <span className="font-mono text-[11px] tracking-[0.16em] text-tp-cyan">
                  PLUGIN {row.num} / 07
                </span>
                <h3 className="m-0 text-3xl font-extrabold text-tp-text">
                  <Link to={serviceDetailHref(row.slug)} className="hover:text-tp-cyan">
                    {row.title}
                  </Link>
                </h3>
                <p className="m-0 font-mono text-[13px] text-tp-cyan">{row.tagline}</p>
                <p className="m-0 text-base leading-relaxed text-tp-muted-strong">{row.body}</p>
              </div>
            </article>
          ))}
          <Link to={growthRoutes.services} className="self-start font-mono text-xs tracking-[0.14em] text-tp-cyan">
            VIEW ALL SERVICES →
          </Link>
        </div>
      </section>

      <section className="tp-section-compact border-t border-tp-border-subtle">
        <div className="tp-container">
          <h2 className="tp-heading-section mb-6">{pageHome.sections.Markets.title}</h2>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <li key={m} className="tp-card py-5 text-center text-lg font-bold text-tp-text">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {pageHome.faq.length > 0 ? <TpFaq title="FAQ" items={pageHome.faq} /> : null}
      <TpFinalCta title={pageHome.finalCta.title} body={pageHome.finalCta.body} />
    </>
  );
}