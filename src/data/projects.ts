export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  heroBgUrl: string;
  featured?: boolean;
  span?: "wide" | "tall" | "large";
}

export const projects: Project[] = [
  {
    id: "gundry-md",
    title: "GUNDRY MD",
    description: "High-traffic e-commerce rebuild — Builder.io + Salesforce",
    category: "Frontend Dev",
    imageUrl: "https://picsum.photos/seed/gundrymd/900/600",
    heroBgUrl: "https://picsum.photos/seed/gundrymd/1920/1080",
    featured: true,
    span: "large",
  },
  {
    id: "autodex",
    title: "AUTODEX",
    description: "Car database web app with API integration & authentication",
    category: "Web Design",
    imageUrl: "https://picsum.photos/seed/autodex/900/1100",
    heroBgUrl: "https://picsum.photos/seed/autodex/1920/1080",
    span: "tall",
  },
  {
    id: "badlands",
    title: "BADLANDS",
    description: "Brand experience & design system",
    category: "Brand & Design",
    imageUrl: "https://picsum.photos/seed/badlands305/900/600",
    heroBgUrl: "https://picsum.photos/seed/badlands305/1920/1080",
  },
  {
    id: "newegg",
    title: "NEWEGG",
    description: "Email marketing & visual design at scale",
    category: "Visual Design",
    imageUrl: "https://picsum.photos/seed/newegg305/900/600",
    heroBgUrl: "https://picsum.photos/seed/newegg305/1920/1080",
    span: "wide",
  },
  {
    id: "mattel",
    title: "MATTEL",
    description: "UI/UX design & Figma-to-production implementation",
    category: "UI/UX",
    imageUrl: "https://picsum.photos/seed/mattel305/900/600",
    heroBgUrl: "https://picsum.photos/seed/mattel305/1920/1080",
  },
  {
    id: "usc",
    title: "USC",
    description: "Frontend development & CMS integration",
    category: "Frontend Dev",
    imageUrl: "https://picsum.photos/seed/usc305/900/600",
    heroBgUrl: "https://picsum.photos/seed/usc305/1920/1080",
  },
];
