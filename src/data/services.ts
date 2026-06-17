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
      "Visual systems that speak before a word is read. From design systems to full UI/UX flows, every element is crafted to be bold, cohesive, and conversion-ready.",
    icon: "✦",
    tags: ["UI/UX Design", "Design Systems", "Visual Design", "Figma"],
  },
  {
    id: "s2",
    title: "Frontend Engineering",
    blurb:
      "Pixel-perfect, performant builds from Figma to production. React, Next.js, and modern stacks — clean code that ships fast and scales cleanly.",
    icon: "◈",
    tags: ["React", "Next.js", "TypeScript", "Builder.io"],
  },
  {
    id: "s3",
    title: "CMS & Platform Builds",
    blurb:
      "Headless CMS setups, WordPress builds, and complex platform integrations — including Salesforce-backed e-commerce at high-traffic scale.",
    icon: "◎",
    tags: ["WordPress", "Builder.io", "Salesforce", "Headless CMS"],
  },
  {
    id: "s4",
    title: "Performance & CRO",
    blurb:
      "Fast sites rank, and tested sites convert. A/B testing, analytics instrumentation, Core Web Vitals tuning, and data-driven iteration baked into every project.",
    icon: "⬡",
    tags: ["A/B Testing", "CRO", "Core Web Vitals", "Analytics"],
  },
];
