import type { PortfolioFilterKey } from "../../lib/portfolio";

interface PortfolioFiltersProps {
  filters: Record<PortfolioFilterKey, string>;
  options: Record<PortfolioFilterKey, string[]>;
  optionLabels?: Partial<Record<PortfolioFilterKey, Record<string, string>>>;
  onChange: (key: PortfolioFilterKey, value: string) => void;
}

const filterLabels: Record<PortfolioFilterKey, string> = {
  industry: "Industry",
  service: "Service",
  resultType: "Result Type",
  platform: "Platform",
};

export function PortfolioFilters({
  filters,
  options,
  optionLabels,
  onChange,
}: PortfolioFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {(Object.keys(filterLabels) as PortfolioFilterKey[]).map((key) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label className="label-xs">{filterLabels[key]}</label>
          <select
            value={filters[key]}
            onChange={(e) => onChange(key, e.target.value)}
            className="rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs text-white backdrop-blur-sm focus:border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/10"
          >
            {options[key].map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All"
                  ? `All ${filterLabels[key]}`
                  : (optionLabels?.[key]?.[opt] ?? opt)}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
