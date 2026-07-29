import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import type { ServicesContent } from "../../lib/content-types";
import { PageSEO } from "../seo/PageSEO";
import { PageHero } from "../sections/PageHero";
import { RevealSection } from "../sections/RevealSection";
import { GsapReveal } from "../effects/GsapReveal";
import { SectionHeading } from "../ui/Motion";
import { ServiceCard } from "../services/ServiceCard";
import { CareerServiceCard } from "../division/CareerServiceCard";
import { JumpNav } from "../division/JumpNav";
import { DivisionCTA } from "../division/DivisionCTA";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";
import { serviceListings } from "../../lib/services";
import { staticPageSEO } from "../../lib/seo";

interface ServicesTemplateProps {
  division: DivisionId;
  content: ServicesContent;
}

export function ServicesTemplate({ division, content }: ServicesTemplateProps) {
  const config = getDivision(division);
  const seo = staticPageSEO[config.routes.services] ?? {
    title: content.title,
    description: content.subtitle,
  };

  const pageGradient =
    division === "careers" ? "bg-gradient-page-careers" : "bg-gradient-page-growth";

  const shortLabels: Record<string, string> = {
    "cv-linkedin": "CV & LinkedIn",
    "graduate-schemes": "Grad Schemes",
    "interview-coaching": "Interviews",
    "job-search-strategy": "Job Search",
    "networking-referrals": "Networking",
    "visa-guidance": "Visa",
    mentorship: "Mentorship",
  };

  const jumpItems = content.services
    .filter((s) => s.slug)
    .map((s) => ({
      id: s.slug!,
      label: shortLabels[s.slug!] ?? s.title,
    }));

  return (
    <>
      <PageSEO {...seo} path={config.routes.services} />

      <PageHero page={division === "growth" ? "services" : "about"} className="pb-14 md:pb-20">
        <div className="content-column">
          <GsapReveal immediate effect="blur">
            <p className={`label-xs mb-6 ${config.accent.text}`}>{config.label} Services</p>
          </GsapReveal>
          <GsapReveal immediate effect="clip" delay={0.08}>
            <SectionHeading title={content.title} subtitle={content.subtitle} />
          </GsapReveal>
          <div className="mt-8 max-w-3xl space-y-4">
            {content.intro.map((p, i) => (
              <GsapReveal immediate key={p.slice(0, 40)} delay={0.12 + i * 0.05} effect="blur">
                <p className="prose-body">{p}</p>
              </GsapReveal>
            ))}
          </div>
          <GsapReveal immediate delay={0.2}>
            <PrimaryCtaButton
              className="mt-10"
              label={config.ctaLabel}
              href={config.bookUrl}
            />
          </GsapReveal>
        </div>
      </PageHero>

      <RevealSection className={`section-padding pt-0 ${pageGradient}`}>
        <div className="container-site">
          {division === "careers" && jumpItems.length > 0 && (
            <JumpNav items={jumpItems} accent="careers" />
          )}

          {division === "growth" ? (
            <BalancedCardGrid itemCount={serviceListings.length} data-reveal-stagger>
              {serviceListings.map((service, i) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  index={i}
                  large
                  basePath={config.routes.services}
                />
              ))}
            </BalancedCardGrid>
          ) : (
            <div className="space-y-8 md:space-y-10" data-reveal-stagger>
              {content.services.map((service, i) => (
                <CareerServiceCard key={service.title} service={service} index={i} />
              ))}
            </div>
          )}

          {content.callout && (
            <div
              className="callout-panel mt-16 border-flow-mid/30 md:mt-20"
              data-reveal
            >
              <p className={`label-xs ${config.accent.text}`}>Good to know</p>
              <h3 className="heading-card-lg mt-4 text-white">{content.callout.title}</h3>
              <p className="prose-body mt-4 max-w-3xl">{content.callout.body}</p>
            </div>
          )}

          {content.combos && content.combos.length > 0 && (
            <div className="mt-20 border-t border-white/10 pt-20">
              <SectionHeading
                eyebrow="Service Combos"
                title="One Plus One Equals Three."
                subtitle="Services work better together."
              />
              <BalancedCardGrid itemCount={content.combos.length} className="mt-12" data-reveal-stagger>
                {content.combos.map((item) => (
                  <article key={item.title} className="combo-card card-stack">
                    <h3 className="heading-card-lg shrink-0">{item.title}</h3>
                    <p className="card-stack__grow prose-body mt-4 text-base">{item.body}</p>
                  </article>
                ))}
              </BalancedCardGrid>
            </div>
          )}
        </div>
      </RevealSection>

      <DivisionCTA division={division} />
    </>
  );
}
