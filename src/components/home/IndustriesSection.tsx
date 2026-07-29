import { growPresence } from "../../lib/home-sections";
import { sectionGradientClass } from "../../lib/section-gradients";
import { visuals } from "../../lib/visuals";
import { RevealSection } from "../sections/RevealSection";
import { ParallaxMedia } from "../effects/ParallaxMedia";

export function IndustriesSection() {
  return (
    <RevealSection className={`section-padding ${sectionGradientClass("deep")}`}>
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center" data-reveal="clip">
          <h2 className="heading-section-lg">{growPresence.title}</h2>
          <p className="mt-6 font-mono text-base leading-relaxed text-white/95 md:text-lg">
            {growPresence.body}
          </p>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-3">
          <div className="hidden lg:block" data-reveal="left">
            <ParallaxMedia
              src={visuals.industries.image!}
              alt="Industry sectors served by The Plugin digital agency"
              width={800}
              height={800}
              className="aspect-square max-w-xs rounded-3xl opacity-90"
            />
          </div>
          <div className="text-center lg:col-span-1" data-reveal="up">
            <ParallaxMedia
              src={visuals.process.image!}
              alt={visuals.process.alt}
              width={960}
              height={720}
              className="mx-auto aspect-[4/3] max-w-md rounded-3xl"
            />
          </div>
          <div className="hidden lg:block" data-reveal="right">
            <ParallaxMedia
              src={visuals.portfolio.image!}
              alt="Client success stories and portfolio results"
              width={800}
              height={800}
              className="ml-auto aspect-square max-w-xs rounded-3xl opacity-90"
            />
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
