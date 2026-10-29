/**
 * T2 reference capture harness.
 * Captures loaders, hero, full page, scroll steps, hover states, menus and
 * technical metadata from the two reference sites at desktop and mobile sizes.
 *
 * Usage:
 *   node capture.mjs                # both sites, both viewports
 *   node capture.mjs alejandroha    # one site
 *   node capture.mjs curtisdesignr mobile
 *
 * Output:
 *   <VAULT>/reference/<site>/<viewport>/*.png|webm
 *   <VAULT>/reference/<site>/<viewport>/audit.json
 *   scripts/ref/out/<site>/<viewport>/page.html   (scratch, gitignored)
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VAULT = process.env.VAULT_DIR;
if (!VAULT) {
  console.error("VAULT_DIR is required, e.g. VAULT_DIR=\"D:/github/hermes-workspace/opencode-brain/web-portofolio-v2\" node capture.mjs");
  process.exit(1);
}
const OUT = path.join(__dirname, "out");

const SITES = {
  alejandroha: {
    url: "https://alejandroha.com",
    label: "alejandroha.com",
  },
  curtisdesignr: {
    url: "https://curtisdesignr.me",
    label: "curtisdesignr.me",
  },
};

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, isMobile: false, hasTouch: false },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};

const args = process.argv.slice(2);
const siteFilter = args.find((a) => SITES[a]);
const viewportFilter = args.find((a) => VIEWPORTS[a]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(page, dir, name) {
  const file = path.join(dir, `${name}.png`);
  try {
    await page.screenshot({ path: file, animations: "allow", timeout: 20_000 });
    return file;
  } catch (err) {
    console.log(`  ! screenshot ${name} failed: ${err.message.split("\n")[0]}`);
    return null;
  }
}

async function captureLoader(page, dir) {
  // Navigate with `commit` so we can catch the loader before it finishes.
  const frames = [];
  let nav;
  try {
    nav = await page.goto(page.__url, { waitUntil: "commit", timeout: 90_000 });
  } catch (err) {
    throw new Error(`navigation failed: ${err.message.split("\n")[0]}`);
  }
  for (let i = 0; i < 10; i++) {
    const f = await shot(page, dir, `00-loader-${String(i).padStart(2, "0")}`);
    if (f) frames.push(f);
    await sleep(350);
  }
  return nav;
}

async function waitSettled(page) {
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  await page.waitForLoadState("networkidle").catch(() => {});
  await sleep(2500);
}

async function collect(page) {
  return page.evaluate(() => {
    const css = (el, prop) => getComputedStyle(el).getPropertyValue(prop);
    const px = (v) => Math.round(parseFloat(v) || 0);
    const box = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x + scrollX),
        y: Math.round(r.y + scrollY),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    };
    const text = (el) => (el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 180);

    const libs = {
      gsap: !!window.gsap,
      gsapVersion: window.gsap?.version || null,
      scrollTrigger: !!(window.ScrollTrigger || window.gsap?.plugins?.ScrollTrigger),
      splitText: !!(window.SplitText || window.gsap?.plugins?.SplitText),
      lenis: !!(window.Lenis || window.lenis || window.__lenis),
      webflow: !!window.Webflow,
      three: !!window.THREE,
      barba: !!window.barba,
      swiper: !!window.Swiper,
      jquery: !!window.jQuery,
      framerMotion: !!document.querySelector("[data-framer-name], #__framer-badge-container"),
      locomotive: !!window.LocomotiveScroll,
      customEase: !!window.CustomEase,
      flip: !!window.Flip,
      drawSvg: !!window.DrawSVGPlugin,
    };

    const scripts = [...document.querySelectorAll("script[src]")].map((s) => s.src);
    const fontsLoaded = [...document.fonts].map((f) => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      status: f.status,
    }));
    const fontResources = performance
      .getEntriesByType("resource")
      .map((e) => e.name)
      .filter((n) => /\.(woff2?|ttf|otf)(\?|$)/i.test(n));

    const rootVars = {};
    const rootStyle = getComputedStyle(document.documentElement);
    for (let i = 0; i < rootStyle.length; i++) {
      const name = rootStyle[i];
      if (name.startsWith("--")) rootVars[name] = rootStyle.getPropertyValue(name).trim();
    }

    const colorCount = {};
    const bgCount = {};
    const all = [...document.querySelectorAll("body, body *")].slice(0, 3000);
    for (const el of all) {
      const s = getComputedStyle(el);
      if (s.color) colorCount[s.color] = (colorCount[s.color] || 0) + 1;
      if (s.backgroundColor && s.backgroundColor !== "rgba(0, 0, 0, 0)")
        bgCount[s.backgroundColor] = (bgCount[s.backgroundColor] || 0) + 1;
    }
    const top = (obj, n = 14) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([value, count]) => ({ value, count }));

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .slice(0, 60)
      .map((h) => {
        const s = getComputedStyle(h);
        return {
          tag: h.tagName,
          text: text(h),
          font: s.fontFamily.slice(0, 90),
          size: px(s.fontSize),
          weight: s.fontWeight,
          lineHeight: px(s.lineHeight),
          tracking: s.letterSpacing,
          transform: s.textTransform,
          color: s.color,
          box: box(h),
        };
      });

    const bigText = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const s = getComputedStyle(el);
        return (
          parseFloat(s.fontSize) >= 48 &&
          el.children.length === 0 &&
          (el.textContent || "").trim().length > 2
        );
      })
      .slice(0, 40)
      .map((el) => {
        const s = getComputedStyle(el);
        return {
          tag: el.tagName,
          cls: String(el.className).slice(0, 80),
          text: text(el),
          font: s.fontFamily.slice(0, 90),
          size: px(s.fontSize),
          weight: s.fontWeight,
          lineHeight: px(s.lineHeight),
          tracking: s.letterSpacing,
          transform: s.textTransform,
          box: box(el),
        };
      });

    const sections = [...document.querySelectorAll("main > *, body > div > section, section")]
      .filter((el, i, arr) => arr.indexOf(el) === i)
      .slice(0, 40)
      .map((el) => {
        const s = getComputedStyle(el);
        return {
          tag: el.tagName,
          id: el.id || null,
          cls: String(el.className).slice(0, 100),
          text: text(el),
          box: box(el),
          bg: s.backgroundColor,
          display: s.display,
          cols: s.gridTemplateColumns,
          gap: s.gap,
          pad: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
          position: s.position,
          overflow: s.overflow,
        };
      });

    const nav = [...document.querySelectorAll("header, nav")]
      .slice(0, 8)
      .map((el) => ({
        tag: el.tagName,
        cls: String(el.className).slice(0, 80),
        box: box(el),
        position: css(el, "position"),
        display: css(el, "display"),
        text: text(el),
        links: [...el.querySelectorAll("a,button")].slice(0, 25).map((a) => ({
          tag: a.tagName,
          text: text(a),
          href: a.getAttribute("href"),
          aria: a.getAttribute("aria-label"),
          cls: String(a.className).slice(0, 80),
        })),
      }));

    const canvas = [...document.querySelectorAll("canvas")].map((c) => {
      const s = getComputedStyle(c);
      return { cls: String(c.className).slice(0, 80), box: box(c), position: s.position, z: s.zIndex };
    });

    const fixed = [...document.querySelectorAll("body *")]
      .filter((el) => getComputedStyle(el).position === "fixed" && el.offsetWidth > 40)
      .slice(0, 25)
      .map((el) => ({
        tag: el.tagName,
        cls: String(el.className).slice(0, 90),
        box: box(el),
        text: text(el),
        z: getComputedStyle(el).zIndex,
      }));

    const animated = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const s = getComputedStyle(el);
        return (
          (s.animationName && s.animationName !== "none") ||
          (s.transitionProperty && s.transitionProperty !== "none" && parseFloat(s.transitionDuration) > 0)
        );
      })
      .slice(0, 40)
      .map((el) => {
        const s = getComputedStyle(el);
        return {
          tag: el.tagName,
          cls: String(el.className).slice(0, 90),
          animation: `${s.animationName} ${s.animationDuration} ${s.animationTimingFunction}`,
          transition: `${s.transitionProperty} ${s.transitionDuration} ${s.transitionTimingFunction}`,
        };
      });

    return {
      url: location.href,
      title: document.title,
      docHeight: document.scrollingElement.scrollHeight,
      viewport: { w: innerWidth, h: innerHeight },
      bodyBg: getComputedStyle(document.body).backgroundColor,
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      bodyFont: getComputedStyle(document.body).fontFamily,
      bodySize: getComputedStyle(document.body).fontSize,
      libs,
      scripts,
      fontsLoaded,
      fontResources,
      rootVars,
      colors: top(colorCount),
      backgrounds: top(bgCount),
      headings,
      bigText,
      sections,
      nav,
      canvas,
      fixed,
      animated,
      scrollbar: {
        htmlOverflow: getComputedStyle(document.documentElement).overflow,
        bodyOverflow: getComputedStyle(document.body).overflow,
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      },
    };
  });
}

async function detectScroller(page) {
  return page.evaluate(() => {
    const doc = document.scrollingElement;
    if (doc && doc.scrollHeight > innerHeight + 200) {
      return { selector: null, height: doc.scrollHeight, width: doc.scrollWidth, kind: "document" };
    }
    const cands = [...document.querySelectorAll("body *")]
      .filter((e) => e.clientHeight > innerHeight * 0.5 && e.scrollHeight > e.clientHeight + 40)
      .sort((a, b) => b.scrollHeight - a.scrollHeight);
    if (!cands.length) return { selector: null, height: doc?.scrollHeight || innerHeight, kind: "none" };
    const el = cands[0];
    el.setAttribute("data-t2-scroller", "1");
    return {
      selector: '[data-t2-scroller="1"]',
      height: el.scrollHeight,
      width: el.scrollWidth,
      kind: "element",
      tag: el.tagName,
      id: el.id || null,
      cls: String(el.className).slice(0, 80),
    };
  });
}

async function scrollTo(page, scroller, y) {
  await page.evaluate(
    ({ sel, y }) => {
      const el = sel ? document.querySelector(sel) : document.scrollingElement;
      if (!el) return;
      el.scrollTop = y;
      if (!sel) window.scrollTo(0, y);
      window.dispatchEvent(new Event("t2-scroll"));
    },
    { sel: scroller.selector, y }
  );
}

async function getScrollY(page, scroller) {
  return page.evaluate((sel) => {
    const el = sel ? document.querySelector(sel) : document.scrollingElement;
    return Math.round(el?.scrollTop || 0);
  }, scroller.selector);
}

async function hoverStates(page, dir, meta) {
  const results = [];
  const candidates = await page.$$eval("header a, header button, nav a, nav button", (els) =>
    els.slice(0, 10).map((el, i) => ({
      i,
      text: (el.innerText || el.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 40),
      box: (() => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
      })(),
    }))
  );
  for (const c of candidates) {
    if (!c.text) continue;
    const loc = page.locator("header a, header button, nav a, nav button").nth(c.i);
    try {
      await loc.hover({ timeout: 4000 });
      await sleep(700);
      const before = results.length;
      const f = await shot(page, dir, `10-hover-nav-${String(before).padStart(2, "0")}`);
      const style = await loc.evaluate((el) => {
        const s = getComputedStyle(el);
        return {
          text: (el.innerText || "").trim().slice(0, 40),
          color: s.color,
          bg: s.backgroundColor,
          transform: s.transform,
          letterSpacing: s.letterSpacing,
        };
      });
      results.push({ ...style, file: f });
    } catch {
      /* ignore detached nav items */
    }
  }
  meta.hover = results;
  await page.mouse.move(720, 450);
  await sleep(400);
}

const HOVER_TARGETS = {
  alejandroha: [
    { name: "service-item", sel: ".service-item" },
    { name: "portfolio-card", sel: ".portfolio-orbit__item" },
    { name: "footer-link", sel: ".footer__links-list-item" },
    { name: "cta", sel: ".button-007" },
  ],
  curtisdesignr: [
    { name: "tool-tile", sel: ".stat-box--icon" },
    { name: "work-card", sel: ".work-card" },
    { name: "worked-at-row", sel: ".worked-at-row" },
    { name: "cta", sel: ".footer-dock a, footer a" },
  ],
};

async function hoverContent(page, dir, meta, site) {
  meta.contentHover = [];
  for (const t of HOVER_TARGETS[site] || []) {
    const loc = page.locator(t.sel).first();
    try {
      if (!(await loc.count())) continue;
      await loc.scrollIntoViewIfNeeded({ timeout: 5000 });
      await sleep(900);
      const before = await loc.evaluate((el) => {
        const s = getComputedStyle(el);
        return { color: s.color, bg: s.backgroundColor, transform: s.transform, filter: s.filter };
      });
      await loc.hover({ timeout: 5000 });
      await sleep(900);
      const after = await loc.evaluate((el) => {
        const s = getComputedStyle(el);
        const desc = [...el.querySelectorAll("*")].slice(0, 4).map((c) => {
          const cs = getComputedStyle(c);
          return { cls: String(c.className).slice(0, 50), opacity: cs.opacity, transform: cs.transform, filter: cs.filter };
        });
        return { color: s.color, bg: s.backgroundColor, transform: s.transform, filter: s.filter, desc };
      });
      const file = await shot(page, dir, `11-hover-${t.name}`);
      meta.contentHover.push({ target: t.name, before, after, file });
    } catch (err) {
      meta.contentHover.push({ target: t.name, error: String(err.message).split("\n")[0] });
    }
  }
  await page.mouse.move(10, 10);
}

async function openMenu(page, dir, meta) {
  meta.menu = { clicked: false };
  const buttons = page.locator("header button, header a, nav button, nav a, button[aria-label*='menu' i], a[aria-label*='menu' i]");
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const el = buttons.nth(i);
    let txt = "";
    try {
      txt = ((await el.innerText({ timeout: 1200 })) || (await el.getAttribute("aria-label")) || "").toLowerCase().trim();
    } catch {}
    if (!txt.includes("menu") && !txt.includes("menú")) continue;
    try {
      await el.click({ timeout: 5000 });
      await sleep(1800);
      await shot(page, dir, "20-menu-open");
      const info = await page.evaluate(() => {
        const fixed = [...document.querySelectorAll("body *")]
          .filter((e) => {
            const s = getComputedStyle(e);
            return s.position === "fixed" && e.offsetHeight > innerHeight * 0.45 && e.offsetWidth > 240;
          })
          .map((e) => {
            const s = getComputedStyle(e);
            const r = e.getBoundingClientRect();
            return {
              cls: String(e.className).slice(0, 90),
              box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
              bg: s.backgroundColor,
              text: (e.innerText || "").replace(/\s+/g, " ").trim().slice(0, 500),
              links: [...e.querySelectorAll("a,button")].slice(0, 12).map((a) => ({
                text: (a.innerText || "").replace(/\s+/g, " ").trim().slice(0, 40),
                href: a.getAttribute("href"),
                cls: String(a.className).slice(0, 60),
              })),
            };
          });
        return fixed;
      });
      const hoverShots = [];
      const items = page.locator("a, button").filter({ hasText: /about|work|connect|linkedin|instagram|projects|contact/i });
      const n = Math.min(await items.count(), 5);
      for (let k = 0; k < n; k++) {
        try {
          await items.nth(k).hover({ timeout: 2000 });
          await sleep(600);
          hoverShots.push(await shot(page, dir, `21-menu-hover-${k}`));
        } catch {}
      }
      await shot(page, dir, "22-menu-after-hover");
      meta.menu = { clicked: txt, panels: info, hoverShots };
      const close = page.locator("button, a").filter({ hasText: /close|tutup|×/i }).first();
      if (await close.count()) await close.click({ timeout: 3000 }).catch(() => {});
      else await page.keyboard.press("Escape").catch(() => {});
      await sleep(900);
      return;
    } catch (err) {
      meta.menu = { clicked: txt, error: String(err.message).split("\n")[0] };
    }
  }
}

async function captureScroll(page, dir, scroller, meta) {
  const height = scroller.height;
  const step = Math.round(meta.viewport.height * 0.75);
  const max = Math.max(0, height - meta.viewport.height);
  const positions = [];
  for (let y = 0; y <= max; y += step) positions.push(Math.min(y, max));
  if (positions[positions.length - 1] !== max) positions.push(max);
  const samples = [];
  for (let i = 0; i < positions.length; i++) {
    await scrollTo(page, scroller, positions[i]).catch(() => {});
    await sleep(900);
    const state = await page.evaluate(() => {
      const pinned = [...document.querySelectorAll("body *")]
        .filter((e) => getComputedStyle(e).position === "fixed" && e.offsetHeight > innerHeight * 0.5)
        .map((e) => ({
          cls: String(e.className).slice(0, 70),
          text: (e.innerText || "").replace(/\s+/g, " ").trim().slice(0, 100),
        }));
      return { y: Math.round(scrollY), pinned };
    });
    const f = await shot(page, dir, `30-scroll-${String(i).padStart(2, "0")}`);
    samples.push({ ...state, file: f, requested: positions[i] });
  }
  meta.scroll = { height, step, positions, mode: scroller.kind, samples };
}

async function cssSnapshots(page, dir, meta) {
  // Media queries the CSS actually uses (from stylesheet rules where readable).
  const media = await page.evaluate(() => {
    const set = new Set();
    const walk = (rules) => {
      for (const rule of rules) {
        if (rule.type === CSSRule.MEDIA_RULE) {
          set.add(rule.conditionText);
          walk(rule.cssRules);
        } else if (rule.cssRules) walk(rule.cssRules);
      }
    };
    for (const sheet of document.styleSheets) {
      try {
        walk(sheet.cssRules);
      } catch {}
    }
    return [...set].slice(0, 60);
  });
  meta.mediaQueries = media;
}

async function runSite(browser, key, viewportKey) {
  const cfg = SITES[key];
  const vp = VIEWPORTS[viewportKey];
  const dir = path.join(VAULT, "reference", key, viewportKey);
  const scratch = path.join(OUT, key, viewportKey);
  await fs.mkdir(dir, { recursive: true });
  await fs.mkdir(scratch, { recursive: true });

  console.log(`\n== ${cfg.label} @ ${viewportKey} (${vp.width}x${vp.height}) ==`);
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    userAgent: vp.isMobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
      : undefined,
    reducedMotion: "no-preference",
    colorScheme: "dark",
  });
  const page = await context.newPage();
  page.__url = cfg.url;
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text().slice(0, 300));
  });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message.slice(0, 300)}`));

  const meta = { site: key, viewport: vp, startedAt: new Date().toISOString(), consoleErrors };

  let stage = "start";
  try {
    stage = "loader";
    const nav = await captureLoader(page, dir);
    meta.status = nav?.status() ?? null;
    await waitSettled(page);
    stage = "hero";
    await shot(page, dir, "01-hero");

    stage = "collect";
    const info = await collect(page);
    meta.info = info;
    await cssSnapshots(page, dir, meta);
    await fs.writeFile(path.join(scratch, "page.html"), await page.content(), "utf8");
    await fs.writeFile(path.join(scratch, "audit.json"), JSON.stringify(meta, null, 2), "utf8");

    stage = "scroller";
    let scroller = await detectScroller(page);
    meta.scroller = scroller;
    await scrollTo(page, scroller, 0);
    await sleep(900);

    if (scroller.kind === "document") {
      stage = "fullpage";
      await page
        .screenshot({ path: path.join(dir, "02-full.png"), fullPage: true, animations: "allow", timeout: 60_000 })
        .catch((e) => console.log("  ! full page failed:", e.message.split("\n")[0]));
    }

    stage = "hover";
    await hoverStates(page, dir, meta);
    if (scroller.kind === "document" && !vp.isMobile) await hoverContent(page, dir, meta, key);
    else if (!vp.isMobile) await hoverContent(page, dir, meta, key);
    stage = "menu";
    await openMenu(page, dir, meta);
    stage = "scroll";
    // Reload so a menu that refuses to close cannot contaminate the scroll pass.
    await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 }).catch(() => {});
    await waitSettled(page);
    scroller = await detectScroller(page);
    meta.scroller = scroller;
    await scrollTo(page, scroller, 0);
    await sleep(800);
    await captureScroll(page, dir, scroller, meta);

    // Pinned horizontal sections often live near the middle; capture their DOM.
    stage = "contracts";
    meta.contracts = await page.evaluate(() => ({
      sticky: [...document.querySelectorAll("body *")]
        .filter((e) => ["sticky", "fixed"].includes(getComputedStyle(e).position))
        .slice(0, 20)
        .map((e) => ({
          cls: String(e.className).slice(0, 80),
          pos: getComputedStyle(e).position,
          top: getComputedStyle(e).top,
          height: e.offsetHeight,
          text: (e.innerText || "").replace(/\s+/g, " ").trim().slice(0, 80),
        })),
      horizontalTracks: [...document.querySelectorAll("body *")]
        .filter((e) => e.offsetWidth > 300)
        .filter((e) => {
          const s = getComputedStyle(e);
          return s.display.includes("flex") && e.scrollWidth > e.offsetWidth * 1.6;
        })
        .slice(0, 20)
        .map((e) => ({
          cls: String(e.className).slice(0, 80),
          display: getComputedStyle(e).display,
          scrollW: e.scrollWidth,
          offsetW: e.offsetWidth,
          transform: getComputedStyle(e).transform.slice(0, 80),
        })),
    }));
    meta.finishedAt = new Date().toISOString();
  } catch (err) {
    meta.error = String(err?.stack || err?.message || err);
    console.log(`  ! error at ${stage}:`, String(err?.message || err).split("\n")[0]);
  } finally {
    await fs.writeFile(path.join(scratch, "audit.json"), JSON.stringify(meta, null, 2), "utf8");
    await context.close();
    console.log(`  saved ${path.relative(VAULT, dir)}`);
  }
}

/**
 * Separate pass so WebM encoding never competes with the thousands of
 * screenshots above. Records one continuous scroll from top to bottom.
 */
async function recordScroll(browser, key, viewportKey) {
  const cfg = SITES[key];
  const vp = VIEWPORTS[viewportKey];
  const dir = path.join(VAULT, "reference", key, viewportKey);
  await fs.mkdir(dir, { recursive: true });
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    recordVideo: { dir: path.join(dir, "_video"), size: { width: vp.width, height: vp.height } },
    colorScheme: "dark",
  });
  const page = await context.newPage();
  await page.goto(cfg.url, { waitUntil: "domcontentloaded", timeout: 90_000 }).catch(() => {});
  await page.waitForLoadState("networkidle").catch(() => {});
  await sleep(2500);
  const scroller = await detectScroller(page);
  const max = Math.max(0, scroller.height - vp.height);
  const frames = 48;
  for (let i = 1; i <= frames; i++) {
    await scrollTo(page, scroller, Math.round((max * i) / frames)).catch(() => {});
    await sleep(240);
  }
  await sleep(800);
  const video = page.video();
  const target = path.join(dir, `scroll-${viewportKey}.webm`);
  await page.close();
  await context.close();
  if (video) await video.saveAs(target).catch((e) => console.log("  ! video save failed:", e.message.split("\n")[0]));
  console.log(`  video ${path.basename(target)} (${scroller.kind})`);
}

(async () => {
  const browser = await chromium.launch({
    args: ["--enable-webgl", "--ignore-gpu-blocklist", "--use-gl=angle", "--use-angle=swiftshader"],
  });
  const sites = siteFilter ? [siteFilter] : Object.keys(SITES);
  const viewports = viewportFilter ? [viewportFilter] : Object.keys(VIEWPORTS);
  for (const s of sites)
    for (const v of viewports) {
      await runSite(browser, s, v);
      if (process.env.RECORD_VIDEO === "1") await recordScroll(browser, s, v);
    }
  await browser.close();
})();
