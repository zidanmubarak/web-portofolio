import { expect, test } from "@playwright/test";
import { horizontalOverflow, expectNoHorizontalOverflow } from "./helpers";

/**
 * No-JS fallback: the motion-map promises every section stays readable when
 * JavaScript never runs. The loader gate must not leave the page hidden.
 */
test.use({ javaScriptEnabled: false });

test("content is fully readable without JavaScript", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });

  const state = await page.evaluate(() => {
    const main = document.getElementById("main") as HTMLElement;
    return {
      loader: document.documentElement.dataset.loader,
      mainOpacity: Number(getComputedStyle(main).opacity),
      overlays: Array.from(
        document.querySelectorAll<HTMLElement>("[data-loader-root]")
      ).map((el) => getComputedStyle(el).display),
      sections: Array.from(
        document.querySelectorAll<HTMLElement>("[data-section]")
      ).map((section) => section.id),
      heroName: document.getElementById("hero-heading")?.textContent?.trim(),
      contactEmail: document.querySelector("#contact a[href^='mailto:']")
        ?.textContent,
    };
  });

  expect(state.mainOpacity).toBe(1);
  expect(state.overlays.every((display) => display === "none" || display === "")).toBe(true);
  expect(state.sections).toEqual([
    "hero",
    "about",
    "services",
    "work",
    "record",
    "tools",
    "contact",
  ]);
  expect(state.heroName).toContain("Zidan");
  expect(state.contactEmail).toContain("@");

  await expect(page.locator("#hero-heading")).toBeVisible();
  await expect(page.locator("#contact-name")).toBeVisible();
  expectNoHorizontalOverflow(await horizontalOverflow(page));
});
