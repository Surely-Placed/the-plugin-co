import { Navigate, useParams } from "react-router-dom";
import { CaseStudyPageContent } from "../../components/templates/CaseStudyPageContent";
import { getCaseStudy } from "../../lib/portfolio";
import { getDivision } from "../../lib/divisions";

export function GrowthCaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;
  const basePath = getDivision("growth").routes.stories;

  if (!study) {
    return <Navigate to={basePath} replace />;
  }

  return <CaseStudyPageContent study={study} basePath={basePath} />;
}
