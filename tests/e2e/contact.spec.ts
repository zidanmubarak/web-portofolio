import { expect, test } from "@playwright/test";
import { skipLoader } from "./helpers";

/**
 * Contact: email copy, client validation, server-side validation, honeypot,
 * rate limit and error copy that never leaks configuration.
 *
 * The UI tests intercept /api/contact so no real email can be sent from QA.
 * The API tests use invalid payloads or the honeypot, which stop before SMTP.
 */

const VALID = {
  name: "QA Bot",
  email: "qa@example.com",
  subject: "QA check",
  message: "This is an automated QA message body.",
};

test.describe("contact form UI", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  test.beforeEach(async ({ page }) => {
    await skipLoader(page);
    await page.goto("/", { waitUntil: "load" });
    await page.waitForFunction(
      () => document.documentElement.dataset.loader === "done"
    );
    await page.waitForTimeout(400);
  });

  test("copy button writes the address and announces the change", async ({
    page,
  }) => {
    // The accessible name changes Copy -> Copied, so the locator must be
    // structural; a name-based locator would stop resolving mid-assertion.
    const copy = page.locator('#contact button[type="button"]');
    await expect(copy).toBeVisible();
    await expect(copy).toHaveText(/^copy$/i);
    await copy.scrollIntoViewIfNeeded();
    // Lenis keeps moving for a moment after the programmatic scroll; take the
    // box only once the page is still and the button is on screen.
    await page.waitForTimeout(1_500);
    const box = (await copy.boundingBox())!;
    expect(box.y).toBeGreaterThan(0);
    expect(box.y + box.height).toBeLessThan(900);
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(copy).toHaveText(/^copied$/i);

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain("@");
    expect(clipboard).toContain("zidanmubarak");

    await expect(page.locator('[role="status"][aria-live="polite"]').first()).toBeAttached();
    // The label returns to COPY after the confirmation window.
    await page.waitForTimeout(1_900);
    await expect(copy).toHaveText(/^copy$/i);
  });

  test("empty submit marks every field and focuses the first error", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /send message/i }).click();
    for (const id of ["contact-name", "contact-email", "contact-subject", "contact-message"]) {
      await expect(page.locator(`#${id}`)).toHaveAttribute("aria-invalid", "true");
    }
    await expect(page.locator("#contact-name-error")).toBeVisible();
    expect(await page.evaluate(() => document.activeElement?.id)).toBe("contact-name");
  });

  test("invalid email is rejected before any request", async ({ page }) => {
    let requested = false;
    await page.route("**/api/contact", async (route) => {
      requested = true;
      await route.abort();
    });

    await page.fill("#contact-name", "QA");
    await page.fill("#contact-email", "not-an-email");
    await page.fill("#contact-subject", "Subject");
    await page.fill("#contact-message", "A long enough message.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.locator("#contact-email")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#contact-email-error")).toContainText(/address/i);
    expect(requested).toBe(false);
  });

  test("server 422 errors are mapped back to their fields", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 422,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, errors: { email: "Use a real address." } }),
      })
    );

    await page.fill("#contact-name", "QA");
    await page.fill("#contact-email", "qa@example.com");
    await page.fill("#contact-subject", "Subject");
    await page.fill("#contact-message", "A long enough message.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.locator("#contact-email-error")).toContainText("Use a real address.");
  });

  test("success resets the form and shows the approved sentence", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      })
    );

    await page.fill("#contact-name", "QA");
    await page.fill("#contact-email", "qa@example.com");
    await page.fill("#contact-subject", "Subject");
    await page.fill("#contact-message", "A long enough message.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/Message sent\. I'll reply from Banda Aceh\./)).toBeVisible();
    expect(await page.inputValue("#contact-name")).toBe("");
  });

  test("failure copy is generic and points to email", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: "{}" })
    );

    await page.fill("#contact-name", "QA");
    await page.fill("#contact-email", "qa@example.com");
    await page.fill("#contact-subject", "Subject");
    await page.fill("#contact-message", "A long enough message.");
    await page.getByRole("button", { name: /send message/i }).click();

    const alert = page.locator('[role="alert"]').filter({ hasText: /didn't send/i });
    await expect(alert).toBeVisible();
    const text = await alert.innerText();
    expect(text).not.toMatch(/smtp|password|credential|host|stack|500/i);
    await expect(alert.locator('a[href^="mailto:"]')).toBeVisible();
  });
});

test.describe("contact API", () => {
  const unique = () => `qa-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  test("rejects invalid payloads with field errors", async ({ request }) => {
    const response = await request.post("/api/contact", {
      headers: { "x-forwarded-for": unique() },
      data: {},
    });
    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(Object.keys(body.errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "subject",
    ]);
    expect(JSON.stringify(body)).not.toMatch(/smtp|EMAIL_|password/i);
  });

  test("honeypot gets a quiet 200 and never reaches SMTP", async ({ request }) => {
    const response = await request.post("/api/contact", {
      headers: { "x-forwarded-for": unique() },
      data: { ...VALID, website: "https://spam.example" },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  test("cross-origin posts are refused", async ({ request }) => {
    const response = await request.post("/api/contact", {
      headers: {
        origin: "https://evil.example",
        "x-forwarded-for": unique(),
      },
      data: VALID,
    });
    expect(response.status()).toBe(403);
  });

  test("oversized bodies and malformed JSON are refused", async ({ request }) => {
    const tooBig = await request.post("/api/contact", {
      headers: { "x-forwarded-for": unique() },
      data: { ...VALID, message: "x".repeat(25_000) },
    });
    expect(tooBig.status()).toBe(413);

    const malformed = await request.post("/api/contact", {
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": unique(),
      },
      data: "{not json",
    });
    expect(malformed.status()).toBe(400);
  });

  test("rate limit answers 429 after five attempts per window", async ({ request }) => {
    const ip = unique();
    const statuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      // Invalid payloads: they still count toward the window and stop before SMTP.
      const response = await request.post("/api/contact", {
        headers: { "x-forwarded-for": ip },
        data: {},
      });
      statuses.push(response.status());
    }
    expect(statuses.slice(0, 5)).toEqual([422, 422, 422, 422, 422]);
    expect(statuses[5]).toBe(429);
  });
});
