import { lazy, Suspense, useEffect, useState } from "react";

const RubiksCubeCanvas = lazy(() => import("./RubiksCubeCanvas"));

function RubiksCubeFallback() {
  return (
    <div className="rubiks-cube-fallback" aria-hidden>
      <div className="rubiks-cube-fallback__cube">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="rubiks-cube-fallback__tile" />
        ))}
      </div>
    </div>
  );
}

function getRubiksCubeEnabled() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

export function RubiksCubeHero() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEnabled(getRubiksCubeEnabled());
    setMounted(true);
  }, []);

  const content =
    !mounted || !enabled ? (
      <RubiksCubeFallback />
    ) : (
      <Suspense fallback={<RubiksCubeFallback />}>
        <RubiksCubeCanvas />
      </Suspense>
    );

  return (
    <div className="hero-cube-stage">
      <div className="hero-cube-stage__glow" aria-hidden />
      <div className="rubiks-cube-hero">{content}</div>
    </div>
  );
}
