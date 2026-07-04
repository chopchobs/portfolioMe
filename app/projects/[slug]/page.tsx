import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { SkillPill } from "@/components/ui/SkillPill";
import { SmartImage } from "@/components/ui/SmartImage";
import { ProjectMark } from "@/components/ui/ProjectMark";

// Resolve the canonical origin: explicit env first, then the live
// production domain as the default fallback. Kept in sync with app/layout.tsx.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://nattapon-dev.vercel.app";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Case study not found" };
  }

  const title = `${project.title} — Case study`;
  const url = `${siteUrl}/projects/${slug}`;

  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description: project.description,
      url,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { title, tagline, description, tech, links, image, mark } = project;

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-5xl px-6 py-24 sm:py-32"
    >
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-sm font-medium text-clay-text hover:text-clay-hover"
      >
        ← Back to projects
      </Link>

      {/* Hero */}
      <section aria-labelledby="case-study-title" className="mt-8">
        <p className="text-sm font-medium text-clay-text">{tagline}</p>
        <h1
          id="case-study-title"
          className="mt-2 font-serif text-4xl font-normal sm:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tech.map((t) => (
            <SkillPill key={t} label={t} />
          ))}
        </div>

        {(links.live || links.github) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.live ? (
              <Button href={links.live} variant="primary" external>
                Live demo
              </Button>
            ) : null}
            {links.github ? (
              <Button href={links.github} variant="secondary" external>
                GitHub
              </Button>
            ) : null}
          </div>
        )}

        <div className="relative mt-12 aspect-[16/10] w-full overflow-hidden rounded-xl border border-border">
          <SmartImage
            src={image || undefined}
            alt={`Screenshot of ${title}`}
            sizes="(max-width:1024px) 100vw, 900px"
            className="object-top"
            fallback={<ProjectMark mark={mark} label={tagline} />}
          />
        </div>
      </section>

      {/* Problem */}
      {project.problem ? (
        <section aria-labelledby="problem-heading" className="mt-20">
          <h2
            id="problem-heading"
            className="font-serif text-2xl font-normal sm:text-3xl"
          >
            The problem
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate">
            {project.problem}
          </p>
        </section>
      ) : null}

      {/* Approach */}
      {project.approach ? (
        <section aria-labelledby="approach-heading" className="mt-16">
          <h2
            id="approach-heading"
            className="font-serif text-2xl font-normal sm:text-3xl"
          >
            Approach
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate">
            {project.approach}
          </p>
        </section>
      ) : null}

      {/* Key decisions */}
      {project.decisions && project.decisions.length > 0 ? (
        <section aria-labelledby="decisions-heading" className="mt-16">
          <h2
            id="decisions-heading"
            className="font-serif text-2xl font-normal sm:text-3xl"
          >
            Key decisions
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {project.decisions.map((decision) => (
              <div
                key={decision.title}
                className="rounded-xl border border-border bg-surface/60 p-6"
              >
                <p className="font-medium text-ink">{decision.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {decision.why}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Gallery (reserved — no extra screenshots exist yet) */}
      {project.gallery && project.gallery.length > 0 ? (
        <section aria-labelledby="gallery-heading" className="mt-16">
          <h2
            id="gallery-heading"
            className="font-serif text-2xl font-normal sm:text-3xl"
          >
            Gallery
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border"
              >
                <SmartImage
                  src={src}
                  alt={`${title} screenshot`}
                  sizes="(max-width:640px) 100vw, 450px"
                  fallback={<ProjectMark mark={mark} label={tagline} />}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Outcomes */}
      {project.outcomes && project.outcomes.length > 0 ? (
        <section aria-labelledby="outcomes-heading" className="mt-16">
          <h2
            id="outcomes-heading"
            className="font-serif text-2xl font-normal sm:text-3xl"
          >
            Outcomes
          </h2>
          <ul className="mt-6 space-y-3">
            {project.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-2.5 leading-relaxed text-slate"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-20">
        <Button href="/#projects" variant="secondary">
          ← Back to all projects
        </Button>
      </div>
    </main>
  );
}
