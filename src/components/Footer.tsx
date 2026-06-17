const footerLinks = {
  Studio: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Studio", href: "#studio" },
    { label: "Contact", href: "#contact" },
  ],
  Social: [
    { label: "LinkedIn", href: "https://linkedin.com/in/lovarakoto" },
    { label: "Behance", href: "https://behance.net/lovarakoto" },
    { label: "Vimeo", href: "https://vimeo.com/threeohfivestudios" },
    { label: "Email", href: "mailto:lova@threeohfivestudios.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <div className="inline-block border border-white/30 px-3 py-1.5 mb-5">
              <span className="heading-display text-white text-sm tracking-[0.12em]">
                305 STUDIOS
              </span>
            </div>
            <p className="text-white/40 text-sm font-body leading-relaxed max-w-xs">
              A web experience studio that builds high-quality, high-impact,
              visually striking websites.
            </p>
            <p className="label text-teal text-[10px] mt-4">
              Los Angeles, CA — Working Worldwide
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="label text-white/20 text-[10px] mb-5">{section}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="label text-white/50 hover:text-teal transition-colors duration-200 text-xs"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="label text-white/25 text-[10px]">
            © 2026 305 STUDIOS — Crafted by Lova Rakotomavonandrianina
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="label text-white/25 hover:text-white/50 transition-colors text-[10px]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="label text-white/25 hover:text-white/50 transition-colors text-[10px]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
