import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollCounterProps {
  value: string;
  label: string;
  className?: string;
}

function parseValue(raw: string): {
  num: number;
  prefix: string;
  suffix: string;
  static: boolean;
} {
  const match = raw.match(/^([^0-9]*)([0-9.]+)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: raw, static: true };
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
    static: false,
  };
}

export function ScrollCounter({ value, label, className = "" }: ScrollCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const parsed = parseValue(value);

  useEffect(() => {
    const el = ref.current;
    const numEl = numRef.current;
    if (!el || !numEl) return;

    if (parsed.static) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
      numEl.textContent = value;
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: parsed.num,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        const display =
          parsed.num % 1 !== 0
            ? obj.val.toFixed(1)
            : Math.round(obj.val).toString();
        numEl.textContent = `${parsed.prefix}${display}${parsed.suffix}`;
      },
    });
  }, [parsed, value]);

  return (
    <div ref={ref} className={className}>
      <p className="font-display text-4xl font-extrabold text-white md:text-5xl">
        <span ref={numRef}>{parsed.static ? value : `${parsed.prefix}0${parsed.suffix}`}</span>
      </p>
      <p className="label-xs mt-2 !text-white/60">{label}</p>
    </div>
  );
}
