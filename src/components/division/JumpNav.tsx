interface JumpNavProps {
  items: { id: string; label: string }[];
  accent?: "growth" | "careers";
}

export function JumpNav({ items, accent = "careers" }: JumpNavProps) {
  const activeClass =
    accent === "careers"
      ? "jump-nav__pill--careers"
      : "jump-nav__pill--growth";

  return (
    <nav className="jump-nav" aria-label="Jump to section">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={`jump-nav__pill ${activeClass}`}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
