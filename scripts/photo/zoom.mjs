/**
 * Quick zoomed look at /dev/subpixel for tuning.
 *   node scripts/photo/zoom.mjs <url> <out.png> [dpr] [cropY] [cropH]
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3113/dev/subpixel";
const out = process.argv[3] ?? "scripts/photo/out/zoom.png";
const dpr = Number(process.argv[4] ?? 2);
const cropY = Number(process.argv[5] ?? 0);
const cropH = Number(process.argv[6] ?? 0.45);

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: dpr });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector("canvas[data-ready='true']");
await page.waitForTimeout(1200);
const box = await page.locator("[data-subpixel]").first().boundingBox();
await page.screenshot({
  path: out,
  clip: {
    x: box.x + box.width * 0.2,
    y: box.y + box.height * cropY,
    width: box.width * 0.6,
    height: box.height * cropH,
  },
});
console.log("saved", out, "dpr", dpr);
await browser.close();
