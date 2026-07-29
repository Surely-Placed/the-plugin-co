import type { Testimonial } from "../../lib/content-types";
import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import { RevealSection } from "../sections/RevealSection";
import { sectionGradientClass } from "../../lib/section-gradients";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";

interface TestimonialListProps {
  title: string;
  testimonials: readonly Testimonial[];
  division?: DivisionId;
  /** Render inside a parent section (no extra gradient wrapper) */
  embedded?: boolean;
}

export function TestimonialList({
  title,
  testimonials,
  division,
  embedded = false,
}: TestimonialListProps) {
  const accent = division ? getDivision(division).accent.text : "text-white/80";

  const content = (
    <>
      <h2 className="heading-section-lg text-center" data-reveal="clip">
        {title}
      </h2>
      <BalancedCardGrid
        itemCount={testimonials.length}
        className="mt-12"
        data-reveal-stagger
      >
        {testimonials.map((item) => (
          <article key={`${item.name}-${item.role}`} className="testimonial-card card-stack">
            <p className="flex-1 font-mono text-sm leading-relaxed text-white/95 md:text-base">
              {item.quote}
            </p>
            <p
              className={`card-stack__footer mt-auto pt-6 font-mono text-[10px] font-medium uppercase tracking-[0.16em] ${accent}`}
            >
              {item.name} / {item.role}
            </p>
          </article>
        ))}
      </BalancedCardGrid>
    </>
  );

  if (embedded) {
    return <div className="container-site">{content}</div>;
  }

  return (
    <RevealSection className={`section-padding ${sectionGradientClass("apex")}`}>
      <div className="container-site">{content}</div>
    </RevealSection>
  );
}
