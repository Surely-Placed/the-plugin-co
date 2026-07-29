import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import type { PricingContent } from "../../lib/content-types";
import { PageSEO } from "../seo/PageSEO";
import { PageHero } from "../sections/PageHero";
import { RevealSection } from "../sections/RevealSection";
import { GsapReveal } from "../effects/GsapReveal";
import { SectionHeading } from "../ui/Motion";
import { DivisionCTA } from "../division/DivisionCTA";
import { PayTierButton } from "../payments/PayTierButton";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";
import { staticPageSEO } from "../../lib/seo";

interface PricingTemplateProps {
  division: DivisionId;
  content: PricingContent;
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="heading-card-md text-white">{question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="prose-body pb-5 text-base">{answer}</p>}
    </div>
  );
}

export function PricingTemplate({ division, content }: PricingTemplateProps) {
  const config = getDivision(division);
  const seo = staticPageSEO[config.routes.pricing] ?? {
    title: content.title,
    description: content.subtitle,
  };

  const pageGradient =
    division === "careers" ? "bg-gradient-page-careers" : "bg-gradient-page-growth";

  return (
    <>
      <PageSEO {...seo} path={config.routes.pricing} />

      <PageHero page="pricing" className="pb-14 md:pb-20">
        <div className="content-column">
          <GsapReveal immediate effect="blur">
            <p className={`label-xs mb-6 ${config.accent.text}`}>Pricing</p>
          </GsapReveal>
          <GsapReveal immediate effect="clip" delay={0.08}>
            <SectionHeading title={content.title} subtitle={content.subtitle} />
          </GsapReveal>
        </div>
      </PageHero>

      <RevealSection className={`section-padding pt-0 ${pageGradient}`}>
        <div className="container-site">
          <BalancedCardGrid itemCount={content.tiers.length} className="pt-5" data-reveal-stagger>
            {content.tiers.map((tier) => (
              <article
                key={tier.name}
                className={`pricing-tier-card ${
                  tier.popular ? "pricing-tier-card--popular" : ""
                } ${division === "careers" ? "pricing-tier-card--careers" : ""}`}
              >
                {tier.popular && (
                  <span className="pricing-tier-badge">Most Popular</span>
                )}
                <h2 className="heading-card text-3xl not-italic md:text-4xl">{tier.name}</h2>
                <p className={`mt-3 font-mono text-3xl ${config.accent.text}`}>{tier.price}</p>
                {tier.period && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-white/50">
                    {tier.period}
                  </p>
                )}
                <p className="prose-body mt-4 text-sm">{tier.description}</p>
                <ul className="mt-8 flex-1 space-y-3 border-t border-white/10 pt-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2 font-mono text-sm text-white/85">
                      <span className={config.accent.text}>·</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {tier.planSlug ? (
                  <PayTierButton
                    division={division}
                    planSlug={tier.planSlug}
                    planName={tier.name}
                    fullWidth
                    className="card-stack__footer mt-8"
                  />
                ) : (
                  <a
                    href={config.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary card-stack__footer mt-8 w-full text-center"
                  >
                    {config.ctaLabel}
                  </a>
                )}
              </article>
            ))}
          </BalancedCardGrid>
          {content.footnote && (
            <p className="mt-12 text-center font-mono text-sm text-white/55">{content.footnote}</p>
          )}

          <div className="mx-auto mt-20 max-w-3xl border-t border-white/10 pt-16">
            <SectionHeading title="FAQ" align="center" />
            <div className="mt-10" data-reveal>
              {content.faq.map((item) => (
                <FaqItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <DivisionCTA division={division} />
    </>
  );
}
