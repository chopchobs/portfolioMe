# HANDOFF — Portfolio (Nattapon Sopontanapat)

> เอกสารส่งต่อสำหรับ agent/เซสชันใหม่ อ่านอันนี้ก่อนเริ่มงานต่อ

## 1. โปรเจกต์นี้คืออะไร
เว็บ portfolio หน้าเดียว (single-page scroll) ธีม **Anthropic (ivory + clay)** ของ Junior Full-Stack Developer
- **Live:** https://nattapon-dev.vercel.app
- **Repo:** https://github.com/chopchobs/portfolioMe (branch `main`, auto-deploy บน Vercel)
- **สเปกเต็ม:** `CLAUDE.md` · **ข้อมูลจริง:** `PROFILE-DATA.md` + `content/*`

## 2. Tech stack
Next.js 15 (App Router, `next@15.5.20`) · TypeScript strict · Tailwind CSS v4 (theme tokens ใน `app/globals.css`) · Framer Motion · lucide-react · Fonts: Fraunces (serif) + Inter (sans) via next/font · Vercel Analytics

## 3. สถานะปัจจุบัน (เสร็จแล้ว)
- ✅ 5 section: Hero · About · Experience · Projects · Contact
- ✅ SideDock (nav ลอย + active highlight) · BackToTop · ThemeToggle (**dark mode**) · GlowBackground
- ✅ Projects: การ์ด featured (Helpwise, B2B) แนวนอนสลับข้าง + compact (EV, E-Commerce) — **รูปจริง + live/GitHub links ครบทุกตัว**
- ✅ Hero: รูปโปรไฟล์จริง + SmartImage (มี fallback monogram)
- ✅ SEO: metadata, dynamic OG image, JSON-LD Person, canonical, robots.ts, sitemap.ts — ใช้ `NEXT_PUBLIC_SITE_URL` (fallback `https://nattapon-dev.vercel.app`)
- ✅ a11y: skip-link, custom 404, focus ring, semantic tags, reduced-motion guard
- ✅ **Lighthouse (production): Perf 100 · A11y 100 · SEO 100 · Best-practices 96** (96 มาจาก vercel insights 404 บน localhost เท่านั้น — production-safe)

## 4. Architecture & ไฟล์สำคัญ
- **แยก data ออกจาก UI ทั้งหมด** — แก้เนื้อหา = แก้ `content/` ไฟล์เดียว
  - `content/profile.ts` `skills.ts` `projects.ts` `experience.ts` (+ `highlights.ts` ถูก merge เข้า projects แล้ว)
- `components/sections/*` = แต่ละ section · `components/ui/*` = primitives (Button, SkillPill, SectionHeading, ProjectCard, ProjectMark, SmartImage, SocialLinks, Timeline, Reveal, GlowBackground, BackToTop)
- `app/layout.tsx` = fonts, metadata (siteUrl ตัวเดียวคุม SEO/OG/canonical/JSON-LD), SideDock, dark-mode no-flash script
- `public/images/` = profile.jpg + projects/{slug}.png (screenshot จริง)

## 5. Key decisions & conventions (สำคัญ — ห้ามพลาด)
- **Design tokens (`app/globals.css`) เป็นกฎเหล็ก** — ivory/cloud/oat/sage/clay/ink/slate/warm-gray, accent = clay สีเดียว, **flat design ห้าม gradient/glow/drop-shadow**, sentence case
- **ห้ามแตะ `--clay` กลาง** (ใช้ decorative: จุด, ขอบ, hover, icon — ผ่าน contrast อยู่แล้ว)
- **Small text ที่เป็น clay ใช้ token แยก** ที่ tune ต่อโหมดให้ผ่าน WCAG AA:
  - `--clay-text` #9e4a2c (light) → #e08a63 (dark)
  - `--clay-strong` #a94e30 + `--on-clay` #faf9f5 (ivory) สำหรับปุ่มพื้น clay
- Dark mode = CSS-var override `:root[data-theme="dark"]` ไม่แตะ `@theme` light
- motion ทุกจุดต้อง guard `prefers-reduced-motion`
- ลิงก์ที่ยังไม่มีให้ซ่อน/แสดง "Case study on request" — **ห้ามใส่ลิงก์ปลอม**

## 6. Guardrails สำหรับ agent (workflow ที่ใช้อยู่)
- **git เจ้าของทำเอง** — agent **ห้าม** commit/push/init (แค่แก้โค้ด + verify + รายงาน)
- **verify ด้วยของจริงเสมอ** — ยิง Playwright screenshot 375/768/1440 + `npm run build` ผ่าน 0 error ก่อนรับงาน (Chrome MCP จับ mobile viewport จริงไม่ได้ ใช้ Playwright)
- ทำเป็น vertical slice ทีละอัน จบแต่ละ slice ให้ build ได้ (กัน token หมดกลางคัน)
- เสนอ plan สั้นๆ ก่อนลงมือ

## 7. งานที่เหลือ (optional — ยังไม่ทำ)
เรียงตาม value (จาก feature analysis):
- **#6 Project case-study pages (`/projects/[slug]`)** — value สูงสุด เปลี่ยนจาก "ลิสต์งาน" เป็น "โชว์ architecture/decision" (effort กลาง-สูง)
- Medium: GitHub contributions widget · Contact form (Formspree/Resend) · quantified metrics เด่นในการ์ด
- Low: EN/TH toggle · Blog section · PWA manifest / view transitions

## 8. Dev commands
```bash
npm install
npm run dev      # localhost (fonts ต้องมีเน็ต)
npm run build    # ต้องผ่าน 0 error ก่อน commit
```

## 9. TODO เจ้าของ (นอกโค้ด)
- ตั้ง env `NEXT_PUBLIC_SITE_URL=https://nattapon-dev.vercel.app` บน Vercel
- เปิด Analytics ใน Vercel dashboard (ฟรี)
- วาง GitHub README (มินิมอล-โปร ที่ทำไว้) ใน repo `chopchobs/chopchobs` เป็น `README.md`
