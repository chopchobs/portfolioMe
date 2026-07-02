# Design References — เอาไปป้อน Claude Code

> วิธีใช้: Claude Code เห็นลิงก์เป็น "โค้ด/ข้อความ" ไม่เห็นเป็นภาพ
> ฉะนั้น **ลิงก์ + บอกเป็นคำว่าชอบตรงไหน** ได้ผลกว่าโยนลิงก์เปล่าๆ
> อยากได้เป๊ะ → แนบ screenshot ส่วนที่ชอบมาด้วย

---

## Anchor ที่ล็อกไว้แล้ว (ของเราเอง)
- **anthropic.com** — ที่มาของธีม (ivory #FAF9F5 + clay #C6613F, serif+sans) → ยึดเป็น "สี/โทน"
- **my-resume-delta-gold.vercel.app** (เรซูเม่ Chanon) — ที่มาของ "layout": single-page scroll + floating side dock ขวา → ยึดเป็น "โครง"

## Reference เสริม (แนว minimal / content-first — เอาไอเดียมา ไม่ใช่ก็อป)
| ลิงก์ | เอาอะไรมา |
|---|---|
| brittanychiang.com | โครง single-page + side nav ไฮไลต์ section (เหมือน SideDock ของเรา), timeline งาน |
| leerob.com | ความ minimal อุ่นๆ, จังหวะ spacing, การเล่าเรื่องแบบ content-first |
| joshwcomeau.com | micro-interaction / motion เบาๆ ที่ไม่รก (ปรับให้ subtle) |
| rauno.me | ดีเทล typography + whitespace ระดับ pro |

> เตือน: อย่าลอกสี/ฟอนต์ของเว็บพวกนี้ — **ยึด design token ใน CLAUDE.md §2 เสมอ**
> เอามาแค่ "โครง/จังหวะ/ไอเดีย interaction"

---

## Prompt สำหรับ Claude Code (วางได้เลย)

```
ผมอยากปรับดีไซน์เว็บ portfolio นี้ให้ดูดีขึ้น โดยยึด design token ใน CLAUDE.md §2
(Anthropic ivory+clay) เป็นหลัก ห้ามเปลี่ยนสี/ฟอนต์ออกนอก token

อ้างอิงสไตล์ (เอาไอเดียมา ไม่ใช่ก็อปสี):
- โครง single-page + side dock: brittanychiang.com
- ความ minimal อุ่น + จังหวะ spacing: leerob.com
- motion เบาๆ ไม่รก: joshwcomeau.com

สิ่งที่อยากได้:
1. <บอกเป็นข้อๆ เช่น "hero ให้ตัวหนังสือใหญ่ขึ้น เว้นบนล่างเยอะขึ้น">
2. <เช่น "การ์ดโปรเจกต์ hover ให้ยกเบาๆ + เส้นขอบเปลี่ยนเป็น clay">
3. <เช่น "timeline เพิ่มเส้น progress ตอน scroll">

ทำทีละ section เทียบ before/after ให้ผมดู แล้วรัน npm run build ยืนยันว่าผ่าน
```

> เคล็ดลับ: ถ้าอยากให้เป๊ะสไตล์ที่คิดในหัว ให้ screenshot เว็บที่ชอบ วางใน Claude Code
> แล้วพิมพ์ว่า "เอา layout แบบนี้ แต่ใช้สีธีมเราตาม CLAUDE.md"
