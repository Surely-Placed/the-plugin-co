import { PageSEO } from "../seo/PageSEO";
import { TpBreadcrumbs } from "./TpBreadcrumbs";
import { TpInShort } from "./TpInShort";
import { TpBookCallLink, TpAuditLink } from "./TpButtons";
import { TpFaq } from "./TpFaq";
import { TpFinalCta } from "./TpFinalCta";
import type { DesignMarketingPage as DesignMarketingPageData } from "../../lib/design/types";
import { growthRoutes } from "../../lib/design/routes";

type Props = {
  path: string;
  page: DesignMarketingPageData;
  breadcrumbLabel: string;
  showBreadcrumb?: boolean;
};

export function DesignMarketingPage({
  path,
  page,
  breadcrumbLabel,
  showBreadcrumb = true,
}: Props) {
  const sectionEntries = Object.entries(page.sections);

  return (
    <>
      <PageSEO
        title={page.seoTitle}
        description={page.hero.lead || page.hero.inShort}
        path={path}
      />
      {showBreadcrumb ? (
        <TpBreadcrumbs items={[{ label: "HOME", href: "/" }, { label: breadcrumbLabel }]} />
      ) : null}

      <section className="tp-hero">
        <div className={`tp-container ${page.hero.image ? "tp-hero__grid" : ""}`}>
          <div className="flex min-w-0 flex-col gap-5">
            {page.hero.eyebrow ? <p className="tp-eyebrow">{page.hero.eyebrow}</p> : null}
            <h1 className="tp-heading-hero text-balance">{page.hero.title}</h1>
            {page.hero.lead ? (
              <p className="max-w-[560px] font-mono text-sm leading-relaxed text-tp-muted-strong md:text-[15px]">
                {page.hero.lead}
              </p>
            ) : null}
            {page.hero.inShort ? <TpInShort>{page.hero.inShort}</TpInShort> : null}
            <div className="flex flex-wrap gap-3">
              <TpBookCallLink cta="hero-book" />
              <TpAuditLink href={growthRoutes.audit} cta="hero-audit" />
            </div>
          </div>
          {page.hero.image ? (
            <div className="tp-hero-media">
              <img src={page.hero.image} alt="" loading="eager" className="tp-hero-media__img" />
              <div className="tp-hero-media__shade" />
            </div>
          ) : null}
        </div>
      </section>

      {sectionEntries.map(([key, block]) => (
        <section key={key} className="tp-section border-t border-tp-border-subtle">
          <div className="tp-container">
            <h2 className="tp-heading-section mb-6">{block.title}</h2>
            {block.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mb-4 max-w-3xl text-base leading-relaxed text-tp-muted-strong">
                {p}
              </p>
            ))}
            {block.bullets.length > 0 ? (
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {block.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-2xl border border-tp-border-subtle bg-tp-surface px-4 py-3 text-tp-text"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
            {block.cards.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {block.cards.map((card) => (
                  <article key={card.title} className="tp-card">
                    {card.eyebrow ? (
                      <span className="font-mono text-[11px] tracking-[0.16em] text-tp-cyan">
                        {card.eyebrow}
                      </span>
                    ) : null}
                    <h3 className="m-0 text-xl font-extrabold text-tp-text">{card.title}</h3>
                    <p className="m-0 text-base leading-relaxed text-tp-muted-strong">{card.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {page.faq.length > 0 ? <TpFaq title="FAQ" items={page.faq} /> : null}
      <TpFinalCta title={page.finalCta.title} body={page.finalCta.body} />
    </>
  );
}