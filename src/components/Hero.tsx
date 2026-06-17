"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CylinderCarousel from "./CylinderCarousel";
import { projects } from "@/data/projects";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  return (
    <section
      className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-ink"
      aria-label="Featured projects"
    >
      {/* ── Background: ambient glow that shifts with active project ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Radial glow — right side, behind carousel */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-radial from-coral/12 via-sunset/6 to-transparent blur-3xl translate-x-1/3" />
        {/* Secondary teal glow — top left */}
        <div className="absolute -left-32 -top-32 w-[500px] h-[500px] rounded-full bg-teal/5 blur-3xl" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-16 lg:gap-8">

          {/* ── Left: text ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-8">
              <span className="text-teal text-xs">✦</span>
              <span className="label text-white/60 text-[10px]">
                Web Experience Studio
              </span>
            </div>

            {/* Headline */}
            <h1 className="heading-display text-[clamp(3.5rem,8vw,7.5rem)] text-white leading-[0.88] mb-6 tracking-tighter">
              WE BUILD
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-sunset to-coral bg-[length:200%] animate-[shimmer_4s_ease_infinite]">
                WEBSITES
              </span>
              <br />
              THAT HIT
              <br />
              DIFFERENT
            </h1>

            <p className="text-white/50 text-base md:text-lg font-body mb-10 max-w-md">
              High quality.&nbsp;&nbsp;High impact.&nbsp;&nbsp;Visually striking.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#work"
                className="inline-flex items-center gap-2 glass border-white/20 hover:border-coral/60 text-white label px-6 py-3 rounded-full transition-all duration-300 hover:text-coral"
              >
                See Our Work ↓
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white label px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,94,91,0.55)]"
              >
                Start a Project
              </a>
            </div>

            {/* Active project callout */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 pt-6 border-t border-white/10"
            >
              <div className="w-1.5 h-8 bg-coral rounded-full flex-shrink-0" />
              <div>
                <p className="label text-teal text-[9px] mb-0.5">{project.category}</p>
                <p className="heading-display text-white text-base">{project.title}</p>
                <p className="text-white/40 text-xs font-body mt-0.5">{project.description}</p>
              </div>
              <a
                href="#work"
                className="ml-auto label text-white/30 hover:text-teal transition-colors text-[10px] flex-shrink-0"
              >
                View All ▸
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: 3D cylinder carousel ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 hidden sm:flex items-center justify-center"
            style={{ perspective: "none" }} // let CylinderCarousel manage its own
          >
            <CylinderCarousel onSlideChange={setActiveIndex} />
          </motion.div>

        </div>
      </div>

      {/* ── Bottom diagonal fade ──────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0B0B0F)" }}
      />
    </section>
  );
}
