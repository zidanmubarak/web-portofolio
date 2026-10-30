import { expect, test } from "@playwright/test";
import { gotoHome, skipLoader, waitForHeroReveal } from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipLoader(page);
});

async function scrollToId(page: import("@playwright/test").Page, id: string) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) throw new Error(`#${sectionId} missing`);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80);
  }, id);
  await page.waitForTimeout(700);
}

test.describe("scroll motion", () => {
  test("each section uses its own pattern from motion-map", async ({ page }) => {
    await gotoHome(page);
    await waitForHeroReveal(page);

    // Hero — masked lines (SplitText) and a resolved plate clip.
    const hero = await page.evaluate(() => ({
      lines: document.querySelectorAll("#hero-heading .motion-line").length,
      plateClip: getComputedStyle(
        document.querySelector("[data-hero-plate]") as HTMLElement
      ).clipPath,
    }));
    expect(hero.lines).toBeGreaterThanOrEqual(2);
    expect(hero.plateClip === "none" || hero.plateClip.includes("inset(0")).toBe(true);

    // About — word opacity is scrubbed, not a block fade.
    await scrollToId(page, "about");
    const about = await page.evaluate(() => {
      const statement = document.querySelector<HTMLElement>(
        "[data-about-statement]"
      )!;
      const words = Array.from(statement.querySelectorAll<HTMLElement>(".motion-word"));
      return {
        words: words.length,
        opacities: words.slice(0, 8).map((word) => Number(getComputedStyle(word).opacity)),
        statementOpacity: Number(getComputedStyle(statement).opacity),
      };
    });
    expect(about.words).toBeGreaterThan(6);
    expect(about.statementOpacity).toBe(1);
    expect(about.opacities.some((value) => value < 1)).toBe(true);

    // Services — disclosure, one row at a time.
    await scrollToId(page, "services");
    const rows = page.locator("[data-service-row]");
    await expect(rows).toHaveCount(4);
    await rows.nth(1).locator("button").click();
    await page.waitForTimeout(600);
    const services = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-service-row]")).map(
        (row) => ({
          active: row.querySelector("button")?.dataset.active,
          expanded: row
            .querySelector("button")
            ?.getAttribute("aria-expanded"),
        })
      )
    );
    expect(services.filter((row) => row.active === "true")).toHaveLength(1);
    expect(services[1].active).toBe("true");
    expect(services[1].expanded).toBe("true");

    // Work — pinned rail on desktop with a moving track.
    const work = await page.evaluate(() => ({
      pin: document.getElementById("work")?.dataset.pinState,
      transform: getComputedStyle(
        document.querySelector("[data-work-track]") as HTMLElement
      ).transform,
    }));
    expect(work.pin).toBe("pinned");

    // Record — numbered accordion with FLIP and one open item.
    await scrollToId(page, "record");
    const accordions = page.locator('[data-accordion][aria-label="Experience"]');
    await expect(accordions).toHaveCount(1);
    const triggers = accordions.locator("button[aria-expanded]");
    const triggerCount = await triggers.count();
    expect(triggerCount).toBeGreaterThan(3);
    await triggers.nth(1).click();
    await page.waitForTimeout(650);
    const expanded = await triggers.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("aria-expanded"))
    );
    expect(expanded.filter((value) => value === "true")).toHaveLength(1);
    expect(expanded[1]).toBe("true");

    // Tools — inventory cells in a six-column grid, hover swaps state.
    await scrollToId(page, "tools");
    const tools = await page.evaluate(() => {
      const cells = Array.from(
        document.querySelectorAll<HTMLElement>("[data-tools-group] li")
      );
      const tops = new Set(cells.map((cell) => Math.round(cell.getBoundingClientRect().top)));
      return { count: cells.length, rows: tops.size };
    });
    expect(tools.count).toBeGreaterThanOrEqual(30);
    expect(tools.rows).toBeLessThan(tools.count);
    const cell = page.locator("[data-tools-group] li > div").first();
    const before = await cell.evaluate((el) => getComputedStyle(el).backgroundColor);
    await cell.hover();
    await page.waitForTimeout(450);
    const after = await cell.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(after).not.toBe(before);

    // Contact — paper surface, resolved clip.
    await scrollToId(page, "contact");
    const contact = await page.evaluate(() => {
      const section = document.getElementById("contact")!;
      const style = getComputedStyle(section);
      return {
        surface: section.dataset.surface,
        background: style.backgroundColor,
        clip: style.clipPath,
      };
    });
    expect(contact.surface).toBe("paper");
    expect(contact.background).toBe("rgb(231, 225, 213)");
    expect(contact.clip === "none" || contact.clip.includes("inset(0")).toBe(true);

    // Footer — the signature is drawn, the outline name is revealed.
    await scrollToId(page, "footer");
    await page.waitForTimeout(900);
    const footer = await page.evaluate(() => {
      const footerEl = document.getElementById("footer")!;
      const svg = footerEl.querySelector("svg");
      const name = footerEl.querySelector<HTMLElement>("[data-footer-name]");
      return {
        paths: svg?.querySelectorAll("path").length ?? 0,
        nameClip: name ? getComputedStyle(name).clipPath : null,
        nameOpacity: name ? Number(getComputedStyle(name).opacity) : null,
      };
    });
    expect(footer.paths).toBeGreaterThan(0);
    expect(footer.nameOpacity).toBe(1);
  });

  test("full scroll leaves no section or line hidden", async ({ page }) => {
    await gotoHome(page);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      await page.evaluate((to) => window.scrollTo(0, to), y);
      await page.waitForTimeout(230);
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1_000);

    const hidden = await page.evaluate(() => {
      return Array.from(document.querySelectorAll<HTMLElement>("[data-section] *"))
        .filter((el) => {
          if (el.closest('[aria-hidden="true"]')) return false;
          if ((el.textContent ?? "").trim().length < 8) return false;
          if (el.children.length > 0) return false;
          return Number(getComputedStyle(el).opacity) < 0.2;
        })
        .slice(0, 10)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent ?? "").trim().slice(0, 40),
          opacity: getComputedStyle(el).opacity,
        }));
    });
    expect(hidden, JSON.stringify(hidden, null, 2)).toEqual([]);

    // The pin must release: the footer is reachable at the end of the page.
    await expect(page.locator("#footer")).toBeInViewport();
  });

  test("scroll is not hijacked on touch / mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHome(page);
    const start = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(900);
    const afterWheel = await page.evaluate(() => window.scrollY);
    expect(afterWheel).toBeGreaterThan(start + 200);
  });

  test("reduced motion sets every pattern to its final state", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);
    const state = await page.evaluate(() => {
      const track = document.querySelector<HTMLElement>("[data-work-track]")!;
      const heroName = document.querySelector<HTMLElement>("#hero-heading")!;
      return {
        pin: document.getElementById("work")?.dataset.pinState,
        track: getComputedStyle(track).transform,
        heroLines: heroName.querySelectorAll(".motion-line").length,
        aboutWords: document.querySelectorAll("[data-about-statement] .motion-word").length,
        panels: Array.from(
          document.querySelectorAll<HTMLElement>("[data-accordion-panel]")
        ).map((panel) => getComputedStyle(panel).clipPath),
      };
    });
    expect(state.pin).toBe("static");
    expect(state.track).toBe("none");
    expect(state.heroLines).toBe(0);
    expect(state.aboutWords).toBe(0);
    for (const clip of state.panels) {
      expect(clip === "none" || clip.includes("inset(0")).toBe(true);
    }
  });
});
