import { PrimaryCtaButton } from "./PrimaryCtaButton";

type BookConsultationButtonProps = {
  className?: string;
  /** @deprecated Use PrimaryCtaButton. All variants use the same primary style now */
  variant?: "primary" | "secondary" | "onDark";
  fullWidth?: boolean;
  compact?: boolean;
};

export function BookConsultationButton({
  className = "",
  fullWidth = false,
  compact = false,
}: BookConsultationButtonProps) {
  return (
    <PrimaryCtaButton
      className={className}
      fullWidth={fullWidth}
      compact={compact}
    />
  );
}
