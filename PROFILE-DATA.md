# Portfolio Content — Nattapon Sopontanapat

> แหล่งข้อมูลกลางสำหรับ portfolio (source of truth สำหรับ content/*)
> สถานะ: 🟢 ยืนยันแล้ว · 🟡 รอ URL จริง

---

## 1. ตัวตน / Hero

- **ชื่อ:** Nattapon Sopontanapat
- **ตำแหน่ง:** Junior Full-Stack Developer
- **ที่อยู่:** Phetchabun, Thailand
- **โทร:** 091-0303399
- **อีเมล:** chopchat.dev@gmail.com
- **GitHub:** 🟡 (รอ URL จริง)
- **LinkedIn:** 🟡 (รอ URL จริง)
- **รูปโปรไฟล์:** มีในเรซูเม่ (ชายสูท) — ส่งไฟล์รูปถ้าจะใช้บนเว็บ

**Tagline:**
Self-taught full-stack developer — TypeScript-first, production-grade apps ด้วย Next.js และ PERN stack

---

## 2. About / My Story

Self-taught developer ที่เน้น clean code, observability และระบบที่ maintain ได้ระยะยาว
ส่ง 4 แพลตฟอร์ม end-to-end (Helpwise, B2B procurement, EV catalog CMS, e-commerce marketplace)
โดยบังคับ strict type safety, CI/CD อัตโนมัติ และ RBAC ตั้งแต่วันแรก

จุดต่าง: มีพื้นฐาน business operations (ธุรกิจครอบครัว) + ใช้ AI-augmented development (Claude Code, multi-agent, prompt engineering) เร่งงานโดยไม่ลดคุณภาพ architecture

**Key Strengths:** Self-discipline (self-taught), business-oriented mindset, adaptability
**Interests:** AI technologies, Web Architecture, System Design

---

## 3. Tech Stack

| หมวด | เทคโนโลยี |
|---|---|
| AI & Agentic | Claude Code, AI Coding Agents (Subagents), Workflow Automation, Prompt Engineering |
| Languages | JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3 |
| Frontend | React (Vite), Next.js (App Router), Tailwind CSS, Zustand, Framer Motion, Radix UI |
| Backend & DB | Node.js, Express.js, RESTful APIs, PostgreSQL, Supabase, Prisma ORM, Redis (Upstash), Stripe, Cloudinary |
| DevOps & Testing | Git, GitHub, Postman, Vercel, Render, Docker (multi-stage), GitHub Actions (CI/CD), Playwright, Vitest, Sentry, Upstash QStash |
| Security & Architecture | RBAC, Multi-Tenant Isolation, Zod, Clean Architecture |

---

## 4. Projects

### 🟢 4.1 Helpwise — Multi-Tenant B2B Help Desk SaaS  (featured)
- **Stack:** Next.js 16.2 (App Router), TypeScript (Strict), Prisma 7, PostgreSQL/Supabase, Redis (Upstash), Upstash QStash, Stripe, Claude API (Haiku), Tailwind v4, Vitest, Vercel
- **Description:** Multi-tenant help desk SaaS ระดับ production — subdomain-per-tenant isolation, สอง audience แยกกัน (agent workspace + customer portal), AI-assisted triage และ business-hours SLA tracking — live พร้อม demo workspace 2 อัน
- **Key features:**
  - **Multi-tenant isolation:** subdomain→tenant resolution ที่ edge + Redis-cached lookups, บังคับผ่าน Prisma client extension ที่ auto-inject `tenantId` ทุก query; PostgreSQL RLS เป็น DB-level backstop
  - **Dual-audience auth:** แยก guard `requireAgent` / `requireContact` ด้วย JWT audience + cookie คนละชุด — internal notes ไม่รั่วไป customer portal (บังคับที่ query level ไม่ใช่ UI)
  - **Concurrency-safe ticketing:** atomic per-tenant ticket numbering ด้วย row-locked counter; idempotent outbound email ด้วย conditional `updateMany` claim กัน TOCTOU double-send ตอน queue retry
  - **Serverless async processing:** signature-verified, fail-closed QStash worker routes สำหรับ outbound email + SLA-breach sweeps (เลือกแทน BullMQ เพราะ Vercel ไม่มี long-running worker)
  - **Safe AI integration:** tool-free, tenant-scoped Claude calls + fail-closed rate limiting ลด prompt-injection blast radius
  - **Idempotent Stripe billing:** signature-verified webhooks + unique-event ledger (claim-first, reprocess-on-failure); เก็บเงินเป็น integer minor units
- **Links:** 🟡 GitHub — รอ URL จริง · 🟢 Live: https://gethelpwise.xyz

### 🟢 4.2 B2B Wholesale & Supply Chain Platform  (featured)
- **Stack:** Next.js 16.2 (App Router), TypeScript (Strict), Prisma 7, Supabase (PostgreSQL & Auth), Tailwind CSS v4, Zustand, Zod, Sentry, Vercel, GitHub Actions
- **Description:** แพลตฟอร์ม B2B procurement ระดับ enterprise ครอบคลุม supply chain lifecycle — purchase orders, multi-role fulfillment, supplier coordination, invoicing, analytics — zero runtime type errors ใน production
- **Key features:**
  - End-to-end type safety (Prisma 7 schema-first + `{ data, error }` contract)
  - 4-stage GitHub Actions CI/CD (Lint → Typecheck → Test → Build), Playwright E2E ~15+ flows
  - Sentry observability (source maps, session replay, edge instrumentation)
  - Normalized 5-entity schema (User → Order → OrderItem → Product → Merchant), 4-stage order lifecycle
  - Multi-role RBAC (Customer / Merchant / Admin) ที่ server-action level
- **Links:** 🟡 GitHub / Live Demo — รอ URL จริง

### 🟢 4.3 EV Car Catalog & Admin Dashboard
- **Stack:** Next.js 15, Prisma ORM, Supabase (PostgreSQL & Storage), Zod, Tailwind CSS, Docker
- **Description:** B2B EV car catalog + secure CMS, containerized ด้วย hardened multi-stage Docker, deploy Vercel zero-downtime
- **Key features:**
  - RBAC บน API routes + Server Actions, ตรวจข้อมูลด้วย Zod
  - Clean architecture (แยก business logic / third-party services)
  - Fail-safe storage: orphaned-file rollback ใน try/catch กัน cloud storage leak
  - Multi-stage Docker build (non-root user, optimized layers)
  - AI-augmented dev ด้วย Claude Code (architectural review, refactor)
- **Links:** 🟡 GitHub / Live Demo — รอ URL จริง

### 🟢 4.4 E-Commerce Marketplace Platform
- **Stack:** React (Vite), Node.js, Express.js, PostgreSQL, Prisma ORM, Cloudinary, Stripe, Zustand, Zod, Tailwind CSS
- **Description:** B2C e-commerce แบบ decoupled client/server — RESTful API design (ต่างจาก Next.js Server Actions) ครบ shopping lifecycle
- **Key features:**
  - RESTful Express.js (controllers / routes / middleware แยกชั้น)
  - Live Stripe integration (webhook + order confirmation, tested end-to-end)
  - Full back-office 4 modules (product, category, order, user) + RBAC
  - Relational schema (User → Cart → Order → Product)
  - Multi-service deploy: FE Vercel, BE Render, media Cloudinary
- **Links:** 🟡 GitHub / Live Demo / API Documentation — รอ URL จริง

---

## 5. Work Experience

### Family Business Operation (Freelance / Manager) — 2022–Present
จัดการ operations, procurement, financial records ของธุรกิจอะไหล่รถหนัก — ประสบการณ์ที่หล่อหลอม data-driven approach และความเข้าใจ supply chain จริง (feed เข้าโปรเจกต์ B2B)

### Internship Trainee (F&B) — Grand Mercure, Avani — 2020–2021
ทำงานร่วมทีมรักษามาตรฐานบริการ, พัฒนา communication & time management ภายใต้แรงกดดัน

---

## 6. Education

- **B.B.A. (International Program)** — Assumption University (ABAC), Bangkok — Graduated 2022
- **Independent Study & Professional Development** — Oct 2024–Present
  - Full-Stack (PERN, Next.js App Router, Docker, System Architecture, Security)
  - Continuous learning: GitHub 519 contributions ปีที่ผ่านมา

---

## 7. Contact / Languages

- **Email:** chopchat.dev@gmail.com
- **Phone:** 091-0303399
- **Location:** Phetchabun, Thailand
- **Languages:** Thai (Native), English (Intermediate)

---

## ⏳ สิ่งที่ต้องเติม (TODO)

1. 🟡 **GitHub repo URL** ของทั้ง 4 โปรเจกต์ + **Live Demo** ของ B2B / EV / E-Commerce (Helpwise live แล้ว: gethelpwise.xyz)
2. 🟡 **GitHub profile + LinkedIn** URL
3. 🟡 **รูปโปรไฟล์ / รูปโปรเจกต์** ใส่ใน `public/images/`

> map เข้าไฟล์: §1,§7 → `content/profile.ts` · §3 → `content/skills.ts` · §4 → `content/projects.ts` · §5,§6 → `content/experience.ts`
