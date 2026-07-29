/** Dark navy + black section backgrounds. Each pattern uses a different gradient layout. */
export const sectionGradients = {
  flow: "bg-gradient-flow",
  rise: "bg-gradient-rise",
  deep: "bg-gradient-deep",
  slash: "bg-gradient-slash",
  slashReverse: "bg-gradient-slash-reverse",
  band: "bg-gradient-band",
  apex: "bg-gradient-apex",
  base: "bg-gradient-base",
  vault: "bg-gradient-vault",
  cta: "bg-gradient-cta",
  footer: "bg-gradient-footer",
} as const;

export type SectionGradient = keyof typeof sectionGradients;

/** Gradient + soft edge feathering at section seams (backdrop only. Content stays crisp). */
export function sectionGradientClass(gradient: SectionGradient): string {
  return `${sectionGradients[gradient]} section-soft-blend relative isolate`;
}

/** Background gradient only (no edge feather). For nested overlays like page heroes. */
export function sectionGradientBg(gradient: SectionGradient): string {
  return sectionGradients[gradient];
}

/** Edge feather only. Use with custom backgrounds (e.g. hero). */
export function sectionBlendClass(options?: {
  top?: boolean;
  bottom?: boolean;
  media?: boolean;
}): string {
  const top = options?.top !== false;
  const bottom = options?.bottom !== false;
  const flags = [
    "section-soft-blend",
    "relative",
    "isolate",
    !top && "section-soft-blend--no-top",
    !bottom && "section-soft-blend--no-bottom",
    options?.media && "section-soft-blend--media",
  ]
    .filter(Boolean)
    .join(" ");
  return flags;
}
