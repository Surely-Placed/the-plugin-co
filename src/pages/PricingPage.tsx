import { growthContent } from "../lib/growth/content";
import { CTABlock } from "../components/ui/CTABlock";
import { PrimaryCtaButton } from "../components/ui/PrimaryCtaButton";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { RevealSection } from "../components/sections/RevealSection";
import { GsapReveal } from "../components/effects/GsapReveal";
import { SectionHeading } from "../components/ui/Motion";
import { pricingExtended } from "../lib/page-content";
import { sectionGradientClass } from "../lib/section-gradients";
import { staticPageSEO } from "../lib/seo";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";

export function PricingPage() {
  const seo = staticPageSEO["/pricing"];
  return (
    <main className="text-white">
      <PageSEO {...seo} path="/pricing" />
      <PageHero page="pricing">
        <GsapReveal immediate effect="rotate">
          <p className="label-xs mb-6">Pricing</p>
        </GsapReveal>
        <div className="mb-6 h-px w-16 origin-left bg-accent/60" />
        <GsapReveal immediate delay={0.08} effect="clip">
          <SectionHeading title={"Simple.\nTransparent.\nScalable."} />
        </GsapReveal>
        <div className="prose-rich mt-6 max-w-3xl">
          {pricingExtended.intro.map((p, i) => (
            <GsapReveal immediate key={p.slice(0, 30)} delay={0.12 + i * 0.05} effect={i % 2 ? "right" : "left"}>
              <p>{p}</p>
            </GsapReveal>
          ))}
        </div>
      </PageHero>

      <RevealSection className={`section-padding pt-0 section-after-hero ${sectionGradientClass("vault")}`}>
        <div className="container-site">
          <BalancedCardGrid
            itemCount={growthContent.pricing.tiers.length}
            className="pt-5"
            data-reveal-stagger
            data-stagger="zoom"
          >
            {growthContent.pricing.tiers.map((tier, i) => (
              <article
                key={tier.name}
                className={`relative flex h-full flex-col overflow-visible rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass-lg ${
                  tier.popular
                    ? "border-accent bg-accent/20 text-white"
                    : "glass-card border-white/10"
                }`}
              >
                {tier.popular && (
                  <span className="pricing-tier-badge bg-accent-blue">Most Popular</span>
                )}

                <p className="label-xs mb-2 opacity-60">Tier {i + 1}</p>
                <h2 className="heading-card text-4xl not-italic md:text-5xl">
                  {tier.name}
                </h2>
                {tier.period && (
                  <p className="mt-1 font-mono text-xs uppercase tracking-wide text-white/50">
                    {tier.period}
                  </p>
                )}
                <p
                  className={`mt-2 text-sm leading-relaxed ${tier.popular ? "text-white/75" : "text-muted"}`}
                >
                  {tier.description}
                </p>

                <div className="mt-8 flex-1">
                  <p
                    className={`font-mono text-2xl italic ${tier.popular ? "text-accent-highlight" : "text-accent"}`}
                  >
                    {tier.price}
                  </p>
                </div>

                <PrimaryCtaButton fullWidth className="mt-8" label="Request Custom Plan" />
              </article>
            ))}
          </BalancedCardGrid>
        </div>
      </RevealSection>

      <CTABlock />
    </main>
  );
}
