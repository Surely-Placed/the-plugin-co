import { whatWeOffer } from "../../lib/home-sections";
import { sectionGradientClass } from "../../lib/section-gradients";
import { visuals } from "../../lib/visuals";
import { RevealSection } from "../sections/RevealSection";
import { ParallaxMedia } from "../effects/ParallaxMedia";

export function ServicesSection() {
  return (
    <RevealSection className={`section-padding ${sectionGradientClass("slash")}`}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal="left">
          <h2 className="heading-section-lg">{whatWeOffer.title}</h2>
          <div className="mt-10 flex flex-col gap-4" data-reveal-stagger>
            {whatWeOffer.pills.map((pill) => (
              <span key={pill} className="btn-pill max-w-md">
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div data-reveal-media="slide">
          <ParallaxMedia
            src={visuals.servicesBand.image!}
            alt={visuals.servicesBand.alt}
            width={1200}
            height={900}
            className="aspect-[4/3] rounded-[2rem]"
          />
        </div>
      </div>
    </RevealSection>
  );
}
