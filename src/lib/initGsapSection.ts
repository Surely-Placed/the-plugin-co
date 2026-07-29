import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  animateMedia,
  animateReveal,
  animateStaggerGroup,
  getMediaEffect,
  getRevealFrom,
  getStaggerEffect,
} from "./gsapEffects";

gsap.registerPlugin(ScrollTrigger);

/** GSAP scroll animations. Varied effects per data-attribute */
export function initGsapSection(section: HTMLElement) {
  return gsap.context(() => {
    section.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
      const items = gsap.utils.toArray<Element>(group.children);
      if (!items.length) return;
      animateStaggerGroup(items, getStaggerEffect(group), {
        trigger: group,
        start: "top 82%",
        once: true,
      });
    });

    const standalone = Array.from(section.querySelectorAll("[data-reveal]")).filter(
      (el) => !el.closest("[data-reveal-stagger]")
    );

    standalone.forEach((el, i) => {
      const effect = getRevealFrom(el);
      animateReveal(el, effect, {
        trigger: el,
        start: "top 86%",
        once: true,
      });
      if (standalone.length > 1 && i === 0) {
        gsap.set(el, { delay: 0 });
      }
    });

    section.querySelectorAll("[data-reveal-media]").forEach((media) => {
      animateMedia(media, getMediaEffect(media), media);
    });

    const heading = section.querySelector("[data-section-line]");
    if (heading) {
      gsap.fromTo(
        heading,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: heading, start: "top 90%", once: true },
        }
      );
    }

    section.querySelectorAll("[data-float]").forEach((el) => {
      gsap.to(el, {
        y: -12,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, section);
}
