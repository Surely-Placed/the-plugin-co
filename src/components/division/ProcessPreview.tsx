import { Link } from "react-router-dom";
import type { ProcessStep } from "../../lib/content-types";
import { RevealSection } from "../sections/RevealSection";
import { ScrollRevealSequence } from "../effects/ScrollRevealSequence";

interface ProcessPreviewProps {
  title: string;
  steps: readonly ProcessStep[];
  linkHref: string;
  linkLabel: string;
  accent?: "growth" | "careers";
}

export function ProcessPreview({
  title,
  steps,
  linkHref,
  linkLabel,
  accent = "growth",
}: ProcessPreviewProps) {
  const textAccent = "text-flow-light";
  const markerClass =
    accent === "careers" ? "step-timeline__marker--careers" : "step-timeline__marker--growth";

  const pageGradient =
    accent === "careers" ? "bg-gradient-page-careers" : "bg-gradient-page-growth";

  const previewSteps = steps.slice(0, 4);

  return (
    <RevealSection className={`section-padding ${pageGradient}`}>
      <div className="container-site">
        <h2 className="heading-section-lg max-w-3xl" data-reveal="clip">
          {title}
        </h2>
        <ScrollRevealSequence
          itemCount={previewSteps.length}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {previewSteps.map((step) => (
            <article
              key={step.step}
              data-scroll-reveal-card
              className="combo-card card-stack group will-change-transform"
            >
              <div
                data-scroll-reveal-marker
                className={`step-timeline__marker ${markerClass} mb-5 !h-12 !w-12 !text-sm`}
              >
                {step.step}
              </div>
              <h3 className="heading-card-md shrink-0 group-hover:text-white">{step.title}</h3>
              {step.timing && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-white/45">
                  {step.timing}
                </p>
              )}
              <p className="card-stack__grow prose-body mt-3 line-clamp-4 text-sm">
                {step.description}
              </p>
            </article>
          ))}
        </ScrollRevealSequence>
        <Link
          to={linkHref}
          className={`touch-target label-xs mt-12 inline-flex min-h-11 items-center gap-2 ${textAccent} transition-colors hover:text-white`}
        >
          {linkLabel} →
        </Link>
      </div>
    </RevealSection>
  );
}
