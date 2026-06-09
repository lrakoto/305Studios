"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-sand clip-diagonal-top-lg pt-24 pb-24 md:pt-32 md:pb-36 -mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <div className="inline-block border border-ink/20 px-3 py-1 mb-6">
            <span className="label text-ink/50 text-[10px]">What We Do</span>
          </div>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-none">
            DESIGN, BUILD,
            <br />
            LAUNCH —
            <br />
            <span className="text-coral">DONE RIGHT.</span>
          </h2>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="group bg-white border border-ink/8 p-6 hover:border-teal/50 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(27,199,180,0.12)]"
            >
              {/* Icon */}
              <div className="text-2xl text-teal mb-5 group-hover:scale-110 transition-transform duration-200 inline-block">
                {service.icon}
              </div>

              <h3 className="heading-display text-ink text-lg mb-3">
                {service.title}
              </h3>

              <p className="text-ink/60 text-sm leading-relaxed font-body mb-5">
                {service.blurb}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label text-teal bg-teal/10 px-2 py-1 text-[9px] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white label px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,94,91,0.5)]"
          >
            Start a Project
          </a>
          <a
            href="#studio"
            className="inline-flex items-center gap-2 border border-ink/25 text-ink/70 hover:border-ink hover:text-ink label px-6 py-3 rounded-full transition-all duration-200"
          >
            See Our Process
          </a>
        </motion.div>
      </div>
    </section>
  );
}
