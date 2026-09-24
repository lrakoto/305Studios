"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { projects } from "@/data/projects";
import { useReducedMotion } from "framer-motion";

const CARD_W  = 300;
const CARD_H  = 400;
const GAP     = 20;
const STEP    = CARD_W + GAP;
const AUTO_MS = 3500;

function cardStyle(offset: number) {
  const abs = Math.abs(offset);
  return {
    scale:   abs === 0 ? 1 : abs === 1 ? 0.82 : abs === 2 ? 0.68 : 0.55,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.50 : abs === 2 ? 0.25 : 0,
    zIndex:  10 - abs,
    filter:  abs === 0 ? "saturate(1)" : `saturate(${Math.max(0, 1 - abs * 0.35)})`,
  };
}

export default function SpotlightCarousel() {
  const N           = projects.length;
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const x = useMotionValue(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const update = () => setCw(containerRef.current?.clientWidth ?? 0);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const targetX = useCallback(
    (idx: number) => cw / 2 - CARD_W / 2 - idx * STEP,
    [cw]
  );

  useEffect(() => {
    if (!cw) return;
    if (prefersReduced) { x.set(targetX(active)); return; }
    animate(x, targetX(active), { type: "spring", stiffness: 180, damping: 28 });
  }, [active, cw, x, targetX, prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setActive(i => (i + 1) % N), AUTO_MS);
    return () => clearInterval(id);
  }, [N, prefersReduced]);

  const dragConstraints = { left: targetX(N - 1) - 60, right: targetX(0) + 60 };

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -40) setActive(i => Math.min(i + 1, N - 1));
    if (info.offset.x >  40) setActive(i => Math.max(i - 1, 0));
  }

  return (
    <div className="relative w-full select-none" style={{ height: CARD_H + 100 }}>
      {/* Spotlight vignette */}
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse 40% 100% at 50% 50%, transparent 30%, #0B0B0F 100%)",
        }}
      />

      {/* Draggable card strip */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={dragConstraints}
          onDragEnd={handleDragEnd}
          style={{ x, display: "flex", alignItems: "center", gap: GAP, height: "100%", cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project, i) => {
            const offset = i - active;
            const s = cardStyle(offset);
            return (
              <motion.div
                key={project.id}
                animate={s}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                onClick={() => setActive(i)}
                style={{ width: CARD_W, height: CARD_H, flexShrink: 0, position: "relative", zIndex: s.zIndex }}
                className="rounded-sm overflow-hidden cursor-pointer"
              >
                <Image src={project.imageUrl} alt={project.title} fill className="object-cover" sizes={`${CARD_W}px`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

                {/* Active card label */}
                <motion.div
                  animate={{ opacity: offset === 0 ? 1 : 0, y: offset === 0 ? 0 : 12 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-5"
                >
                  <span className="block label text-teal text-[9px] mb-1">{project.category}</span>
                  <span className="block heading-display text-white text-lg leading-tight">{project.title}</span>
                  <span className="block text-white/50 text-xs font-body mt-1">{project.description}</span>
                </motion.div>

                {/* Active ring */}
                {offset === 0 && <div className="absolute inset-0 ring-1 ring-inset ring-coral/50 rounded-sm" />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-30">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-6 h-1.5 bg-coral" : "w-1.5 h-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
