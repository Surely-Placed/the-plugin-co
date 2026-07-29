import type { CSSProperties } from "react";

type StarColor = "cyan" | "blue" | "purple";

interface StarConfig {
  id: number;
  top: string;
  left: string;
  length: number;
  thickness: number;
  delay: number;
  duration: number;
  opacity: number;
  color: StarColor;
}

const STAR_COLORS: Record<StarColor, string> = {
  cyan: "#22d3ee",
  blue: "#60a5fa",
  purple: "#c084fc",
};

/** Fixed configs so layout is stable across renders. */
const STARS: StarConfig[] = [
  { id: 0, top: "4%", left: "-8%", length: 180, thickness: 1.5, delay: 0, duration: 4.2, opacity: 0.95, color: "cyan" },
  { id: 1, top: "12%", left: "18%", length: 120, thickness: 1, delay: 1.8, duration: 3.6, opacity: 0.7, color: "blue" },
  { id: 2, top: "22%", left: "-5%", length: 220, thickness: 2, delay: 3.4, duration: 5.1, opacity: 0.85, color: "purple" },
  { id: 3, top: "8%", left: "42%", length: 90, thickness: 1, delay: 5.2, duration: 2.8, opacity: 0.55, color: "cyan" },
  { id: 4, top: "35%", left: "8%", length: 160, thickness: 1.5, delay: 0.6, duration: 4.8, opacity: 0.8, color: "blue" },
  { id: 5, top: "48%", left: "-12%", length: 200, thickness: 1.5, delay: 7.1, duration: 4.4, opacity: 0.75, color: "purple" },
  { id: 6, top: "18%", left: "62%", length: 110, thickness: 1, delay: 2.3, duration: 3.2, opacity: 0.65, color: "cyan" },
  { id: 7, top: "58%", left: "22%", length: 140, thickness: 1.5, delay: 4.5, duration: 3.9, opacity: 0.7, color: "blue" },
  { id: 8, top: "72%", left: "-6%", length: 250, thickness: 2, delay: 6.3, duration: 5.6, opacity: 0.9, color: "cyan" },
  { id: 9, top: "28%", left: "78%", length: 85, thickness: 1, delay: 8.4, duration: 2.6, opacity: 0.5, color: "purple" },
  { id: 10, top: "65%", left: "48%", length: 130, thickness: 1, delay: 1.2, duration: 3.5, opacity: 0.6, color: "blue" },
  { id: 11, top: "42%", left: "55%", length: 170, thickness: 1.5, delay: 9.1, duration: 4.1, opacity: 0.8, color: "cyan" },
  { id: 12, top: "82%", left: "12%", length: 190, thickness: 1.5, delay: 3.8, duration: 4.6, opacity: 0.75, color: "purple" },
  { id: 13, top: "52%", left: "68%", length: 100, thickness: 1, delay: 6.8, duration: 3.1, opacity: 0.55, color: "blue" },
  { id: 14, top: "88%", left: "35%", length: 155, thickness: 1.5, delay: 10.2, duration: 4.3, opacity: 0.7, color: "cyan" },
  { id: 15, top: "15%", left: "88%", length: 75, thickness: 1, delay: 11.5, duration: 2.4, opacity: 0.45, color: "purple" },
  { id: 16, top: "38%", left: "32%", length: 145, thickness: 1.5, delay: 12.8, duration: 3.8, opacity: 0.65, color: "blue" },
  { id: 17, top: "76%", left: "58%", length: 115, thickness: 1, delay: 13.6, duration: 3.3, opacity: 0.6, color: "cyan" },
];

interface ShootingStarsProps {
  className?: string;
  density?: "light" | "normal";
}

export function ShootingStars({ className = "", density = "normal" }: ShootingStarsProps) {
  const stars = density === "light" ? STARS.filter((_, i) => i % 2 === 0) : STARS;

  return (
    <div
      className={`shooting-stars pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={
            {
              "--star-top": star.top,
              "--star-left": star.left,
              "--star-length": `${star.length}px`,
              "--star-thickness": `${star.thickness}px`,
              "--star-delay": `${star.delay}s`,
              "--star-duration": `${star.duration}s`,
              "--star-peak-opacity": star.opacity,
              "--star-color": STAR_COLORS[star.color],
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
