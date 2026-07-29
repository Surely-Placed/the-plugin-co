import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import type { HowItWorksContent } from "../../lib/content-types";
import { PageSEO } from "../seo/PageSEO";
import { PageHero } from "../sections/PageHero";
import { GsapReveal } from "../effects/GsapReveal";
import { SectionHeading } from "../ui/Motion";
import { StepTimeline } from "../division/StepTimeline";
import { DivisionCTA } from "../division/DivisionCTA";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { staticPageSEO } from "../../lib/seo";

interface HowItWorksTemplateProps {
  division: DivisionId;
  content: HowItWorksContent;
}

export function HowItWorksTemplate({ division, content }: HowItWorksTemplateProps) {
  const config = getDivision(division);
  const seo = staticPageSEO[config.routes.howItWorks] ?? {
    title: content.title,
    description: content.subtitle,
  };

  const pageGradient =
    division === "careers" ? "bg-gradient-page-careers" : "bg-gradient-page-growth";

  return (
    <>
      <PageSEO {...seo} path={config.routes.howItWorks} />

      <PageHero page="about" className="pb-14 md:pb-20">
        <div className="content-column">
          <GsapReveal immediate effect="blur">
            <p className={`label-xs mb-6 ${config.accent.text}`}>How It Works</p>
          </GsapReveal>
          <GsapReveal immediate effect="clip" delay={0.08}>
            <SectionHeading title={content.title} subtitle={content.subtitle} />
          </GsapReveal>
          <GsapReveal immediate delay={0.16}>
            <PrimaryCtaButton
              className="mt-10"
              label={config.ctaLabel}
              href={config.bookUrl}
            />
          </GsapReveal>
        </div>
      </PageHero>

      <section className={`section-padding pt-0 ${pageGradient}`} data-gsap-skip>
        <div className="container-site">
          <StepTimeline steps={content.steps} division={division} />
        </div>
      </section>

      <DivisionCTA division={division} />
    </>
  );
}
