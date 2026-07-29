import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import { sectionGradientClass } from "../../lib/section-gradients";
import { RevealSection } from "../sections/RevealSection";
import { SectionHeading } from "../ui/Motion";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";

interface DivisionCTAProps {
  division: DivisionId;
  title?: string;
  subtitle?: string;
}

export function DivisionCTA({ division, title, subtitle }: DivisionCTAProps) {
  const config = getDivision(division);

  return (
    <RevealSection className={`section-padding ${sectionGradientClass("cta")}`}>
      <div className="container-site text-center">
        <div data-reveal="clip">
          <SectionHeading
            title={title ?? "Ready to plug in?"}
            subtitle={subtitle ?? config.ctaLabel}
            align="center"
            dark
          />
          <PrimaryCtaButton
            className="mt-10"
            label={config.ctaLabel}
            href={config.bookUrl}
          />
        </div>
      </div>
    </RevealSection>
  );
}
