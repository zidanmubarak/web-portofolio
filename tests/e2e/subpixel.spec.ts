import { expect, test } from "@playwright/test";
import { capture, gotoHome, skipLoader } from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipLoader(page);
});

async function mode(page: import("@playwright/test").Page) {
  return page.locator("[data-subpixel]").first().getAttribute("data-mode");
}

test.describe("subpixel hero", () => {
  test("renders WebGL with an accessible name and no layout shift", async ({
    page,
  }) => {
    await gotoHome(page);
    await page
      .locator('[data-subpixel][data-mode="webgl"]')
      .first()
      .waitFor({ timeout: 15_000 });

    const canvas = page.locator("[data-subpixel] canvas").first();
    await expect(canvas).toHaveAttribute("role", "img");
    const label = await canvas.getAttribute("aria-label");
    expect(label).toContain("Zidan Mubarak");
    expect(label?.toLowerCase()).toContain("subpixel");

    // The poster underneath must be transparent once the shader paints.
    const posterOpacity = await page.evaluate(() => {
      const host = document.querySelector("[data-subpixel]")!;
      const img = host.querySelector("img");
      return img ? Number(getComputedStyle(img).opacity) : 1;
    });
    expect(posterOpacity).toBe(0);

    const before = await page.locator("[data-subpixel]").first().boundingBox();
    await page.waitForTimeout(1_500);
    const after = await page.locator("[data-subpixel]").first().boundingBox();
    expect(after!.width).toBeCloseTo(before!.width, 0);
    expect(after!.height).toBeCloseTo(before!.height, 0);

    const gl = await canvas.evaluate((node) => {
      const context = (node as HTMLCanvasElement).getContext("webgl2");
      return {
        exists: Boolean(context),
        width: (node as HTMLCanvasElement).width,
        height: (node as HTMLCanvasElement).height,
      };
    });
    expect(gl.exists).toBe(true);
    expect(gl.width).toBeGreaterThan(100);
    expect(gl.height).toBeGreaterThan(100);

    await capture(page, "subpixel-webgl-1440");
  });

  test("falls back to the masked poster without WebGL", async ({ page }) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      // @ts-expect-error test shim
      HTMLCanvasElement.prototype.getContext = function (type: string, ...rest) {
        if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
          return null;
        }
        return original.call(this, type, ...rest);
      };
    });
    await gotoHome(page);
    await page
      .locator('[data-subpixel][data-mode="fallback"]')
      .first()
      .waitFor({ timeout: 10_000 });

    const state = await page.evaluate(() => {
      const host = document.querySelector<HTMLElement>("[data-subpixel]")!;
      const canvas = host.querySelector("canvas")!;
      const poster = host.querySelector("img")!;
      const sr = host.querySelector(".sr-only");
      return {
        canvasHidden: canvas.getAttribute("aria-hidden"),
        canvasRole: canvas.getAttribute("role"),
        posterOpacity: Number(getComputedStyle(poster).opacity),
        srText: sr?.textContent ?? "",
        mask: getComputedStyle(host.children[1] as HTMLElement).maskImage,
      };
    });
    expect(state.canvasHidden).toBe("true");
    expect(state.canvasRole).toBeNull();
    expect(state.posterOpacity).toBe(1);
    expect(state.srText).toContain("Portrait of Zidan Mubarak");
    expect(state.mask).toContain("portrait-poster");

    // A fallback must not leave the page blank or the hero invisible.
    await expect(page.locator("#hero-heading")).toBeVisible();
    await capture(page, "subpixel-fallback-1440");
  });

  test("reduced motion uses the static fallback", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoHome(page);
    await page
      .locator('[data-subpixel][data-mode="fallback"]')
      .first()
      .waitFor({ timeout: 10_000 });
    expect(await mode(page)).toBe("fallback");
  });

  test("survives WebGL context loss and restores", async ({ page }) => {
    await gotoHome(page);
    await page
      .locator('[data-subpixel][data-mode="webgl"]')
      .first()
      .waitFor({ timeout: 15_000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const lost = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(
        "[data-subpixel] canvas"
      )!;
      const context = canvas.getContext("webgl2");
      const extension = context?.getExtension("WEBGL_lose_context");
      if (!context || !extension) return false;
      extension.loseContext();
      return true;
    });
    expect(lost).toBe(true);
    await page.waitForTimeout(500);
    // The page must remain usable while the context is gone.
    await expect(page.locator("#hero-heading")).toBeVisible();

    await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(
        "[data-subpixel] canvas"
      )!;
      canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.restoreContext();
    });
    await page.waitForTimeout(1_500);
    expect(await mode(page)).not.toBe("fallback");
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("resizes the canvas with the viewport without overflow", async ({ page }) => {
    await gotoHome(page);
    await page
      .locator('[data-subpixel][data-mode="webgl"]')
      .first()
      .waitFor({ timeout: 15_000 });
    const before = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>("[data-subpixel] canvas")!;
      return { width: canvas.width, height: canvas.height };
    });
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(900);
    const after = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>("[data-subpixel] canvas")!;
      return { width: canvas.width, height: canvas.height };
    });
    expect(after.width).not.toBe(before.width);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("holds a usable frame rate under 4x CPU throttling", async ({ page }) => {
    const client = await page.context().newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await gotoHome(page);
    await page
      .locator('[data-subpixel][data-mode="webgl"]')
      .first()
      .waitFor({ timeout: 20_000 });
    const stats = await page.evaluate(
      () =>
        new Promise<{ fps: number; worst: number; frames: number }>((resolve) => {
          const times: number[] = [];
          let last = performance.now();
          const tick = (now: number) => {
            times.push(now - last);
            last = now;
            if (times.length < 120) {
              requestAnimationFrame(tick);
              return;
            }
            const total = times.reduce((sum, value) => sum + value, 0);
            resolve({
              fps: Math.round(1000 / (total / times.length)),
              worst: Math.round(Math.max(...times)),
              frames: times.length,
            });
          };
          requestAnimationFrame(tick);
        })
    );
    test.info().annotations.push({
      type: "frame-time",
      description: `4x CPU: ${stats.fps} fps, worst frame ${stats.worst} ms`,
    });
    console.log(
      `FRAMETIME 4xCPU fps=${stats.fps} worst=${stats.worst}ms frames=${stats.frames}`
    );
    // Headless SwiftShader is the floor, not a mid-range laptop. Anything
    // below this is a real regression in the render loop.
    expect(stats.fps).toBeGreaterThan(24);
  });

  test("pointer and touch input do not break the shader", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await gotoHome(page);
    await page
      .locator('[data-subpixel][data-mode="webgl"]')
      .first()
      .waitFor({ timeout: 15_000 });
    const box = (await page.locator("[data-subpixel]").first().boundingBox())!;
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.3);
    await page.waitForTimeout(500);
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.55);
    await page.waitForTimeout(500);
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.waitForTimeout(500);
    expect(await mode(page)).toBe("webgl");
    expect(errors, errors.join("\n")).toEqual([]);
    await capture(page, "subpixel-loupe-1440");
  });
});

test.describe("subpixel hero — touch", () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } });

  test("tap activates the loupe and the shader keeps running", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/", { waitUntil: "load" });
    await page.waitForFunction(
      () => document.documentElement.dataset.loader === "done"
    );
    await page
      .locator('[data-subpixel][data-mode="webgl"]')
      .first()
      .waitFor({ timeout: 20_000 });
    const box = (await page.locator("[data-subpixel]").first().boundingBox())!;
    await page.touchscreen.tap(box.x + box.width * 0.5, box.y + box.height * 0.4);
    await page.waitForTimeout(800);
    expect(await mode(page)).toBe("webgl");
    expect(errors, errors.join("\n")).toEqual([]);
    await capture(page, "subpixel-touch-390");
  });
});
