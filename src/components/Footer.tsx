export default function Footer() {
  return (
    <footer className="border-t border-gold-line bg-ink px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row">
        <p dir="ltr" className="font-wordmark text-xs uppercase tracking-[0.15em] text-gold-bright">
          Montakhab Gold Company
        </p>
        <p className="font-body text-xs text-bone-dim">
          © {new Date().getFullYear()} شرکت طلای منتخب. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
