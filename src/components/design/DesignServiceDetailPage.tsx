import { PageSEO } from "../seo/PageSEO";
import { TpBreadcrumbs } from "./TpBreadcrumbs";
import { TpInShort } from "./TpInShort";
import { TpBookCallLink, TpAuditLink } from "./TpButtons";
import { TpFaq } from "./TpFaq";
import { TpFinalCta } from "./TpFinalCta";
import type { DesignServicePage } from "../../lib/design/types";
import type { DesignServiceSlug } from "../../lib/design/service-slugs";
import { growthRoutes } from "../../lib/design/routes";

export function DesignServiceDetailPage({
  slug,
  page,
}: {
  slug: DesignServiceSlug;
  page: DesignServicePage;
}) {
  const path = `${growthRoutes.services}/${slug}`;

  return (
    <>
      <PageSEO title={page.seoTitle} description={page.hero.lead} path={path} />
      <TpBreadcrumbs
        items={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: growthRoutes.services },
          { label: page.breadcrumbLabel },
        ]}
      />

      <section className="tp-hero">
        <div className="tp-container tp-hero__grid">
          <div className="flex min-w-0 flex-col gap-5">
            <p className="tp-eyebrow">{page.hero.eyebrow}</p>
            <h1 className="tp-heading-hero text-balance">{page.hero.title}</h1>
            <p className="max-w-[560px] font-mono text-sm leading-relaxed text-tp-muted-strong md:text-[15px]">
              {page.hero.lead}
            </p>
            {page.hero.inShort ? <TpInShort>{page.hero.inShort}</TpInShort> : null}
            <div className="flex flex-wrap gap-3">
              <TpBookCallLink cta="hero-book" />
              <TpAuditLink href={growthRoutes.audit} cta="hero-audit" />
            </div>
          </div>
          <div className="tp-hero-media">
            <img
              src={page.hero.image}
              alt=""
              loading="eager"
              className="tp-hero-media__img"
            />
            <div className="tp-hero-media__shade" />
          </div>
        </div>
      </section>

      {page.problem.paragraphs.length > 0 ? (
        <section className="tp-section border-t border-tp-border-subtle">
          <div className="tp-container max-w-3xl">
            <h2 className="tp-heading-section mb-6">{page.problem.title}</h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-tp-muted-strong">
              {page.problem.paragraphs.map((p) => (
                <p key={p.slice(0, 32)} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.deliver.items.length > 0 ? (
        <section className="tp-section border-t border-tp-border-subtle tp-section--glow">
          <div className="tp-container flex flex-col gap-5">
            <h2 className="tp-heading-section mb-4">{page.deliver.title}</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {page.deliver.items.map((item) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-tp-border-subtle bg-tp-surface p-5"
                >
                  <span
                    aria-hidden
                    className="flex h-7 w-7 items-center justify-center rounded-lg border-[1.5px] border-tp-cyan text-sm font-black text-tp-cyan"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="m-0 text-base font-bold text-tp-text">{item.title}</p>
                    {item.body ? (
                      <p className="m-0 mt-1.5 text-[15px] leading-relaxed text-tp-muted-strong">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {page.process.steps.length > 0 ? (
        <section className="tp-section border-t border-tp-border-subtle">
          <div className="tp-container">
            <h2 className="tp-heading-section mb-8">{page.process.title}</h2>
            <div className="flex flex-col gap-5">
              {page.process.steps.map((step) => (
                <div
                  key={step.num}
                  className="grid gap-4 rounded-3xl border border-tp-border-subtle bg-[#061428] p-6 md:grid-cols-[auto_1fr] md:gap-10"
                  data-tp-keep
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-tp-cyan font-mono text-lg font-bold text-tp-cyan">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    {step.eyebrow ? (
                      <p className="tp-eyebrow mb-2 text-[12px]">{step.eyebrow}</p>
                    ) : null}
                    <h3 className="m-0 text-2xl font-extrabold text-white md:text-3xl">
                      {step.title}
                    </h3>
                    {step.body ? (
                      <p className="m-0 mt-3 max-w-2xl text-base leading-relaxed text-white/85">
                        {step.body}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.who.bullets.length > 0 ? (
        <section className="tp-section-compact border-t border-tp-border-subtle">
          <div className="tp-container">
            <h2 className="tp-heading-section mb-6">{page.who.title}</h2>
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
              {page.who.bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-2xl border border-tp-border-subtle bg-tp-surface px-4 py-3 text-tp-muted-strong"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {page.faq.length > 0 ? <TpFaq title="Answered." items={page.faq} /> : null}
      <TpFinalCta title={page.finalCta.title} body={page.finalCta.body} />
    </>
  );
}