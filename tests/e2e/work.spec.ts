import { expect, test } from "@playwright/test";
import {
  gotoHome,
  gotoPath,
  horizontalOverflow,
  expectNoHorizontalOverflow,
  readableText,
  skipLoader,
} from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipLoader(page);
});

test.describe("selected work rail", () => {
  test("pins horizontally on desktop and drives the counter + progress", async ({
    page,
  }) => {
    await gotoHome(page);
    const sectionTop = await page.evaluate(() => {
      const el = document.getElementById("work");
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });
    const viewport = page.viewportSize()!;
    const pinLength = 5 * viewport.height * 0.65;

    await page.evaluate((top) => window.scrollTo(0, top + 100), sectionTop);
    await page.waitForTimeout(800);

    const start = await page.evaluate(() => {
      const section = document.getElementById("work")!;
      const track = document.querySelector<HTMLElement>("[data-work-track]")!;
      return {
        pin: section.dataset.pinState,
        transform: getComputedStyle(track).transform,
        scrollHeight: document.documentElement.scrollHeight,
        scrollY: window.scrollY,
      };
    });
    expect(start.pin).toBe("pinned");

    await page.evaluate(
      (top) => window.scrollTo(0, top + 100 + (5 * innerHeight * 0.65) * 0.5),
      sectionTop
    );
    await page.waitForTimeout(900);
    const middle = await page.evaluate(() => {
      const track = document.querySelector<HTMLElement>("[data-work-track]")!;
      const counter = Array.from(
        document.querySelectorAll<HTMLElement>("#work p")
      )
        .map((p) => p.textContent?.trim())
        .find((text) => /^\d{2} \/ 06$/.test(text ?? ""));
      const progress = document.querySelector<HTMLElement>(
        "#work div.h-px > div"
      );
      return {
        transform: getComputedStyle(track).transform,
        counter,
        progress: progress ? getComputedStyle(progress).transform : null,
      };
    });
    expect(middle.transform).not.toBe("none");
    const translate = Number(
      middle.transform.match(/matrix\([^)]*,\s*([-\d.]+),\s*[-\d.]+\)/)?.[1] ?? 0
    );
    expect(Math.abs(translate)).toBeGreaterThan(200);
    expect(middle.counter).toMatch(/^0[3-5] \/ 06$/);

    await page.evaluate(
      (top) => window.scrollTo(0, top + 100 + 5 * innerHeight * 0.65 + 120),
      sectionTop
    );
    await page.waitForTimeout(900);
    const end = await page.evaluate(() => ({
      counter: Array.from(document.querySelectorAll<HTMLElement>("#work p"))
        .map((p) => p.textContent?.trim())
        .find((text) => /^\d{2} \/ 06$/.test(text ?? "")),
      scrollY: window.scrollY,
    }));
    expect(end.counter).toBe("06 / 06");

    // The page must keep scrolling after the pin ends — no scroll trap.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(700);
    await expect(page.locator("#footer")).toBeInViewport();

    expect(pinLength).toBeGreaterThan(0);
    expect(start.scrollHeight).toBeGreaterThan(3_000);
  });

  test("stacks below 1024 px with no pin and no horizontal overflow", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 900, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await gotoHome(page);
      const state = await page.evaluate(() => {
        const section = document.getElementById("work")!;
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>("[data-work-card]")
        );
        const boxes = cards.map((card) => card.getBoundingClientRect());
        return {
          pin: section.dataset.pinState,
          cards: cards.length,
          trackTransform: getComputedStyle(
            document.querySelector<HTMLElement>("[data-work-track]")!
          ).transform,
          distinctLefts: new Set(boxes.map((box) => Math.round(box.left))).size,
        };
      });
      expect(state.pin, `${viewport.width}px`).toBe("static");
      expect(state.cards).toBe(6);
      expect(state.trackTransform).toBe("none");
      expect(state.distinctLefts, `${viewport.width}px`).toBe(1);
      expectNoHorizontalOverflow(await horizontalOverflow(page));
    }
  });

  test("card media keeps a readable 16/10 frame at tablet widths", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoHome(page);
    const frames = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-work-media]")).map(
        (media) => {
          const rect = media.getBoundingClientRect();
          return {
            slug: media.closest("a")?.getAttribute("href") ?? "?",
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            ratio: Number((rect.width / rect.height).toFixed(2)),
          };
        }
      )
    );
    expect(frames).toHaveLength(6);
    for (const frame of frames) {
      expect(
        frame.ratio,
        `${frame.slug}: ${frame.width}×${frame.height} = ${frame.ratio}:1`
      ).toBeLessThanOrEqual(1.9);
    }
  });

  test("every card is reachable by keyboard and focus stays visible", async ({
    page,
  }) => {
    await gotoHome(page);
    await page.evaluate(() => {
      const el = document.getElementById("work");
      window.scrollTo(0, (el?.getBoundingClientRect().top ?? 0) + window.scrollY);
    });
    await page.waitForTimeout(600);

    const cards = page.locator("[data-work-card]");
    await expect(cards).toHaveCount(6);
    const first = cards.first();
    await first.focus();
    await expect(first).toBeFocused();

    let reachable = 1;
    for (let i = 0; i < 5; i += 1) {
      await page.keyboard.press("Tab");
      const focusedInCard = await page.evaluate(
        () => Boolean(document.activeElement?.closest("[data-work-card]"))
      );
      if (focusedInCard) reachable += 1;
    }
    expect(reachable).toBe(6);
  });

  test("work index lists six projects, each leading to a case study", async ({
    page,
  }) => {
    await gotoPath(page, "/work");
    const links = page.locator('a[href^="/work/"]');
    await expect(links).toHaveCount(6);
    const titles = await page
      .locator('a[href^="/work/"] h2, a[href^="/work/"] h3')
      .allInnerTexts();
    expect(titles.length).toBeGreaterThanOrEqual(6);
    for (const title of ["Jawi OCR", "Pacu Pintar", "Memory Vault AI", "NusantaraGo", "Guest Book System", "Climate × Agriculture"]) {
      expect(await page.getByText(title, { exact: true }).count(), title).toBeGreaterThan(0);
    }
    await page.locator('a[href="/work/pacu-pintar"]').first().click();
    await page.waitForURL(/\/work\/pacu-pintar$/);
    await expect(page.locator("h1")).toContainText("Pacu Pintar");
  });

  test("case study has structured meta, result, evidence figures and sources", async ({
    page,
  }) => {
    await gotoPath(page, "/work/jawi-ocr");
    const h1 = page.locator("h1");
    await expect(h1).toContainText(/Jawi/i);

    const text = await readableText(page, "main");
    for (const token of [
      "17.35",
      "82.51",
      "QLoRA",
      "Result",
      "Sources",
    ]) {
      expect(text, token).toContain(token);
    }

    await expect(page.locator("figure")).not.toHaveCount(0);
    const figuresWithoutCaption = await page.evaluate(() =>
      Array.from(document.querySelectorAll("figure")).filter(
        (figure) => !figure.querySelector("figcaption")
      ).length
    );
    expect(figuresWithoutCaption).toBe(0);

    const external = page.locator('main a[target="_blank"]');
    expect(await external.count()).toBeGreaterThan(0);
    for (const link of await external.all()) {
      expect(await link.getAttribute("rel")).toContain("noopener");
    }
  });
});
