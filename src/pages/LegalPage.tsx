import { Navigate, useLocation } from "react-router-dom";
import { LegalPageTemplate } from "../components/templates/LegalPageTemplate";
import { legalPages } from "../lib/legal";

export function LegalPage() {
  const { pathname } = useLocation();
  const content = legalPages[pathname];

  if (!content) {
    return <Navigate to="/" replace />;
  }

  return <LegalPageTemplate content={content} />;
}
