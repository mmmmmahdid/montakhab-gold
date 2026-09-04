import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-ink px-6 py-32 md:py-48">
      <div className="pointer-events-none absolute inset-0 bg-gold-radial opacity-60" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="eyebrow mb-8">The Manifesto</p>
        </Reveal>
        <Reveal y={80} delay={0.1}>
          <p className="font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium italic leading-[1.15] text-bone">
            We do not manufacture gold.{" "}
            <span className="text-gold-bright">We refine conviction</span> —
            every bar, every coin, every ounce carried by a name that has
            answered to it for three generations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
