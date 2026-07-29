import { FounderCard } from "../components/team/FounderCard";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { RevealSection } from "../components/sections/RevealSection";
import { GsapReveal } from "../components/effects/GsapReveal";
import { SectionHeading } from "../components/ui/Motion";
import { brand } from "../lib/brand";
import { founders, openPositions } from "../lib/team";
import { sectionGradientClass } from "../lib/section-gradients";
import { staticPageSEO } from "../lib/seo";

export function TeamPage() {
  const seo = staticPageSEO["/team"];
  return (
    <>
      <PageSEO {...seo} path="/team" />
      <PageHero page="team">
        <GsapReveal immediate effect="blur">
          <p className="label-xs mb-6">Team</p>
        </GsapReveal>
        <div className="mb-6 h-px w-16 origin-left bg-flow-mid/60" />
        <GsapReveal immediate delay={0.08} effect="clip">
          <SectionHeading title="Meet the Founders." />
        </GsapReveal>
        <GsapReveal immediate delay={0.12} effect="left">
          <p className="mt-4 font-mono text-xl text-flow-light md:text-2xl">
            Young. Hungry. Obsessed with growth.
          </p>
        </GsapReveal>
        <GsapReveal immediate delay={0.16} effect="right">
          <p className="prose-rich mt-6 max-w-3xl">
            We're builders first. That means you'll work directly with people who
            understand acquisition, product, and operations. Not layers of account
            management.
          </p>
        </GsapReveal>
      </PageHero>

      <RevealSection className={`section-padding pt-0 section-after-hero ${sectionGradientClass("slash")}`}>
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2" data-reveal-stagger data-stagger="flip">
            {founders.map((founder, i) => (
              <FounderCard key={founder.id} founder={founder} index={i} />
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className={`section-padding ${sectionGradientClass("base")}`}>
        <div className="container-site">
          <h2 className="heading-section text-white" data-reveal>
            Open Positions
          </h2>
          <div className="mt-12 flex flex-wrap gap-3" data-reveal-stagger>
            {openPositions.map((role) => (
              <span key={role} className="btn-pill w-auto rounded-full px-6 py-3">
                {role}
              </span>
            ))}
          </div>
          <p className="mt-10 text-center" data-reveal>
            <a href={`mailto:${brand.email}`} className="btn-secondary">
              Apply via Email
            </a>
          </p>
        </div>
      </RevealSection>
    </>
  );
}
