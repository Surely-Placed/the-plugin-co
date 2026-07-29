import { Navigate, useParams, Link } from "react-router-dom";
import { getCaseStudy } from "../lib/portfolio";
import { serviceDetails } from "../lib/services";
import { PageSEO } from "../components/seo/PageSEO";
import { Breadcrumbs } from "../components/seo/Breadcrumbs";
import { PageHero } from "../components/sections/PageHero";
import { GsapReveal } from "../components/effects/GsapReveal";
import { FadeIn, SectionHeading } from "../components/ui/Motion";
import { CTABlock } from "../components/ui/CTABlock";
import { sectionGradientClass } from "../lib/section-gradients";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  if (!study) {
    return <Navigate to="/portfolio" replace />;
  }

  const related = study.relatedServices
    .map((s) => serviceDetails[s])
    .filter(Boolean);

  return (
    <main className="text-white">
      <PageSEO
        title={`${study.name} Case Study`}
        description={study.result}
        path={`/portfolio/${study.slug}`}
        type="article"
      />
      <PageHero page="portfolio">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: study.name },
          ]}
        />
        <GsapReveal immediate effect="blur">
          <p className="label-xs mb-4">
            {study.industry} · {study.platform}
          </p>
        </GsapReveal>
        <GsapReveal immediate delay={0.08} effect="clip">
          <h1 className="heading-section text-white">{study.name}</h1>
        </GsapReveal>
        <GsapReveal immediate delay={0.14} effect="left">
          <p className="mt-6 font-mono text-4xl text-accent md:text-5xl">
            {study.metric} {study.metricLabel}
          </p>
        </GsapReveal>
      </PageHero>

      <section className={`section-padding pt-0 section-after-hero ${sectionGradientClass("rise")} text-white`}>
        <div className="container-site max-w-3xl">
          <FadeIn>
            <SectionHeading title="The Challenge." dark />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              {study.challenge}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className={`section-padding ${sectionGradientClass("slash")}`}>
        <div className="container-site">
          <FadeIn>
            <SectionHeading title="Strategy." />
          </FadeIn>
          <ul className="mt-8 max-w-3xl space-y-4">
            {study.strategy.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <li className="flex gap-4 text-base text-muted">
                  <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section-padding ${sectionGradientClass("band")}`}>
        <div className="container-site">
          <FadeIn>
            <SectionHeading title="Execution." />
          </FadeIn>
          <ul className="mt-8 max-w-3xl space-y-4">
            {study.execution.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <li className="flex gap-4 text-base text-muted">
                  <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              </FadeIn>
            ))}
          </ul>
          <FadeIn delay={0.2}>
            <p className="mt-10 max-w-3xl font-mono text-xl text-accent">
              {study.solution}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className={`section-padding ${sectionGradientClass("vault")}`}>
        <div className="container-site">
          <FadeIn>
            <SectionHeading title="Results." />
          </FadeIn>
          <BalancedCardGrid itemCount={study.results.length} className="mt-12" gapClass="gap-5">
            {study.results.map((r, i) => (
              <FadeIn key={r.label} delay={i * 0.08}>
                <div className="rounded-2xl bg-white/10 p-8 text-center text-white backdrop-blur-sm">
                  <p className="font-mono text-4xl text-accent-highlight">
                    {r.metric}
                  </p>
                  <p className="label-xs mt-2 text-white/50">{r.label}</p>
                </div>
              </FadeIn>
            ))}
          </BalancedCardGrid>
        </div>
      </section>

      {study.testimonial && (
        <section className={`section-padding ${sectionGradientClass("band")}`}>
          <div className="container-site max-w-3xl text-center">
            <FadeIn>
              <blockquote className="font-mono text-2xl italic text-white md:text-3xl">
                "{study.testimonial.quote}"
              </blockquote>
              <p className="label-xs mt-6 text-accent">{study.testimonial.role}</p>
            </FadeIn>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className={`section-padding ${sectionGradientClass("deep")}`}>
          <div className="container-site">
            <FadeIn>
              <SectionHeading title="Related Services." />
            </FadeIn>
            <div className="mt-8 flex flex-wrap gap-4">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="glass rounded-full px-5 py-2.5 font-mono text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-glass"
                >
                  {s.title} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABlock />
    </main>
  );
}
