import { Link } from "react-router-dom";
import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import { getCareerServiceIcon } from "../../lib/career-service-icons";
import { getServiceIcon } from "../../lib/service-icons";
import { PageSEO } from "../seo/PageSEO";
import { PageHero } from "../sections/PageHero";
import { RevealSection } from "../sections/RevealSection";
import { GsapReveal } from "../effects/GsapReveal";
import { TextReveal } from "../effects/TextReveal";
import { DivisionCTA } from "../division/DivisionCTA";
import { ProblemSection } from "../division/ProblemSection";
import { StatsBar } from "../division/StatsBar";
import { TestimonialList } from "../division/TestimonialList";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";
import { ScrollRevealSequence } from "../effects/ScrollRevealSequence";
import { staticPageSEO } from "../../lib/seo";

interface DivisionLandingPageProps {
  division: DivisionId;
}

export function DivisionLandingPage({ division }: DivisionLandingPageProps) {
  const config = getDivision(division);
  const { content, routes } = config;
  const { landing, process, testimonials } = content;
  const accent = division;
  const pageGradient =
    division === "careers" ? "bg-gradient-page-careers" : "bg-gradient-page-growth";
  const textAccent = config.accent.text;

  const seo = staticPageSEO[routes.landing] ?? {
    title: `${config.label} | The Plugin`,
    description: landing.hero.subtitle,
  };

  return (
    <>
      <PageSEO {...seo} path={routes.landing} />

      <PageHero page={division === "growth" ? "services" : "about"} className="pb-14 md:pb-20">
        <div className="content-column">
          <GsapReveal immediate effect="blur">
            <p className={`label-xs mb-6 ${config.accent.text}`}>{config.audience}</p>
          </GsapReveal>
          <h1 className="heading-hero max-w-4xl break-words">
            <TextReveal as="span" className="block" splitBy="words">
              {landing.hero.title}
            </TextReveal>
          </h1>
          <GsapReveal immediate delay={0.2} effect="left">
            <p className="prose-body mt-8 max-w-2xl">{landing.hero.subtitle}</p>
          </GsapReveal>
          <GsapReveal immediate delay={0.3}>
            <PrimaryCtaButton className="mt-10" label={config.ctaLabel} href={config.bookUrl} />
          </GsapReveal>
          <GsapReveal immediate delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              {landing.hero.trustBar.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-wide text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </GsapReveal>
        </div>
      </PageHero>

      <ProblemSection
        title={landing.problem.title}
        body={landing.problem.body}
        painPoints={landing.problem.painPoints}
        accent={accent}
      />

      <RevealSection className={`section-padding ${pageGradient}`}>
        <div className="container-site space-y-24 md:space-y-32">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="heading-section-lg max-w-2xl">{landing.servicesPreview.title}</h2>
              <Link to={routes.services} className={`label-xs ${textAccent} hover:text-white`}>
                {landing.servicesPreview.linkLabel}
              </Link>
            </div>
            <div className="card-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
              {content.services.services.slice(0, 8).map((service) => {
                const Icon =
                  division === "careers" && service.slug
                    ? getCareerServiceIcon(service.slug)
                    : getServiceIcon(service.slug ?? "performance-marketing");
                return (
                  <Link
                    key={service.title}
                    to={routes.services}
                    className="combo-card card-stack group transition-transform hover:-translate-y-1"
                  >
                    <div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-flow-mid/20 text-flow-light`}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="heading-card-md shrink-0 group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className={`card-stack__grow mt-2 text-sm ${textAccent}`}>{service.tagline}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/10 pt-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="heading-section-lg max-w-2xl">{landing.processPreview.title}</h2>
              <Link to={routes.howItWorks} className={`label-xs ${textAccent} hover:text-white`}>
                {landing.processPreview.linkLabel}
              </Link>
            </div>
            <ScrollRevealSequence
              itemCount={Math.min(process.steps.length, 4)}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {process.steps.slice(0, 4).map((step) => (
                <article
                  key={step.step}
                  data-scroll-reveal-card
                  className="combo-card card-stack will-change-transform"
                >
                  <p
                    data-scroll-reveal-marker
                    className={`label-xs ${textAccent}`}
                  >
                    {step.step}
                  </p>
                  <h3 className="heading-card-md mt-3 shrink-0">{step.title}</h3>
                  {step.timing && (
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-white/45">
                      {step.timing}
                    </p>
                  )}
                  <p className="card-stack__grow prose-body mt-3 line-clamp-3 text-sm">
                    {step.description}
                  </p>
                </article>
              ))}
            </ScrollRevealSequence>
          </div>

          <div className="border-t border-white/10 pt-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="heading-section-lg">{landing.results.title}</h2>
              <Link to={routes.stories} className={`label-xs ${textAccent} hover:text-white`}>
                {landing.results.linkLabel}
              </Link>
            </div>
            <StatsBar stats={landing.results.stats} className="mt-10" />
          </div>

          {"packagesPreview" in landing && landing.packagesPreview && (
            <div className="border-t border-white/10 pt-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="heading-section-lg">Our packages</h2>
                <Link to={routes.pricing} className={`label-xs ${textAccent} hover:text-white`}>
                  {landing.packagesPreview.linkLabel}
                </Link>
              </div>
              <BalancedCardGrid
                itemCount={landing.packagesPreview.tiers.length}
                className="mt-10"
                gapClass="gap-4"
              >
                {landing.packagesPreview.tiers.map((tier) => (
                  <article key={tier.name} className="combo-card card-stack text-center">
                    <h3 className="heading-card shrink-0">{tier.name}</h3>
                    <p className={`card-stack__grow mt-3 font-mono text-2xl ${textAccent}`}>
                      {tier.price}
                    </p>
                  </article>
                ))}
              </BalancedCardGrid>
            </div>
          )}
        </div>
      </RevealSection>

      <TestimonialList
        title={landing.testimonialsTitle}
        testimonials={testimonials}
        division={division}
      />

      <DivisionCTA
        division={division}
        title={landing.ctaBanner?.title}
        subtitle={landing.ctaBanner?.subtitle}
      />
    </>
  );
}
