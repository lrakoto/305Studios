import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";

export default function WorkGrid() {
  return (
    <section
      id="work"
      className="bg-ink py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-coral text-sm">✦</span>
              <span className="label text-white/40 text-[10px]">Selected Work</span>
            </div>
            <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-white">
              WHAT WE&apos;VE
              <br />
              BUILT
            </h2>
          </div>

          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 label text-white/40 hover:text-teal transition-colors text-xs"
          >
            View All ▸
          </a>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-4">
          {projects.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="flex justify-center mt-10 sm:hidden">
          <a
            href="#"
            className="label border border-white/20 text-white/50 hover:border-teal hover:text-teal px-6 py-3 rounded-full transition-all duration-200"
          >
            View All Work ▸
          </a>
        </div>
      </div>
    </section>
  );
}
