import { painPointCards, painPointIntro } from "../../lib/home-sections";
import { sectionGradientClass } from "../../lib/section-gradients";
import { RevealSection } from "../sections/RevealSection";

export function WhyChooseSection() {
  return (
    <RevealSection className={`section-padding ${sectionGradientClass("rise")}`}>
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center" data-reveal="scale">
          <h2 className="heading-section-lg">{painPointIntro.line1}</h2>
          <p className="mt-2 font-display text-[clamp(1.35rem,5vw,2.75rem)] font-extrabold leading-tight text-white">
            {painPointIntro.line2}
          </p>
        </div>

        <div
          className="pain-point-cards mt-16"
          data-reveal-stagger
          data-stagger="flip"
        >
          {painPointCards.map((card) => (
            <article key={card.title} className="pain-point-card">
              <h3 className="heading-card text-base uppercase leading-snug sm:text-lg md:text-xl">
                {card.title}
              </h3>
              <p className="mt-4 font-mono text-sm leading-relaxed text-white/95 md:mt-5 md:text-base">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
