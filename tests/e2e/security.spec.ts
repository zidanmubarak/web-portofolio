import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * Security and hygiene: the old chatbot is gone, no original assets or EXIF
 * leak into the build, no secrets in the repo, headers are sane.
 */

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  ".next-t1",
  ".next-t2",
  ".next-t3",
  ".next-t4",
  ".next-t5",
  ".next-t6",
  ".next-t7",
  ".next-t8",
  ".next-t9",
  ".next-t10",
  ".next-view",
  "tests",
  "assets",
  "coverage",
]);

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) return [];
      return walk(path.join(dir, entry.name));
    }
    return [path.join(dir, entry.name)];
  });
}

function readAll(files: string[]) {
  return files
    .filter((file) => /\.(tsx?|jsx?|mjs|cjs|json|md|css|mjs|example|html)$/.test(file) || file.endsWith(".env.example"))
    .map((file) => ({ file, text: fs.readFileSync(file, "utf8") }));
}

const SOURCE_FILES = [
  ...walk(path.join(ROOT, "app")),
  ...walk(path.join(ROOT, "components")),
  ...walk(path.join(ROOT, "content")),
  ...walk(path.join(ROOT, "lib")),
  ...walk(path.join(ROOT, "scripts")),
  path.join(ROOT, "package.json"),
  path.join(ROOT, "README.md"),
  path.join(ROOT, "next.config.js"),
  path.join(ROOT, ".env.example"),
].filter((file) => fs.existsSync(file));

const PUBLIC_FILES = walk(path.join(ROOT, "public"));

test.describe("security and hygiene", () => {
  test("the old chatbot leaves no trace in code, deps or docs", () => {
    const needles = [
      /chatbot/i,
      /\bopenai\b/i,
      /langchain/i,
      /\bgroq\b/i,
      /ai-sdk/i,
      /\bgemini\b/i,
      /anthropic/i,
      /chat-?widget/i,
      /ai playground/i,
    ];
    const hits: string[] = [];
    for (const { file, text } of readAll(SOURCE_FILES)) {
      for (const needle of needles) {
        if (needle.test(text)) hits.push(`${path.relative(ROOT, file)}: ${needle}`);
      }
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });

  test("package.json only carries the current stack", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    for (const banned of [
      "framer-motion",
      "next-themes",
      "sonner",
      "geist",
      "lucide-react",
      "@iconify/react",
      "openai",
      "@ai-sdk/openai",
    ]) {
      expect(deps, banned).not.toContain(banned);
    }
    expect(deps).toContain("@playwright/test");
  });

  test("original photos and signature are not published or built", () => {
    const forbidden = [
      "foto-profil.jpg",
      "ttd-asli.jpg",
      "profil.jpeg",
      "foto-profil",
      "ttd-asli",
    ];
    const all = [...PUBLIC_FILES.map((file) => path.relative(ROOT, file))];
    for (const nextDir of [".next-t10"]) {
      const dir = path.join(ROOT, nextDir);
      if (fs.existsSync(dir)) {
        for (const file of walk(dir)) all.push(path.relative(ROOT, file));
      }
    }
    for (const name of forbidden) {
      expect(all.some((file) => file.includes(name)), name).toBe(false);
    }
    expect(fs.existsSync(path.join(ROOT, "assets", "source", "foto-profil.jpg"))).toBe(true);
  });

  test("every public image is metadata-free", () => {
    const images = PUBLIC_FILES.filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file));
    expect(images.length).toBeGreaterThan(8);
    for (const file of images) {
      const bytes = fs.readFileSync(file).toString("latin1");
      for (const marker of ["Exif", "GPS", "xmpmeta", "http://ns.adobe.com"]) {
        expect(bytes.includes(marker), `${path.basename(file)} contains ${marker}`).toBe(false);
      }
    }
  });

  test("no .env file is committed and the example holds placeholders only", () => {
    const envFiles = fs
      .readdirSync(ROOT)
      .filter((name) => name.startsWith(".env"));
    expect(envFiles).toEqual([".env.example"]);
    const example = fs.readFileSync(path.join(ROOT, ".env.example"), "utf8");
    for (const line of example.split(/\r?\n/)) {
      if (!line || line.startsWith("#")) continue;
      const [, value = ""] = line.split("=");
      expect(value.trim(), line).toMatch(/^(|587|false|https:\/\/zidanmubarak\.vercel\.app)$/);
    }
    const gitignore = fs.readFileSync(path.join(ROOT, ".gitignore"), "utf8");
    expect(gitignore).toMatch(/\.env/);
  });

  test("no server secret name reaches the client bundle", () => {
    const dir = path.join(ROOT, ".next-t10", "static");
    if (!fs.existsSync(dir)) test.skip(true, "run the production build first");
    const files = walk(dir).filter((file) => /\.(js|css|html)$/.test(file));
    const leaks: string[] = [];
    for (const file of files) {
      const text = fs.readFileSync(file, "utf8");
      for (const marker of ["EMAIL_PASS", "EMAIL_USER", "EMAIL_HOST", "EMAIL_RECEIVER"]) {
        if (text.includes(marker)) leaks.push(`${path.relative(ROOT, file)}: ${marker}`);
      }
    }
    expect(leaks, leaks.join("\n")).toEqual([]);
  });

  test("response headers are sane", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();
    expect(headers["content-type"]).toContain("text/html");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBeTruthy();
    expect(headers["permissions-policy"]).toBeTruthy();
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("no absolute local paths or debug markers in the shipped html", async ({
    request,
  }) => {
    for (const url of ["/", "/work", "/work/jawi-ocr"]) {
      const html = await (await request.get(url)).text();
      for (const marker of [
        "C:\\Users",
        "D:\\github",
        "[[VERIFY",
        "TODO",
        "console.log(",
      ]) {
        expect(html, `${url} leaks ${marker}`).not.toContain(marker);
      }
    }
  });
});
