export interface Service {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  tags: string[];
}

export const services: Service[] = [
  {
    id: "s1",
    title: "Brand & Web Design",
    blurb:
      "Visual systems that speak before a word is read. From logo mark to full brand language, we craft identities that are bold, cohesive, and built to stand out.",
    icon: "✦",
    tags: ["Brand Identity", "UI/UX", "Design Systems", "Figma"],
  },
  {
    id: "s2",
    title: "Frontend Engineering",
    blurb:
      "Pixel-perfect, performant builds using Next.js, TypeScript, and the modern web stack. We write code that's as clean as the designs it ships.",
    icon: "◈",
    tags: ["Next.js", "TypeScript", "React", "Tailwind"],
  },
  {
    id: "s3",
    title: "Interactive & Motion",
    blurb:
      "Scroll-driven narratives, 3D product viewers, and micro-interactions that make visitors stop and say 'how did they do that?'",
    icon: "◎",
    tags: ["Framer Motion", "Three.js", "GSAP", "WebGL"],
  },
  {
    id: "s4",
    title: "Performance & SEO",
    blurb:
      "Fast sites rank. Fast sites convert. We tune for Lighthouse 90+ across every category — Core Web Vitals, accessibility, and structured data included.",
    icon: "⬡",
    tags: ["Core Web Vitals", "SEO", "a11y", "Analytics"],
  },
];
