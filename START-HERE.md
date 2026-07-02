# เริ่มยังไง — คู่มือสั้นๆ สำหรับ Claude Code

## นี่คืออะไร
โปรเจกต์เว็บ portfolio หน้าเดียว (Next.js 15 + TypeScript + Tailwind v4) ธีม Anthropic (ivory + clay)
scaffold ครบแล้ว — สเปกอยู่ใน `CLAUDE.md`, ข้อมูลจริงอยู่ใน `PROFILE-DATA.md` และ `content/*`

## คุณจะทำอะไรบ้าง (ลำดับแนะนำ)
1. รันดูของจริง: `npm install` แล้ว `npm run dev` → เปิด http://localhost:3000
2. ให้ Claude Code ตรวจ/ขัดตาม Definition of Done ใน `CLAUDE.md`
3. เติมลิงก์จริง (GitHub / Live / LinkedIn) ใน `content/projects.ts` + `content/profile.ts`
4. ใส่รูปใน `public/images/`
5. push ขึ้น GitHub → import ใน Vercel → deploy

---

## Prompt A — เริ่มงาน / ตรวจและขัดเว็บ (วางอันนี้ก่อน)

```
อ่าน CLAUDE.md และ PROFILE-DATA.md ในโฟลเดอร์นี้ให้ครบก่อนเป็น context หลัก

โปรเจกต์นี้ scaffold ไว้แล้ว (Next.js App Router + TS strict + Tailwind v4, ธีม
Anthropic ivory+clay). งานของคุณคือทำให้มันสมบูรณ์ตาม CLAUDE.md ข้อ 8 (Definition
of done) โดย:

1. รัน `npm install` แล้ว `npm run build` ให้ผ่าน — แก้ error ที่เจอ
2. ไล่เช็คทุก section (Hero, About, Experience, Projects, Contact) ว่าตรง
   PROFILE-DATA.md และ responsive ทั้ง mobile/tablet/desktop ไม่มี overflow
3. ตรวจ a11y: semantic tags, aria-label ปุ่มไอคอน, alt ทุกภาพ, focus ring สี clay
4. ยึดธีมตาม design tokens ข้อ 2 เท่านั้น — ห้าม gradient/shadow เข้ม/glow แรง,
   accent ใช้ clay สีเดียว
5. ลิงก์ที่ยังเป็น TODO (ค่าว่างใน content/*) ให้ซ่อนปุ่มไว้ ห้ามใส่ลิงก์ปลอม

ทำทีละขั้น อธิบายสั้นๆ ว่าแก้อะไร แล้วรายงานผล build ตอนจบ
```

## Prompt B — เติมข้อมูลจริง (วางเมื่อมีลิงก์แล้ว)

```
อัปเดตข้อมูลจริงในโปรเจกต์นี้ตามที่ให้ โดยแก้เฉพาะไฟล์ใน content/ อย่าแตะ UI:

- GitHub profile: <ใส่ URL>
- LinkedIn: <ใส่ URL>
- Helpwise → github: <URL>   (live มีแล้ว: https://gethelpwise.xyz)
- B2B Supply Chain → github: <URL> · live: <URL>
- EV Catalog → github: <URL> · live: <URL>
- E-Commerce → github: <URL> · live: <URL> · api: <URL>

แก้ใน content/profile.ts และ content/projects.ts ให้ตรง type เดิม แล้วรัน
`npm run build` ยืนยันว่าผ่าน
```

## Prompt C — deploy ขึ้น Vercel

```
ช่วยเตรียม deploy โปรเจกต์นี้ขึ้น Vercel:
1. ตรวจ `npm run build` ผ่าน ไม่มี console error
2. สร้าง git repo, commit เป็นก้อนเล็กๆ ที่สื่อความหมาย
3. บอกขั้นตอน push GitHub + import ใน Vercel ทีละสเต็ป (ผมจะทำเองตอน auth)
```
