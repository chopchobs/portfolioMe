# Nattapon Sopontanapat — Portfolio

Single-page developer portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS v4.
Theme: Anthropic-inspired **ivory + clay**.

## Stack

- Next.js 15 (App Router) + TypeScript (strict)
- Tailwind CSS v4 (CSS-first theme tokens in `app/globals.css`)
- Framer Motion (subtle scroll reveals)
- lucide-react (icons)
- Fonts: Fraunces (display/serif) + Inter (UI/sans) via `next/font`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Structure

```
app/            layout (fonts, metadata, dock, glow) + page (all sections) + globals.css
components/
  SideDock      floating right-side nav with active-section highlight
  sections/     Hero, About, Experience, Projects, Contact
  ui/           Button, SkillPill, SectionHeading, ProjectCard, GlowBackground, Reveal
content/        profile, skills, projects, experience — all site data lives here
lib/            useActiveSection hook (IntersectionObserver)
public/         images + resume.pdf
```

To update content, edit the files in `content/` — no component changes needed.

## Deploy (Vercel)

Push to GitHub, import the repo in Vercel, deploy. Zero config.

## TODO

- Add real GitHub / Live URLs in `content/projects.ts` and `content/profile.ts`
- Add profile photo / project screenshots to `public/images/`
