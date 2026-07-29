import { getDivision } from "../../lib/divisions";
import { HowItWorksTemplate } from "../../components/templates/HowItWorksTemplate";

export function CareersHowItWorksPage() {
  const { content } = getDivision("careers");
  return <HowItWorksTemplate division="careers" content={content.process} />;
}
