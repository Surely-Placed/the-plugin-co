
import { finalCta } from "../../lib/home-sections";
import { sectionGradientClass } from "../../lib/section-gradients";
import { visuals } from "../../lib/visuals";
import { RevealSection } from "../sections/RevealSection";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { SiteImage } from "../ui/SiteImage";

export function FinalCTASection() {
  return (
    <RevealSection className={`section-padding ${sectionGradientClass("base")}`}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal="left">
          <h2 className="heading-section-lg max-w-lg">{finalCta.title}</h2>
          <PrimaryCtaButton className="mt-10" />
          {/* <Link
            to="/contact"
            className="touch-target mt-4 inline-flex font-mono text-sm text-white/70 transition-colors hover:text-white"
          >
            Or send us a message →
          </Link> */}
        </div>

        <div className="relative hidden lg:block" data-reveal="right">
          <SiteImage
            src={visuals.finalCta.image ?? visuals.hero.image}
            alt="Book a strategy call with The Plugin growth team"
            width={1200}
            height={900}
            className="w-full rounded-[2rem] border border-white/15 object-cover shadow-card"
          />
        </div>
      </div>
    </RevealSection>
  );
}
