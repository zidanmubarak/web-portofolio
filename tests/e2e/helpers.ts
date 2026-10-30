import { expect, type Page, type TestInfo } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * Shared helpers for the independent QA suite.
 *
 * Nothing here touches application code: every hook is either a public DOM
 * contract documented in `contracts.md`, a standard browser API, or a user
 * action a visitor could perform.
 */

export const AXE_PATH = path.join(
  process.cwd(),
  "node_modules",
  "axe-core",
  "axe.min.js"
);

/**
 * Mark the loader as already seen for this browser session. Tests that are not
 * about the loader use this so they do not pay 2.5 s per navigation.
 */
export async function skipLoader(page: Page) {
  await page.addInitScript(() => {
    try {
      window.sessionStorage.setItem("rubric:loaded", "1");
    } catch {
      /* storage disabled */
    }
    // Record loader events for the tests that do care about ordering.
    const events: string[] = [];
    (window as unknown as { __loaderEvents: string[] }).__loaderEvents = events;
    window.addEventListener("rubric:loader-exit-start", () =>
      events.push("exit-start")
    );
    window.addEventListener("rubric:loader-exit", () => events.push("exit"));
  });
}

export async function gotoHome(page: Page) {
  await page.goto("/", { waitUntil: "load" });
  await waitForSettled(page);
}

export async function gotoPath(page: Page, url: string) {
  await page.goto(url, { waitUntil: "load" });
  await waitForSettled(page);
}

/** Wait for the loader to finish and one animation frame to paint. */
export async function waitForSettled(page: Page) {
  await page.waitForFunction(
    () => document.documentElement.dataset.loader === "done",
    undefined,
    { timeout: 15_000 }
  );
  await waitForStableLayout(page);
  await page.waitForTimeout(80);
}

/**
 * ScrollTrigger inserts pin spacers and fonts change line counts; both alter
 * document height after hydration. Wait until the height has been stable for
 * two samples before measuring anything that depends on layout.
 */
export async function waitForStableLayout(page: Page, samples = 8) {
  let last = -1;
  for (let index = 0; index < samples; index += 1) {
    const height = await page.evaluate(
      () => document.documentElement.scrollHeight
    );
    if (height === last) return;
    last = height;
    await page.waitForTimeout(180);
  }
}

/** Wait for the loader to be gone without throwing when it never mounted. */
export async function waitForLoaderDone(page: Page, timeout = 8_000) {
  await page.waitForFunction(
    () => document.documentElement.dataset.loader === "done",
    undefined,
    { timeout }
  );
}

/** Wait until the hero meta fade and plate clip have settled. */
export async function waitForHeroReveal(page: Page) {
  await page
    .waitForFunction(
      () => {
        const plate = document.querySelector<HTMLElement>("[data-hero-plate]");
        const clip = plate ? getComputedStyle(plate).clipPath : "none";
        const plateDone = clip === "none" || clip.includes("inset(0");
        const metas = Array.from(
          document.querySelectorAll<HTMLElement>("[data-hero-meta]")
        );
        const metasDone = metas.every(
          (el) => Number(getComputedStyle(el).opacity) > 0.99
        );
        return plateDone && metasDone;
      },
      undefined,
      { timeout: 6_000 }
    )
    .catch(() => {});
}

export async function addAxe(page: Page) {
  await page.addScriptTag({ path: AXE_PATH });
}

export type AxeViolation = {
  id: string;
  impact: string | null;
  help: string;
  nodes: { target: string[]; failureSummary?: string }[];
};

/**
 * Run axe with the WCAG 2.x A/AA tag set (the target in the brief is AA).
 * Best-practice rules are returned separately so they never turn into noise.
 */
export async function axeScan(
  page: Page,
  tags: string[] = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]
) {
  await addAxe(page);
  return page.evaluate(async (tagList) => {
    const axe = (
      window as unknown as {
        axe: {
          run: (
            context: Document,
            options: Record<string, unknown>
          ) => Promise<{
            violations: AxeViolation[];
            passes: { id: string }[];
            incomplete: AxeViolation[];
          }>;
        };
      }
    ).axe;
    const result = await axe.run(document, {
      runOnly: {
        type: "tag",
        values: tagList,
      },
      resultTypes: ["violations", "incomplete"],
    });
    return {
      violations: result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({
          target: node.target as string[],
          failureSummary: node.failureSummary,
        })),
      })),
      incomplete: result.incomplete.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({
          target: node.target as string[],
          failureSummary: node.failureSummary,
        })),
      })),
    };
  }, tags);
}

/**
 * Text as a reader (or a screen reader) gets it: skips `aria-hidden` subtrees
 * such as odometer digit strips, and includes accessible names of role=img.
 */
export async function readableText(page: Page, selector = "body") {
  return page.evaluate((rootSelector) => {
    const root = document.querySelector(rootSelector);
    if (!root) return "";
    const parts: string[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement;
      if (!el) continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const text = node.textContent?.trim();
      if (text) parts.push(text);
    }
    root.querySelectorAll('[role="img"][aria-label]').forEach((el) => {
      parts.push(` ${el.getAttribute("aria-label")} `);
    });
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }, selector);
}

export function formatViolations(violations: AxeViolation[]) {
  if (violations.length === 0) return "0 violations";
  return violations
    .map(
      (violation) =>
        `${violation.id} (${violation.impact ?? "n/a"}): ${violation.nodes
          .map((node) => node.target.join(" "))
          .join(", ")}`
    )
    .join("\n");
}

/** Evidence directory: vault by default, local artifact folder otherwise. */
export function evidenceDir(testInfo?: TestInfo) {
  const configured = process.env.QA_EVIDENCE_DIR;
  if (configured) {
    fs.mkdirSync(configured, { recursive: true });
    return configured;
  }
  const fallback = path.join(
    testInfo?.outputDir ?? path.join(process.cwd(), "tests", ".artifacts"),
    "evidence"
  );
  fs.mkdirSync(fallback, { recursive: true });
  return fallback;
}

/** Capture a full-page or viewport screenshot into the evidence folder. */
export async function capture(
  page: Page,
  name: string,
  options: { fullPage?: boolean } = {}
) {
  const dir = evidenceDir();
  const file = path.join(dir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: options.fullPage });
  return file;
}

/** Scroll an element into view without Lenis (programmatic scroll). */
export async function scrollToSection(page: Page, id: string) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) throw new Error(`#${sectionId} not found`);
    const top =
      el.getBoundingClientRect().top + window.scrollY - 64 /* top bar */;
    window.scrollTo(0, top);
  }, id);
  await page.waitForTimeout(450);
}

export async function scrollBy(page: Page, y: number) {
  await page.evaluate((amount) => window.scrollTo(0, amount), y);
  await page.waitForTimeout(450);
}

export async function horizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      innerWidth: window.innerWidth,
      // Elements that escape the viewport, useful when the assertion fails.
      offenders: Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
        })
        .slice(0, 8)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} [${Math.round(rect.left)},${Math.round(rect.right)}]`;
        }),
    };
  });
}

export function expectNoHorizontalOverflow(result: Awaited<ReturnType<typeof horizontalOverflow>>) {
  expect(
    result.scrollWidth,
    `horizontal overflow: ${result.scrollWidth} > ${result.clientWidth}\n${result.offenders.join("\n")}`
  ).toBeLessThanOrEqual(result.clientWidth + 1);
}
