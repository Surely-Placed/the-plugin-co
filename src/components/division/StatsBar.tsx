import type { Stat } from "../../lib/content-types";

interface StatsBarProps {
  stats: readonly Stat[];
  className?: string;
}

export function StatsBar({ stats, className = "" }: StatsBarProps) {
  return (
    <div className={`grid grid-cols-2 gap-6 md:grid-cols-4 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center md:text-left">
          <p className="font-display text-3xl font-extrabold text-white md:text-4xl">{stat.value}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
