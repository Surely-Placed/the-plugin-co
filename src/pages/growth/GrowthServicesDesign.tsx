import { Link } from "react-router-dom";
import { PageSEO } from "../../components/seo/PageSEO";
import { TpBreadcrumbs } from "../../components/design/TpBreadcrumbs";
import { TpInShort } from "../../components/design/TpInShort";
import { TpBookCallLink, TpAuditLink } from "../../components/design/TpButtons";
import { TpFaq } from "../../components/design/TpFaq";
import { TpFinalCta } from "../../components/design/TpFinalCta";
import {
  finalCta,
  serviceRows,
  serviceStacks,
  servicesFaq,
  servicesPageHero,
  supportingCards,
} from "../../lib/design/growth-services-page";
import { serviceDetailHref } from "../../lib/design/navigation";
import { divisions } from "../../lib/divisions";
import { staticPageSEO } from "../../lib/seo";

export function GrowthServicesDesign() {
  const seo = staticPageSEO[divisions.growth.routes.services] ?? {
    title: "Digital Marketing Services",
    description: servicesPageHero.inShort,
  };
  const auditHref = divisions.growth.routes.book;

  return (
    <div className="tp-page">
      <PageSEO {...seo} path={divisions.growth.routes.services} />

      <TpBreadcrumbs items={[{ label: "HOME", href: "/" }, { label: "SERVICES" }]} />

      <section className="tp-hero">
        <div className="tp-container tp-hero__grid">
          <div className="flex min-w-0 flex-col gap-5">
            <p className="tp-eyebrow">{servicesPageHero.eyebrow}</p>
            <h1 className="tp-heading-hero text-balance">{servicesPageHero.title}</h1>
            <p className="max-w-[560px] font-mono text-sm leading-relaxed text-tp-muted-strong md:text-[15px]">
              {servicesPageHero.lead}
            </p>
            <TpInShort label={servicesPageHero.inShortLabel}>{servicesPageHero.inShort}</TpInShort>
            <div className="flex flex-wrap gap-3">
              <TpBookCallLink cta="hero-book" />
              <TpAuditLink href={auditHref} cta="hero-audit" />
            </div>
          </div>
          <div className="tp-hero-media">
            <img
              src={servicesPageHero.heroImage}
              alt={servicesPageHero.heroImageAlt}
              width={1200}
              height={900}
              loading="eager"
              fetchPriority="high"
              className="tp-hero-media__img"
            />
            <div className="tp-hero-media__shade" />
            <div className="tp-hero-stats">
              {servicesPageHero.stats.map((s) => (
                <div key={s.label} className="tp-hero-stat">
                  <div className="font-mono text-[9px] tracking-[0.12em] text-tp-muted">{s.label}</div>
                  <div className="text-sm font-extrabold text-tp-text">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tp-section border-t border-tp-border-subtle">
        <div className="tp-container flex flex-col gap-5">
          {serviceRows.map((row) => (
            <article
              key={row.num}
              className={`tp-service-row ${row.reverse ? "tp-service-row--reverse" : ""}`}
            >
              <div className="tp-service-row__media">
                <img src={row.image} alt={row.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                <div className="tp-service-row__media-shade" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3.5">
                <span className="font-mono text-[11px] tracking-[0.16em] text-tp-cyan">
                  PLUGIN {row.num} / 07
                </span>
                <h2 className="m-0 text-[clamp(26px,3vw,38px)] font-extrabold leading-tight">
                  <Link to={serviceDetailHref(row.slug)} className="text-tp-text hover:text-tp-cyan">
                    {row.title}
                  </Link>
                </h2>
                <p className="m-0 font-mono text-[13px] text-tp-cyan">{row.tagline}</p>
                <p className="m-0 text-base leading-relaxed text-tp-muted-strong">{row.body}</p>
                <Link
                  to={serviceDetailHref(row.slug)}
                  className="self-start font-mono text-xs tracking-[0.14em] text-tp-cyan hover:text-tp-text"
                >
                  EXPLORE {row.title.toUpperCase()} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tp-section border-t border-tp-border-subtle tp-section--glow">
        <div className="tp-container">
          <p className="tp-eyebrow mb-4">Common stacks</p>
          <h2 className="tp-heading-section mb-10 text-balance">Plugins work better together.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceStacks.map((stack) => (
              <div key={stack.title} className="tp-card">
                <span className="font-mono text-[11px] tracking-[0.16em] text-tp-cyan">{stack.eyebrow}</span>
                <h3 className="m-0 text-2xl font-extrabold text-tp-text">{stack.title}</h3>
                <p className="m-0 text-base leading-relaxed text-tp-muted-strong">{stack.body}</p>
                <p className="m-0 text-sm leading-relaxed">
                  {stack.labels.map((label, i) => (
                    <span key={label}>
                      {i > 0 ? " · " : null}
                      <Link to={serviceDetailHref(stack.slugs[i])} className="text-tp-cyan hover:text-tp-text">
                        {label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tp-section border-t border-tp-border-subtle">
        <div className="tp-container">
          <p className="tp-eyebrow mb-4">Supporting plugins</p>
          <h2 className="tp-heading-section mb-10 text-balance">Add these when the system needs them.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportingCards.map((c) => (
              <div key={c.num} className="tp-card tp-card--hover">
                <span className="font-mono text-[11px] tracking-[0.16em] text-tp-cyan">{c.num}</span>
                <h3 className="m-0 text-[21px] font-bold leading-snug text-tp-text">{c.title}</h3>
                <p className="m-0 text-base leading-relaxed text-tp-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TpFaq title="Services, answered." items={servicesFaq} />
      <TpFinalCta title={finalCta.title} body={finalCta.body} />
    </div>
  );
}