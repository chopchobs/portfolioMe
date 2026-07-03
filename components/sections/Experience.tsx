import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative bg-surface/50 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Where I've been" />
        </Reveal>

        <Timeline items={experience} />
      </div>
    </section>
  );
}
