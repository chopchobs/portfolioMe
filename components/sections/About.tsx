import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillPill } from "@/components/ui/SkillPill";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal>
        <SectionHeading eyebrow="About" title="My story" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="space-y-4">
            {profile.story.map((p, i) => (
              <p key={i} className="max-w-[62ch] text-lg text-slate">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <dl className="grid grid-cols-2 gap-4">
            {profile.quickFacts.map((f) => (
              <div
                key={f.label}
                className="flex h-full flex-col rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-clay/30"
              >
                <dt className="text-xs uppercase tracking-wide text-warm-gray">
                  {f.label}
                </dt>
                <dd className="mt-1 font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-16">
          <h3 className="mb-6 text-xl font-normal">Tech stack</h3>
          <div className="space-y-5">
            {skills.map((group) => (
              <div
                key={group.category}
                className="grid gap-3 sm:grid-cols-4 sm:items-baseline"
              >
                <p className="text-sm font-medium text-clay-text">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2 sm:col-span-3">
                  {group.items.map((item) => (
                    <SkillPill key={item} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
