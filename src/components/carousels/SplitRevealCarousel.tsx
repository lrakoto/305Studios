"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function SplitRevealCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);

  const goTo = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div className="flex w-full h-full min-h-[85vh] bg-ink overflow-hidden">

      {/* ── Left: project list ──────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center gap-0 w-[38%] px-12 lg:px-16 flex-shrink-0 border-r border-white/8">
        {/* Section label */}
        <p className="label text-white/30 text-[10px] mb-10 flex items-center gap-2">
          <span className="text-coral">✦</span> Selected Work
        </p>

        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            className="group text-left py-5 border-b border-white/8 last:border-0 flex items-center gap-5 transition-all duration-200"
          >
            {/* Number */}
            <span
              className={`heading-display text-sm transition-colors duration-300 ${
                i === active ? "text-coral" : "text-white/20 group-hover:text-white/40"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Title + description */}
            <div className="flex-1 min-w-0">
              <span
                className={`block heading-display text-xl md:text-2xl leading-tight transition-colors duration-300 ${
                  i === active ? "text-white" : "text-white/35 group-hover:text-white/60"
                }`}
              >
                {p.title}
              </span>
              <motion.span
                animate={{ opacity: i === active ? 1 : 0, height: i === active ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="block text-white/40 text-xs font-body mt-1 overflow-hidden"
              >
                {p.description}
              </motion.span>
            </div>

            {/* Arrow */}
            <motion.span
              animate={{ x: i === active ? 0 : -6, opacity: i === active ? 1 : 0 }}
              className="text-coral text-sm flex-shrink-0"
            >
              →
            </motion.span>
          </button>
        ))}

        {/* Active category badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-10"
          >
            <span className="glass px-3 py-1.5 rounded-full label text-teal text-[9px]">
              {projects[active].category}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: image with wipe reveal ─────────────────── */}
      <div className="relative flex-1 overflow-hidden bg-ink/50">
        <AnimatePresence mode="popLayout" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.75, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={projects[active].heroBgUrl}
              alt={projects[active].title}
              fill
              className="object-cover"
              sizes="65vw"
              priority
            />
            {/* Dark vignette on left edge to blend with panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Large project title overlay — bottom left */}
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <p className="label text-teal text-[10px] mb-2">{projects[active].category}</p>
              <h2 className="heading-display text-5xl md:text-7xl text-white leading-none">
                {projects[active].title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide counter */}
        <div className="absolute top-8 right-8 z-10 flex items-center gap-2">
          <span className="heading-display text-coral text-sm">{String(active + 1).padStart(2, "0")}</span>
          <span className="heading-display text-white/20 text-sm">/ {String(projects.length).padStart(2, "0")}</span>
        </div>

        {/* Prev / Next */}
        <div className="absolute bottom-8 right-8 z-10 flex gap-3">
          <button
            onClick={() => goTo((active - 1 + projects.length) % projects.length)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-all"
          >←</button>
          <button
            onClick={() => goTo((active + 1) % projects.length)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-all"
          >→</button>
        </div>
      </div>
    </div>
  );
}
