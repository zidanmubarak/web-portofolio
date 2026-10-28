#!/usr/bin/env node
// Regenerates the typed copy modules in this folder from the reviewed JSON decks.
// The decks stay the single source of truth; the app imports the generated
// TypeScript modules at build time (no runtime JSON fetch).
//
// Usage (from the repo root): node lib/i18n/generate-copy.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

const readDeck = (name) =>
  JSON.parse(readFileSync(resolve(here, "..", "content", name), "utf8"));

const en = readDeck("copy-en.json");
const id = readDeck("copy-id.json");

const header = (source) =>
  `// Generated from ${source} by lib/i18n/generate-copy.mjs.\n` +
  `// Do not edit by hand: update the deck and re-run the generator.\n\n`;

writeFileSync(
  resolve(here, "copy-en.ts"),
  `${header("lib/content/copy-en.json")}export const en = ${JSON.stringify(en, null, 2)};\n\n` +
    `export type Copy = typeof en;\n`,
  "utf8",
);

writeFileSync(
  resolve(here, "copy-id.ts"),
  `${header("lib/content/copy-id.json")}import type { Copy } from "./copy-en";\n\n` +
    `export const id: Copy = ${JSON.stringify(id, null, 2)};\n`,
  "utf8",
);

console.log("generated lib/i18n/copy-en.ts and lib/i18n/copy-id.ts");
