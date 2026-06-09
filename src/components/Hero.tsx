"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { heroProjects } from "@/data/projects";

const AUTO_ADVANCE_MS = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const prev = useCallback(() => {
    goTo((current - 1 + heroProjects.length) % heroProjects.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % heroProjects.length);
  }, [current, goTo]);

  /* ── Auto-advance + progress bar ─────────────────────────────── */
  useEffect(() => {
    if (prefersReduced) return;

    const tick = 50;
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
      setProgress(pct);
      if (elapsed >= AUTO_ADVANCE_MS) {
        setCurrent((c) => (c + 1) % heroProjects.length);
        startTimeRef.current = Date.now();
      }
    }, tick);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prefersReduced]);

  const project = heroProjects[current];

  return (
    <section
      className="relative w-full h-[92vh] min-h-[600px] overflow-hidden bg-ink"
      aria-label="Featured projects carousel"
    >
      {/* ── Background crossfade ─────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={project.heroBgUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
          {/* Coral/sunset glow */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-coral/10 via-sunset/5 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content layout ───────────────────────────────────── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-20">
        <div className="flex items-end justify-between gap-8">
          {/* ── Bottom-left: headline + CTA ─────────────────── */}
          <div className="flex-1 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + "-text"}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-6">
                  <span className="text-teal text-xs">✦</span>
                  <span className="label text-white/70 text-[10px]">
                    Web Experience Studio
                  </span>
                </div>

                {/* Main heading */}
                <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-[0.9]">
                  WE BUILD
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-sunset to-coral">
                    WEBSITES
                  </span>
                  <br />
                  THAT HIT
                  <br />
                  DIFFERENT
                </h1>

                <p className="text-white/60 text-base md:text-lg mb-8 font-body">
                  High quality.&nbsp; High impact.&nbsp; Visually striking.
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 glass-dark border-white/20 hover:border-coral text-white label px-6 py-3 rounded-full transition-all duration-300 hover:text-coral"
                  >
                    See Our Work
                    <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white label px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,94,91,0.6)]"
                  >
                    Start a Project
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Bottom-right: thumbnail switcher ────────────── */}
          <div className="hidden lg:flex flex-col items-end gap-4">
            <a
              href="#work"
              className="label text-white/40 hover:text-teal transition-colors text-xs mb-2"
            >
              View All Work ▸
            </a>

            <div className="flex gap-3" role="tablist" aria-label="Project slides">
              {heroProjects.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to slide ${i + 1}: ${p.title}`}
                  onClick={() => goTo(i)}
                  className={`relative overflow-hidden rounded transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${
                    i === current
                      ? "w-20 h-14 ring-1 ring-coral"
                      : "w-14 h-10 opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {/* Coral progress bar on active */}
                  {i === current && (
                    <span
                      className="absolute bottom-0 left-0 h-0.5 bg-coral transition-none"
                      style={{ width: `${progress}%` }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Project info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id + "-thumb"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-right"
              >
                <p className="label text-teal text-[10px]">{project.category}</p>
                <p className="heading-display text-white text-sm mt-0.5">
                  {project.title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Slide counter ─────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-8">
          <span className="heading-display text-coral text-sm">
            {String(current + 1).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-white/20">
            <div
              className="h-full bg-coral transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="heading-display text-white/30 text-sm">
            {String(heroProjects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Prev / Next controls ─────────────────────────────── */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button
          onClick={prev}
          aria-label="Previous project"
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
        >
          ↑
        </button>
        <button
          onClick={next}
          aria-label="Next project"
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
        >
          ↓
        </button>
      </div>

      {/* ── Diagonal bottom fade ─────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #0B0B0F)",
        }}
      />
    </section>
  );
}
