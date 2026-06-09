"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { label: "Email", href: "mailto:hello@threeohfivestudios.com", icon: "✉" },
  { label: "Twitter / X", href: "https://x.com/305studios", icon: "𝕏" },
  { label: "Instagram", href: "https://instagram.com/305studios", icon: "◎" },
  { label: "LinkedIn", href: "https://linkedin.com/company/305studios", icon: "in" },
  { label: "Dribbble", href: "https://dribbble.com/305studios", icon: "⬡" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-mist clip-diagonal-top pt-24 pb-24 md:pt-32 md:pb-36 -mt-12 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-coral/10 via-sunset/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-ink/15 px-3 py-1.5 rounded-full mb-8">
            <span className="text-coral text-xs">✦</span>
            <span className="label text-ink/50 text-[10px]">Let&apos;s Work Together</span>
          </div>

          <h2 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink mb-6 leading-none">
            GOT SOMETHING
            <br />
            <span className="text-coral">TO BUILD?</span>
          </h2>

          <p className="text-ink/60 text-base md:text-lg font-body mb-10 max-w-xl mx-auto">
            Tell us about your project. We&apos;ll get back to you within 24 hours
            with ideas, questions, and honest feedback.
          </p>

          <a
            href="mailto:hello@threeohfivestudios.com"
            className="inline-flex items-center gap-3 bg-coral hover:bg-coral/90 text-white heading-display text-xl px-10 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_48px_rgba(255,94,91,0.5)] mb-14"
          >
            START A PROJECT
            <span aria-hidden="true">→</span>
          </a>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-ink/10">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 label text-ink/40 hover:text-teal transition-colors duration-200 text-xs"
                aria-label={link.label}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
