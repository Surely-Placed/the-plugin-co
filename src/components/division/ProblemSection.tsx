import { RevealSection } from "../sections/RevealSection";
import { BalancedCardGrid } from "../ui/BalancedCardGrid";

interface ProblemSectionProps {
  title: string;
  body: string;
  painPoints?: { title: string; body: string }[];
  accent?: "growth" | "careers";
}

export function ProblemSection({
  title,
  body,
  painPoints,
  accent = "growth",
}: ProblemSectionProps) {
  const pageGradient =
    accent === "careers" ? "bg-gradient-page-careers" : "bg-gradient-page-growth";
  const borderAccent = "border-flow-mid/30";
  const textAccent = "text-flow-light";

  return (
    <RevealSection className={`section-padding ${pageGradient}`}>
      <div className="container-site">
        <h2 className="heading-section-lg mx-auto max-w-4xl text-center" data-reveal="clip">
          {title}
        </h2>
        {painPoints && painPoints.length > 0 ? (
          <>
            <p className="prose-body mx-auto mt-6 max-w-3xl text-center" data-reveal="blur">
              {body}
            </p>
            <BalancedCardGrid
              itemCount={painPoints.length}
              className="mt-14"
              data-reveal-stagger
            >
            {painPoints.map((point, i) => (
              <article
                key={point.title}
                className={`combo-card card-stack border-l-4 ${borderAccent}`}
              >
                <p className={`label-xs shrink-0 ${textAccent}`}>
                  0{i + 1}
                </p>
                <h3 className="heading-card-lg mt-3 shrink-0">{point.title}</h3>
                <p className="card-stack__grow prose-body mt-4 text-sm md:text-base">
                  {point.body}
                </p>
              </article>
            ))}
            </BalancedCardGrid>
          </>
        ) : (
          <p className="prose-body mx-auto mt-8 max-w-3xl text-center" data-reveal="blur">
            {body}
          </p>
        )}
      </div>
    </RevealSection>
  );
}
