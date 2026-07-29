import type { ProcessStep } from "../../lib/content-types";
import type { DivisionId } from "../../lib/divisions";
import { ScrollRevealSequence } from "../effects/ScrollRevealSequence";

interface StepTimelineProps {
  steps: readonly ProcessStep[];
  division?: DivisionId;
}

export function StepTimeline({ steps, division = "growth" }: StepTimelineProps) {
  const accent = division === "careers" ? "careers" : "growth";

  return (
    <ScrollRevealSequence
      as="section"
      itemCount={steps.length}
      aria-label="Process steps"
      className="step-timeline-track"
    >
      <ol className="step-timeline">
        {steps.map((step, i) => (
          <li key={step.step} className="step-timeline__item">
            <div
              data-scroll-reveal-marker
              className={`step-timeline__marker step-timeline__marker--${accent}`}
            >
              <span>{step.step}</span>
            </div>
            <article
              data-scroll-reveal-card
              className={`step-card step-card--${accent} will-change-transform`}
            >
              {step.timing && <p className="step-card__timing">{step.timing}</p>}
              <h3 className="heading-card-lg text-white">{step.title}</h3>
              <p className="prose-body mt-4 text-sm md:text-base">{step.description}</p>
              {i < steps.length - 1 && (
                <span className="step-timeline__connector" aria-hidden />
              )}
            </article>
          </li>
        ))}
      </ol>
    </ScrollRevealSequence>
  );
}
