"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";

const AUTO_MS = 6000;
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const imageVariants = {
  enter: (dir: number) => ({
    x: dir * 60,
    scale: 1.08,
    opacity: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir * -40,
    scale: 0.96,
    opacity: 0,
    transition: { duration: 0.55, ease: EASE },
  }),
};

const titleVariants = {
  enter: { x: -80, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
  },
  exit: {
    x: 60,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const metaVariants = {
  enter: { y: 16, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.5 } },
  exit:   { y: -8, opacity: 0, transition: { duration: 0.2 } },
};

export default function CinematicCarousel() {
  const N = projects.length;
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

  const next = useCallback(() => goTo((active + 1) % N, 1), [active, N, goTo]);
  const prev = useCallback(() => goTo((active - 1 + N) % N, -1), [active, N, goTo]);

  // Progress tick
  useEffect(() => {
    if (prefersReduced) return;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / AUTO_MS, 1);
      setProgress(pct);
      if (pct >= 1) { next(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, next, prefersReduced]);

  return (
    <div className="relative w-full min-h-[85vh] bg-ink overflow-hidden">

      {/* ── Full-bleed image ───────────────────────────────── */}
      <AnimatePresence mode="sync" custom={dir}>
        <motion.div
          key={active}
          custom={dir}
          variants={prefersReduced ? {} : imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={projects[active].heroBgUrl}
            alt={projects[active].title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="relative z-10 h-full min-h-[85vh] flex flex-col justify-end pb-20 px-10 md:px-16 lg:px-24">

        {/* Category badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`meta-${active}`}
            variants={metaVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex items-center gap-3 mb-5"
          >
            <span className="glass px-3 py-1.5 rounded-full label text-teal text-[10px]">
              {projects[active].category}
            </span>
            <span className="label text-white/30 text-[10px]">
              {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Giant title */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-${active}`}
            variants={prefersReduced ? {} : titleVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="heading-display text-[clamp(3rem,9vw,8rem)] text-white leading-none mb-4"
          >
            {projects[active].title}
          </motion.h2>
        </AnimatePresence>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${active}`}
            variants={metaVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-white/50 font-body text-base max-w-md mb-10"
          >
            {projects[active].description}
          </motion.p>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-all"
          >←</button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-all"
          >→</button>

          {/* Thumbnail strip */}
          <div className="flex gap-2 ml-4">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i, i > active ? 1 : -1)}
                className={`relative rounded overflow-hidden transition-all duration-300 ${
                  i === active ? "w-14 h-10 ring-1 ring-coral" : "w-9 h-10 opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Coral progress line ────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20">
        <motion.div
          className="h-full bg-coral origin-left"
          style={{ scaleX: progress }}
        />
      </div>
    </div>
  );
}
