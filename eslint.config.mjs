import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    ".next-*/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "public/**",
    // Vendored skill tooling and captured reference bundles are not app code.
    ".claude/skills/**",
    "scripts/**/out/**",
    "scripts/**/.venv/**",
    "scripts/**/node_modules/**",
  ]),
]);

export default eslintConfig;
