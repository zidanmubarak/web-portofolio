import { expect, test } from "@playwright/test";
import { waitForLoaderDone } from "./helpers";

/**
 * Loader contract: first visit vs repeat, no flash, hard deadline, reduced
 * motion, and the hand-off to the top bar signature.
 */

test.describe("loader (first visit)", () => {
  test("runs once, hides the page, then reveals it inside the budget", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const events: string[] = [];
      (window as unknown as { __loaderEvents: string[] }).__loaderEvents = events;
      window.addEventListener("rubric:loader-exit-start", () =>
        events.push("exit-start")
      );
      window.addEventListener("rubric:loader-exit", () => events.push("exit"));
    });

    const started = Date.now();
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForSelector("[data-loader-root]", {
      state: "attached",
      timeout: 5_000,
    });
    // aria-busy is set by the hydrated component, not the pre-paint gate.
    await page.waitForSelector('#main[aria-busy="true"]', { timeout: 5_000 });

    const pendingState = await page.evaluate(() => ({
      loader: document.documentElement.dataset.loader,
      mainOpacity: Number(
        getComputedStyle(document.getElementById("main") as HTMLElement).opacity
      ),
      busy: document.getElementById("main")?.getAttribute("aria-busy"),
      overlayTop: document
        .querySelector("[data-loader-root]")
        ?.getBoundingClientRect().top,
      counter: document.querySelector(".signature-counter")?.textContent,
    }));
    expect(pendingState.loader).toBe("pending");
    expect(pendingState.mainOpacity).toBe(0);
    expect(pendingState.busy).toBe("true");
    expect(pendingState.overlayTop).toBe(0);
    expect(pendingState.counter).toMatch(/^\d{3}$/);

    // The wipe must start before the overlay is removed (hero reveals behind it).
    await page.waitForFunction(
      () => document.documentElement.dataset.loader === "exiting",
      undefined,
      { timeout: 6_000 }
    );
    await waitForLoaderDone(page, 8_000);
    const elapsed = Date.now() - started;

    const settled = await page.evaluate(() => ({
      events: (window as unknown as { __loaderEvents: string[] }).__loaderEvents,
      mainOpacity: Number(
        getComputedStyle(document.getElementById("main") as HTMLElement).opacity
      ),
      busy: document.getElementById("main")?.hasAttribute("aria-busy"),
      overlays: document.querySelectorAll("[data-loader-root]").length,
      stored: window.sessionStorage.getItem("rubric:loaded"),
      loaded: document.documentElement.dataset.loaded,
      signatureTarget: Boolean(
        document.querySelector('[data-signature-target="topbar"]')
      ),
    }));

    expect(elapsed).toBeLessThan(4_500);
    expect(settled.events).toEqual(["exit-start", "exit"]);
    expect(settled.mainOpacity).toBe(1);
    expect(settled.busy).toBe(false);
    expect(settled.overlays).toBe(0);
    expect(settled.stored).toBe("1");
    expect(settled.loaded).toBe("true");
    expect(settled.signatureTarget).toBe(true);
  });

  test("repeat visit in the same session skips the overlay", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await waitForLoaderDone(page, 8_000);
    expect(
      await page.evaluate(() => window.sessionStorage.getItem("rubric:loaded"))
    ).toBe("1");

    const started = Date.now();
    await page.reload({ waitUntil: "commit" });
    await waitForLoaderDone(page, 3_000);
    // The overlay is in the SSR HTML; the skip path unmounts it on hydration.
    await expect(page.locator("[data-loader-root]")).toHaveCount(0, {
      timeout: 3_000,
    });
    const elapsed = Date.now() - started;
    const state = await page.evaluate(() => ({
      overlays: document.querySelectorAll("[data-loader-root]").length,
      mainOpacity: Number(
        getComputedStyle(document.getElementById("main") as HTMLElement).opacity
      ),
    }));
    expect(elapsed).toBeLessThan(2_000);
    expect(state.overlays).toBe(0);
    expect(state.mainOpacity).toBe(1);
  });

  test("a slow GPU still leaves the page visible before the hard cap", async ({
    page,
  }) => {
    const client = await page.context().newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: 3 });
    await page.route("**/images/portrait/*", (route) => route.abort());

    const started = Date.now();
    await page.goto("/", { waitUntil: "load" });
    await waitForLoaderDone(page, 9_000);
    const elapsed = Date.now() - started;
    test.info().annotations.push({
      type: "slow-gpu",
      description: `3x CPU, portrait blocked: ${elapsed} ms to data-loader=done`,
    });
    // Loader hard cap is 4 s and the gate fail-safe 6 s; 3x CPU adds hydration
    // time on top. Anything above this means the page is being held hostage.
    expect(elapsed).toBeLessThan(7_000);
    await expect(page.locator("#hero-heading")).toBeVisible();
  });

  test("the gate fail-safe reveals the page if hydration never happens", async ({
    page,
  }) => {
    await page.route("**/_next/static/**", (route) => route.abort());
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const original = await page.evaluate(
      () => document.documentElement.dataset.loader
    );
    expect(original).toBe("pending");
    await page.waitForFunction(
      () => document.documentElement.dataset.loader === "done",
      undefined,
      { timeout: 8_000 }
    );
    const opacity = await page.evaluate(() =>
      Number(getComputedStyle(document.getElementById("main") as HTMLElement).opacity)
    );
    expect(opacity).toBe(1);
  });
});

test.describe("loader (reduced motion)", () => {
  test.use({ reducedMotion: "reduce" });

  test("is skipped entirely and all content is final", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await expect(page.locator("[data-loader-root]")).toHaveCount(0, {
      timeout: 3_000,
    });
    const state = await page.evaluate(() => ({
      loader: document.documentElement.dataset.loader,
      overlays: document.querySelectorAll("[data-loader-root]").length,
      mainOpacity: Number(
        getComputedStyle(document.getElementById("main") as HTMLElement).opacity
      ),
      heroName: document.getElementById("hero-heading")?.textContent,
      workPin: document.getElementById("work")?.dataset.pinState,
    }));
    expect(state.loader).toBe("done");
    expect(state.overlays).toBe(0);
    expect(state.mainOpacity).toBe(1);
    expect(state.heroName).toContain("Zidan");
    expect(state.workPin).toBe("static");
  });
});
