import { getDivision } from "../../lib/divisions";
import { ServicesTemplate } from "../../components/templates/ServicesTemplate";

export function CareersServicesPage() {
  const { content } = getDivision("careers");
  return <ServicesTemplate division="careers" content={content.services} />;
}
