import { homeExtended } from "../../lib/page-content";
import { sectionGradientClass } from "../../lib/section-gradients";
import { visuals } from "../../lib/visuals";
import { RevealSection } from "../sections/RevealSection";
import { ParallaxMedia } from "../effects/ParallaxMedia";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";

export function ApproachSection() {
  return (
    <RevealSection
      className={`section-padding pt-0 section-after-hero ${sectionGradientClass("apex")}`}
    >
      <div className="container-site">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="label-xs mb-4" data-reveal="blur">
              Our Approach
            </p>
            <div className="mb-6 h-px w-16 origin-left bg-accent/60" data-section-line />
            <h2 className="heading-section text-white" data-reveal="clip">
              Built Like a Plugin.{" "}
              <span className="italic text-accent">Not an Agency.</span>
            </h2>
            <div className="prose-rich mt-8">
              {homeExtended.manifesto.map((p, i) => (
                <p key={p.slice(0, 40)} data-reveal={i % 2 === 0 ? "left" : "right"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div data-reveal-media="clip">
            <ParallaxMedia
              src={visuals.manifesto.image!}
              alt={visuals.manifesto.alt}
              className="aspect-[4/5]"
            />
          </div>
        </div>

        <BalancedCardGrid
          itemCount={homeExtended.pillars.length}
          className="mt-24"
          data-reveal-stagger
          data-stagger="flip"
        >
          {homeExtended.pillars.map((pillar) => (
            <article key={pillar.title} className="flow-card">
              <h3 className="heading-card-md uppercase tracking-wide">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {pillar.body}
              </p>
            </article>
          ))}
        </BalancedCardGrid>
      </div>
    </RevealSection>
  );
}
