import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-6 py-24 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-gold-radial opacity-40" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow mb-6">Enquiries</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold italic leading-[1.05] text-bone">
            Begin a private <span className="text-gold-bright">consultation.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <form className="mx-auto mt-14 flex max-w-xl flex-col gap-5 text-left">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                className="rounded-full border border-gold-line bg-ink-800/50 px-6 py-4 font-body text-sm font-light text-bone placeholder:text-bone-dim outline-none transition-colors duration-500 focus:border-gold-dim"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-full border border-gold-line bg-ink-800/50 px-6 py-4 font-body text-sm font-light text-bone placeholder:text-bone-dim outline-none transition-colors duration-500 focus:border-gold-dim"
              />
            </div>
            <textarea
              placeholder="Tell us what you're looking for"
              rows={4}
              className="rounded-[1.5rem] border border-gold-line bg-ink-800/50 px-6 py-4 font-body text-sm font-light text-bone placeholder:text-bone-dim outline-none transition-colors duration-500 focus:border-gold-dim"
            />
            <button
              type="submit"
              className="group mt-2 flex w-fit items-center gap-4 rounded-full bg-gold px-7 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-ink transition-all duration-700 ease-silk hover:bg-gold-bright active:scale-[0.98]"
            >
              Send Enquiry
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/15 transition-transform duration-700 ease-silk group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                ↗
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
