"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";

const AUTO_MS = 6000;
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const N = projects.length;

const imgVariants = {
  enter: (dir: number) => ({
    x: dir * 60, scale: 1.08, opacity: 0,
  }),
  center: {
    x: 0, scale: 1, opacity: 1,
    transition: { duration: 1.0, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir * -40, scale: 0.97, opacity: 0,
    transition: { duration: 0.6, ease: EASE },
  }),
};

const infoVariants = {
  enter: { y: 16, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.45, delay: 0.35 } },
  exit:   { y: -8, opacity: 0, transition: { duration: 0.25 } },
};

export default function Hero() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const rafRef   = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  const goTo = useCallback((i: number, d: number) => {
    setDir(d);
    setActive(i);
    setProgress(0);
    startRef.current = Date.now();
  }, []);

  const next = useCallback(() => goTo((active + 1) % N, 1), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + N) % N, -1), [active, goTo]);

  useEffect(() => {
    if (prefersReduced) return;
    const tick = () => {
      const pct = Math.min((Date.now() - startRef.current) / AUTO_MS, 1);
      setProgress(pct);
      if (pct >= 1) { next(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, next, prefersReduced]);

  const project = projects[active];

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-ink"
      aria-label="Featured projects"
    >
      {/* ── Full-bleed cinematic background ──────────────── */}
      <AnimatePresence mode="sync" custom={dir}>
        <motion.div
          key={active}
          custom={dir}
          variants={prefersReduced ? {} : imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={project.heroBgUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between pt-28 pb-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Studio headline — static, always visible */}
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-8 w-fit"
          >
            <span className="text-teal text-xs">✦</span>
            <span className="label text-white/60 text-[10px]">Web Experience Studio</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="heading-display text-[clamp(3.5rem,8.5vw,8rem)] text-white leading-[0.88] tracking-tighter mb-6"
          >
            WE BUILD
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-sunset to-coral bg-[length:200%] animate-[shimmer_4s_ease_infinite]">
              WEBSITES
            </span>
            <br />
            THAT HIT
            <br />
            DIFFERENT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/50 text-base md:text-lg font-body mb-10 max-w-md"
          >
            High quality.&nbsp;&nbsp;High impact.&nbsp;&nbsp;Visually striking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
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
          </motion.div>
        </div>

        {/* ── Bottom bar: project info + controls ──────── */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">

          {/* Active project info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={infoVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <span className="block label text-teal text-[9px] mb-1.5">{project.category}</span>
              <span className="block heading-display text-white text-2xl md:text-3xl leading-tight">
                {project.title}
              </span>
              <span className="block text-white/40 text-sm font-body mt-1">{project.description}</span>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnail strip + prev/next */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Thumbnails */}
            <div className="hidden sm:flex gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  aria-label={`Go to ${p.title}`}
                  className={`relative rounded overflow-hidden transition-all duration-300 ${
                    i === active
                      ? "w-14 h-10 ring-1 ring-coral"
                      : "w-9 h-10 opacity-35 hover:opacity-65"
                  }`}
                >
                  <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
              >←</button>
              <button
                onClick={next}
                aria-label="Next project"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
              >→</button>
            </div>

            {/* Slide counter */}
            <div className="flex items-center gap-1.5 ml-1">
              <span className="heading-display text-coral text-sm">{String(active + 1).padStart(2, "0")}</span>
              <span className="text-white/20 text-xs">/</span>
              <span className="heading-display text-white/30 text-sm">{String(N).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Coral progress line ──────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20">
        <motion.div
          className="h-full bg-coral origin-left"
          style={{ scaleX: progress }}
        />
      </div>
    </section>
  );
}
