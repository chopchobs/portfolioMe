// Responsive screenshot helper for visual verification.
//
// Usage:
//   node scripts/shot.mjs --sel "#hero" --name hero-after
//   node scripts/shot.mjs --sel "#projects" --name projects-after --widths 375,768,1440
//   node scripts/shot.mjs --full --name fullpage-after   (whole page, per width)
//
// Captures the target at each width into screenshots/<name>-<width>.png against
// the running dev server (default http://localhost:3001). Emulates
// prefers-reduced-motion so framer-motion reveal/entrance settles instantly, and
// scrolls the target into view so IntersectionObserver-gated content renders.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const has = (flag) => process.argv.includes(flag);

const url = arg("--url", "http://localhost:3001/");
const sel = arg("--sel", "body");
const name = arg("--name", "shot");
const full = has("--full");
const outDir = arg("--out", "screenshots");
const widths = arg("--widths", "375,768,1440")
  .split(",")
  .map((w) => parseInt(w.trim(), 10))
  .filter(Boolean);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const saved = [];
try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts?.ready);

    // Trigger every whileInView/IntersectionObserver reveal (incl. content
    // below the fold) by scrolling the whole page before capturing.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);

    const out = `${outDir}/${name}-${width}.png`;
    if (full) {
      await page.screenshot({ path: out, fullPage: true });
    } else {
      const el = page.locator(sel).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await el.screenshot({ path: out });
    }
    saved.push(out);
    await context.close();
  }
  console.log("Saved:\n" + saved.map((s) => "  " + s).join("\n"));
} finally {
  await browser.close();
}
