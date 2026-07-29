import { Link } from "react-router-dom";
import type { CaseStudy } from "../../lib/portfolio";
import { getDivision } from "../../lib/divisions";
import { serviceDetails } from "../../lib/services";
import { PageSEO } from "../seo/PageSEO";
import { Breadcrumbs } from "../seo/Breadcrumbs";
import { PageHero } from "../sections/PageHero";
import { RevealSection } from "../sections/RevealSection";
import { GsapReveal } from "../effects/GsapReveal";
import { FadeIn, SectionHeading } from "../ui/Motion";
import { DivisionCTA } from "../division/DivisionCTA";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";

interface CaseStudyPageContentProps {
  study: CaseStudy;
  basePath?: string;
}

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 font-mono text-base leading-relaxed text-white/80">
          <span className="shrink-0 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyPageContent({
  study,
  basePath = getDivision("growth").routes.stories,
}: CaseStudyPageContentProps) {
  const servicesPath = getDivision("growth").routes.services;
  const related = study.relatedServices.map((s) => serviceDetails[s]).filter(Boolean);
  const path = `${basePath}/${study.slug}`;

  return (
    <main className="text-white">
      <PageSEO
        title={`${study.name} Case Study`}
        description={study.result}
        path={path}
        type="article"
      />

      <PageHero page="portfolio" className="pb-16 md:pb-20">
        <div className="content-column">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Case Studies", href: basePath },
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
        </div>
      </PageHero>

      <RevealSection className="bg-gradient-page-growth section-padding">
        <div className="container-site">
          <div className="content-column">
            <FadeIn>
              <SectionHeading title="The Challenge." dark />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-white/75">{study.challenge}</p>
            </FadeIn>
          </div>

          <div className="content-column mt-16 border-t border-white/10 pt-16">
            <FadeIn>
              <SectionHeading title="Strategy." dark />
            </FadeIn>
            <NumberedList items={study.strategy} />
          </div>

          <div className="content-column mt-16 border-t border-white/10 pt-16">
            <FadeIn>
              <SectionHeading title="Execution." dark />
            </FadeIn>
            <NumberedList items={study.execution} />
            <FadeIn delay={0.2}>
              <p className="mt-10 font-mono text-xl leading-relaxed text-accent">{study.solution}</p>
            </FadeIn>
          </div>

          <div className="mt-16 border-t border-white/10 pt-16">
            <div className="content-column">
              <FadeIn>
                <SectionHeading title="Results." dark />
              </FadeIn>
            </div>
            <BalancedCardGrid itemCount={study.results.length} className="mt-10" gapClass="gap-5">
              {study.results.map((r, i) => (
                <FadeIn key={r.label} delay={i * 0.08}>
                  <div className="flow-card card-stack text-center">
                    <p className="font-mono text-4xl text-accent-highlight">{r.metric}</p>
                    <p className="card-stack__footer label-xs mt-2 text-white/60">{r.label}</p>
                  </div>
                </FadeIn>
              ))}
            </BalancedCardGrid>
          </div>

          {study.testimonial && (
            <div className="content-column mt-16 border-t border-white/10 pt-16 text-center">
              <FadeIn>
                <blockquote className="font-mono text-2xl italic leading-relaxed text-white md:text-3xl">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </blockquote>
                <p className="label-xs mt-6 text-accent">{study.testimonial.role}</p>
              </FadeIn>
            </div>
          )}

          {related.length > 0 && (
            <div className="content-column mt-16 border-t border-white/10 pt-16">
              <FadeIn>
                <SectionHeading title="Related Services." dark />
              </FadeIn>
              <div className="mt-8 flex flex-wrap gap-3">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to={`${servicesPath}/${s.slug}`}
                    className="rounded-full border border-white/15 bg-black/30 px-5 py-2.5 font-mono text-sm text-white transition-all hover:border-white/30 hover:text-accent"
                  >
                    {s.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </RevealSection>

      <DivisionCTA division="growth" />
    </main>
  );
}
