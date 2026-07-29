import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "lines" | "words";
}

export function TextReveal({
  children,
  as: Tag = "h1",
  className = "",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parts =
      splitBy === "lines"
        ? children.split("\n")
        : children.split(/(\s+)/).filter(Boolean);

    el.innerHTML = parts
      .map((part, idx) => {
        if (splitBy === "lines" && idx < parts.length - 1) {
          return `<span class="block overflow-hidden pb-[0.12em]"><span class="inline-block reveal-part">${part}</span></span>`;
        }
        if (part.trim() === "") return part;
        return `<span class="inline-block overflow-hidden align-bottom pb-[0.14em]"><span class="inline-block reveal-part">${part}</span></span>`;
      })
      .join(splitBy === "lines" ? "" : "");

    const targets = el.querySelectorAll(".reveal-part");
    gsap.fromTo(
      targets,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: splitBy === "lines" ? 0.14 : 0.04,
        delay,
        ease: "power4.out",
      }
    );
  }, [children, delay, splitBy]);

  return <Tag ref={ref as never} className={className} />;
}
