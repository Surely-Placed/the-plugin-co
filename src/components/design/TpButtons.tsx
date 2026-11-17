import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useBookCall } from "../book-call/BookCallProvider";
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
  const { openBookCall } = useBookCall();
  return (
    <button
      type="button"
      data-cta={cta}
      className={className}
      onClick={() => {
        trackCtaClick(cta);
        openBookCall();
      }}
    >
      {children}
    </button>
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