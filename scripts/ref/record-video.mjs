/**
 * Records one continuous top-to-bottom scroll per site/viewport as WebM.
 * Kept separate from capture.mjs so video encoding never competes with
 * screenshot capture. Usage: node record-video.mjs [site] [viewport]
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const VAULT = process.env.VAULT_DIR;
if (!VAULT) {
  console.error("VAULT_DIR is required, e.g. VAULT_DIR=\"D:/github/hermes-workspace/opencode-brain/web-portofolio-v2\" node record-video.mjs");
  process.exit(1);
}
const SITES = { alejandroha: "https://alejandroha.com", curtisdesignr: "https://curtisdesignr.me" };
const VPS = {
  desktop: { w: 1440, h: 900, m: false, t: false },
  mobile: { w: 390, h: 844, m: true, t: true },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const siteFilter = process.argv[2];
const vpFilter = process.argv[3];
const browser = await chromium.launch();
for (const [k, url] of Object.entries(SITES)) {
  if (siteFilter && siteFilter !== k) continue;
  for (const [vk, vp] of Object.entries(VPS)) {
    if (vpFilter && vpFilter !== vk) continue;
    const dir = path.join(VAULT, "reference", k, vk);
    await fs.mkdir(dir, { recursive: true });
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      isMobile: vp.m,
      hasTouch: vp.t,
      recordVideo: { dir: path.join(dir, "_video"), size: { width: vp.w, height: vp.h } },
      colorScheme: "dark",
    });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 }).catch(() => {});
    await p.waitForLoadState("networkidle").catch(() => {});
    await sleep(2500);
    const sel = await p.evaluate(() => {
      const doc = document.scrollingElement;
      if (doc && doc.scrollHeight > innerHeight + 200) return null;
      const cands = [...document.querySelectorAll("body *")]
        .filter((e) => e.clientHeight > innerHeight * 0.5 && e.scrollHeight > e.clientHeight + 40)
        .sort((a, b) => b.scrollHeight - a.scrollHeight);
      if (!cands.length) return null;
      cands[0].setAttribute("data-t2-scroller", "1");
      return '[data-t2-scroller="1"]';
    });
    const max = await p.evaluate((sel) => {
      const el = sel ? document.querySelector(sel) : document.scrollingElement;
      return Math.max(0, (el?.scrollHeight || innerHeight) - innerHeight);
    }, sel);
    for (let i = 1; i <= 48; i++) {
      await p
        .evaluate(
          ({ sel, y }) => {
            const el = sel ? document.querySelector(sel) : document.scrollingElement;
            if (el) el.scrollTop = y;
          },
          { sel, y: Math.round((max * i) / 48) }
        )
        .catch(() => {});
      await sleep(240);
    }
    await sleep(800);
    const v = p.video();
    await p.close();
    await ctx.close();
    if (v) await v.saveAs(path.join(dir, `scroll-${vk}.webm`)).catch((e) => console.log("vid err", e.message.split("\n")[0]));
    console.log("video", k, vk);
  }
}
await browser.close();
