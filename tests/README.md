# QA suite — T10

Independent Playwright checks for the production build. The suite does not
change application code; seven tests are expected to fail until T9 pass 2
closes the findings in `qa-report.md`.

## Run

```bash
NEXT_DIST_DIR=.next-t10 npx next build
npx playwright test
```

`playwright.config.ts` starts (or reuses) `next start` on port **3110** with
`NEXT_DIST_DIR=.next-t10`. Build first; `next start` does not build.

Useful subsets:

```bash
npx playwright test tests/e2e/a11y.spec.ts
npx playwright test --grep "loader"
QA_EVIDENCE_DIR=<VAULT_DIR>/reference/qa \
  npx playwright test tests/e2e/evidence.spec.ts
```

`evidence.spec.ts` writes screenshots and the scroll video to
`QA_EVIDENCE_DIR` when set; otherwise to `tests/.artifacts/`.

## Notes

- `@playwright/test` is the only devDependency added by T10.
- axe-core is injected from `node_modules/axe-core/axe.min.js` (already
  installed); it is not a package.json entry.
- Rate-limit tests use unique `x-forwarded-for` values and invalid payloads so
  they never reach SMTP.
- The copy-button test uses `test.use({ permissions: [...] })` so the clipboard
  write succeeds in headless Chromium.
- Screenshots produced by manual runs are gitignored (`tests/.gitignore`).
