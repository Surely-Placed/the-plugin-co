import { getDivision } from "../../lib/divisions";
import { ServicesTemplate } from "../../components/templates/ServicesTemplate";

export function GrowthServicesPage() {
  const { content } = getDivision("growth");
  return <ServicesTemplate division="growth" content={content.services} />;
}
