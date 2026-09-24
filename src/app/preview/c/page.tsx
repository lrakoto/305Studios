import Header from "@/components/Header";
import StackedDeckCarousel from "@/components/carousels/StackedDeckCarousel";

export const metadata = { title: "Preview C — Stacked Deck | 305 Studios" };

export default function PreviewC() {
  return (
    <main className="bg-ink min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="heading-display text-coral text-sm">C</span>
            <span className="label text-white/30 text-[10px]">/ Stacked Deck</span>
          </div>
          <p className="text-white/40 text-sm font-body max-w-md">
            Cards in a physical fan/deck. Tap the top card or use the arrow — it peels away to reveal the next. Tactile and satisfying.
          </p>
        </div>
        <StackedDeckCarousel />
      </div>
    </main>
  );
}
