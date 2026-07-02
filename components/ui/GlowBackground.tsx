export function GlowBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-surface-warm opacity-40 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-sage opacity-30 blur-3xl" />
    </div>
  );
}
