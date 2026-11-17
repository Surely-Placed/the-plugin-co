import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import { TpFinalCta } from "../design/TpFinalCta";

interface DivisionCTAProps {
  division: DivisionId;
  title?: string;
  subtitle?: string;
}

export function DivisionCTA({ division, title, subtitle }: DivisionCTAProps) {
  const config = getDivision(division);

  if (division === "growth") {
    return (
      <TpFinalCta
        title={title ?? "Make your mark in the digital world."}
        body={
          subtitle ??
          "Book a call, or start with a free growth audit. No commitment, just clarity on your next move."
        }
      />
    );
  }

  return (
    <TpFinalCta
      title={title ?? "Ready to plug in?"}
      body={subtitle ?? config.ctaLabel}
    />
  );
}