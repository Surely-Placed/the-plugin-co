import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BOOK_CALL_URL } from "../../lib/design/navigation";
import { trackCtaClick } from "../../lib/design/cta";

type BtnProps = {
  cta?: string;
  className?: string;
  children?: ReactNode;
};

export function TpBookCallLink({
  cta = "book",
  className = "tp-btn-primary",
  children = (
    <>
      BOOK A CALL <span aria-hidden>→</span>
    </>
  ),
}: BtnProps) {
  return (
    <a
      href={BOOK_CALL_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={cta}
      className={className}
      onClick={() => trackCtaClick(cta)}
    >
      {children}
    </a>
  );
}

export function TpAuditLink({
  href,
  cta = "audit",
  className = "tp-btn-secondary",
}: {
  href: string;
  cta?: string;
  className?: string;
}) {
  return (
    <Link
      to={href}
      data-cta={cta}
      className={className}
      onClick={() => trackCtaClick(cta)}
    >
      GET A FREE AUDIT <span aria-hidden>→</span>
    </Link>
  );
}