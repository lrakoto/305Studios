"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";

const N = projects.length;

// Visual slot config for cards in the deck (index 0 = bottom, 2 = top)
const SLOTS = [
  { x: 28,  y: 28,  rotate: -5,   scale: 0.84, opacity: 0.4,  zIndex: 1 },
  { x: 14,  y: 14,  rotate: -2.5, scale: 0.92, opacity: 0.65, zIndex: 2 },
  { x: 0,   y: 0,   rotate: 0,    scale: 1,    opacity: 1,    zIndex: 3 },
];

const PEEL_EXIT = {
  x: 120,
  y: -260,
  rotate: 22,
  scale: 0.7,
  opacity: 0,
  transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] },
};

const RISE_ENTER = {
  initial: { y: 80, opacity: 0, scale: 0.9, rotate: -8 },
  animate: { y: SLOTS[0].y, opacity: SLOTS[0].opacity, scale: SLOTS[0].scale, rotate: SLOTS[0].rotate },
};

export default function StackedDeckCarousel() {
  // topIndex is the project shown on the top of the deck
  const [topIndex, setTopIndex] = useState(0);
  const [exiting, setExiting]   = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const advance = useCallback(() => {
    if (exiting !== null) return;
    setExiting(topIndex);
    setTimeout(() => {
      setTopIndex(i => (i + 1) % N);
      setExiting(null);
    }, 580);
  }, [topIndex, exiting]);

  const prev = useCallback(() => {
    if (exiting !== null) return;
    setTopIndex(i => (i - 1 + N) % N);
  }, [exiting]);

  // Visible deck: [top-2, top-1, top] from bottom to top
  const deckIndices = [
    (topIndex - 2 + N) % N,
    (topIndex - 1 + N) % N,
    topIndex,
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] bg-ink gap-14 select-none px-4">

      {/* ── Deck stage ─────────────────────────────────────── */}
      <div className="relative" style={{ width: 320, height: 440 }}>

        {/* Static back cards */}
        {deckIndices.slice(0, 2).map((pIdx, slotI) => (
          <motion.div
            key={`back-${pIdx}`}
            animate={{
              x: SLOTS[slotI].x,
              y: SLOTS[slotI].y,
              rotate: SLOTS[slotI].rotate,
              scale: SLOTS[slotI].scale,
              opacity: SLOTS[slotI].opacity,
            }}
            transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 28 }}
            style={{ position: "absolute", inset: 0, zIndex: SLOTS[slotI].zIndex }}
            className="rounded-sm overflow-hidden"
          >
            <Image
              src={projects[pIdx].imageUrl}
              alt={projects[pIdx].title}
              fill
              className="object-cover"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-ink/40" />
          </motion.div>
        ))}

        {/* Top card — exits on advance */}
        <AnimatePresence>
          {exiting === null && (
            <motion.div
              key={`top-${topIndex}`}
              initial={prefersReduced ? false : { x: SLOTS[2].x, y: SLOTS[2].y, rotate: SLOTS[2].rotate, scale: SLOTS[2].scale, opacity: 0 }}
              animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              exit={prefersReduced ? {} : PEEL_EXIT}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              style={{ position: "absolute", inset: 0, zIndex: 3 }}
              className="rounded-sm overflow-hidden cursor-pointer"
              onClick={advance}
            >
              <Image
                src={projects[topIndex].imageUrl}
                alt={projects[topIndex].title}
                fill
                className="object-cover"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

              {/* Card info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="block label text-teal text-[9px] mb-1.5">{projects[topIndex].category}</span>
                <span className="block heading-display text-white text-xl leading-tight">{projects[topIndex].title}</span>
                <span className="block text-white/50 text-xs font-body mt-1.5">{projects[topIndex].description}</span>
              </div>

              {/* Tap hint */}
              <div className="absolute top-4 right-4">
                <span className="label text-white/30 text-[9px]">tap to advance</span>
              </div>

              {/* Coral ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-coral/40 rounded-sm" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Controls + counter ─────────────────────────────── */}
      <div className="flex items-center gap-6 z-10">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-all label text-xs"
        >←</button>

        <div className="flex items-center gap-2">
          <span className="heading-display text-coral text-sm">{String(topIndex + 1).padStart(2, "0")}</span>
          <span className="text-white/20 text-xs">/</span>
          <span className="heading-display text-white/30 text-sm">{String(N).padStart(2, "0")}</span>
        </div>

        <button
          onClick={advance}
          disabled={exiting !== null}
          className="w-10 h-10 rounded-full bg-coral/90 hover:bg-coral flex items-center justify-center text-white transition-all label text-xs disabled:opacity-40"
        >→</button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => !exiting && setTopIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === topIndex ? "w-6 h-1.5 bg-coral" : "w-1.5 h-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
