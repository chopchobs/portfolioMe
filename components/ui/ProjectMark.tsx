// Intentional branded panel shown in place of a screenshot. Reads as a
// designed project identity mark (serif monogram + tagline) rather than an
// apologetic "image coming soon" placeholder. Flat, theme-only, no gradient.
export function ProjectMark({
  mark,
  label,
  className,
}: {
  mark: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-surface-warm p-8 text-center ${className ?? ""}`}
    >
      {/* faint corner rule accents for a crafted, intentional feel */}
      <span className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-warm-gray/40" />
      <span className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-warm-gray/40" />

      <span className="font-serif text-5xl font-normal leading-none text-ink sm:text-6xl">
        {mark}
      </span>
      <span className="h-px w-10 bg-clay" />
      <span className="max-w-[26ch] text-xs uppercase tracking-widest text-warm-gray">
        {label}
      </span>
    </div>
  );
}
