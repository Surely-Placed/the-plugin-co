import {
  Briefcase,
  FileText,
  GraduationCap,
  MessageSquare,
  Network,
  Plane,
  Users,
} from "lucide-react";

export const careerServiceIconMap = {
  "cv-linkedin": FileText,
  "graduate-schemes": GraduationCap,
  "interview-coaching": MessageSquare,
  "job-search-strategy": Briefcase,
  "networking-referrals": Network,
  "visa-guidance": Plane,
  mentorship: Users,
} as const;

export type CareerServiceSlug = keyof typeof careerServiceIconMap;

export function getCareerServiceIcon(slug: string) {
  return careerServiceIconMap[slug as CareerServiceSlug] ?? Briefcase;
}
