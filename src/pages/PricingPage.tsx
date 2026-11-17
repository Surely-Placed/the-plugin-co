import { DesignMarketingPage } from "../components/design/DesignMarketingPage";
import { pagePricing } from "../lib/design/pages/page-pricing";
import { growthRoutes } from "../lib/design/routes";

export function PricingPage() {
  return (
    <DesignMarketingPage path={growthRoutes.pricing} page={pagePricing} breadcrumbLabel="PRICING" />
  );
}