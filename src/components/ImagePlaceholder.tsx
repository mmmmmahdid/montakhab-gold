export default function ImagePlaceholder({
  label,
  ratio = "aspect-[4/5]",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div className={`relative rounded-[2rem] bg-ink-800/60 p-2 ring-1 ring-gold-line ${className}`}>
      <div
        className={`relative ${ratio} w-full overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(201,161,92,0.14),transparent_55%),linear-gradient(160deg,#141318_0%,#0a0a0d_60%)]`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <span className="h-px w-10 bg-gold-dim" />
          <span className="font-body text-xs text-bone-dim">{label}</span>
        </div>
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_1px_rgba(244,239,228,0.06)]" />
      </div>
    </div>
  );
}
