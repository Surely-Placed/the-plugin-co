import { sectionGradientBg } from "../../lib/section-gradients";
import { SiteImage } from "../ui/SiteImage";

interface PageHeroBackgroundProps {
  image?: string;
  variant?: "light" | "dark" | "flow";
  className?: string;
  /** When true, only image + tint — section ::before supplies the gradient */
  overlayOnly?: boolean;
}

/** Full-bleed hero background — dark rise gradient on inner pages, flow on home hero only */
export function PageHeroVideo({
  image,
  variant = "flow",
  className = "",
  overlayOnly = false,
}: PageHeroBackgroundProps) {
  const useFlow = variant === "flow" || variant === "light";

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      {image && (
        <SiteImage
          src={image}
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          priority
          className="h-full w-full scale-105 object-cover opacity-20"
        />
      )}
      {!overlayOnly &&
        (useFlow ? (
          <div className="absolute inset-0 bg-gradient-flow" />
        ) : (
          <div className={`absolute inset-0 ${sectionGradientBg("apex")}`} />
        ))}
    </div>
  );
}
