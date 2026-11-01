import { expect, test } from "@playwright/test";

/**
 * Route and asset surface. Everything here is about what the deployed build
 * actually serves, not what the build log claims.
 */

const SLUGS = [
  "jawi-ocr",
  "pacu-pintar",
  "memory-vault",
  "nusantarago",
  "guest-book",
  "climate-agriculture",
];

test.describe("routes", () => {
  test("home, work index and every case study return 200", async ({ request }) => {
    for (const url of ["/", "/work", ...SLUGS.map((slug) => `/work/${slug}`)]) {
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
      expect(response.headers()["content-type"], url).toContain("text/html");
    }
  });

  test("work index links to all six case studies", async ({ request }) => {
    const html = await (await request.get("/work")).text();
    for (const slug of SLUGS) {
      expect(html, `missing /work/${slug}`).toContain(`/work/${slug}`);
    }
  });

  test("unknown routes return the not-found page", async ({ request }) => {
    for (const url of ["/this-does-not-exist", "/work/not-a-project"]) {
      const response = await request.get(url);
      expect(response.status(), url).toBe(404);
      const html = await response.text();
      expect(html).toContain("This page is not here");
    }
  });

  test("dev routes are not reachable in a production build", async ({ request }) => {
    for (const url of [
      "/dev/style",
      "/dev/style/motion-lab",
      "/dev/subpixel",
      "/dev/signature",
      "/dev/signature/source",
    ]) {
      const response = await request.get(url);
      expect(response.status(), url).toBe(404);
    }
  });

  test("seo files, icons and social cards are served", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(sitemap.headers()["content-type"]).toContain("xml");
    const sitemapBody = await sitemap.text();
    for (const slug of SLUGS) {
      expect(sitemapBody).toContain(`/work/${slug}`);
    }

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const robotsBody = await robots.text();
    expect(robotsBody).toContain("Sitemap:");
    expect(robotsBody).toContain("Disallow: /dev/");

    for (const url of ["/icon.svg", "/apple-icon.png", "/opengraph-image", "/twitter-image"]) {
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
      expect(response.headers()["content-type"], url).toMatch(/image\//);
    }

    const og = await request.get("/opengraph-image");
    expect((await og.body()).byteLength).toBeGreaterThan(10_000);
  });

  test("html carries title, description, canonical and social metadata", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Zidan Mubarak/);
    const meta = await page.evaluate(() => ({
      description: document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      ogTitle: document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content"),
      ogImage: document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content"),
      ogType: document
        .querySelector('meta[property="og:type"]')
        ?.getAttribute("content"),
      twitterCard: document
        .querySelector('meta[name="twitter:card"]')
        ?.getAttribute("content"),
      jsonLd: Array.from(
        document.querySelectorAll('script[type="application/ld+json"]')
      ).map((node) => node.textContent ?? ""),
      lang: document.documentElement.lang,
    }));

    expect(meta.description?.length ?? 0).toBeGreaterThan(60);
    expect(meta.canonical).toBeTruthy();
    expect(meta.ogTitle).toContain("Zidan Mubarak");
    expect(meta.ogImage).toBeTruthy();
    expect(meta.ogType).toBe("website");
    expect(meta.twitterCard).toBe("summary_large_image");
    expect(meta.lang).toBe("en");
    expect(meta.jsonLd.join(" ")).toContain('"Person"');
    expect(meta.jsonLd.join(" ")).toContain("Zidan Mubarak");
  });

  test("no console errors on any route", async ({ page }) => {
    const errors: string[] = [];
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem("rubric:loaded", "1");
      } catch {
        /* ignore */
      }
    });
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    for (const url of ["/", "/work", "/work/jawi-ocr", "/work/pacu-pintar"]) {
      await page.goto(url, { waitUntil: "load" });
      await page.waitForFunction(
        () => document.documentElement.dataset.loader === "done",
        undefined,
        { timeout: 15_000 }
      );
      await page.waitForTimeout(900);
    }
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("case study pages get their own title and description", async ({ page }) => {
    await page.goto("/work/jawi-ocr", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Jawi/i);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toContain("/work/jawi-ocr");
  });

  test("all case studies have a heading, result and at least one figure", async ({ page }) => {
    for (const slug of SLUGS) {
      await page.goto(`/work/${slug}`, { waitUntil: "load" });
      await expect(page.locator("h1")).toHaveCount(1);
      const h1 = (await page.locator("h1").innerText()).trim();
      expect(h1.length, slug).toBeGreaterThan(1);
      const figures = await page.locator("figure").count();
      expect(figures, `${slug} has no figure`).toBeGreaterThan(0);
      const imagesWithoutAlt = await page
        .locator("img:not([alt])")
        .count();
      expect(imagesWithoutAlt, `${slug} has an image without alt`).toBe(0);
    }
  });
});
