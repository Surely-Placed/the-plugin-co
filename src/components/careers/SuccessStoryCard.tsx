import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { SuccessStory } from "../../lib/careers/success-stories";
import { divisions } from "../../lib/divisions";

interface SuccessStoryCardProps {
  story: SuccessStory;
  basePath?: string;
}

export function SuccessStoryCard({
  story,
  basePath = divisions.careers.routes.stories,
}: SuccessStoryCardProps) {
  return (
    <article className="card-stack group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass-lg">
      <div
        className={`aspect-[16/10] shrink-0 bg-gradient-to-br ${story.thumbnailGradient} flex flex-col justify-end p-8`}
      >
        <p className="font-mono text-4xl italic text-white md:text-5xl">{story.metric}</p>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/80">
          {story.metricLabel}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="heading-card-lg">{story.name}</h3>
        <p className="mt-2 font-mono text-sm text-flow-light">{story.role}</p>
        <p className="mt-4 line-clamp-3 flex-1 text-sm text-muted">{story.challenge}</p>
        <p className="mt-3 font-mono text-sm text-accent">{story.result}</p>
        <Link
          to={`${basePath}/${story.slug}`}
          className="label-xs card-stack__footer mt-auto inline-flex items-center gap-2 pt-6 text-white transition-all group-hover:gap-3 group-hover:text-accent"
        >
          Read Success Story
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
