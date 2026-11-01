import { chromium } from "../ref/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3114";
const OUT = path.resolve(process.cwd(), "scripts/signature/out");
const VAULT = "D:/github/hermes-workspace/opencode-brain/web-portofolio-v2/evidence";

await mkdir(OUT, { recursive: true });
await mkdir(VAULT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});

page.on("console", (message) => {
  if (message.type() === "error") console.log("console:", message.text());
});
page.on("pageerror", (error) => console.log("pageerror:", error.message));

await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(OUT, "dev-top.png") });
await page.screenshot({ path: path.join(OUT, "dev-full.png"), fullPage: true });

// ---- loader sequence ------------------------------------------------------
await page.getByRole("button", { name: "Play first visit" }).click();
const frames = [350, 900, 1600, 2300, 2800, 3200];
let previous = 0;
for (const at of frames) {
  await page.waitForTimeout(at - previous);
  previous = at;
  await page.screenshot({ path: path.join(OUT, `loader-${at}.png`) });
}
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(OUT, "loader-after.png") });

// ---- scrubber frames ------------------------------------------------------
const card = page.locator("section").filter({ hasText: "Scrub the pen" });
await card.scrollIntoViewIfNeeded();
const slider = page.locator("#sig-progress");
for (const value of [0, 25, 50, 75, 100]) {
  await slider.evaluate((element, next) => {
    const input = element;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    setter.call(input, String(next));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
  await page.waitForTimeout(150);
  await card.screenshot({ path: path.join(OUT, `scrub-${value}.png`) });
}

// ---- comparison -----------------------------------------------------------
const compareCard = page.locator("section").filter({ hasText: "Source vs smooth" });
await compareCard.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await compareCard.screenshot({ path: path.join(OUT, "compare-50.png") });
for (const value of [0, 100]) {
  await page.locator("#compare").evaluate((element, next) => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    setter.call(element, String(next));
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
  await page.waitForTimeout(150);
  await compareCard.screenshot({ path: path.join(OUT, `compare-${value}.png`) });
}

// ---- footer variant -------------------------------------------------------
const variants = page.locator("section").filter({ hasText: "Logo, footer, plain" });
await variants.scrollIntoViewIfNeeded();
await page.waitForTimeout(1800);
await variants.screenshot({ path: path.join(OUT, "variants.png") });

await browser.close();
console.log("captured", OUT);
