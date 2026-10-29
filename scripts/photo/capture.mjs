/**
 * T3 evidence capture for /dev/subpixel.
 *
 *   VAULT_DIR=... node scripts/photo/capture.mjs [baseUrl]
 *
 * Writes PNGs into $VAULT_DIR/evidence/T3. Requires the dev server:
 *   NEXT_DIST_DIR=.next-t3 npx next dev -p 3103
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3103";
const OUT = process.env.VAULT_DIR
  ? join(process.env.VAULT_DIR, "evidence", "T3")
  : join(dirname(fileURLToPath(import.meta.url)), "out", "evidence");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function shoot(page, name) {
  await page.screenshot({ path: join(OUT, `${name}.png`), animations: "allow" });
  console.log("saved", name);
}

async function ready(page) {
  await page.waitForSelector("[data-subpixel][data-mode='webgl'] canvas[data-ready='true']", {
    timeout: 30000,
  });
  await sleep(900);
}

async function setScroll(page, value) {
  await page.evaluate((v) => {
    const input = document.querySelector("input[type='range']");
    if (!input) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, String(v));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
  await sleep(900);
}

const browser = await chromium.launch({
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--disable-lcd-text",
  ],
});

const errors = [];

// ------------------------------------------------------------------ desktop
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await desktop.newPage();
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`desktop console: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`desktop pageerror: ${e.message}`));

await mkdir(OUT, { recursive: true });
await page.goto(`${BASE}/dev/subpixel`, { waitUntil: "networkidle" });
await ready(page);
await shoot(page, "desktop-01-resolved");

// intro, mid pull-back
await page.getByRole("button", { name: "replay intro" }).click();
await sleep(420);
await shoot(page, "desktop-02-intro-macro");
await sleep(1900);
await shoot(page, "desktop-03-intro-resolved");

// loupe over the face
const plate = await page.locator("[data-subpixel]").first().boundingBox();
await page.mouse.move(plate.x + plate.width * 0.5, plate.y + plate.height * 0.24);
await page.mouse.move(plate.x + plate.width * 0.5 + 4, plate.y + plate.height * 0.26);
await sleep(700);
await shoot(page, "desktop-04-loupe");

// scroll unweave
await page.mouse.move(10, 10);
await setScroll(page, 0.65);
await shoot(page, "desktop-05-scroll");
await setScroll(page, 0);
await sleep(600);

// delta layout variant via the pane would need Tweakpane DOM poking; use the CSS/state free route:
// a query flag would be nicer, but the pane is the source of truth. Documented as a manual check.

// reduced motion / fallback
const reduced = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const reducedPage = await reduced.newPage();
await reducedPage.goto(`${BASE}/dev/subpixel`, { waitUntil: "networkidle" });
await sleep(1200);
await reducedPage.screenshot({ path: join(OUT, "desktop-06-fallback.png") });
console.log("saved desktop-06-fallback");
const mode = await reducedPage.getAttribute("[data-subpixel]", "data-mode");
if (mode !== "fallback") errors.push(`reduced motion did not fall back (mode=${mode})`);
await reduced.close();

// ------------------------------------------------------------------ mobile
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const mpage = await mobile.newPage();
mpage.on("pageerror", (e) => errors.push(`mobile pageerror: ${e.message}`));
await mpage.goto(`${BASE}/dev/subpixel`, { waitUntil: "networkidle" });
await ready(mpage);
await mpage.screenshot({ path: join(OUT, "mobile-01-resolved.png"), fullPage: true });
console.log("saved mobile-01-resolved");

// Touch the plate, then let the lens drift on its own (idle > 2.6s).
const mplate = await mpage.locator("[data-subpixel]").first().boundingBox();
await mpage.touchscreen.tap(mplate.x + mplate.width * 0.5, mplate.y + mplate.height * 0.22);
await sleep(3200);
await mpage.screenshot({
  path: join(OUT, "mobile-02-idle-loupe.png"),
  clip: { x: mplate.x, y: mplate.y, width: mplate.width, height: mplate.height },
});
console.log("saved mobile-02-idle-loupe");

await browser.close();

if (errors.length) {
  console.error("\nISSUES:\n" + errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("\nno console/page errors");
}
