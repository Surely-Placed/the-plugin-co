import { getDivision } from "../../lib/divisions";
import { StoriesTemplate } from "../../components/templates/StoriesTemplate";

export function CareersSuccessStoriesPage() {
  const { content } = getDivision("careers");
  return <StoriesTemplate division="careers" content={content.stories} />;
}
