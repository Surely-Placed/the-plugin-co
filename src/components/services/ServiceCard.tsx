import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ServiceListing } from "../../lib/services";
import { getServiceIcon } from "../../lib/service-icons";
import { getServiceVisual } from "../../lib/visuals";
import { SiteImage } from "../ui/SiteImage";
import { divisions } from "../../lib/divisions";

interface ServiceCardProps {
  service: ServiceListing;
  index: number;
  large?: boolean;
  basePath?: string;
}

export function ServiceCard({
  service,
  index,
  large = false,
  basePath = divisions.growth.routes.services,
}: ServiceCardProps) {
  const Icon = getServiceIcon(service.slug);
  const visual = getServiceVisual(service.slug);

  return (
    <article
      className={`card-stack group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-accent/25 hover:shadow-glass-lg ${
        large ? "p-0" : "p-7"
      }`}
    >
      {large && visual.image && (
        <div className="relative h-40 shrink-0 overflow-hidden">
          <SiteImage
            src={visual.image}
            alt={visual.alt}
            width={800}
            height={320}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        </div>
      )}

      <div className={`card-stack__grow relative ${large ? "flex flex-col p-9 md:p-10" : "flex flex-col"}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent-light/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-accent/8 group-hover:to-accent-light/10" />

        <div className="relative flex flex-1 flex-col">
          <div
            className={`mb-6 flex shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white ${
              large ? "h-16 w-16" : "h-14 w-14"
            }`}
          >
            <Icon size={large ? 28 : 24} strokeWidth={1.5} />
          </div>

          <p className="label-xs mb-3 shrink-0 text-accent">
            Service {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="heading-card-lg shrink-0">{service.title}</h3>
          <p className="mt-2 shrink-0 font-mono text-lg font-medium text-accent">{service.tagline}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-white/75 md:text-base">
            {service.shortDescription}
          </p>

          <Link
            to={`${basePath}/${service.slug}`}
            className="touch-target label-xs card-stack__footer mt-auto inline-flex min-h-11 items-center gap-2 py-2 text-white transition-all group-hover:gap-3 group-hover:text-accent"
          >
            Explore Service
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
