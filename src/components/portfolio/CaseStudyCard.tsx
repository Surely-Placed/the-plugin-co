import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "../../lib/portfolio";
import { divisions } from "../../lib/divisions";

interface CaseStudyCardProps {
  study: CaseStudy;
  basePath?: string;
}

export function CaseStudyCard({
  study,
  basePath = divisions.growth.routes.stories,
}: CaseStudyCardProps) {
  return (
    <article className="card-stack group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass-lg">
      <div
        className={`aspect-[16/10] shrink-0 bg-gradient-to-br ${study.thumbnailGradient} flex flex-col justify-end p-8`}
      >
        <p className="font-mono text-5xl italic text-white md:text-6xl">{study.metric}</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/80">
          {study.metricLabel}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap gap-2">
          <span className="label-xs rounded-full bg-black px-2.5 py-1">{study.industry}</span>
          <span className="label-xs rounded-full bg-black px-2.5 py-1">{study.resultType}</span>
        </div>
        <h3 className="heading-card-lg mt-4">{study.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{study.challenge}</p>
        <p className="mt-3 font-mono text-sm text-accent">{study.result}</p>
        <Link
          to={`${basePath}/${study.slug}`}
          className="label-xs card-stack__footer mt-auto inline-flex items-center gap-2 pt-6 text-white transition-all group-hover:gap-3 group-hover:text-accent"
        >
          View Case Study
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
