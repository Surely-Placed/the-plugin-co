import { ServiceCard } from "../components/services/ServiceCard";
import { CTABlock } from "../components/ui/CTABlock";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { RevealSection } from "../components/sections/RevealSection";
import { GsapReveal } from "../components/effects/GsapReveal";
import { SectionHeading } from "../components/ui/Motion";
import { compoundingEffects, serviceListings } from "../lib/services";
import { servicesExtended } from "../lib/page-content";
import { sectionGradientClass } from "../lib/section-gradients";
import { staticPageSEO } from "../lib/seo";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";

export function ServicesPage() {
  const seo = staticPageSEO["/services"];

  return (
    <>
      <PageSEO {...seo} path="/services" />

      <PageHero page="services">
        <GsapReveal immediate effect="blur">
          <p className="label-xs mb-6">Services Ecosystem</p>
        </GsapReveal>
        <GsapReveal immediate delay={0.08} effect="clip">
          <SectionHeading title="Pick Your Plugin." />
        </GsapReveal>
        <GsapReveal immediate delay={0.12} effect="left">
          <p className="mt-4 font-mono text-xl font-medium text-flow-light md:text-2xl">
            Every business needs something different. We've got you covered.
          </p>
        </GsapReveal>
        <div className="prose-rich mt-8 max-w-3xl">
          {servicesExtended.intro.map((p, i) => (
            <GsapReveal immediate key={p.slice(0, 40)} delay={0.16 + i * 0.05} effect={i % 2 ? "right" : "blur"}>
              <p>{p}</p>
            </GsapReveal>
          ))}
        </div>
      </PageHero>

      <RevealSection className={`section-padding pt-0 section-after-hero ${sectionGradientClass("rise")}`}>
        <div className="container-site">
          <BalancedCardGrid itemCount={serviceListings.length} data-reveal-stagger data-stagger="wave">
            {serviceListings.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} large />
            ))}
          </BalancedCardGrid>
        </div>
      </RevealSection>

      <RevealSection className={`section-padding ${sectionGradientClass("slashReverse")}`}>
        <div className="container-site">
          <div className="mb-6 h-px w-16 origin-left bg-flow-mid/60" data-section-line />
          <div data-reveal="flip">
            <SectionHeading
              eyebrow="Personalised Service Combos"
              title="One Plus One Equals Three."
              subtitle="Services work better together. Here's how compounding shows up in real engagements."
            />
          </div>
          <BalancedCardGrid
            itemCount={servicesExtended.compoundDetail.length + compoundingEffects.length}
            className="mt-16"
            data-reveal-stagger
            data-stagger="cascade"
          >
            {servicesExtended.compoundDetail.map((item) => (
              <article key={item.title} className="flow-card">
                <h3 className="heading-card-lg">{item.title}</h3>
                <p className="mt-4 font-mono text-base leading-relaxed text-white/90">{item.body}</p>
              </article>
            ))}
            {compoundingEffects.map((item) => (
              <article key={item.combo} className="flow-card">
                <p className="heading-card-lg">{item.combo}</p>
                <p className="mt-3 font-mono text-sm leading-relaxed text-white/90 md:text-base">
                  {item.outcome}
                </p>
              </article>
            ))}
          </BalancedCardGrid>
        </div>
      </RevealSection>

      <CTABlock />
    </>
  );
}
