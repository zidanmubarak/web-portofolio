# Signature pipeline (T4)

Offline vectorisation of `assets/source/ttd-asli.jpg` (actually a PNG — the
extension lies) into the drawn signature used by the loader, the top-bar
landing and the footer.

## Setup

```bash
cd scripts/signature
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt   # Windows
# .venv/bin/python -m pip install -r requirements.txt     # POSIX
```

`requirements.txt` covers numpy, OpenCV, scikit-image, scipy and skan. The venv
and `out/` are gitignored.

> `skan` pulls `matplotlib` as a dependency, but this pipeline never plots.
> `matplotlib` ships `backends/web_backend/js/*.js`; if you explicitly lint the
> venv (`eslint scripts/signature/.venv`) those files fail. `pip uninstall
> matplotlib` is safe here (verified: skan/Skeleton/summarize still import).

## Build the assets

```bash
# from the repo root
scripts/signature/.venv/Scripts/python scripts/signature/build.py
# POSIX: scripts/signature/.venv/bin/python scripts/signature/build.py
```

Writes:

| Path | What |
|---|---|
| `public/signature/signature.svg` | filled, smoothed silhouette (holes included) |
| `public/signature/signature-strokes.json` | centre line per pen stroke, order, width, timing |
| `components/signature/signature-data.ts` | the same data, typed, for the component |
| `scripts/signature/out/` | debug stages, stroke order, comparison (gitignored) |

`build.py` verifies that every skeleton branch is used exactly once or listed
in `SKIPPED_BRANCHES`, so a changed skeleton cannot silently drop ink.

## Stages

1. **Decode by content** (`imgutil.sniff_format` + `cv2.imdecode`) — the file is
   PNG despite `.jpg`.
2. **Ink mask** (`imgutil.ink_mask`) — local background normalisation
   (`gray / GaussianBlur(31) < 0.90`), 2 px closing, components ≥ 60 px. Paper
   texture disappears; the light pressure strokes in the `uuu` survive.
3. **Skeleton** (`skimage.morphology.skeletonize(method="lee")`), then skan
   branches. Lee produced 39 junction pixels vs 709 for the hand-rolled
   Zhang-Suen at the same threshold, so the graph is usable.
4. **Pen strokes** (`plan.py`) — branches re-grouped into 14 natural strokes;
   the graph itself splits at every self-crossing. Every branch is accounted
   for; three 1–22 px crossing chords are skipped because their ink is already
   covered by the long branches meeting there.
5. **Smooth** — arc-length resample (2 px), Savitzky–Golay (window 9, order 3),
   resample 3.2 px.
6. **Bézier** — Schneider fitting (`fitcurve.py`, tolerance 0.45 px) with a
   handle-length clamp. One Catmull-Rom segment per sample produced 88 KB of
   JSON; Schneider brings it to 26 KB with the same shape.
7. **Silhouette** — outer ink contour + holes (`RETR_CCOMP`), approxPolyDP 0.9,
   Chaikin ×2, resample 5–6 px, Schneider closed fit (0.7 px, seam at the
   least-curved point).
8. **Width** — distance transform ×2 gives the local ink width; the JSON keeps
   `inkWidth` for reference and `width` (90th percentile ×1.18 + 3) for the
   mask line.
9. **Timing** — measured length / curvature speed, normalised to a 2.2 s draw
   budget; pen lifts 60–120 ms from the measured jump.

Coverage check (silhouette pixels covered by the mask strokes): **99.47 %**;
the 191 missing pixels are 1–3 px tips at stroke ends, below one display pixel
at the loader size.

## Comparison / evidence

`out/05-stages.png` = source crop | ink mask | smoothed strokes.
`out/06-stroke-order.png` = the 14 strokes in writing order.
`/dev/signature` (dev only) overlays the original photograph on the published
silhouette with a divider; the original is streamed from a dev-only route and
never enters `public/` or the build.

## Source policy

`assets/source/ttd-asli.jpg` is never copied, renamed into `public/`, or
committed. Only the smoothed vector and its JSON/TS are published.
