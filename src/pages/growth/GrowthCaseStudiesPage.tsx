import { getDivision } from "../../lib/divisions";
import { StoriesTemplate } from "../../components/templates/StoriesTemplate";

export function GrowthCaseStudiesPage() {
  const { content } = getDivision("growth");
  return <StoriesTemplate division="growth" content={content.stories} />;
}
