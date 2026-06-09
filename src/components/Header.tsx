"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink/80 border-b border-white/10"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <a
          href="#"
          className="flex-shrink-0 border border-white/40 px-3 py-1.5 hover:border-coral transition-colors duration-300"
          aria-label="305 Studios home"
        >
          <span className="heading-display text-sm md:text-base text-white tracking-[0.12em]">
            305 STUDIOS
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label text-white/60 hover:text-teal transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white label px-4 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,94,91,0.5)]"
        >
          Start a Project
        </a>

        {/* Mobile hamburger */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="p-2 text-white/70 hover:text-white transition-colors"
      >
        <span className="block w-6 h-0.5 bg-current mb-1.5 transition-all" />
        <span
          className={`block w-4 h-0.5 bg-current transition-all ${open ? "w-6" : ""}`}
        />
        <span className="block w-6 h-0.5 bg-current mt-1.5" />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 glass-dark border-t border-white/10 px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="label text-white/70 hover:text-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="label bg-coral text-white px-4 py-2.5 rounded-full text-center hover:bg-coral/90 transition-colors"
          >
            Start a Project
          </a>
        </motion.div>
      )}
    </div>
  );
}
