export function TpInShort({ label, children }: { label: string; children: string }) {
  return (
    <div className="tp-in-short">
      <span className="tp-in-short__label">{label}</span>
      <p className="tp-in-short__body">{children}</p>
    </div>
  );
}