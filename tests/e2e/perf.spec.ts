import { expect, test } from "@playwright/test";
import { gotoPath, skipLoader } from "./helpers";

/**
 * Page weight and main-thread work per route, measured on the wire (transfer
 * size) rather than from the build log. Lighthouse covers LCP/CLS/TBT; this
 * keeps a repeatable JSON-friendly record of what is actually downloaded.
 */

const ROUTES = ["/", "/work", "/work/jawi-ocr"];

test.describe("page weight", () => {
  test.beforeEach(async ({ page }) => {
    await skipLoader(page);
  });

  for (const route of ROUTES) {
    test(`resources for ${route}`, async ({ page }) => {
      await gotoPath(page, route);
      await page.waitForTimeout(800);

      const data = await page.evaluate(() => {
        const entries = performance.getEntriesByType(
          "resource"
        ) as PerformanceResourceTiming[];
        const byType: Record<string, number> = {};
        for (const entry of entries) {
          const path = new URL(entry.name).pathname;
          const kind = path.endsWith(".js")
            ? "js"
            : path.endsWith(".css")
              ? "css"
              : /\.(woff2?|ttf|otf)$/.test(path)
                ? "font"
                : /\.(png|jpe?g|webp|avif|svg)$/.test(path)
                  ? "image"
                  : "other";
          byType[kind] = (byType[kind] ?? 0) + (entry.transferSize || 0);
        }
        const nav = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        const total = entries.reduce(
          (sum, entry) => sum + (entry.transferSize || 0),
          0
        );
        return {
          document: nav?.transferSize ?? 0,
          total: total + (nav?.transferSize ?? 0),
          byType,
          requests: entries.length,
          domNodes: document.querySelectorAll("*").length,
          scripts: document.querySelectorAll("script[src]").length,
        };
      });

      test.info().annotations.push({
        type: "page-weight",
        description: `${route}: ${(data.total / 1024).toFixed(1)} KB total, ${((data.byType.js ?? 0) / 1024).toFixed(1)} KB JS, ${((data.byType.image ?? 0) / 1024).toFixed(1)} KB image, ${((data.byType.font ?? 0) / 1024).toFixed(1)} KB font, ${data.requests} requests, ${data.domNodes} DOM nodes`,
      });
      console.log(
        `WEIGHT ${route} total=${(data.total / 1024).toFixed(1)}KB js=${((data.byType.js ?? 0) / 1024).toFixed(1)}KB css=${((data.byType.css ?? 0) / 1024).toFixed(1)}KB font=${((data.byType.font ?? 0) / 1024).toFixed(1)}KB img=${((data.byType.image ?? 0) / 1024).toFixed(1)}KB dom=${data.domNodes} req=${data.requests}`
      );

      expect(data.total).toBeLessThan(1_500_000);
      expect(data.byType.js ?? 0).toBeLessThan(450_000);
      expect(data.domNodes).toBeLessThan(3_000);
    });
  }

  test("long tasks during load stay bounded", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __longTasks: number[] }).__longTasks = [];
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            (window as unknown as { __longTasks: number[] }).__longTasks.push(
              entry.duration
            );
          }
        }).observe({ entryTypes: ["longtask"] });
      } catch {
        /* unsupported */
      }
    });
    await gotoPath(page, "/");
    await page.waitForTimeout(2_500);
    const tasks = await page.evaluate(
      () => (window as unknown as { __longTasks: number[] }).__longTasks
    );
    const total = tasks.reduce((sum, value) => sum + value, 0);
    test.info().annotations.push({
      type: "long-tasks",
      description: `${tasks.length} tasks, ${Math.round(total)} ms total, worst ${Math.round(Math.max(0, ...tasks))} ms`,
    });
    console.log(
      `LONGTASK count=${tasks.length} total=${Math.round(total)}ms worst=${Math.round(Math.max(0, ...tasks))}ms`
    );
    expect(Math.max(0, ...tasks)).toBeLessThan(1_000);
  });
});
