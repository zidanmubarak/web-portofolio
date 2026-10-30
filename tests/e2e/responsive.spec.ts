import { expect, test } from "@playwright/test";
import {
  expectNoHorizontalOverflow,
  gotoHome,
  horizontalOverflow,
  skipLoader,
} from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipLoader(page);
});

const VIEWPORTS = [
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
];

test.describe("responsive layout", () => {
  for (const viewport of VIEWPORTS) {
    test(`no horizontal overflow and full content at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoHome(page);

      expectNoHorizontalOverflow(await horizontalOverflow(page));

      for (const id of ["hero", "about", "services", "work", "record", "tools", "contact", "footer"]) {
        await expect(page.locator(`#${id}`), id).toHaveCount(1);
      }

      await expect(page.locator("#hero-heading")).toBeVisible();
      const plate = page.locator("[data-hero-plate]");
      await expect(plate).toBeVisible();
      const box = await plate.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeLessThanOrEqual(viewport.width);

      const topbar = page.locator('[data-shell="topbar"]');
      const topbarBox = await topbar.boundingBox();
      expect(topbarBox!.height).toBeGreaterThanOrEqual(50);

      // The name must not be clipped by the viewport.
      const headingBox = await page.locator("#hero-heading").boundingBox();
      expect(headingBox!.x + headingBox!.width).toBeLessThanOrEqual(viewport.width + 1);
      expect(headingBox!.x).toBeGreaterThanOrEqual(-1);
    });
  }

  test("landscape phone keeps the hero readable and the menu usable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    await gotoHome(page);
    expectNoHorizontalOverflow(await horizontalOverflow(page));
    await expect(page.locator("#hero-heading")).toBeVisible();
    const heading = await page.locator("#hero-heading").boundingBox();
    expect(heading!.height).toBeGreaterThan(50);
    expect(heading!.x + heading!.width).toBeLessThanOrEqual(844 + 1);
    // A 390 px-tall viewport cannot show the whole masthead at once; the
    // heading must still be reachable without horizontal movement.
    await page.locator("#hero-heading").scrollIntoViewIfNeeded();
    await expect(page.locator("#hero-heading")).toBeInViewport();

    await page.getByRole("button", { name: /^INDEX$/ }).click();
    const dialog = page.getByRole("dialog", { name: /index/i });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Contact/i })).toBeVisible();
    const menuBox = await dialog.boundingBox();
    expect(menuBox!.width).toBeLessThanOrEqual(844);
  });

  test("200% zoom (720 css px) stays usable", async ({ page }) => {
    await page.setViewportSize({ width: 720, height: 450 });
    await gotoHome(page);
    expectNoHorizontalOverflow(await horizontalOverflow(page));
    await expect(page.locator("#hero-heading")).toBeVisible();
    await expect(page.getByRole("button", { name: /^INDEX$/ })).toBeVisible();
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      window.scrollTo(0, (el?.getBoundingClientRect().top ?? 0) + window.scrollY);
    });
    await page.waitForTimeout(700);
    await expect(page.locator("#contact-name")).toBeVisible();
    const form = await page.locator("form").boundingBox();
    expect(form!.width).toBeLessThanOrEqual(720);
  });

  test("touch targets in the top bar are at least 44 px high", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHome(page);
    for (const target of [
      page.locator('[data-shell="topbar"] a').first(),
      page.getByRole("button", { name: /^INDEX$/ }),
    ]) {
      const box = await target.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("images reserve their aspect ratio (no layout shift)", async ({ page }) => {
    await gotoHome(page);
    const offenders = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .filter((img) => {
          const hasAttr = img.getAttribute("width") && img.getAttribute("height");
          const style = getComputedStyle(img);
          const parent = img.parentElement;
          const parentSized =
            parent &&
            (parent.getBoundingClientRect().height > 20 ||
              style.position === "absolute");
          return !hasAttr && !parentSized;
        })
        .map((img) => img.getAttribute("src"))
    );
    expect(offenders, offenders.join(", ")).toEqual([]);
  });
});
