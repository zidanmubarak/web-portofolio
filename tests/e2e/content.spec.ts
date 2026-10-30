import { expect, test } from "@playwright/test";
import { gotoHome, gotoPath, readableText, skipLoader } from "./helpers";

/**
 * Content checks: every fact must be traceable to `content-source.md`, no
 * placeholder copy, no banned voice, no invented clients or testimonials.
 */

const BANNED = [
  /passionate/i,
  /crafting/i,
  /innovative/i,
  /seamless/i,
  /\bjourney\b/i,
  /turning ideas into reality/i,
  /hi,? i'?m/i,
  /open to work/i,
  /lorem ipsum/i,
  /\bTBD\b/,
  /\bTODO\b/,
  /\[\[VERIFY/,
  /screenshot pending/i,
  /image pending/i,
  /capture pending/i,
  /coming soon/i,
  /placeholder/i,
];

test.beforeEach(async ({ page }) => {
  await skipLoader(page);
});

test.describe("content", () => {
  test("home copy is free of placeholders, banned voice and emoji", async ({
    page,
  }) => {
    await gotoHome(page);
    const text = await page.locator("body").innerText();
    for (const pattern of BANNED) {
      expect(text, String(pattern)).not.toMatch(pattern);
    }
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
  });

  test("every fact on the home page matches the verified source", async ({
    page,
  }) => {
    await gotoHome(page);
    const text = await readableText(page);
    const verified = [
      "82.5", // CER Jawi base — CV + model card
      "17.4", // fine-tuned — CV + model card
      "7,902", // authentic samples — owner answer
      "3.77", // GPA — CV
      "107", // NusantaraGo commits — GitHub
      "10,002", // climate dataset rows
      "Banda Aceh",
    ];
    for (const fact of verified) {
      expect(text, fact).toContain(fact);
    }
    // Numbers that never appear in the sources must not be invented here.
    for (const fake of ["30+", "50+", "100+ clients", "5.0", "99.9%"]) {
      expect(text, fake).not.toContain(fake);
    }
  });

  test("sections are numbered and ordered 01–06", async ({ page }) => {
    await gotoHome(page);
    const order = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).map(
        (section) => ({
          id: section.id,
          index: section.dataset.index ?? null,
          label: section.dataset.label ?? null,
          surface: section.dataset.surface,
        })
      )
    );
    expect(order.map((section) => section.id)).toEqual([
      "hero",
      "about",
      "services",
      "work",
      "record",
      "tools",
      "contact",
    ]);
    expect(order.map((section) => section.index)).toEqual([
      null,
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
    ]);
    expect(order.find((section) => section.id === "contact")!.surface).toBe("paper");
  });

  test("case study copy is complete and cites its sources", async ({ page }) => {
    await gotoPath(page, "/work/jawi-ocr");
    const text = await readableText(page, "main");
    for (const pattern of BANNED) {
      expect(text, String(pattern)).not.toMatch(pattern);
    }
    for (const fact of ["82.51", "17.35", "90.59", "16.48", "26,000", "7,902", "790"]) {
      expect(text, fact).toContain(fact);
    }
    expect(text).toMatch(/sources/i);
    const external = page.locator('main a[href^="http"]');
    for (const link of await external.all()) {
      expect(await link.getAttribute("href")).toMatch(/^https:\/\//);
    }
  });

  test("nav, clock and coordinates are consistent", async ({ page }) => {
    await gotoHome(page);
    const topbar = await page.locator('[data-shell="topbar"]').innerText();
    expect(topbar).toContain("BANDA ACEH");
    expect(topbar).toMatch(/\d{2}:\d{2}\s*WIB/);

    const clocks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[data-shell="topbar"] time, [data-shell="topbar"] span'))
        .map((el) => el.textContent ?? "")
        .filter((value) => /\d{2}:\d{2}/.test(value))
    );
    expect(clocks.length).toBeGreaterThan(0);

    await page.getByRole("button", { name: /^INDEX$/ }).click();
    const dialog = page.getByRole("dialog", { name: /index/i });
    const items = await dialog.locator("[data-menu-item]").allInnerTexts();
    const numbers = items.map((item) => item.trim().match(/^(\d{2})/)?.[1]);
    expect(numbers).toEqual(["01", "02", "03", "04", "05", "06"]);
  });

  test("no link points nowhere", async ({ page }) => {
    await gotoHome(page);
    const bad = await page.evaluate(() => {
      return Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"))
        .filter((anchor) => {
          const href = anchor.getAttribute("href") ?? "";
          if (href === "#" || href === "") return true;
          if (href.startsWith("#")) return !document.querySelector(href);
          return false;
        })
        .map((anchor) => anchor.getAttribute("href") ?? "");
    });
    expect(bad).toEqual([]);
  });
});
