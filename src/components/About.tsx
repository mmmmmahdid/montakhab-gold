import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";

const stats: [string, string][] = [
  ["99.99%", "Purity Standard"],
  ["30+", "Years Trusted"],
  ["24k", "Certified Gold"],
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink-900 px-6 py-24 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="eyebrow mb-6">About the House</p>
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.05] text-bone">
            A legacy weighed in{" "}
            <span className="italic text-gold-bright">purity</span>, not
            promises.
          </h2>
          <p className="mt-8 max-w-md font-body text-sm font-light leading-relaxed text-bone-muted">
            Montakhab Gold Company was founded on a single conviction: that
            trust, once assayed and proven, becomes more valuable than the
            metal itself. From sourcing to certification, every step is held
            to a standard our name has carried for decades.
          </p>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-gold-line pt-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl text-gold-bright">{n}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-bone-dim">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal y={40} delay={0.15}>
          <ImagePlaceholder label="House Portrait — Replace Image" ratio="aspect-[4/5]" />
        </Reveal>
      </div>
    </section>
  );
}
