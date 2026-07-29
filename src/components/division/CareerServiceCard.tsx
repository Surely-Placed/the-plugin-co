import type { ServiceItem } from "../../lib/content-types";
import { getCareerServiceIcon } from "../../lib/career-service-icons";
import { DeliverablesGrid } from "./DeliverablesGrid";

interface CareerServiceCardProps {
  service: ServiceItem;
  index: number;
}

export function CareerServiceCard({ service, index }: CareerServiceCardProps) {
  const Icon = getCareerServiceIcon(service.slug ?? "");
  const num = String(index + 1).padStart(2, "0");

  return (
    <article id={service.slug} className="service-feature-card service-feature-card--careers">
      <div className="service-feature-card__accent" aria-hidden />
      <div className="service-feature-card__inner">
        <div className="flex flex-wrap items-start gap-5 md:gap-6">
          <span className="service-number-badge service-number-badge--careers">{num}</span>
          <div className="service-icon-badge service-icon-badge--careers">
            <Icon size={26} strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="heading-card-lg text-white">{service.title}</h3>
            <p className="mt-2 font-mono text-base text-flow-light md:text-lg">
              {service.tagline}
            </p>
          </div>
        </div>

        <p className="prose-body mt-6 max-w-3xl">{service.description}</p>

        {service.deliverables && service.deliverables.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="label-xs mb-5 text-flow-light">What we do</p>
            <DeliverablesGrid items={service.deliverables} />
          </div>
        )}
      </div>
    </article>
  );
}
