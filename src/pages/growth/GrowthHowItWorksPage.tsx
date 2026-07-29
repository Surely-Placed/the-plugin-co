import { getDivision } from "../../lib/divisions";
import { HowItWorksTemplate } from "../../components/templates/HowItWorksTemplate";

export function GrowthHowItWorksPage() {
  const { content } = getDivision("growth");
  return <HowItWorksTemplate division="growth" content={content.process} />;
}
