import { chromium } from "../ref/node_modules/playwright/index.mjs";
import { copyFile, mkdir, rename } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3114";
const OUT = path.resolve(process.cwd(), "scripts/signature/out");
const VAULT = "D:/github/hermes-workspace/opencode-brain/web-portofolio-v2/evidence/T4";

await mkdir(VAULT, { recursive: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

// ---- loader video ---------------------------------------------------------
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: OUT, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Play first visit" }).click();
  await page.waitForTimeout(3400);
  const video = page.video();
  await context.close();
  if (video) {
    const raw = await video.path();
    await rename(raw, path.join(VAULT, "loader-sequence.webm")).catch(
      async () => {
        await copyFile(raw, path.join(VAULT, "loader-sequence.webm"));
      }
    );
    console.log("video", path.join(VAULT, "loader-sequence.webm"));
  }
}

// ---- frames + evidence stills --------------------------------------------
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Play first visit" }).click();
  let previous = 0;
  for (const at of [250, 700, 1300, 1900, 2400, 2700, 3000]) {
    await page.waitForTimeout(at - previous);
    previous = at;
    await page.screenshot({ path: path.join(OUT, `loader-${at}.png`) });
  }
  await page.waitForTimeout(400);
  await page.close();
}

const copy = async (from, to) => {
  await copyFile(path.join(OUT, from), path.join(VAULT, to));
};

await copy("05-stages.png", "pipeline-stages.png");
await copy("06-stroke-order.png", "stroke-order.png");
await copy("silhouette-fit.png", "signature-final.png");
await copy("compare-50.png", "source-vs-smooth.png");
await copy("compare-100.png", "source-vs-smooth-result.png");
await copy("compare-0.png", "source-only.png");
await copy("scrub-50.png", "draw-50.png");
await copy("scrub-100.png", "draw-100.png");
await copy("variants.png", "variants.png");
await copy("mobile-loader.png", "mobile-loader.png");
await copy("loader-700.png", "loader-0700.png");
await copy("loader-1300.png", "loader-1300.png");
await copy("loader-1900.png", "loader-1900.png");
await copy("loader-2400.png", "loader-2400.png");

await browser.close();
console.log("evidence ->", VAULT);
