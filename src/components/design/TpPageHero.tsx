import type { ReactNode } from "react";
import { TpBookCallLink, TpAuditLink } from "./TpButtons";
import { divisions } from "../../lib/divisions";

type TpPageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  inShort?: { label: string; body: string };
  showCtas?: boolean;
  children?: ReactNode;
  image?: { src: string; alt: string };
};

export function TpPageHero({
  eyebrow,
  title,
  lead,
  inShort,
  showCtas = true,
  children,
  image,
}: TpPageHeroProps) {
  const auditHref = divisions.growth.routes.book;

  return (
    <section className="tp-hero">
      <div className={`tp-container ${image ? "tp-hero__grid" : ""}`}>
        <div className="flex min-w-0 flex-col gap-5">
          <p className="tp-eyebrow">{eyebrow}</p>
          <h1 className="tp-heading-hero text-balance">{title}</h1>
          {lead ? (
            <p className="max-w-[560px] font-mono text-sm leading-relaxed text-tp-muted-strong md:text-[15px]">
              {lead}
            </p>
          ) : null}
          {inShort ? (
            <div className="tp-in-short">
              <span className="tp-in-short__label">{inShort.label}</span>
              <p className="tp-in-short__body">{inShort.body}</p>
            </div>
          ) : null}
          {children}
          {showCtas ? (
            <div className="flex flex-wrap gap-3">
              <TpBookCallLink cta="hero-book" />
              <TpAuditLink href={auditHref} cta="hero-audit" />
            </div>
          ) : null}
        </div>
        {image ? (
          <div className="tp-hero-media">
            <img src={image.src} alt={image.alt} loading="eager" className="tp-hero-media__img" />
            <div className="tp-hero-media__shade" />
          </div>
        ) : null}
      </div>
    </section>
  );
}