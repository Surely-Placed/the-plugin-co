import { brand } from "../../lib/brand";

type PrimaryCtaButtonProps = {
  className?: string;
  label?: string;
  href?: string;
  fullWidth?: boolean;
  compact?: boolean;
  "aria-label"?: string;
};

export function PrimaryCtaButton({
  className = "",
  label = brand.cta.label,
  href = brand.calendlyUrl,
  fullWidth = false,
  compact = false,
  "aria-label": ariaLabel,
}: PrimaryCtaButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? label}
      className={[
        "btn-primary",
        fullWidth && "w-full",
        compact && "min-h-11 px-4 py-2.5 text-[9px] md:px-5 md:py-2.5 md:text-[10px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </a>
  );
}
