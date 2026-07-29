import type { ReactNode } from "react";
import { GsapReveal } from "../effects/GsapReveal";
import type { RevealEffect } from "../../lib/gsapEffects";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  effect?: RevealEffect;
}

export function FadeIn({ children, delay = 0, className = "", effect = "up" }: FadeInProps) {
  return (
    <GsapReveal delay={delay} className={className} effect={effect}>
      {children}
    </GsapReveal>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = true,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && <p className="label-xs mb-4">{eyebrow}</p>}
      <h2
        className={`heading-section whitespace-pre-line ${dark ? "text-white" : "text-white/90"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`prose-body mt-5 max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
