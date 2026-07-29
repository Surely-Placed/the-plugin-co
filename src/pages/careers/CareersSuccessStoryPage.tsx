import { Navigate, useParams } from "react-router-dom";
import { SuccessStoryPageContent } from "../../components/templates/SuccessStoryPageContent";
import { getDivision } from "../../lib/divisions";
import { getSuccessStory } from "../../lib/careers/success-stories";

export function CareersSuccessStoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const story = slug ? getSuccessStory(slug) : undefined;
  const basePath = getDivision("careers").routes.stories;

  if (!story) {
    return <Navigate to={basePath} replace />;
  }

  return <SuccessStoryPageContent story={story} basePath={basePath} />;
}
