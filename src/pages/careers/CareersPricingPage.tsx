import { getDivision } from "../../lib/divisions";
import { PricingTemplate } from "../../components/templates/PricingTemplate";

export function CareersPricingPage() {
  const { content } = getDivision("careers");
  return <PricingTemplate division="careers" content={content.pricing} />;
}
