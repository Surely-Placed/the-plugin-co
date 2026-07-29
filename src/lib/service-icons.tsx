import {
  BarChart3,
  Bot,
  Globe,
  Layers,
  Megaphone,
  Monitor,
  Palette,
  Share2,
} from "lucide-react";

export const serviceIconMap = {
  "performance-marketing": Megaphone,
  "seo-content": Globe,
  "social-media": Share2,
  "web-development": Monitor,
  "branding-design": Palette,
  "ai-workflows": Bot,
  "data-intelligence": BarChart3,
  "content-systems": Layers,
} as const;

export type ServiceSlug = keyof typeof serviceIconMap;

export function getServiceIcon(slug: string) {
  return serviceIconMap[slug as ServiceSlug] ?? Megaphone;
}
