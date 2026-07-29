import { customerTestimonials } from "../../lib/home-sections";
import { sectionGradientClass } from "../../lib/section-gradients";
import { RevealSection } from "../sections/RevealSection";

export function TestimonialsSection() {
  return (
    <RevealSection className={`section-padding ${sectionGradientClass("apex")}`}>
      <div className="container-site">
        <h2 className="heading-section-lg" data-reveal="clip">
          What Customers Say
        </h2>
      </div>

      <div
        className="testimonial-scroll mt-14"
        data-reveal-stagger
        data-stagger="wave"
      >
        {customerTestimonials.map((item) => (
          <article
            key={`${item.name}-${item.company}`}
            className="testimonial-card"
          >
            <p className="font-mono text-sm leading-relaxed text-white/95 md:text-base">
              {item.quote}
            </p>
            <p className="mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/80">
              {item.name} / {item.company}
            </p>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}
