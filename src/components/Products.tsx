import Reveal from "./Reveal";

const offerings: { title: string; desc: string; big?: boolean }[] = [
  {
    title: "Investment Gold Bars",
    desc: "LBMA-aligned bars cast and certified for long-term holding.",
    big: true,
  },
  {
    title: "Gold Coins",
    desc: "Minted collector and bullion coins in classic denominations.",
  },
  {
    title: "Bespoke Trading",
    desc: "Private consultation for high-volume acquisition and trade.",
  },
  {
    title: "Certified Assay",
    desc: "Independent purity verification on every transaction.",
  },
];

export default function Products() {
  return (
    <section id="products" className="relative bg-ink px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-6">Offerings</p>
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.05] text-bone">
            Every ounce, <span className="italic text-gold-bright">accounted for.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-2">
          {offerings.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 0.06}
              className={o.big ? "md:col-span-2 md:row-span-2" : "md:col-span-2"}
            >
              <div
                className={`group h-full rounded-[2rem] border border-gold-line bg-ink-800/50 p-8 transition-all duration-700 ease-silk hover:border-gold-dim hover:bg-ink-800 ${
                  o.big
                    ? "flex min-h-[22rem] flex-col justify-end md:min-h-[28rem]"
                    : "min-h-[13rem]"
                }`}
              >
                <h3 className="font-display text-2xl italic text-bone md:text-3xl">
                  {o.title}
                </h3>
                <p className="mt-3 max-w-xs font-body text-sm font-light leading-relaxed text-bone-muted">
                  {o.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
