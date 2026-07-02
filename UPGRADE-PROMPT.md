# Upgrade prompt — เพิ่มความรวยแบบ Chanon (แต่คงธีม Anthropic)

## ต้องเตรียมรูปก่อน (วางไฟล์ตามนี้)
ดรอปไฟล์ลงโฟลเดอร์ `public/images/` ตามชื่อนี้ (ชื่อไหนยังไม่มี เว้นไว้ได้ ระบบจะโชว์ placeholder)

```
public/images/
├── profile.jpg                  # รูปหน้าตัวเอง (hero card) — สี่เหลี่ยม/สี่เหลี่ยมจตุรัสก็ได้
├── projects/
│   ├── helpwise.png             # screenshot Helpwise
│   ├── b2b-supply-chain.png     # screenshot B2B
│   ├── ev-catalog.png           # screenshot EV
│   └── ecommerce-marketplace.png# screenshot E-Commerce
└── logos/
    └── (โลโก้บริษัท เช่น factorium.svg ถ้าจะทำ Highlights)
```
> ชื่อไฟล์ projects/* ต้องตรงกับ `slug` ใน content/projects.ts (helpwise, b2b-supply-chain, ev-catalog, ecommerce-marketplace)

---

## Prompt (วางใน Claude Code)

```
เป้าหมาย: เพิ่มความ "รวย" ให้เว็บแบบเว็บอ้างอิง (โปรไฟล์การ์ด + screenshot โปรเจกต์ +
Highlights + ฟอร์มติดต่อ + tag) แต่ยึดธีม Anthropic เดิม 100% — ห้ามลอกโทนมืด/น้ำเงินของ
เว็บอ้างอิง

กติกา (ห้ามหลุด):
- ยึด design token CLAUDE.md §2 (ivory/cloud/oat/sage/clay/ink/slate/warm-gray) accent=clay
  flat design ห้าม gradient/glow/drop-shadow, ฟอนต์เดิม Fraunces+Inter, sentence case
- ทุกภาพใช้ next/image + ต้องมี alt ที่สื่อความหมาย (a11y)
- ถ้าไฟล์รูปยังไม่มี → โชว์ placeholder เนียนๆ (รูปคน = initials วงกลมพื้น sage,
  screenshot = บล็อกพื้น oat + ไอคอน) ห้ามให้ build พังหรือรูปแตก
- แก้ layout/component ได้ แต่ห้ามเปลี่ยนข้อมูลใน content/* (เพิ่ม field รูปได้)

งานที่ทำ:
1. Hero — เพิ่มการ์ดรูปโปรไฟล์ (public/images/profile.jpg) แบบ 2 คอลัมน์บน desktop:
   การ์ดรูปซ้าย (กรอบ oat บาง มุมโค้ง 12px ไม่มีเงา) + เนื้อหาขวา, mobile ซ้อนบนล่าง
2. ProjectCard — เพิ่ม screenshot ด้านบนการ์ด (next/image, aspect ~16/10, object-cover,
   มุมบนโค้งรับกับการ์ด) map จาก slug → public/images/projects/{slug}.png
   ใส่ field image ใน content/projects.ts (optional string) ถ้าไม่มีรูปใช้ placeholder
3. เพิ่ม section ใหม่ "Highlights" คั่นระหว่าง Experience กับ Projects:
   - สร้าง content/highlights.ts (2 อัน) แต่ละอัน: title, org, โลโก้ (optional),
     screenshot, tags[], bullets[]
   - การ์ดใหญ่ screenshot เด่น + โลโก้/ชื่อบริษัท + tag + bullet 2-3 ข้อ
   - เพิ่มไอคอน Highlights (ดาว) ใน SideDock + useActiveSection ให้ครบ
   - เอาเนื้อหา 2 อันเด่นมาจาก Helpwise (multi-tenant SaaS) + B2B (supply chain)
4. Tech tags — ให้ pill มีสีอ่อนได้ แต่อยู่ในพาเลต Anthropic เท่านั้น (พื้น sage/oat/surface
   ตัวอักษร ink/clay) ห้ามใช้สีรุ้ง/น้ำเงินแบบเว็บอ้างอิง
5. Contact (optional) — ทำฟอร์ม name/email/message หน้าตาตาม token ได้ แต่ถ้าจะให้ส่งจริง
   ต้องต่อ Formspree (ไม่มี backend) — วาง endpoint เป็น TODO env ไว้ก่อน,
   ถ้ายังไม่ต่อ ให้ปุ่มหลักเป็น mailto เหมือนเดิม อย่าทำฟอร์มหลอกที่กดแล้วไม่ไปไหน

วิธีทำ: dev server รันที่ localhost:3001 อยู่แล้ว — แก้แล้วยิง Playwright screenshot
375/768/1440 เทียบ before/after ทุก section ที่แตะ

Acceptance:
- ทุก breakpoint ไม่มี text overflow / h-scroll / รูปแตก, การ์ดสูงเท่ากัน
- ยังเป็นธีม ivory+clay (ไม่มีโทนมืด/น้ำเงินหลุดเข้ามา)
- npm run build ผ่าน 0 type error, ทุก next/image มี alt
- โชว์ before/after ทุก section ที่แก้

เริ่มจาก: (1) เพิ่ม field รูป + placeholder logic ก่อน (2) แล้วค่อยไล่ทำทีละ section
รายงาน plan สั้นๆ ให้ผมดูก่อนลงมือ
```

## เคล็ดลับ
- **รูป = ตัวชูโรง** — เว็บ Chanon ดูดีเพราะ screenshot คมๆ ลองจับภาพโปรเจกต์แบบเต็มจอ
  สะอาดๆ (ไม่มี personal info) ขนาดกว้าง ~1200px
- ไม่ต้องส่งรูปเว็บอ้างอิงให้ Claude Code — มันเห็นเป็นภาพไม่ได้ ใช้ prompt นี้ที่บอกโครง
  เป็นคำแล้วชัดกว่า
