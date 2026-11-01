# `scripts/photo` — portrait pipeline (T3)

Offline tooling for the hero portrait. Nothing here is imported by Next.js; the
only artefacts that ship are the files in `public/images/portrait/`.

## What it produces

| File | Purpose |
|---|---|
| `public/images/portrait/portrait-halfbody.png` | RGBA cutout, half-body crop, 900×1350 (2:3), no EXIF |
| `public/images/portrait/portrait-halfbody.webp` | same image, WebP q92 (~84 KB) |
| `public/images/portrait/portrait-poster.webp` | 360×540 poster for the LCP / static fallback |

The original `assets/source/foto-profil.jpg` never leaves `assets/source/`.
`scripts/photo/out/` holds previews and metrics for human inspection and is
git-ignored.

## Setup (Python 3.10+)

```bash
python -m venv scripts/photo/.venv
scripts/photo/.venv/Scripts/python -m pip install -r scripts/photo/requirements.txt   # Windows
scripts/photo/.venv/bin/python         -m pip install -r scripts/photo/requirements.txt   # POSIX
```

`rembg` downloads the `u2net_human_seg` model (~176 MB) into `~/.u2net` on the
first run.

## Run

```bash
scripts/photo/.venv/Scripts/python scripts/photo/build_portrait.py
# variants worth trying
scripts/photo/.venv/Scripts/python scripts/photo/build_portrait.py --model isnet-general-use
scripts/photo/.venv/Scripts/python scripts/photo/build_portrait.py --end-frac 0.6 --top-margin 0.1
```

Measured on the source photo (2624×3936): the man is **19.0 % of the frame
width and 46.3 % of its height** (mask bbox `x 1062–1560`, `y 1441–3262`), so
the crop step is what gives him presence — it is not a resize of the whole frame.

Defaults that produced the final asset:

| Flag | Value | Why |
|---|---|---|
| `--model` | `u2net_human_seg` | human-specific matte, cleaner hair than `u2net` |
| `--alpha-matting` | on (240/12/erode 10) | soft hair edge instead of a cut-out halo |
| `--erode` | 1 px | removes the last light fringe left by matting |
| `--feather` | 1.1 px | keeps the silhouette soft enough for partial cells |
| `--end-frac` | 0.56 | crop ends just below the crossed hands |
| `--top-margin` | 0.09 | 9 % headroom inside the crop |
| `--width` | 900 | 2:3 → 900×1350; lanczos upscale ×1.2 from the crop |
| `--bleed` | 48 passes | pushes subject colour under the alpha edge, so partial cells never sample the white building |

Output check: every published file is re-opened and asserted to have **0 EXIF
entries** (the source carries GPS).

## Previews for review

`out/preview-paper.jpg` (on `#E7E1D5`), `out/preview-dark.jpg` (on `#0B0B0A`),
`out/preview-checker.png` (alpha), `out/preview-edge.jpg` (2× face crop),
`out/preview-cells-paper.jpg` (CPU simulation of the shader at 150 columns),
`out/metrics.json` (mask bbox, crop box, ratios).

## Evidence + performance probes (Node, isolated manifest)

These talk to a running dev server (`NEXT_DIST_DIR=.next-t3 npx next dev -p 3103`).
They are dev-only helpers; `node_modules/` here is git-ignored.

```bash
npm --prefix scripts/photo install
VAULT_DIR=<vault> node scripts/photo/capture.mjs http://localhost:3103   # states → vault/evidence/T3
node scripts/photo/perf.mjs http://localhost:3103 1440 1                  # frame budget probe
node scripts/photo/zoom.mjs "http://localhost:3103/dev/subpixel?rim=0" out/zoom.png 2
```

`?cellSize=`, `?gap=`, `?fringe=`, `?glow=`, `?emit=`, `?lift=`, `?rim=`, `?sat=`,
`?lensRadius=`, `?lensMag=`, `?scan=`, `?layout=delta|stripe`, `?paper=rrggbb`,
`?plate=0` and `?lens=0` override the preset on `/dev/subpixel` for A/B shots.
