"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: 10, label: "Years Crafting the Web", suffix: "+" },
  { value: 50, label: "Projects Shipped", suffix: "+" },
  { value: 95, label: "Avg. Lighthouse Score", suffix: "+" },
];

function StatCounter({
  value,
  label,
  suffix,
  delay,
}: {
  value: number;
  label: string;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const duration = 1600;
    const startTime = performance.now() + delay * 1000;
    let raf: number;

    const tick = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setDisplay(Math.round(eased * value));
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, delay, prefersReduced]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="heading-display text-5xl md:text-6xl text-teal mb-2 tabular-nums">
        {display}
        {suffix}
      </p>
      <p className="label text-white/40 text-[11px]">{label}</p>
    </div>
  );
}

export default function Studio() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="bg-ink py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-16 md:mb-20"
        >
          <span className="text-coral text-sm">✦</span>
          <span className="label text-white/40 text-[10px]">The Studio</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — founder photo + glow */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-coral/20 via-sunset/10 to-teal/10 rounded-full blur-3xl opacity-60" />

            {/* Photo placeholder */}
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-sm overflow-hidden">
              <Image
                src="https://picsum.photos/seed/lova/600/800"
                alt="Lova Rakotomavonandrianina — Founder & Creative Lead"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />

              {/* Name plate */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="heading-display text-white text-xl mb-0.5">
                  LOVA RAKOTOMAVONANDRIANINA
                </p>
                <p className="label text-teal text-[10px]">
                  Founder &amp; Creative Lead
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-white mb-8 leading-none">
              BUILT ON
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-sunset">
                CRAFT
              </span>
              ,<br />
              DRIVEN BY
              <br />
              IMPACT.
            </h2>

            <div className="space-y-5 text-white/60 font-body leading-relaxed mb-10">
              <p>
                I use code and visual design to build brand experiences. 305
                Studios is the studio behind the work — where strategy, design,
                and engineering come together into something that actually moves
                people.
              </p>
              <p>
                Over 10 years I&apos;ve shipped for brands like Gundry MD, Newegg,
                Mattel, and USC — from high-traffic e-commerce rebuilds to
                design systems built for scale. Currently Design Engineer at
                Golden Hippo.
              </p>
              <p>
                Based in Los Angeles.&nbsp;
                <span className="text-white/40">Working worldwide.</span>
              </p>
            </div>

            {/* Stat counters */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <StatCounter key={stat.label} {...stat} delay={0.3 + i * 0.15} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
