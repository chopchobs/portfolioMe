# CLAUDE.md — Portfolio Build Spec

> คู่มือนี้ให้ Claude Code อ่านเป็น context หลักก่อนลงมือ scaffold เว็บ portfolio
> เป้าหมาย: single-page portfolio ธีม **Anthropic (ivory + clay)** deploy บน Vercel
> เจ้าของ: Nattapon Sopontanapat (Junior Full-Stack Developer)

---

## 0. เป้าหมาย & หลักการ

สร้างเว็บ portfolio หน้าเดียว (single-page scroll) โทน Anthropic — สะอาด อุ่น มินิมอล อ่านง่าย
- **ห้าม** gradient, drop shadow เข้มๆ, glow, neon — ยึด flat design
- ใช้ **accent เดียว** คือ clay/terracotta กับปุ่ม/ลิงก์/ไฮไลต์เท่านั้น
- serif กับหัวข้อใหญ่ (display) + sans กับ UI/เนื้อหา
- responsive (mobile-first), accessible (semantic HTML, alt text, focus ring), SEO-ready (metadata)
- performance: static-first, ภาพ optimize, ไม่มี layout shift

---

## 1. Tech Stack (บังคับ)

- **Framework:** Next.js 15+ (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS v4 (theme tokens ผ่าน `@theme` / CSS variables)
- **Animation:** Framer Motion (เบาๆ — fade/slide on scroll, ห้าม over-animate)
- **Icons:** lucide-react
- **Deploy:** Vercel (zero-config, push GitHub แล้ว auto-deploy)
- **Lint/Format:** ESLint + Prettier
- ไม่ต้องมี backend/DB — เป็น static content site

---

## 2. Design Tokens — Anthropic Theme

ดึงค่าสีจริงจาก anthropic.com — ใส่เป็น CSS variables ใน `globals.css` และ map เข้า Tailwind theme

```css
:root {
  /* Surfaces (light — default) */
  --bg:            #FAF9F5;  /* Ivory — พื้นหลังหลัก */
  --surface:       #F0EEE6;  /* Cloud — การ์ด / section สลับ */
  --surface-warm:  #E3DACC;  /* Oat  — เส้นขอบ / โซนอุ่น */
  --sage:          #D6D3BE;  /* Sage — tag พื้นอ่อน */

  /* Accent */
  --clay:          #C6613F;  /* signature — ปุ่ม, ลิงก์, ไฮไลต์ */
  --clay-hover:    #A94E30;  /* clay เข้มขึ้นสำหรับ hover */

  /* Text */
  --ink:           #141413;  /* หัวข้อ / ข้อความหลัก */
  --slate:         #5E5D59;  /* ข้อความรอง */
  --warm-gray:     #B0AEA5;  /* hint / meta */

  /* Lines */
  --border:        #E3DACC;
}
```

**การใช้สี (semantic):**
| บทบาท | token |
|---|---|
| พื้นหลังหน้า | `--bg` (ivory) |
| การ์ด / section สลับแถบ | `--surface` (cloud) |
| หัวข้อ, body | `--ink` |
| ข้อความรอง, คำอธิบาย | `--slate` |
| meta, วันที่, hint | `--warm-gray` |
| ปุ่มหลัก, ลิงก์, active nav, underline | `--clay` |
| เส้นขอบ, divider | `--border` |
| skill pill พื้น | `--sage` / `--surface` + ข้อความ `--ink` |

> **Dark mode (ถ้าทำ):** invert เป็น `--bg #1A1A19`, `--ink #FAF9F5`, คง clay `#C6613F` เป็น accent. ทำเป็น optional toggle — light เป็น default

**Typography:**
- Display / headings: serif — ใช้ **Fraunces** หรือ **Newsreader** (Google Fonts) แทน "Anthropic Serif"
- UI / body: sans — ใช้ **Inter** (Google Fonts) แทน "Anthropic Sans"
- scale: h1 clamp(2.5rem, 6vw, 4rem) / h2 ~2rem / body 1rem–1.125rem, line-height 1.6–1.7
- **sentence case** เสมอ (ห้าม ALL CAPS ยกเว้น label เล็กที่ตั้งใจ), น้ำหนักใช้ 400 กับ 500 เป็นหลัก

**Spacing / shape:**
- radius: 12px (การ์ด), 8px (ปุ่ม/pill), pill = 999px เฉพาะ tag
- เส้นขอบบาง 1px `--border`
- section padding แนวตั้งเยอะๆ (py 96–128px desktop), max-width container ~1100px

---

## 3. โครงสร้างโฟลเดอร์

```
portfolioMe/
├── app/
│   ├── layout.tsx          # font, metadata, SideDock, GlowBackground
│   ├── page.tsx            # ประกอบทุก section เรียงกัน
│   └── globals.css         # Tailwind + theme tokens ข้อ 2
├── components/
│   ├── SideDock.tsx        # nav ไอคอนลอยขวา + active-section highlight
│   ├── ThemeToggle.tsx     # (optional) light/dark
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── SectionHeading.tsx
│       ├── SkillPill.tsx
│       ├── ProjectCard.tsx
│       └── Button.tsx
├── content/
│   ├── profile.ts          # ชื่อ, ตำแหน่ง, ติดต่อ, socials, tagline
│   ├── skills.ts           # tech stack แยกหมวด
│   ├── projects.ts         # array 4 โปรเจกต์ (ดูข้อ 5)
│   └── experience.ts       # work + education
├── lib/
│   └── useActiveSection.ts # IntersectionObserver hook ไว้ไฮไลต์ dock
├── public/
│   ├── images/             # รูปโปรเจกต์ / โปรไฟล์
│   └── resume.pdf          # ปุ่ม Download Resume
├── next.config.ts · tailwind (v4 via css) · tsconfig.json · package.json · README.md
```

---

## 4. Sections (เรียงบนหน้าเดียว)

1. **Hero** — ชื่อใหญ่ (serif), ตำแหน่ง, tagline สั้น, ปุ่ม clay "View my work" + "Download resume", glow blob อ่อนๆ ด้านหลัง (subtle, ไม่ฉูดฉาด)
2. **About** — My story 1–2 ย่อหน้า + Tech Stack (SkillPill แยกหมวด) + quick facts (experience, location, projects count, availability)
3. **Experience** — timeline แนวตั้ง: work experience + education (map จาก `experience.ts`)
4. **Projects** — grid การ์ด (2 คอลัมน์ desktop, 1 mobile) จาก `projects.ts` แต่ละการ์ด: title, description, tech pills, ปุ่ม Live / GitHub. Featured 2 อันแรก (B2B, Helpwise) การ์ดใหญ่กว่า
5. **Contact** — อีเมล, โทร, location, socials + ปุ่ม mailto (ไม่ต้องมี backend form; ถ้าจะทำ form ใช้ Formspree/Resend แต่ optional)

**SideDock:** ไอคอนลอยขวา (home, user, briefcase, folder, mail) — คลิก scroll ไป section, active section ไฮไลต์ด้วย clay. Mobile: ยุบเป็น bottom bar หรือ hamburger

---

## 5. Content (ข้อมูลจริง — ใส่ใน `content/`)

> อ้างอิงเต็มใน `PROFILE-DATA.md` (ไฟล์เดียวกับโฟลเดอร์นี้) — ใช้เป็น source of truth

**profile.ts**
- name: "Nattapon Sopontanapat"
- role: "Junior Full-Stack Developer"
- location: "Phetchabun, Thailand"
- email: "chopchat.dev@gmail.com" · phone: "091-0303399"
- github: `TODO` · linkedin: `TODO`  ← เจ้าของยังไม่ให้ URL
- tagline: "Self-taught full-stack developer — TypeScript-first, production-grade apps with Next.js and the PERN stack."

**skills.ts** (หมวด: AI & Agentic, Languages, Frontend, Backend & DB, DevOps & Testing, Security & Architecture — ดู PROFILE-DATA §3)

**projects.ts** — 4 โปรเจกต์ (featured เรียงก่อน):
1. **Helpwise — Multi-Tenant B2B Help Desk SaaS** · live: https://gethelpwise.xyz · github: `TODO`
   Next.js 16.2, TS strict, Prisma 7, Postgres/Supabase, Redis (Upstash), QStash, Stripe, Claude API (Haiku), Tailwind v4, Vitest
2. **B2B Wholesale & Supply Chain Platform** · live/github: `TODO`
   Next.js 16.2, TS strict, Prisma 7, Supabase, Tailwind v4, Zustand, Zod, Sentry, GitHub Actions
3. **EV Car Catalog & Admin Dashboard** · live/github: `TODO`
   Next.js 15, Prisma, Supabase, Zod, Tailwind, Docker
4. **E-Commerce Marketplace Platform** · live/github/api: `TODO`
   React (Vite), Node, Express, Postgres, Prisma, Cloudinary, Stripe, Zustand, Zod

**experience.ts** — Family Business Operation (2022–Present), F&B Internship (2020–2021), B.B.A. ABAC (2022), Independent Study (2024–Present, GitHub 519 contributions)

> **`TODO` links:** ใส่ปุ่มไว้ก่อนแต่ disable/ซ่อนถ้ายังไม่มี URL — อย่าใส่ลิงก์ปลอม

---

## 6. Conventions

- TypeScript strict, ไม่มี `any`; type ทุก content model
- Server Components เป็น default; ใส่ `"use client"` เฉพาะที่ต้องใช้ interactivity (SideDock, ThemeToggle, motion)
- แยก data (`content/`) ออกจาก UI ทั้งหมด — เพิ่มโปรเจกต์ = แก้ data ไฟล์เดียว
- component เล็ก reuse ได้, ตั้งชื่อชัดเจน
- accessibility: semantic tags, `aria-label` ปุ่มไอคอน, alt ทุกภาพ, focus-visible ring (clay), รองรับ keyboard nav
- metadata ครบ (title, description, OpenGraph, favicon)
- commit เป็นก้อนเล็กๆ; README อธิบาย run/deploy

---

## 7. Build steps (แนะนำลำดับ)

1. `npx create-next-app@latest` (App Router, TS, Tailwind, ESLint)
2. ตั้ง theme tokens + fonts ใน `globals.css` / `layout.tsx` (ข้อ 2)
3. สร้าง `content/*` จากข้อ 5
4. สร้าง ui primitives (Button, SkillPill, SectionHeading, ProjectCard)
5. สร้าง sections ทีละอัน + ประกอบใน `page.tsx`
6. SideDock + useActiveSection
7. Framer Motion reveal เบาๆ
8. responsive + a11y pass
9. วาง `resume.pdf` ใน `public/`
10. push GitHub → import ใน Vercel → deploy

---

## 8. Definition of done

- [ ] ครบ 5 section, เนื้อหาตรง PROFILE-DATA
- [ ] ธีม Anthropic ตรง token (ivory bg, clay accent, ink text, serif+sans)
- [ ] responsive mobile/tablet/desktop ไม่มี overflow
- [ ] SideDock ไฮไลต์ active section ถูกต้อง
- [ ] Lighthouse: a11y & SEO ≥ 95, ไม่มี console error
- [ ] `npm run build` ผ่าน, deploy Vercel สำเร็จ
- [ ] ลิงก์ TODO ถูกเว้น/disable ไว้ (ไม่มีลิงก์เสีย)
