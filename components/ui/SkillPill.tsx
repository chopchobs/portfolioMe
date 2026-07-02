export function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-transparent bg-sage/40 px-3 py-1 text-sm text-ink transition-colors hover:border-clay hover:text-clay">
      {label}
    </span>
  );
}
