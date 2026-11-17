import { lazy, Suspense, useEffect, useState } from "react";

const PluginCubeCanvas = lazy(() => import("./PluginCubeCanvas"));

function PluginCubeFallback() {
  return (
    <div
      className="flex aspect-square w-full max-w-[min(520px,88vw)] items-center justify-center rounded-3xl border border-tp-border-subtle bg-[#061428]"
      data-tp-keep
      aria-hidden
    >
      <img
        src="/assets/photo-4-strategy-workshop-800.webp"
        alt=""
        className="h-full w-full rounded-3xl object-cover opacity-80"
      />
    </div>
  );
}

export function PluginCubeHero() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => setEnabled(!reduced);
    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
        () => {
          setMounted(true);
          run();
        },
      );
    } else {
      setMounted(true);
      run();
    }
  }, []);

  return (
    <div id="tp-3d" className="relative mx-auto w-full max-w-[min(560px,92vw)]" data-tp-keep>
      {!mounted || !enabled ? (
        <PluginCubeFallback />
      ) : (
        <Suspense fallback={<PluginCubeFallback />}>
          <PluginCubeCanvas />
        </Suspense>
      )}
    </div>
  );
}