import { Link } from "react-router-dom";
import { PageSEO } from "../components/seo/PageSEO";
import { GsapReveal } from "../components/effects/GsapReveal";
import { RevealSection } from "../components/sections/RevealSection";
import { PageHero } from "../components/sections/PageHero";
import { DualCTA } from "../components/division/DualCTA";
import { ScrollCounter } from "../components/effects/ScrollCounter";
import { BalancedCardGrid } from "../components/ui/BalancedCardGrid";
import { sectionGradientClass } from "../lib/section-gradients";
import { aboutPage, companyStats, philosophyCards, whyDifferent } from "../lib/about";
import { divisions } from "../lib/divisions";
import { staticPageSEO } from "../lib/seo";

export function AboutPage() {
  const seo = staticPageSEO["/about"];

  return (
    <>
      <PageSEO {...seo} path="/about" />

      <PageHero page="about" className="pb-20 md:pb-28">
        <div className="max-w-4xl">
          <GsapReveal immediate effect="clip">
            <h1 className="heading-section">{aboutPage.title}</h1>
          </GsapReveal>
          <GsapReveal immediate delay={0.08} effect="blur">
            <p className="mt-6 max-w-2xl font-mono text-xl font-medium text-flow-light md:text-2xl">
              {aboutPage.subtitle}
            </p>
          </GsapReveal>

          <div className="mt-16 border-t border-white/10 pt-16">
            <GsapReveal immediate delay={0.12} effect="clip">
              <h2 className="heading-section text-white">Our Story</h2>
            </GsapReveal>
            <div className="mt-8 space-y-6">
              {aboutPage.story.map((paragraph, i) => (
                <GsapReveal immediate key={paragraph.slice(0, 40)} delay={0.16 + i * 0.04} effect="blur">
                  <p className="font-mono text-base leading-relaxed text-white/85 md:text-lg">
                    {paragraph}
                  </p>
                </GsapReveal>
              ))}
            </div>
          </div>
        </div>
      </PageHero>

      <RevealSection className={`section-padding ${sectionGradientClass("apex")}`}>
        <div className="container-site">
          <h2 className="heading-section text-center text-white" data-reveal="clip">
            Values
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-sm text-white/75 md:text-base">
            Shared across both divisions of The Plugin.
          </p>
          <BalancedCardGrid itemCount={philosophyCards.length} className="mt-16">
            {philosophyCards.map((card) => (
              <article key={card.num} className="flow-card card-stack" data-reveal>
                <p className="font-mono text-3xl text-flow-light">{card.num}</p>
                <h3 className="heading-card-sm mt-4">{card.title}</h3>
                <p className="mt-2 font-mono text-sm leading-relaxed text-white/90">
                  {card.description}
                </p>
              </article>
            ))}
          </BalancedCardGrid>
        </div>
      </RevealSection>

      <RevealSection className={`section-padding ${sectionGradientClass("deep")}`}>
        <div className="container-site">
          <h2 className="heading-section mb-10 text-white" data-reveal="clip">
            {aboutPage.dualOrigin.title}
          </h2>
          <div className="card-grid grid gap-10 lg:grid-cols-2">
            <article className="flow-card card-stack" data-reveal="left">
              <p className="label-xs shrink-0 text-flow-light">{aboutPage.dualOrigin.growth.title}</p>
              <h3 className="heading-card-lg mt-3 shrink-0">For Businesses division</h3>
              <p className="card-stack__grow font-mono text-sm leading-relaxed text-white/85 md:text-base">
                {aboutPage.dualOrigin.growth.body}
              </p>
              <Link to={divisions.growth.routes.landing} className="btn-secondary card-stack__footer inline-flex w-full justify-center">
                Work with our business team →
              </Link>
            </article>
            <article className="flow-card card-stack border-l-4 border-l-flow-mid" data-reveal="right">
              <p className="label-xs shrink-0 text-flow-light">{aboutPage.dualOrigin.careers.title}</p>
              <h3 className="heading-card-lg mt-3 shrink-0">For Talent division</h3>
              <p className="card-stack__grow font-mono text-sm leading-relaxed text-white/85 md:text-base">
                {aboutPage.dualOrigin.careers.body}
              </p>
              <Link to={divisions.careers.routes.landing} className="btn-secondary card-stack__footer inline-flex w-full justify-center">
                Work with our talent team →
              </Link>
            </article>
          </div>
        </div>
      </RevealSection>

      <RevealSection className={`section-padding ${sectionGradientClass("band")} text-white`}>
        <div className="container-site">
          <h2 className="heading-section text-center" data-reveal>
            By the Numbers
          </h2>
          <div
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6"
            data-reveal-stagger
          >
            {companyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <ScrollCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className={`section-padding ${sectionGradientClass("vault")}`}>
        <div className="container-site">
          <h2 className="heading-section text-white" data-reveal>
            Why We're Different
          </h2>
          <BalancedCardGrid itemCount={whyDifferent.length} className="mt-12">
            {whyDifferent.map((item) => (
              <article key={item.title} className="flow-card card-stack" data-reveal>
                <h3 className="heading-card-md shrink-0">{item.title}</h3>
                <p className="card-stack__grow mt-3 font-mono text-sm leading-relaxed text-white/90 md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </BalancedCardGrid>
          <div className="mt-12 text-center" data-reveal>
            <Link to="/team" className="btn-secondary">
              Meet the Team
            </Link>
          </div>
        </div>
      </RevealSection>

      <RevealSection className={`section-padding ${sectionGradientClass("cta")}`}>
        <div className="container-site text-center">
          <h2 className="heading-section-lg" data-reveal="clip">
            One brand. Two ways to plug in.
          </h2>
          <DualCTA className="mt-10 justify-center" />
        </div>
      </RevealSection>
    </>
  );
}
