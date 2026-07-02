import { Github, ArrowUpRight, ImageIcon } from "lucide-react";
import type { Project } from "@/content/projects";
import { SkillPill } from "./SkillPill";
import { SmartImage } from "./SmartImage";

export function ProjectCard({ project }: { project: Project }) {
  const { title, tagline, description, tech, highlights, links, featured } =
    project;

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-clay motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] w-full">
        <SmartImage
          src={project.image || undefined}
          alt={`Screenshot of ${title}`}
          sizes={
            featured
              ? "(max-width:1024px) 100vw, 1000px"
              : "(max-width:1024px) 100vw, 500px"
          }
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-warm text-warm-gray">
              <ImageIcon size={32} aria-hidden="true" />
              <span className="text-xs">Preview coming soon</span>
            </div>
          }
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
      <div className="mb-4">
        <h3 className="text-xl font-normal sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-clay">{tagline}</p>
      </div>

      <p className="mb-5 text-slate">{description}</p>

      {featured && (
        <ul className="mb-6 space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {tech.map((t) => (
          <SkillPill key={t} label={t} />
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3">
        {links.live ? (
          <a
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:text-clay-hover"
          >
            Live demo{" "}
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
            API docs{" "}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        ) : null}
      </div>
      </div>
    </article>
  );
}
