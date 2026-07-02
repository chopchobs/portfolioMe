import { ImageIcon } from "lucide-react";
import { highlights } from "@/content/highlights";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillPill } from "@/components/ui/SkillPill";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

export function Highlights() {
  return (
    <section id="highlights" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal>
        <SectionHeading eyebrow="Highlights" title="Work worth a closer look" />
      </Reveal>

      <div className="flex flex-col gap-8">
        {highlights.map((h, i) => (
          <Reveal key={h.slug} delay={i * 0.08}>
            <article
              className={`flex flex-col overflow-hidden rounded-xl border border-border bg-surface/40 lg:flex-row ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:w-1/2 lg:min-h-[320px]">
                <SmartImage
                  src={h.image || undefined}
                  alt={`Screenshot of ${h.title}`}
                  sizes="(max-width:1024px) 100vw, 550px"
                  fallback={
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-warm text-warm-gray">
                      <ImageIcon size={32} aria-hidden="true" />
                      <span className="text-xs">Preview coming soon</span>
                    </div>
                  }
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-sm font-medium text-clay">{h.org}</p>
                <h3 className="mt-1 text-2xl font-normal">{h.title}</h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {h.tags.map((t) => (
                    <SkillPill key={t} label={t} />
                  ))}
                </div>

                <ul className="mt-6 space-y-3">
                  {h.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
