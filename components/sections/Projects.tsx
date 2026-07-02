import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal>
        <SectionHeading eyebrow="Projects" title="Things I've built" />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 2) * 0.08}
            className={project.featured ? "lg:col-span-2" : ""}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
