import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import { PageSEO } from "../seo/PageSEO";
import { PageHero } from "../sections/PageHero";
import { GsapReveal } from "../effects/GsapReveal";
import { SectionHeading } from "../ui/Motion";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { staticPageSEO } from "../../lib/seo";

interface BookTemplateProps {
  division: DivisionId;
}

export function BookTemplate({ division }: BookTemplateProps) {
  const config = getDivision(division);
  const seo = staticPageSEO[config.routes.book] ?? {
    title: config.ctaLabel,
    description: `Book a free 30-minute ${division} consultation with The Plugin.`,
  };

  return (
    <>
      <PageSEO {...seo} path={config.routes.book} />

      <PageHero page="contact">
        <GsapReveal immediate effect="blur">
          <p className="label-xs mb-6">{config.label}</p>
        </GsapReveal>
        <GsapReveal immediate effect="clip" delay={0.08}>
          <SectionHeading
            title={config.ctaLabel}
            subtitle={`Free 30-minute ${division === "growth" ? "business consultation" : "talent strategy call"}. No pressure. Just clarity on your next step.`}
          />
        </GsapReveal>
        <GsapReveal immediate delay={0.16}>
          <PrimaryCtaButton
            className="mt-10"
            label="Open calendar →"
            href={division === "growth" ? undefined : config.bookUrl}
          />
        </GsapReveal>
        {config.email ? (
          <GsapReveal immediate delay={0.24}>
            <p className="mt-6 font-mono text-sm text-white/70">
              Or email us at{" "}
              <a href={`mailto:${config.email}`} className="text-flow-light hover:text-white">
                {config.email}
              </a>
            </p>
          </GsapReveal>
        ) : null}
      </PageHero>
    </>
  );
}
