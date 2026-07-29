import { Link } from "react-router-dom";
import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";

interface DivisionCardProps {
  division: DivisionId;
  title: string;
  tagline?: string;
  audience: string;
  description: string;
  services: readonly string[];
  href: string;
  cta: string;
}

export function DivisionCard({
  division,
  title,
  tagline,
  audience,
  description,
  services,
  href,
  cta,
}: DivisionCardProps) {
  const { accent } = getDivision(division);

  return (
    <article className={`flow-card card-stack border-l-4 ${accent.border} ${accent.card}`}>
      <p className="label-xs shrink-0">{audience}</p>
      <h3 className="heading-card-lg mt-2 shrink-0">{title}</h3>
      {tagline && (
        <p className="mt-2 shrink-0 font-mono text-sm text-white/70">{tagline}</p>
      )}

      <div className="card-stack__grow">
        <p className="flex-1 font-mono text-sm leading-relaxed text-white/85 md:text-base">
          {description}
        </p>
        <ul className="tag-grid shrink-0">
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>

      <Link to={href} className="btn-primary card-stack__footer w-full">
        {cta}
      </Link>
    </article>
  );
}
