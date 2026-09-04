import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";

const stats: [string, string][] = [
  ["٪۹۹.۹۹", "استاندارد خلوص"],
  ["+۳۰", "سال اعتماد"],
  ["۲۴ عیار", "طلای گواهی‌شده"],
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink-900 px-6 py-24 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="eyebrow mb-6">درباره خانه منتخب</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.5] text-bone">
            میراثی که با{" "}
            <span className="text-gold-bright">خلوص</span> سنجیده می‌شود، نه
            با وعده.
          </h2>
          <p className="mt-8 max-w-md font-body text-sm font-light leading-loose text-bone-muted">
            شرکت طلای منتخب بر پایه یک باور بنا شده است: اعتمادی که یک‌بار
            سنجیده و اثبات شود، ارزشمندتر از خود فلز است. از تأمین تا صدور
            گواهی، هر مرحله در استانداردی است که نام ما سال‌ها حامل آن بوده
            است.
          </p>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-gold-line pt-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl text-gold-bright">{n}</p>
                <p className="mt-1 text-xs text-bone-dim">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal y={40} delay={0.15}>
          <ImagePlaceholder label="تصویر خانه — جایگزین کنید" ratio="aspect-[4/5]" />
        </Reveal>
      </div>
    </section>
  );
}
