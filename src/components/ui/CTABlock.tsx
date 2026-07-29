import { brand } from "../../lib/brand";
import { sectionGradientClass } from "../../lib/section-gradients";
import { RevealSection } from "../sections/RevealSection";
import { SectionHeading } from "./Motion";
import { PrimaryCtaButton } from "./PrimaryCtaButton";

interface CTABlockProps {
  title?: string;
  subtitle?: string;
  /** @deprecated All pages use the same dark CTA style now */
  variant?: "light" | "dark";
}

export function CTABlock({
  title = brand.cta.blockTitle,
  subtitle = brand.cta.defaultSubtitle,
}: CTABlockProps) {
  return (
    <RevealSection className={`section-padding ${sectionGradientClass("cta")}`}>
      <div className="container-site text-center">
        <div data-reveal="clip">
          <SectionHeading title={title} subtitle={subtitle} align="center" dark />
          <PrimaryCtaButton className="mt-10" />
        </div>
      </div>
    </RevealSection>
  );
}
