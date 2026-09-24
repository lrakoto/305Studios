import Header from "@/components/Header";
import CinematicCarousel from "@/components/carousels/CinematicCarousel";

export const metadata = { title: "Preview D — Cinematic | 305 Studios" };

export default function PreviewD() {
  return (
    <main className="bg-ink min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="heading-display text-coral text-sm">D</span>
            <span className="label text-white/30 text-[10px]">/ Cinematic</span>
          </div>
          <p className="text-white/40 text-sm font-body max-w-md">
            Full-bleed image with a slow scale-push transition. Title slams in from the left in condensed caps. Coral progress line. Auto-advances every 6s.
          </p>
        </div>
        <CinematicCarousel />
      </div>
    </main>
  );
}
