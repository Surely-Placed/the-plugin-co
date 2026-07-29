import { BookConsultationButton } from "./BookConsultationButton";

type SectionConsultationCtaProps = {
  text?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function SectionConsultationCta({
  text,
  variant = "primary",
  className = "mt-16",
}: SectionConsultationCtaProps) {
  return (
    <div className={`text-center ${className}`} data-reveal="up">
      {text && (
        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
          {text}
        </p>
      )}
      <BookConsultationButton variant={variant} />
    </div>
  );
}
