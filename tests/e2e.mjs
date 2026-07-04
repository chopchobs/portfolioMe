// Self-contained E2E runner using the CORE `playwright` API (no @playwright/test).
//
// Mirrors scripts/shot.mjs: launches chromium with reducedMotion "reduce" and
// scroll-to-reveal so IntersectionObserver-gated content renders. This script
// owns the production server lifecycle — it spawns `next start` on a dedicated
// port, waits until it responds, runs the flows, and ALWAYS tears the server
// down in `finally` (no orphaned processes).
//
// Run via: `npm run test:e2e`  (which chains `next build` first).
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import http from "node:http";
import path from "node:path";

const PORT = 3100;
const BASE = `http://localhost:${PORT}`;
const NEXT_BIN = path.join(process.cwd(), "node_modules", ".bin", "next");

// --- tiny test harness -----------------------------------------------------
let passed = 0;
const failures = [];
function assert(cond, msg) {
  if (cond) {
    passed += 1;
    console.log(`  ✓ ${msg}`);
  } else {
    failures.push(msg);
    console.log(`  ✗ ${msg}`);
  }
}

// --- server lifecycle ------------------------------------------------------
function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() > deadline) {
          reject(new Error(`Server did not respond at ${url} within ${timeoutMs}ms`));
        } else {
          setTimeout(tick, 500);
        }
      });
    };
    tick();
  });
}

// --- page helpers ----------------------------------------------------------
async function settle(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts?.ready);
}

async function revealAll(page) {
  // Same scroll-to-reveal trick as shot.mjs so below-the-fold, IO-gated
  // content (Projects cards) is mounted before we interact with it.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}

// --- main ------------------------------------------------------------------
let server;
let browser;
try {
  console.log(`Starting production server: next start -p ${PORT}`);
  server = spawn(NEXT_BIN, ["start", "-p", String(PORT)], {
    cwd: process.cwd(),
    detached: false,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });
  server.stdout.on("data", (d) => process.stdout.write(`[next] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[next] ${d}`));
  server.on("exit", (code, sig) => {
    if (code && code !== 0) {
      console.error(`[next] server exited early code=${code} sig=${sig}`);
    }
  });

  await waitForServer(BASE, 30_000);
  console.log("Server is up.\n");

  browser = await chromium.launch();
  // One context reused across all flows so localStorage persists (Flow 4).
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
    colorScheme: "light", // deterministic starting theme -> "Switch to dark mode"
  });
  const page = await context.newPage();

  // --- Flow 1: card -> case study ----------------------------------------
  console.log("Flow 1 — card → case study (Helpwise):");
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await settle(page);
  await revealAll(page);
  // Anti-flake: ensure the Link is actually mounted, visible and in view before
  // clicking, and give hydration a brief settle so the click is handled by the
  // Next.js router (not a full page load / dropped event) on a cold CI runner.
  const caseStudyLink = page.getByText("Read case study").first();
  await caseStudyLink.waitFor({ state: "visible", timeout: 15_000 });
  await caseStudyLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await caseStudyLink.click();
  // Wait for the client-side navigation to complete before asserting the URL.
  await page.waitForURL("**/projects/helpwise", { timeout: 15_000 });
  await settle(page);
  {
    const pathname = new URL(page.url()).pathname;
    assert(pathname === "/projects/helpwise", `URL pathname is /projects/helpwise (got ${pathname})`);
    const h1 = (await page.locator("h1").first().innerText()).trim();
    assert(h1 === "Helpwise", `case-study <h1> is "Helpwise" (got "${h1}")`);
  }

  // --- Flow 2: case study -> back to projects ----------------------------
  console.log("\nFlow 2 — case study → back to projects:");
  // Same anti-flake guard: ensure the back link is interactive before clicking.
  const backLink = page.getByText("Back to projects").first();
  await backLink.waitFor({ state: "visible", timeout: 15_000 });
  await backLink.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await backLink.click();
  // Client-side nav to "/#projects" — wait for the frame URL to actually change.
  await page.waitForURL((url) => url.pathname === "/", { timeout: 15_000 });
  await settle(page);
  {
    const u = new URL(page.url());
    assert(u.pathname === "/", `landed on home pathname / (got ${u.pathname})`);
    assert(page.url().includes("/#projects"), `URL includes /#projects (got ${page.url()})`);
    const visible = await page.locator("#projects").isVisible();
    assert(visible, "#projects section is visible");
  }

  // --- Flow 3: unknown slug -> custom 404 --------------------------------
  console.log("\nFlow 3 — unknown slug → custom 404:");
  {
    const res = await page.goto(`${BASE}/projects/this-slug-does-not-exist`, {
      waitUntil: "networkidle",
    });
    await settle(page);
    assert(res.status() === 404, `HTTP status is 404 (got ${res.status()})`);
    const h1 = (await page.locator("h1").first().innerText()).trim();
    assert(h1 === "Page not found", `custom 404 <h1> is "Page not found" (got "${h1}")`);
  }

  // --- Flow 4: dark theme persists across navigation ---------------------
  console.log("\nFlow 4 — dark theme persists across navigation:");
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await settle(page);
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  {
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    assert(theme === "dark", `theme is "dark" after toggle (got "${theme}")`);
    const stored = await page.evaluate(() => localStorage.getItem("theme"));
    assert(stored === "dark", `localStorage theme persisted as "dark" (got "${stored}")`);
  }
  await page.goto(`${BASE}/projects/helpwise`, { waitUntil: "networkidle" });
  await settle(page);
  {
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    assert(theme === "dark", `theme STILL "dark" after navigation (got "${theme}")`);
  }

  await context.close();
} catch (err) {
  console.error("\nFATAL:", err && err.stack ? err.stack : err);
  failures.push(`fatal: ${err && err.message ? err.message : err}`);
} finally {
  if (browser) {
    try {
      await browser.close();
    } catch {
      /* ignore */
    }
  }
  if (server && !server.killed) {
    server.kill("SIGTERM");
    // Give it a moment, then force-kill by pid if still alive.
    await new Promise((r) => setTimeout(r, 800));
    try {
      process.kill(server.pid, 0); // throws if already dead
      server.kill("SIGKILL");
    } catch {
      /* already gone */
    }
  }
}

// --- verdict ---------------------------------------------------------------
console.log("\n" + "=".repeat(48));
if (failures.length === 0) {
  console.log(`ALL PASSED — ${passed} assertions across 4 flows.`);
  process.exit(0);
} else {
  console.log(`FAILED — ${passed} passed, ${failures.length} failed:`);
  for (const f of failures) console.log(`  ✗ ${f}`);
  process.exit(1);
}
