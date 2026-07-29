import gsap from "gsap";

export type RevealEffect =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "rotate"
  | "blur"
  | "clip"
  | "flip";

export type StaggerEffect = "rise" | "cascade" | "wave" | "flip" | "zoom";

export type MediaEffect = "zoom" | "clip" | "slide" | "kenburns" | "tilt";

type ScrollVars = NonNullable<gsap.TweenVars["scrollTrigger"]>;

export function getRevealFrom(el: Element): RevealEffect {
  const v = el.getAttribute("data-reveal");
  if (!v || v === "true") return "up";
  return v as RevealEffect;
}

export function getStaggerEffect(group: Element): StaggerEffect {
  return (group.getAttribute("data-stagger") as StaggerEffect) || "rise";
}

export function getMediaEffect(el: Element): MediaEffect {
  return (el.getAttribute("data-reveal-media") as MediaEffect) || "zoom";
}

const revealFrom: Record<RevealEffect, gsap.TweenVars> = {
  up: { y: 56, opacity: 0 },
  down: { y: -48, opacity: 0 },
  left: { x: -72, opacity: 0 },
  right: { x: 72, opacity: 0 },
  scale: { scale: 0.82, opacity: 0 },
  rotate: { y: 40, rotation: 6, opacity: 0 },
  blur: { y: 32, opacity: 0, filter: "blur(14px)" },
  clip: { y: 40, clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
  flip: { rotationX: -22, y: 36, opacity: 0, transformPerspective: 900 },
};

const revealTo: Record<RevealEffect, gsap.TweenVars> = {
  up: { y: 0, opacity: 1, filter: "blur(0px)" },
  down: { y: 0, opacity: 1, filter: "blur(0px)" },
  left: { x: 0, opacity: 1, filter: "blur(0px)" },
  right: { x: 0, opacity: 1, filter: "blur(0px)" },
  scale: { scale: 1, opacity: 1, filter: "blur(0px)" },
  rotate: { y: 0, rotation: 0, opacity: 1, filter: "blur(0px)" },
  blur: { y: 0, opacity: 1, filter: "blur(0px)" },
  clip: { y: 0, clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
  flip: { rotationX: 0, y: 0, opacity: 1, filter: "blur(0px)" },
};

export function animateReveal(
  targets: Element | Element[],
  effect: RevealEffect,
  scrollTrigger: ScrollVars
) {
  return gsap.fromTo(targets, revealFrom[effect], {
    ...revealTo[effect],
    duration: effect === "clip" ? 1.1 : effect === "flip" ? 1 : 0.95,
    ease: effect === "clip" ? "power4.inOut" : "power3.out",
    stagger: 0.1,
    scrollTrigger,
  });
}

/** Hero / above-the-fold. Animate immediately on mount, not on scroll */
export function animateRevealImmediate(
  target: Element,
  effect: RevealEffect,
  delay = 0
) {
  return gsap.fromTo(target, revealFrom[effect], {
    ...revealTo[effect],
    duration: effect === "clip" ? 1 : 0.85,
    ease: "power3.out",
    delay,
  });
}

export function animateStaggerGroup(
  items: Element[],
  effect: StaggerEffect,
  scrollTrigger: ScrollVars
) {
  const base = { scrollTrigger, duration: 0.85, ease: "power3.out" as const };

  switch (effect) {
    case "wave":
      return gsap.fromTo(
        items,
        { y: 80, opacity: 0, rotation: -4 },
        { y: 0, opacity: 1, rotation: 0, stagger: { each: 0.14, from: "center" }, ...base }
      );
    case "flip":
      return gsap.fromTo(
        items,
        { rotationY: 28, opacity: 0, transformPerspective: 800 },
        { rotationY: 0, opacity: 1, stagger: 0.11, ...base }
      );
    case "zoom":
      return gsap.fromTo(
        items,
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, ...base }
      );
    case "cascade":
      return gsap.fromTo(
        items,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, ...base }
      );
    default:
      return gsap.fromTo(
        items,
        { y: 64, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.12, ...base }
      );
  }
}

export function animateMedia(el: Element, effect: MediaEffect, trigger: Element) {
  const st = { trigger, start: "top 85%", once: true };

  if (effect === "clip") {
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 100% 0% 0%)", scale: 1.05 },
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.2, ease: "power4.inOut", scrollTrigger: st }
    );
  } else if (effect === "slide") {
    gsap.fromTo(
      el,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: st }
    );
  } else if (effect === "kenburns") {
    gsap.fromTo(
      el,
      { scale: 1.18, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out", scrollTrigger: st }
    );
    gsap.to(el, {
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1.5 },
    });
  } else if (effect === "tilt") {
    gsap.fromTo(
      el,
      { y: 60, rotation: 3, opacity: 0 },
      { y: 0, rotation: 0, opacity: 1, duration: 1.15, ease: "power3.out", scrollTrigger: st }
    );
  } else {
    gsap.fromTo(
      el,
      { scale: 1.14, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.15, ease: "power2.out", scrollTrigger: st }
    );
  }

  if (effect !== "kenburns") {
    gsap.to(el, {
      y: effect === "slide" ? -24 : -48,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1.2 },
    });
  }
}
