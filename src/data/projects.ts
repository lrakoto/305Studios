export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  /** used for the hero background (wider crop) */
  heroBgUrl: string;
  /** optional: span extra columns or rows in the work grid */
  featured?: boolean;
  span?: "wide" | "tall" | "large";
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "SOLARIS AGENCY",
    description: "Brand identity & immersive web experience",
    category: "Web Design",
    imageUrl: "https://picsum.photos/seed/solaris/900/600",
    heroBgUrl: "https://picsum.photos/seed/solaris/1920/1080",
    featured: true,
    span: "large",
  },
  {
    id: "p2",
    title: "FORM & VOID",
    description: "Conceptual portfolio for a Berlin architect",
    category: "Frontend Dev",
    imageUrl: "https://picsum.photos/seed/formvoid/900/1100",
    heroBgUrl: "https://picsum.photos/seed/formvoid/1920/1080",
    span: "tall",
  },
  {
    id: "p3",
    title: "NEON NORTH",
    description: "E-commerce & motion for a streetwear label",
    category: "Interactive",
    imageUrl: "https://picsum.photos/seed/neonnorth/900/600",
    heroBgUrl: "https://picsum.photos/seed/neonnorth/1920/1080",
  },
  {
    id: "p4",
    title: "ATLAS COLLECTIVE",
    description: "Data-driven dashboard with real-time motion",
    category: "Frontend Dev",
    imageUrl: "https://picsum.photos/seed/atlas/900/600",
    heroBgUrl: "https://picsum.photos/seed/atlas/1920/1080",
    span: "wide",
  },
  {
    id: "p5",
    title: "MIRA BEAUTY",
    description: "Luxury e-commerce with 3D product viewer",
    category: "3D & Motion",
    imageUrl: "https://picsum.photos/seed/mirabeauty/900/600",
    heroBgUrl: "https://picsum.photos/seed/mirabeauty/1920/1080",
  },
  {
    id: "p6",
    title: "DUNE STUDIOS",
    description: "Creative agency site with scroll-driven narrative",
    category: "Web Design",
    imageUrl: "https://picsum.photos/seed/dunestudios/900/600",
    heroBgUrl: "https://picsum.photos/seed/dunestudios/1920/1080",
  },
];

export const heroProjects = projects.slice(0, 4);
