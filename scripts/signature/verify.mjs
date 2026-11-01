import { chromium } from "../ref/node_modules/playwright/index.mjs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3114";
const OUT = path.resolve(process.cwd(), "scripts/signature/out");

const browser = await chromium.launch();
const results = {};

async function newPage(viewport = { width: 1440, height: 1000 }) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on("pageerror", (error) => console.log("pageerror:", error.message));
  await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
  return page;
}

async function runLoader(page, mode) {
  await page.evaluate(() => window.scrollTo(0, 0));
  const button = page.getByRole("button", {
    name: mode === "first" ? "Play first visit" : "Simulate repeat visit",
  });
  await button.click();
  await page.waitForFunction(
    () => document.body.innerText.includes("exit:"),
    null,
    { timeout: 8000 }
  );
  const text = await page
    .locator("p", { hasText: "exit:" })
    .first()
    .innerText();
  return text.replace(/\s+/g, " ").trim();
}

// 1. first visit timing
{
  const page = await newPage();
  results.firstVisit = await runLoader(page, "first");
  await page.close();
}

// 2. repeat visit (sessionStorage set)
{
  const page = await newPage();
  results.repeatVisit = await runLoader(page, "repeat");
  await page.close();
}

// 3. reduced motion skips
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
  results.reducedMotion = await runLoader(page, "first");
  await page.screenshot({ path: path.join(OUT, "reduced-motion.png") });
  await page.close();
}

// 4. signature under reduced motion renders final immediately
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${BASE}/dev/signature`, { waitUntil: "networkidle" });
  const card = page.locator("section").filter({ hasText: "Scrub the pen" });
  await card.scrollIntoViewIfNeeded();
  const visible = await card.locator("svg").first().isVisible();
  results.reducedSignatureVisible = visible;
  await card.screenshot({ path: path.join(OUT, "reduced-signature.png") });
  await page.close();
}

// 5. mobile layout
{
  const page = await newPage({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(OUT, "mobile-top.png") });
  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );
  results.mobileHorizontalScroll = hasHorizontalScroll;
  const compare = page.locator("section").filter({ hasText: "Source vs smooth" });
  await compare.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await compare.screenshot({ path: path.join(OUT, "mobile-compare.png") });
  await page.close();
}

// 6. loader at mobile
{
  const page = await newPage({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Play first visit" }).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT, "mobile-loader.png") });
  await page.waitForTimeout(2500);
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
