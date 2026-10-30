import { expect, test } from "@playwright/test";
import path from "node:path";
import {
  capture,
  evidenceDir,
  gotoHome,
  gotoPath,
  skipLoader,
  waitForSettled,
} from "./helpers";

/**
 * Evidence capture. This spec asserts very little; it produces the screenshots
 * and the scroll recording referenced by the QA report. Set
 * `QA_EVIDENCE_DIR` to write into the vault (`reference/qa`).
 */

async function shotAt(page: import("@playwright/test").Page, id: string, name: string) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) throw new Error(`#${sectionId} missing`);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64);
  }, id);
  await page.waitForTimeout(900);
  await capture(page, name);
}

test.describe("evidence", () => {
  test.beforeEach(async ({ page }) => {
    await skipLoader(page);
    await gotoHome(page);
    // Let the hero line masks and the plate clip finish before the first frame.
    await page.waitForTimeout(2_200);
  });

  test("home at 1440", async ({ page }) => {
    await capture(page, "home-hero-1440");
    for (const [id, name] of [
      ["about", "home-about-1440"],
      ["services", "home-services-1440"],
      ["work", "home-work-start-1440"],
      ["record", "home-record-1440"],
      ["tools", "home-tools-1440"],
      ["contact", "home-contact-1440"],
      ["footer", "home-footer-1440"],
    ] as const) {
      await shotAt(page, id, name);
    }

    // Mid-pin frame: three cards in, progress roughly half. Compute the
    // document offset from the top — while pinned, rect.top is zero and
    // rect.top + scrollY no longer equals the section's document position.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const workTop = await page.evaluate(() => {
      const el = document.getElementById("work")!;
      return el.getBoundingClientRect().top + window.scrollY;
    });
    await page.evaluate(
      (top) => window.scrollTo(0, top + 5 * innerHeight * 0.65 * 0.5),
      workTop
    );
    await page.waitForTimeout(1_000);
    await capture(page, "home-work-mid-1440");
    await capture(page, "home-fullpage-1440", { fullPage: true });
  });

  test("home at 390", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHome(page);
    await capture(page, "home-hero-390");
    for (const [id, name] of [
      ["about", "home-about-390"],
      ["services", "home-services-390"],
      ["work", "home-work-390"],
      ["record", "home-record-390"],
      ["tools", "home-tools-390"],
      ["contact", "home-contact-390"],
      ["footer", "home-footer-390"],
    ] as const) {
      await shotAt(page, id, name);
    }
    await capture(page, "home-fullpage-390", { fullPage: true });
  });

  test("home at 768, 1024 and 1920", async ({ page }) => {
    for (const viewport of [
      { width: 768, height: 1024, name: "768" },
      { width: 1024, height: 768, name: "1024" },
      { width: 1920, height: 1080, name: "1920" },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoHome(page);
      await capture(page, `home-hero-${viewport.name}`);
      await shotAt(page, "work", `home-work-${viewport.name}`);
      await shotAt(page, "contact", `home-contact-${viewport.name}`);
    }
  });

  test("index menu", async ({ page }) => {
    await page.getByRole("button", { name: /^INDEX$/ }).click();
    await page.waitForTimeout(1_000);
    await capture(page, "menu-1440");
    await page.keyboard.press("Escape");

    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHome(page);
    await page.getByRole("button", { name: /^INDEX$/ }).click();
    await page.waitForTimeout(1_000);
    await capture(page, "menu-390");
  });

  test("reduced motion hero", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);
    await capture(page, "home-hero-reduced-1440");
  });
});

test.describe("evidence — other routes", () => {
  test("work index and case studies", async ({ page }) => {
    await skipLoader(page);
    await gotoPath(page, "/work");
    await page.waitForTimeout(1_200);
    await capture(page, "work-index-1440");
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoPath(page, "/work");
    await page.waitForTimeout(1_200);
    await capture(page, "work-index-390");

    await page.setViewportSize({ width: 1440, height: 900 });
    for (const slug of ["jawi-ocr", "pacu-pintar"]) {
      await gotoPath(page, `/work/${slug}`);
      await page.waitForTimeout(1_800);
      await capture(page, `${slug}-hero-1440`);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
      await page.waitForTimeout(1_200);
      await capture(page, `${slug}-body-1440`);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await gotoPath(page, "/work/jawi-ocr");
    await page.waitForTimeout(1_800);
    await capture(page, "jawi-ocr-hero-390");
  });

  test("404 page", async ({ page }) => {
    await skipLoader(page);
    await page.goto("/this-page-is-not-here", { waitUntil: "load" });
    await waitForSettled(page);
    await page.waitForTimeout(500);
    await capture(page, "404-1440");
    const h1 = await page.locator("h1").innerText();
    expect(h1).toContain("404");
  });
});

test.describe("evidence — loader and scroll video", () => {
  test("loader frames and scroll recording", async ({ browser }) => {
    const dir = evidenceDir();

    const loaderContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const loaderPage = await loaderContext.newPage();
    await loaderPage.goto("/", { waitUntil: "commit" });
    await loaderPage.waitForSelector("[data-loader-root]");
    await loaderPage.waitForTimeout(650);
    await capture(loaderPage, "loader-drawing-650");
    await loaderPage.waitForFunction(
      () => document.documentElement.dataset.loader === "exiting",
      undefined,
      { timeout: 8_000 }
    );
    await loaderPage.waitForTimeout(180);
    await capture(loaderPage, "loader-exit-180");
    await loaderPage.waitForTimeout(500);
    await capture(loaderPage, "loader-exit-680");
    await loaderContext.close();

    const videoContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: { dir, size: { width: 1440, height: 900 } },
    });
    const videoPage = await videoContext.newPage();
    await videoPage.addInitScript(() =>
      sessionStorage.setItem("rubric:loaded", "1")
    );
    await videoPage.goto("/", { waitUntil: "load" });
    await waitForSettled(videoPage);
    const height = await videoPage.evaluate(
      () => document.documentElement.scrollHeight
    );
    for (let y = 0; y < height; y += 320) {
      await videoPage.evaluate((to) => window.scrollTo(0, to), y);
      await videoPage.waitForTimeout(110);
    }
    await videoPage.waitForTimeout(500);
    const video = videoPage.video();
    await videoContext.close();
    if (video) {
      const original = await video.path();
      const target = path.join(dir, "scroll-1440.webm");
      const fs = await import("node:fs");
      fs.renameSync(original, target);
    }
  });
});
