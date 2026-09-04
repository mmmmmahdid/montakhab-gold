import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-ink-900 px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-6">Portfolio</p>
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.05] text-bone">
            Selected <span className="italic text-gold-bright">acquisitions.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Reveal delay={0}>
            <ImagePlaceholder label="Collection I — Replace Image" ratio="aspect-[3/4]" />
          </Reveal>
          <Reveal delay={0.1} className="md:mt-16">
            <ImagePlaceholder label="Collection II — Replace Image" ratio="aspect-[3/4]" />
          </Reveal>
          <Reveal delay={0.2}>
            <ImagePlaceholder label="Collection III — Replace Image" ratio="aspect-[3/4]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
