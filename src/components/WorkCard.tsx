"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface WorkCardProps {
  project: Project;
  index: number;
}

export default function WorkCard({ project, index }: WorkCardProps) {
  const spanClass =
    project.span === "large"
      ? "col-span-2 row-span-2"
      : project.span === "wide"
      ? "col-span-2"
      : project.span === "tall"
      ? "row-span-2"
      : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-sm bg-white/5 cursor-pointer ${spanClass}`}
    >
      {/* Image */}
      <div className="relative w-full h-full min-h-[280px] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Default gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

        {/* Coral border on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-coral/70 transition-all duration-300 rounded-sm" />
      </div>

      {/* Category tag — top-left */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-block glass px-3 py-1 rounded-full label text-teal text-[10px]">
          {project.category}
        </span>
      </div>

      {/* Project info — bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="heading-display text-white text-xl md:text-2xl mb-1 leading-tight">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm font-body line-clamp-1 transition-colors duration-200 group-hover:text-white/70">
          {project.description}
        </p>

        {/* Hover arrow */}
        <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="label text-coral text-[10px]">View Project</span>
          <span className="text-coral text-xs">→</span>
        </div>
      </div>
    </motion.article>
  );
}
