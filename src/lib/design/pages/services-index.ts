import type { DesignServiceSlug } from "../service-slugs";
import type { DesignServicePage } from "../types";
import { serviceAiContent } from "./service-ai-content";
import { serviceBrandStrategy } from "./service-brand-strategy";
import { serviceContentCreativeStrategy } from "./service-content-creative-strategy";
import { servicePerformanceCreative } from "./service-performance-creative";
import { servicePerformanceMarketing } from "./service-performance-marketing";
import { serviceSoftwareCrmDevelopment } from "./service-software-crm-development";
import { serviceWebsiteDevelopment } from "./service-website-development";

export const designServices: Record<DesignServiceSlug, DesignServicePage> = {
  "performance-marketing": servicePerformanceMarketing,
  "ai-content": serviceAiContent,
  "performance-creative": servicePerformanceCreative,
  "website-development": serviceWebsiteDevelopment,
  "content-creative-strategy": serviceContentCreativeStrategy,
  "brand-strategy": serviceBrandStrategy,
  "software-crm-development": serviceSoftwareCrmDevelopment,
};