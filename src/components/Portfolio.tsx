import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-ink-900 px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-6">نمونه‌کارها</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.5] text-bone">
            مجموعه‌های <span className="text-gold-bright">منتخب.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Reveal delay={0}>
            <ImagePlaceholder label="مجموعه یک — جایگزین کنید" ratio="aspect-[3/4]" />
          </Reveal>
          <Reveal delay={0.1} className="md:mt-16">
            <ImagePlaceholder label="مجموعه دو — جایگزین کنید" ratio="aspect-[3/4]" />
          </Reveal>
          <Reveal delay={0.2}>
            <ImagePlaceholder label="مجموعه سه — جایگزین کنید" ratio="aspect-[3/4]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
