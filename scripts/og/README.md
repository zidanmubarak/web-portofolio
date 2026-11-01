# OG card fonts

The share card in `app/opengraph-image.tsx` is rendered with `next/og` (Satori).
Satori does not interpolate variable fonts, so two **static instances** are
committed in `assets/fonts/`:

| File | Source | Instance |
|---|---|---|
| `Archivo-Display.ttf` | `ofl/archivo/Archivo[wdth,wght].ttf` (Google Fonts) | `wght=600 wdth=78` |
| `MartianMono-Regular.ttf` | `ofl/martianmono/MartianMono[wdth,wght].ttf` (Google Fonts) | `wght=400 wdth=100` |

Both families are licensed under the SIL Open Font License; the licence texts
sit next to them (`OFL-Archivo.txt`, `OFL-MartianMono.txt`). They are **not**
shipped to the browser — `next/font` self-hosts the web builds used by the site.

## Regenerating

Any Python 3 with FontTools works (offline; no project dependency):

```bash
# one-time, inside this folder
python -m venv .venv
.venv/Scripts/python -m pip install fonttools        # Windows
# .venv/bin/python -m pip install fonttools          # macOS / Linux

# instance the variable fonts
.venv/Scripts/python -m fontTools.varLib.instancer \
  ../../assets/fonts/Archivo-Variable.ttf wght=600 wdth=78 \
  --output=../../assets/fonts/Archivo-Display.ttf

.venv/Scripts/python -m fontTools.varLib.instancer \
  ../../assets/fonts/MartianMono-Variable.ttf wght=400 wdth=100 \
  --output=../../assets/fonts/MartianMono-Regular.ttf
```

Download the variable sources from
`https://github.com/google/fonts/tree/main/ofl/<family>` when regenerating, then
delete the variable files again — only the static instances are committed.
