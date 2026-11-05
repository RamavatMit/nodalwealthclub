// Captures full-page screenshots of every Phase 1 page (desktop + mobile).
// Usage: start the app (npm run dev or npm start), then
//   node scripts/screenshots.mjs [baseUrl]
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const out = "docs/screenshots";
const pages = [
  "/",
  "/about",
  "/membership",
  "/ai",
  "/ai/trading-with-agents",
  "/web3/tax",
  "/products",
  "/products/agent-sandbox",
  "/legal/privacy",
  "/contact",
  "/does-not-exist",
];
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
};

await mkdir(out, { recursive: true });
const browser = await chromium.launch();

for (const [name, viewport] of Object.entries(viewports)) {
  const context = await browser.newContext({ viewport, reducedMotion: "no-preference" });
  // Skip the first-visit intro so it does not cover the screenshots.
  await context.addInitScript(() => sessionStorage.setItem("nwc-intro", "1"));
  const page = await context.newPage();

  for (const path of pages) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // Scroll through slowly so scroll-triggered reveals play, then return to top.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 400) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const file = `${out}/${name}${path === "/" ? "-home" : path.replaceAll("/", "-")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("saved", file);
  }
  await context.close();
}

await browser.close();
