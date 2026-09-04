export default function Footer() {
  return (
    <footer className="border-t border-gold-line bg-ink px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <p className="font-display text-sm italic text-gold-bright">
          Montakhab Gold Company
        </p>
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-bone-dim">
          © {new Date().getFullYear()} Montakhab Gold. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
