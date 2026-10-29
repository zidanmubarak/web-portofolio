import { chromium } from "../ref/node_modules/playwright/index.mjs";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3114";
const OUT = path.resolve(process.cwd(), "scripts/signature/out");
const VAULT = "D:/github/hermes-workspace/opencode-brain/web-portofolio-v2/evidence/T4";
await mkdir(OUT, { recursive: true });
await mkdir(VAULT, { recursive: true });

const browser = await chromium.launch();

// One fresh page per timestamp: a screenshot costs 200-500 ms, so taking
// several in one run shifts every later frame.
for (const at of [200, 800, 1400, 2000, 2500, 2800]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "Play first visit" }).click();
  await page.waitForTimeout(at);
  await page.screenshot({ path: path.join(OUT, `frame-${at}.png`) });
  await page.close();
}

// A single clean landscape compare for the note.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
  const card = page.locator("section").filter({ hasText: "Source vs smooth" });
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await card.screenshot({ path: path.join(VAULT, "source-vs-smooth.png") });
  await page.close();
}

for (const at of [200, 800, 1400, 2000, 2500, 2800]) {
  await copyFile(
    path.join(OUT, `frame-${at}.png`),
    path.join(VAULT, `frame-${String(at).padStart(4, "0")}.png`)
  );
}

await browser.close();
console.log("frames ->", VAULT);
