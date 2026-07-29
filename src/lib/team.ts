export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  focusAreas: string[];
  currentMission: string;
  linkedin?: string;
  twitter?: string;
  image?: string;
}

export const founders: Founder[] = [
  {
    id: "founder-1",
    name: "Founder Name",
    role: "Founder & Growth Strategist",
    bio: "Obsessed with building growth systems that scale. Bridges marketing, sales, and operations into one cohesive engine.",
    focusAreas: [
      "Performance Marketing",
      "Sales",
      "Business Growth",
      "Operations",
    ],
    currentMission: "Building scalable growth systems.",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: "founder-2",
    name: "Co-Founder Name",
    role: "Co-Founder & Technology Lead",
    bio: "Engineers intelligent infrastructure that removes friction and multiplies output. Believes automation should feel invisible.",
    focusAreas: [
      "Development",
      "Automation",
      "AI Systems",
      "Product Engineering",
    ],
    currentMission: "Building intelligent business infrastructure.",
    linkedin: "#",
    twitter: "#",
  },
];

export const openPositions = [
  "Frontend Developer",
  "Growth Marketer",
  "AI Automation Engineer",
  "Content Strategist",
  "UI Designer",
] as const;
