import { brand } from "../../lib/brand";
import { useBookCall } from "../book-call/BookCallProvider";

type PrimaryCtaButtonProps = {
  className?: string;
  label?: string;
  /** External link. When omitted, the button opens the book-a-call flow. */
  href?: string;
  fullWidth?: boolean;
  compact?: boolean;
  "aria-label"?: string;
};

export function PrimaryCtaButton({
  className = "",
  label = brand.cta.label,
  href,
  fullWidth = false,
  compact = false,
  "aria-label": ariaLabel,
}: PrimaryCtaButtonProps) {
  const { openBookCall } = useBookCall();
  const classes = [
    "btn-primary",
    fullWidth && "w-full",
    compact && "min-h-11 px-4 py-2.5 text-[9px] md:px-5 md:py-2.5 md:text-[10px]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!href) {
    return (
      <button type="button" onClick={openBookCall} aria-label={ariaLabel ?? label} className={classes}>
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? label}
      className={classes}
    >
      {label}
    </a>
  );
}
