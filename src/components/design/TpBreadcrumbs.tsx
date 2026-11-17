import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  href?: string;
}

export function TpBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="tp-container py-0">
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-[11px] tracking-[0.14em] text-tp-muted">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link to={item.href} className="text-tp-muted-strong transition-colors hover:text-tp-cyan">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-tp-text">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}