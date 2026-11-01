/**
 * Frame-budget probe for /dev/subpixel.
 *   node scripts/photo/perf.mjs [url] [viewportWidth] [dpr]
 * Reports rAF deltas from inside the page (so the GPU work is included) and the
 * renderer's own auto-quality scale (canvas backing store / CSS size).
 */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3113/dev/subpixel";
const width = Number(process.argv[3] ?? 1440);
const dpr = Number(process.argv[4] ?? 1);

const gpu = process.env.PERF_GPU === "swiftshader" ? "swiftshader" : "d3d11";

const browser = await chromium.launch({
  args:
    gpu === "swiftshader"
      ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"]
      : ["--use-angle=d3d11", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"],
});
const ctx = await browser.newContext({
  viewport: { width, height: width < 600 ? 844 : 900 },
  deviceScaleFactor: dpr,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector("canvas[data-ready='true']");
await page.waitForTimeout(1500);

const result = await page.evaluate(async () => {
  const canvas = document.querySelector("[data-subpixel] canvas");
  const rect = canvas.getBoundingClientRect();
  const deltas = [];
  let last = performance.now();
  await new Promise((resolve) => {
    const tick = (t) => {
      deltas.push(t - last);
      last = t;
      if (deltas.length < 180) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
  deltas.shift();
  const sorted = [...deltas].sort((a, b) => a - b);
  const q = (p) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
  const mean = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  return {
    cssSize: [Math.round(rect.width), Math.round(rect.height)],
    backingStore: [canvas.width, canvas.height],
    qualityScale: +((canvas.width / rect.width) / Math.min(window.devicePixelRatio, 2)).toFixed(2),
    fpsMean: +(1000 / mean).toFixed(1),
    fpsP50: +(1000 / q(0.5)).toFixed(1),
    fpsP95: +(1000 / q(0.95)).toFixed(1),
    frameMsMean: +mean.toFixed(2),
    worstMs: +sorted[sorted.length - 1].toFixed(2),
  };
});

console.log(JSON.stringify({ url, width, dpr, ...result }, null, 2));
await browser.close();
