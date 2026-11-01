import { defineConfig, devices } from "@playwright/test";

/**
 * QA harness for the production build.
 *
 * Always run against `NEXT_DIST_DIR=.next-t10`:
 *   NEXT_DIST_DIR=.next-t10 npx next build
 *   npx playwright test
 *
 * The webServer block reuses a server that is already on 3110, so the same
 * build can be inspected manually while the suite runs.
 */
const PORT = 3110;
const BASE_URL = process.env.QA_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/.artifacts/results",
  timeout: 75_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: Boolean(process.env.CI),
  reporter: [
    ["list"],
    ["json", { outputFile: "tests/.artifacts/results.json" }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { NEXT_DIST_DIR: ".next-t10" },
  },
});
