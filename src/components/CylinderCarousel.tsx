"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";

const AUTO_ADVANCE_MS = 4000;
const N = projects.length; // 6

// ── Slot definitions (mirrored from ApeChain's exact transform values) ─────
// Each card lands in a slot based on its offset from the active index.
// offset 0   → center (featured)
// offset 1   → right background
// offset N-1 → left background  (= -1 in circular terms)
// all others → hidden (off-screen staging)

type SlotKey = "center" | "right" | "left" | "hidden-right" | "hidden-left";

const SLOTS: Record<
  SlotKey,
  {
    x: string;
    y: string;
    z: number;
    rotateY: number;
    opacity: number;
    // inner-card tilt (applied on the card face itself, like ApeChain)
    innerRotateX?: number;
    innerRotateY?: number;
    innerRotateZ?: number;
    innerScale?: number;
    zIndex: number;
  }
> = {
  center: {
    x: "0%",
    y: "-5%",
    z: 0,
    rotateY: 0,
    opacity: 1,
    // ApeChain's exact inner tilt on the featured card
    innerRotateX: 7.5,
    innerRotateY: -15,
    innerRotateZ: 2.5,
    innerScale: 1.25,
    zIndex: 10,
  },
  right: {
    // ApeChain: translate(0%, -6.17%) translate3d(0,0,-350px) rotateY(-25deg) opacity 0.4
    x: "72%",
    y: "-6%",
    z: -350,
    rotateY: -25,
    opacity: 0.4,
    innerRotateX: 7.5,
    innerRotateY: -15,
    innerRotateZ: 2.5,
    innerScale: 1,
    zIndex: 5,
  },
  left: {
    // ApeChain: translate(-100%, -15.4%) translate3d(0,0,-500px) rotateY(-9.6deg) opacity 0.2
    x: "-100%",
    y: "-15%",
    z: -500,
    rotateY: -9.6,
    opacity: 0.2,
    innerRotateX: 7.5,
    innerRotateY: -15,
    innerRotateZ: 2.5,
    innerScale: 1,
    zIndex: 3,
  },
  "hidden-right": {
    // Staging area off-screen right — cards wait here before entering
    x: "160%",
    y: "-6%",
    z: -600,
    rotateY: -35,
    opacity: 0,
    zIndex: 1,
  },
  "hidden-left": {
    // Exit area off-screen left — cards go here after leaving
    x: "-180%",
    y: "-15%",
    z: -700,
    rotateY: -5,
    opacity: 0,
    zIndex: 1,
  },
};

function getSlotKey(offset: number): SlotKey {
  if (offset === 0) return "center";
  if (offset === 1) return "right";
  if (offset === N - 1) return "left";
  // All other offsets: half go right-staging, half go left-staging
  if (offset <= N / 2) return "hidden-right";
  return "hidden-left";
}

interface Props {
  onSlideChange?: (index: number) => void;
}

export default function CylinderCarousel({ onSlideChange }: Props) {
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      setActive(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  const next = useCallback(() => goTo((active + 1) % N), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + N) % N), [active, goTo]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [next, prefersReduced]);

  return (
    <div className="relative flex flex-col items-end gap-8 select-none w-full">
      {/* ── 3D Stage ──────────────────────────────────────────────── */}
      {/*
        Container: perspective mirrors ApeChain's --perspective: 1000px.
        overflow-visible so side cards bleed out.
        The stage fills the right half of the hero.
      */}
      <div
        className="relative w-full"
        style={{
          height: 480,
          perspective: 1000,
          perspectiveOrigin: "45% 48%",
        }}
      >
        {projects.map((project, i) => {
          const offset = ((i - active) % N + N) % N;
          const slotKey = getSlotKey(offset);
          const slot = SLOTS[slotKey];

          const outerTransform = `translate(${slot.x}, ${slot.y}) translate3d(0px, 0px, ${slot.z}px) rotateY(${slot.rotateY}deg)`;

          const innerTransform = slot.innerScale
            ? `perspective(800px) scale(${slot.innerScale}) rotateX(${slot.innerRotateX ?? 0}deg) rotateY(${slot.innerRotateY ?? 0}deg) rotateZ(${slot.innerRotateZ ?? 0}deg)`
            : undefined;

          return (
            <motion.div
              key={project.id}
              onClick={() => goTo(i)}
              role="button"
              tabIndex={slotKey === "center" ? 0 : -1}
              aria-label={`Project: ${project.title}`}
              onKeyDown={(e) => e.key === "Enter" && goTo(i)}
              // Outer: positions on the cylinder surface
              animate={{
                opacity: slot.opacity,
                zIndex: slot.zIndex,
                transform: outerTransform,
              }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      duration: 1.0,
                      ease: [0.25, 0.1, 0.25, 1.0],
                    }
              }
              style={{
                position: "absolute",
                // Card base dimensions (before innerScale)
                width: 300,
                height: 400,
                transformOrigin: "50% 50%",
                cursor: slotKey === "center" ? "default" : "pointer",
                willChange: "transform, opacity",
              }}
            >
              {/* Inner card — gets the dramatic 3D face tilt */}
              <div
                className="relative w-full h-full rounded-sm overflow-hidden"
                style={innerTransform ? { transform: innerTransform, willChange: "transform" } : undefined}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                  priority={i === 0}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

                {/* Active card: coral ring */}
                {slotKey === "center" && (
                  <div className="absolute inset-0 ring-1 ring-inset ring-coral/60 rounded-sm" />
                )}

                {/* Card label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="block label text-teal text-[9px] mb-1">
                    {project.category}
                  </span>
                  <span className="block heading-display text-white text-sm leading-tight">
                    {project.title}
                  </span>
                  {slotKey === "center" && (
                    <span className="block text-white/50 text-xs font-body mt-1 line-clamp-1">
                      {project.description}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Controls ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 pr-2">
        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist">
          {projects.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${
                i === active
                  ? "w-6 h-1.5 bg-coral"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-all text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-all text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
