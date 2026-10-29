# scripts/ref — reference capture harness (T2)

Offline tooling used to study **alejandroha.com** and **curtisdesignr.me**. It is not part of the Next.js app, has its own `package.json`/`node_modules` (gitignored), and is never imported by application code.

## Install

```bash
cd scripts/ref
npm install
npx playwright install chromium
```

## Run

`VAULT_DIR` must point at the project vault. The scripts write only inside
`$VAULT_DIR/reference/<site>/<viewport>/` plus the gitignored `scripts/ref/out/`.

```bash
# both sites, both viewports (desktop 1440x900, mobile 390x844)
VAULT_DIR="D:/github/hermes-workspace/opencode-brain/web-portofolio-v2" node capture.mjs

# one site / one viewport
VAULT_DIR="..." node capture.mjs alejandroha desktop
VAULT_DIR="..." node capture.mjs curtisdesignr mobile

# continuous scroll recordings (WebM, VP9) — separate pass so encoding
# never competes with the screenshot capture
VAULT_DIR="..." node record-video.mjs
VAULT_DIR="..." node record-video.mjs curtisdesignr mobile

# measured loader timeline (writes JSON lines to stdout)
node measure-loader.mjs > out/loader-timeline.txt

# layout/typography probe for named selectors
node probe.mjs > out/probe.txt
```

## What `capture.mjs` does

1. Navigates with `waitUntil: "commit"` and screenshots every 350 ms for 3.5 s to catch loaders.
2. Records: section order + boxes, computed typography, palette frequency, CSS custom properties, loaded fonts, script URLs, detected libraries (`gsap`, `ScrollTrigger`, `SplitText`, `Lenis`, `Barba`, `THREE`, Webflow…), media queries, fixed/sticky layers, transition/animation declarations.
3. Hovers nav controls and content targets (service rows, work cards, tool tiles, accordion rows) and saves before/after computed styles.
4. Opens the menu, screenshots it and each hovered menu link, then reloads.
5. Detects the real scroller (document **or** the inner `#scroll-container.lenis` on Curtis) and screenshots every 75 vh.
6. Writes `audit.json` + `page.html` to `out/<site>/<viewport>/`.

## Evidence layout

```
$VAULT_DIR/reference/<site>/<viewport>/
  00-loader-00…09.png      load sequence
  01-hero.png
  02-full.png              document-scroll sites only
  10-hover-nav-*.png
  11-hover-<target>.png    content hover states
  20-menu-open.png
  21-menu-hover-*.png
  30-scroll-00…N.png       75 vh steps
  scroll-<viewport>.webm   continuous recording
```

## Notes / limitations

- Alejandro has no initial loader and no overlay menu; its header exposes two CTAs only. Curtis has a percentage loader (~6.3 s) and a right-side drawer menu.
- Curtis scrolls inside `#scroll-container.lenis`, so `document.scrollingElement` stays at 900/844 px. `detectScroller()` handles this; full-page screenshots are skipped for element scrollers.
- Screenshots are `animations: "allow"` on purpose: the goal is to document mid-animation states. For clean section shots, use the reload pass in `capture.mjs`.
- Some Alejandro contact-section frames can time out while WebGL/video is busy; the run in this vault produced 21 frames (00–20) plus the WebM. If a future run drops a frame, the recording still covers the page.
- Reference assets, copy and code are **not** reused in the portfolio; only measured patterns and character are documented.
