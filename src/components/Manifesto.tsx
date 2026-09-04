import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-ink px-6 py-32 md:py-48">
      <div className="pointer-events-none absolute inset-0 bg-gold-radial opacity-60" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="eyebrow mb-8">فلسفه برند</p>
        </Reveal>
        <Reveal y={80} delay={0.1}>
          <p className="font-display text-[clamp(1.5rem,4.2vw,3.25rem)] font-bold leading-[1.6] text-bone">
            ما طلا تولید نمی‌کنیم؛{" "}
            <span className="text-gold-bright">ما اعتماد را تصفیه می‌کنیم</span>{" "}
            — هر شمش، هر سکه، هر مثقال، امانت‌دار نامی است که سه نسل به آن
            پاسخگو بوده است.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
