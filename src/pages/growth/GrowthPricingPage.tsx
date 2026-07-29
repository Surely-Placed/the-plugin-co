import { getDivision } from "../../lib/divisions";
import { PricingTemplate } from "../../components/templates/PricingTemplate";

export function GrowthPricingPage() {
  const { content } = getDivision("growth");
  return <PricingTemplate division="growth" content={content.pricing} />;
}
