import { expect, test } from "@playwright/test";
import {
  gotoHome,
  gotoPath,
  skipLoader,
  waitForSettled,
} from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipLoader(page);
});

test.describe("navigation", () => {
  test("skip link is the first stop and moves focus to main", async ({ page }) => {
    await gotoHome(page);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
    const activeId = await page.evaluate(() => document.activeElement?.id);
    expect(activeId).toBe("main");
  });

  test("index menu opens, traps focus, closes on Escape and returns focus", async ({
    page,
  }) => {
    await gotoHome(page);
    const index = page.getByRole("button", { name: /^INDEX$/ });
    await expect(index).toBeVisible();
    await index.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: /index/i });
    await expect(dialog).toBeVisible();
    await expect(index).toHaveAttribute("aria-expanded", "true");
    await expect(index).toHaveAttribute("aria-controls", "site-menu");

    // The close button receives focus when the overlay opens.
    await expect(page.getByRole("button", { name: /close/i })).toBeFocused();

    // Tab must never leave the dialog.
    for (let i = 0; i < 14; i += 1) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(
        () => Boolean(document.activeElement?.closest("#site-menu"))
      );
      expect(inside, `tab ${i + 1} escaped the dialog`).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(index).toHaveAttribute("aria-expanded", "false");
    await expect(index).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });

  test("menu items scroll to their section and close the overlay", async ({ page }) => {
    await gotoHome(page);
    for (const [label, id] of [
      ["About", "about"],
      ["Services", "services"],
      ["Record", "record"],
      ["Contact", "contact"],
    ] as const) {
      await page.getByRole("button", { name: /^INDEX$/ }).click();
      const dialog = page.getByRole("dialog", { name: /index/i });
      await expect(dialog).toBeVisible();
      await dialog.getByRole("link", { name: new RegExp(label, "i") }).click();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await page.waitForTimeout(1_200);
      const state = await page.evaluate((sectionId) => {
        const el = document.getElementById(sectionId);
        if (!el) return null;
        return {
          top: el.getBoundingClientRect().top,
          hash: window.location.hash,
          scrollY: window.scrollY,
        };
      }, id);
      expect(state, id).not.toBeNull();
      expect(state!.scrollY, id).toBeGreaterThan(0);
      // Section top should sit under the 64 px bar, not half a screen away.
      expect(Math.abs(state!.top), id).toBeLessThan(200);
    }
  });

  test("menu works from /work and lands on the home section", async ({ page }) => {
    await gotoPath(page, "/work");
    await page.getByRole("button", { name: /^INDEX$/ }).click();
    await page
      .getByRole("dialog", { name: /index/i })
      .getByRole("link", { name: /Work/i })
      .click();
    await page.waitForURL(/\/(#work)?$/);
    await page.waitForTimeout(900);
    expect(page.url()).toContain("#work");
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(500);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("deep link to a section lands on it", async ({ page }) => {
    await gotoPath(page, "/#work");
    await page.waitForTimeout(900);
    const state = await page.evaluate(() => {
      const el = document.getElementById("work");
      return el ? el.getBoundingClientRect().top : null;
    });
    expect(state).not.toBeNull();
    expect(Math.abs(state!)).toBeLessThan(220);
  });

  test("back and forward restore the work index scroll position", async ({ page }) => {
    await gotoPath(page, "/work");
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(350);
    await page.locator('a[href="/work/jawi-ocr"]').first().click();
    await page.waitForURL(/\/work\/jawi-ocr$/);
    await page.goBack();
    await page.waitForURL(/\/work$/);
    await waitForSettled(page);
    await page.waitForTimeout(500);
    const y = await page.evaluate(() => window.scrollY);
    expect(Math.abs(y - 500)).toBeLessThan(80);

    await page.goForward();
    await page.waitForURL(/\/work\/jawi-ocr$/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("refresh in the middle of the page keeps the reader in place", async ({ page }) => {
    // Runs three times: the failure seen in QA is a race between the restored
    // scroll position and ScrollTrigger's post-load refresh, so one clean run
    // does not prove anything.
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      await gotoHome(page);
      await page.evaluate(() => {
        const el = document.getElementById("record");
        window.scrollTo(0, (el?.getBoundingClientRect().top ?? 0) + window.scrollY - 100);
      });
      await page.waitForTimeout(400);
      const before = await page.evaluate(() => window.scrollY);
      await page.reload({ waitUntil: "load" });
      await page.waitForTimeout(1_800);
      const after = await page.evaluate(() => window.scrollY);
      expect(
        Math.abs(after - before),
        `attempt ${attempt}: scrolled to ${before}, came back at ${after}`
      ).toBeLessThan(120);
    }
  });

  test("case study next / previous links work", async ({ page }) => {
    await gotoPath(page, "/work/jawi-ocr");
    const next = page.getByRole("link", { name: /next project/i });
    await expect(next).toBeVisible();
    const href = await next.getAttribute("href");
    expect(href).toMatch(/^\/work\//);
    await next.click();
    await page.waitForURL(new RegExp(`${href}$`));
    await expect(page.locator("h1")).toBeVisible();

    const prev = page.getByRole("link", { name: /previous project/i });
    await expect(prev).toBeVisible();
    await prev.click();
    await page.waitForURL(/\/work\/[a-z-]+$/);
  });

  test("footer back-to-top control returns to the hero", async ({ page }) => {
    await gotoHome(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const backToTop = page.getByRole("link", { name: /back to top/i }).first();
    await expect(backToTop).toBeVisible();
    await backToTop.click();
    await page.waitForTimeout(1_200);
    const y = await page.evaluate(() => window.scrollY);
    expect(y).toBeLessThan(120);
  });
});
