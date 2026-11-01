import { expect, test } from "@playwright/test";
import {
  axeScan,
  formatViolations,
  gotoHome,
  gotoPath,
  skipLoader,
  waitForHeroReveal,
} from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipLoader(page);
});

test.describe("accessibility", () => {
  const PAGES = [
    { name: "home 1440", url: "/", width: 1440, height: 900 },
    { name: "home 390", url: "/", width: 390, height: 844 },
    { name: "work index", url: "/work", width: 1440, height: 900 },
    { name: "case study", url: "/work/jawi-ocr", width: 1440, height: 900 },
    { name: "case study 390", url: "/work/jawi-ocr", width: 390, height: 844 },
  ];

  for (const target of PAGES) {
    test(`axe WCAG A/AA: ${target.name}`, async ({ page }) => {
      await page.setViewportSize({ width: target.width, height: target.height });
      await gotoPath(page, target.url);
      await waitForHeroReveal(page);
      const result = await axeScan(page);
      expect(result.violations, formatViolations(result.violations)).toEqual([]);
    });
  }

  test("axe: index menu open", async ({ page }) => {
    await gotoHome(page);
    await page.getByRole("button", { name: /^INDEX$/ }).click();
    await expect(page.getByRole("dialog", { name: /index/i })).toBeVisible();
    // Let the clip wipe and the meta fade settle; axe composites live opacity.
    await page.waitForTimeout(1_200);
    const result = await axeScan(page);
    expect(result.violations, formatViolations(result.violations)).toEqual([]);
  });

  test("WCAG 2.2 target size on the flagship case study", async ({ page }) => {
    await gotoPath(page, "/work/jawi-ocr");
    const result = await axeScan(page, ["wcag22aa"]);
    const targetSize = result.violations.filter(
      (violation) => violation.id === "target-size"
    );
    test.info().annotations.push({
      type: "target-size",
      description: `${targetSize.length} rule(s), ${targetSize.reduce((sum, item) => sum + item.nodes.length, 0)} node(s)`,
    });
    expect(targetSize, formatViolations(targetSize)).toEqual([]);
  });

  test("one h1, no skipped heading levels, one main landmark", async ({ page }) => {
    await gotoHome(page);
    const structure = await page.evaluate(() => {
      const levels = Array.from(
        document.querySelectorAll("h1,h2,h3,h4,h5,h6")
      ).map((heading) => Number(heading.tagName[1]));
      return {
        levels,
        h1: levels.filter((level) => level === 1).length,
        mains: document.querySelectorAll("main").length,
        header: document.querySelectorAll("header").length,
        footer: document.querySelectorAll("footer").length,
      };
    });
    expect(structure.h1).toBe(1);
    expect(structure.mains).toBe(1);
    expect(structure.header).toBeGreaterThanOrEqual(1);
    expect(structure.footer).toBeGreaterThanOrEqual(1);

    let previous = 1;
    for (const level of structure.levels) {
      expect(level - previous).toBeLessThanOrEqual(1);
      previous = level;
    }
  });

  test("every interactive control has an accessible name", async ({ page }) => {
    await gotoHome(page);
    const unnamed = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          'a[href], button, input:not([type="hidden"]), textarea, select'
        )
      )
        .filter((el) => {
          if (el.getAttribute("aria-hidden") === "true") return false;
          if (el.closest('[aria-hidden="true"]')) return false;
          if (el.getAttribute("tabindex") === "-1") return false;
          const label =
            el.getAttribute("aria-label") ??
            el.getAttribute("title") ??
            (el.id
              ? document.querySelector(`label[for="${el.id}"]`)?.textContent
              : null) ??
            el.textContent ??
            "";
          return label.trim().length === 0;
        })
        .map((el) => `${el.tagName.toLowerCase()}[${el.className}]`)
    );
    expect(unnamed, unnamed.join("\n")).toEqual([]);
  });

  test("canvas and SVG are named for assistive technology", async ({ page }) => {
    await gotoHome(page);
    const canvas = page.locator("[data-subpixel] canvas");
    if ((await canvas.count()) > 0) {
      const name = await canvas.first().getAttribute("aria-label");
      expect(name?.length ?? 0).toBeGreaterThan(10);
      await expect(canvas.first()).toHaveAttribute("role", "img");
    }
    const svgs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("svg")).map((svg) => ({
        hidden:
          svg.getAttribute("aria-hidden") === "true" ||
          Boolean(svg.closest('[aria-hidden="true"]')),
        label:
          svg.getAttribute("aria-label") ??
          svg.querySelector("title")?.textContent ??
          "",
        role: svg.getAttribute("role"),
      }))
    );
    for (const svg of svgs) {
      expect(
        svg.hidden || svg.label.length > 0,
        "SVG without aria-hidden or accessible name"
      ).toBe(true);
    }
  });

  test("keyboard focus is always visible", async ({ page }) => {
    await gotoHome(page);
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press("Tab");
      const focus = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const style = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 40),
          outlineStyle: style.outlineStyle,
          outlineWidth: parseFloat(style.outlineWidth || "0"),
          boxShadow: style.boxShadow,
        };
      });
      if (!focus) continue;
      const visible =
        (focus.outlineStyle !== "none" && focus.outlineWidth >= 1) ||
        (focus.boxShadow && focus.boxShadow !== "none");
      expect(visible, `no focus ring on ${focus.tag} "${focus.text}"`).toBe(true);
    }
  });

  test("skip link appears on focus and targets main", async ({ page }) => {
    await gotoHome(page);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeFocused();
    const box = await skip.boundingBox();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    await expect(skip).toHaveAttribute("href", "#main");
  });

  test("reduced motion keeps every section complete", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoPath(page, "/");
    const state = await page.evaluate(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section]")
      ).map((section) => ({
        id: section.id,
        height: section.getBoundingClientRect().height,
      }));
      const animated = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]")
      ).map((el) => ({
        opacity: getComputedStyle(el).opacity,
        transform: getComputedStyle(el).transform,
      }));
      return { sections, animated, pin: document.getElementById("work")?.dataset.pinState };
    });
    expect(state.pin).toBe("static");
    for (const section of state.sections) {
      expect(section.height, section.id).toBeGreaterThan(100);
    }
    for (const el of state.animated) {
      expect(el.opacity).toBe("1");
      expect(el.transform === "none" || el.transform === "matrix(1, 0, 0, 1, 0, 0)").toBe(true);
    }
  });
});
