type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-clay-text">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-normal sm:text-4xl">{title}</h2>
    </div>
  );
}
