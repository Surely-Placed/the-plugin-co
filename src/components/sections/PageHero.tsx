import type { ReactNode } from "react";
import type { PageHeroKey } from "../../lib/visuals";
import { sectionBlendClass, sectionGradientBg } from "../../lib/section-gradients";

interface PageHeroProps {
  page?: PageHeroKey;
  variant?: "light" | "dark" | "flow";
  /** @deprecated Hero images are no longer shown */
  image?: string;
  children: ReactNode;
  className?: string;
}

export function PageHero({
  variant = "flow",
  children,
  className = "",
}: PageHeroProps) {
  const bgVariant = variant === "light" ? "flow" : variant;
  const heroGradient =
    bgVariant === "flow" ? sectionGradientBg("flow") : sectionGradientBg("apex");

  return (
    <section
      className={`${heroGradient} ${sectionBlendClass({ top: false, media: false })} relative section-padding pb-12 pt-28 md:pb-14 md:pt-32 ${className}`}
      data-gsap-skip
    >
      <div className="container-site [&_.heading-hero]:text-white [&_.heading-section]:text-white [&_.label-xs]:text-white/80 [&_.prose-rich_p]:text-white/75">
        {children}
      </div>
    </section>
  );
}
