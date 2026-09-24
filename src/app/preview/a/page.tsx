import Header from "@/components/Header";
import SpotlightCarousel from "@/components/carousels/SpotlightCarousel";

export const metadata = { title: "Preview A — Spotlight Strip | 305 Studios" };

export default function PreviewA() {
  return (
    <main className="bg-ink min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="heading-display text-coral text-sm">A</span>
            <span className="label text-white/30 text-[10px]">/ Spotlight Strip</span>
          </div>
          <p className="text-white/40 text-sm font-body max-w-md">
            Horizontal draggable strip. Center card is full-size and lit; adjacent cards shrink and desaturate. Auto-scrolls, drag to scrub.
          </p>
        </div>
        <SpotlightCarousel />
      </div>
    </main>
  );
}
