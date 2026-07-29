import { Check } from "lucide-react";

interface DeliverablesGridProps {
  items: string[];
}

export function DeliverablesGrid({ items }: DeliverablesGridProps) {
  const iconClass = "text-flow-light";

  return (
    <ul className="deliverable-grid">
      {items.map((item) => (
        <li key={item} className="deliverable-pill">
          <Check size={16} className={`mt-0.5 shrink-0 ${iconClass}`} strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
