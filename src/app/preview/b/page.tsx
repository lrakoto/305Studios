import Header from "@/components/Header";
import SplitRevealCarousel from "@/components/carousels/SplitRevealCarousel";

export const metadata = { title: "Preview B — Split Reveal | 305 Studios" };

export default function PreviewB() {
  return (
    <main className="bg-ink min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="heading-display text-coral text-sm">B</span>
            <span className="label text-white/30 text-[10px]">/ Split Reveal</span>
          </div>
          <p className="text-white/40 text-sm font-body max-w-md">
            Left panel: numbered project list. Right panel: image wipes in behind a sliding mask on selection. Luxury lookbook feel.
          </p>
        </div>
        <SplitRevealCarousel />
      </div>
    </main>
  );
}
