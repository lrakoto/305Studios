"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. Default 6. */
  intensity?: number;
}

export default function TiltCard({ children, className, intensity = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 280, damping: 30, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  // rotateY responds to horizontal mouse movement, rotateX to vertical
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - left) / width - 0.5);
      rawY.set((e.clientY - top) / height - 0.5);
    },
    [prefersReduced, rawX, rawY]
  );

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        prefersReduced
          ? undefined
          : {
              // perspective() in the transform chain is what makes rotateX/Y visible
              perspective: 900,
              rotateX,
              rotateY,
              willChange: "transform",
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
