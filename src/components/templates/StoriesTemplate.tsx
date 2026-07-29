import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import type { StoriesContent } from "../../lib/content-types";
import { PageSEO } from "../seo/PageSEO";
import { PageHero } from "../sections/PageHero";
import { RevealSection } from "../sections/RevealSection";
import { GsapReveal } from "../effects/GsapReveal";
import { SectionHeading } from "../ui/Motion";
import { CaseStudyCard } from "../portfolio/CaseStudyCard";
import { SuccessStoryCard } from "../careers/SuccessStoryCard";
import { DivisionCTA } from "../division/DivisionCTA";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";
import { caseStudies } from "../../lib/portfolio";
import { successStories } from "../../lib/careers/success-stories";
import { staticPageSEO } from "../../lib/seo";

interface StoriesTemplateProps {
  division: DivisionId;
  content: StoriesContent;
}

export function StoriesTemplate({ division, content }: StoriesTemplateProps) {
  const config = getDivision(division);
  const seo = staticPageSEO[config.routes.stories] ?? {
    title: content.title,
    description: content.subtitle,
  };

  const pageGradient =
    division === "careers" ? "bg-gradient-page-careers" : "bg-gradient-page-growth";

  return (
    <>
      <PageSEO {...seo} path={config.routes.stories} />

      <PageHero page="portfolio" className="pb-14 md:pb-20">
        <div className="content-column">
          <GsapReveal immediate effect="blur">
            <p className={`label-xs mb-6 ${config.accent.text}`}>{config.label}</p>
          </GsapReveal>
          <GsapReveal immediate effect="clip" delay={0.08}>
            <SectionHeading title={content.title} subtitle={content.subtitle} />
          </GsapReveal>
        </div>
      </PageHero>

      <RevealSection className={`section-padding pt-0 ${pageGradient}`}>
        <div className="container-site">
          {division === "growth" ? (
            <BalancedCardGrid itemCount={caseStudies.length} gapClass="gap-8" data-reveal-stagger>
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} basePath={config.routes.stories} />
              ))}
            </BalancedCardGrid>
          ) : (
            <BalancedCardGrid itemCount={successStories.length} gapClass="gap-8" data-reveal-stagger>
              {successStories.map((story) => (
                <SuccessStoryCard key={story.slug} story={story} basePath={config.routes.stories} />
              ))}
            </BalancedCardGrid>
          )}
        </div>
      </RevealSection>

      <DivisionCTA division={division} />
    </>
  );
}
