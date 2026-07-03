import { Github, ArrowUpRight, FileText } from "lucide-react";
import type { Project } from "@/content/projects";
import { SkillPill } from "./SkillPill";
import { SmartImage } from "./SmartImage";
import { ProjectMark } from "./ProjectMark";

function ProjectLinks({ links }: { links: Project["links"] }) {
  const hasAny = links.live || links.github || links.api;

  // No public links yet — keep the row honest without claiming repo visibility.
  if (!hasAny) {
    return (
      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-warm-gray">
        <FileText size={14} aria-hidden="true" /> Case study on request
      </span>
    );
  }

  return (
    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2">
      {links.live ? (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:text-clay-hover"
        >
          Live demo
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      ) : null}
      {links.github ? (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-clay"
        >
          <Github size={16} /> GitHub
        </a>
      ) : null}
      {links.api ? (
        <a
          href={links.api}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-clay"
        >
          API docs
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      ) : null}
    </div>
  );
}

function Visual({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <SmartImage
        src={project.image || undefined}
        alt={`Screenshot of ${project.title}`}
        sizes={
          project.featured
            ? "(max-width:1024px) 100vw, 520px"
            : "(max-width:1024px) 100vw, 500px"
        }
        fallback={<ProjectMark mark={project.mark} label={project.tagline} />}
      />
    </div>
  );
}

/**
 * Featured projects render as a wide two-column card (visual + deep dive with
 * highlight bullets). The visual side alternates via `flip` for rhythm.
 * Non-featured projects render as a compact text-forward card.
 */
export function ProjectCard({
  project,
  flip = false,
}: {
  project: Project;
  flip?: boolean;
}) {
  const { title, tagline, description, tech, highlights, featured } = project;

  if (featured) {
    return (
      <article className="group grid overflow-hidden rounded-xl border border-border bg-surface/60 transition-colors duration-300 hover:border-clay lg:grid-cols-2">
        <Visual
          project={project}
          className={`min-h-[240px] lg:min-h-[420px] ${flip ? "lg:order-2" : ""}`}
        />
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-medium text-clay">{tagline}</p>
          <h3 className="mt-1.5 font-serif text-2xl font-normal sm:text-3xl">
            {title}
          </h3>
          <p className="mt-4 text-slate">{description}</p>

          <ul className="mt-6 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((t) => (
              <SkillPill key={t} label={t} />
            ))}
          </div>

          <div className="mt-8 flex">
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </article>
    );
  }

  // Compact card
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-clay motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Visual project={project} className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm font-medium text-clay">{tagline}</p>
        <h3 className="mt-1.5 font-serif text-xl font-normal sm:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate">{description}</p>

        <div className="mb-6 mt-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <SkillPill key={t} label={t} />
          ))}
        </div>

        <ProjectLinks links={project.links} />
      </div>
    </article>
  );
}
