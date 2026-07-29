import type { SuccessStory } from "../../lib/careers/success-stories";
import { getDivision } from "../../lib/divisions";
import { PageSEO } from "../seo/PageSEO";
import { Breadcrumbs } from "../seo/Breadcrumbs";
import { PageHero } from "../sections/PageHero";
import { RevealSection } from "../sections/RevealSection";
import { GsapReveal } from "../effects/GsapReveal";
import { FadeIn, SectionHeading } from "../ui/Motion";
import { DivisionCTA } from "../division/DivisionCTA";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";

interface SuccessStoryPageContentProps {
  story: SuccessStory;
  basePath?: string;
}

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 font-mono text-base leading-relaxed text-white/80">
          <span className="shrink-0 font-mono text-sm text-flow-light">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SuccessStoryPageContent({
  story,
  basePath = getDivision("careers").routes.stories,
}: SuccessStoryPageContentProps) {
  const path = `${basePath}/${story.slug}`;

  return (
    <main className="text-white">
      <PageSEO
        title={`${story.name} Success Story`}
        description={story.result}
        path={path}
        type="article"
      />

      <PageHero page="portfolio" className="pb-16 md:pb-20">
        <div className="content-column">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Success Stories", href: basePath },
              { label: story.name },
            ]}
          />
          <GsapReveal immediate effect="blur">
            <p className="label-xs mb-4 text-flow-light">{story.headline}</p>
          </GsapReveal>
          <GsapReveal immediate delay={0.08} effect="clip">
            <h1 className="heading-section text-white">{story.name}</h1>
          </GsapReveal>
          <GsapReveal immediate delay={0.14} effect="left">
            <p className="mt-6 font-mono text-4xl text-flow-light md:text-5xl">
              {story.metric} {story.metricLabel}
            </p>
          </GsapReveal>
        </div>
      </PageHero>

      <RevealSection className="bg-gradient-page-careers section-padding">
        <div className="container-site">
          <div className="content-column">
            <FadeIn>
              <SectionHeading title="Background." dark />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-white/75">{story.background}</p>
            </FadeIn>
          </div>

          <div className="content-column mt-16 border-t border-white/10 pt-16">
            <FadeIn>
              <SectionHeading title="The Challenge." dark />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-white/75">{story.challenge}</p>
            </FadeIn>
          </div>

          <div className="content-column mt-16 border-t border-white/10 pt-16">
            <FadeIn>
              <SectionHeading title="Strategy." dark />
            </FadeIn>
            <NumberedList items={story.strategy} />
          </div>

          <div className="content-column mt-16 border-t border-white/10 pt-16">
            <FadeIn>
              <SectionHeading title="What We Did." dark />
            </FadeIn>
            <NumberedList items={story.execution} />
            <FadeIn delay={0.2}>
              <p className="mt-10 font-mono text-xl leading-relaxed text-flow-light">
                {story.solution}
              </p>
            </FadeIn>
          </div>

          <div className="mt-16 border-t border-white/10 pt-16">
            <div className="content-column">
              <FadeIn>
                <SectionHeading title="Results." dark />
              </FadeIn>
            </div>
            <BalancedCardGrid itemCount={story.results.length} className="mt-10" gapClass="gap-5">
              {story.results.map((r, i) => (
                <FadeIn key={r.label} delay={i * 0.08}>
                  <div className="flow-card card-stack text-center">
                    <p className="font-mono text-4xl text-flow-light">{r.metric}</p>
                    <p className="card-stack__footer label-xs mt-2 text-white/60">{r.label}</p>
                  </div>
                </FadeIn>
              ))}
            </BalancedCardGrid>
            <div className="content-column mt-10">
              <FadeIn>
                <p className="font-mono text-lg leading-relaxed text-white/85">{story.result}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </RevealSection>

      <DivisionCTA division="careers" />
    </main>
  );
}
