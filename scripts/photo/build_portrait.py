#!/usr/bin/env python
"""T3 portrait pipeline.

assets/source/foto-profil.jpg
    -> rembg human segmentation (soft alpha, alpha matting)
    -> edge cleanup (erode + feather) and colour bleed under the alpha edge
    -> half-body crop (2:3 frame, head margin ~9%, ends at the crossed hands)
    -> lanczos upscale + light denoise
    -> public/images/portrait/{portrait-halfbody.png,.webp,portrait-poster.webp}

Original photo never leaves assets/source/. EXIF/GPS is stripped on every output.
All previews for human inspection go to scripts/photo/out/ (git-ignored).

Usage (from repo root):
    scripts/photo/.venv/Scripts/python scripts/photo/build_portrait.py
    scripts/photo/.venv/Scripts/python scripts/photo/build_portrait.py --model isnet-general-use
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

REPO = Path(__file__).resolve().parents[2]
SRC = REPO / "assets" / "source" / "foto-profil.jpg"
OUT_PUBLIC = REPO / "public" / "images" / "portrait"
OUT_WORK = Path(__file__).resolve().parent / "out"


# ---------------------------------------------------------------- mask cleanup


def erode_alpha(a: np.ndarray, px: int) -> np.ndarray:
    """4-neighbour erosion of a float alpha in [0,1]."""
    out = a.copy()
    for _ in range(px):
        m = out.copy()
        m[1:, :] = np.minimum(m[1:, :], out[:-1, :])
        m[:-1, :] = np.minimum(m[:-1, :], out[1:, :])
        m[:, 1:] = np.minimum(m[:, 1:], out[:, :-1])
        m[:, :-1] = np.minimum(m[:, :-1], out[:, 1:])
        out = m
    return out


def feather_alpha(a: np.ndarray, radius: float) -> np.ndarray:
    im = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8), "L")
    im = im.filter(ImageFilter.GaussianBlur(radius))
    return np.asarray(im, dtype=np.float32) / 255.0


def colour_bleed(rgb: np.ndarray, alpha: np.ndarray, iterations: int = 48) -> np.ndarray:
    """Push subject colour outward under transparent pixels.

    Without this the RGB subpixel cells that straddle the silhouette mix subject
    colour with the white neoclassical building, which reads as a bright halo.
    """
    out = rgb.astype(np.float32).copy()
    known = alpha > 0.55
    out[~known] = 0.0
    for _ in range(iterations):
        acc = np.zeros_like(out)
        cnt = np.zeros(alpha.shape, dtype=np.float32)
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            a = np.roll(out, (dy, dx), axis=(0, 1))
            k = np.roll(known, (dy, dx), axis=(0, 1)).astype(np.float32)
            if dy == 1:
                a[0, :] = 0
                k[0, :] = 0
            elif dy == -1:
                a[-1, :] = 0
                k[-1, :] = 0
            elif dx == 1:
                a[:, 0] = 0
                k[:, 0] = 0
            else:
                a[:, -1] = 0
                k[:, -1] = 0
            acc += a * k[..., None]
            cnt += k
        grow = (~known) & (cnt > 0)
        if not grow.any():
            break
        out[grow] = acc[grow] / cnt[grow][:, None]
        known = known | grow
    out[~known] = out[known].mean(axis=0) if known.any() else 0.0
    return out


def largest_component(alpha: np.ndarray) -> np.ndarray:
    """Zero every alpha blob that is not connected to the main subject."""
    try:
        from scipy import ndimage  # type: ignore

        lab, n = ndimage.label(alpha > 0.35)
        if n <= 1:
            return alpha
        sizes = ndimage.sum(alpha > 0.35, lab, range(1, n + 1))
        keep = int(np.argmax(sizes)) + 1
        return alpha * (lab == keep)
    except Exception:  # scipy missing -> rely on rembg output as-is
        return alpha


# ---------------------------------------------------------------- previews


def checker(size: tuple[int, int], step: int = 16) -> Image.Image:
    w, h = size
    y, x = np.mgrid[0:h, 0:w]
    c = ((x // step + y // step) % 2).astype(np.uint8) * 34 + 178
    return Image.fromarray(np.dstack([c, c, c]), "RGB")


def layered(im: Image.Image, bg: Image.Image) -> Image.Image:
    out = bg.copy()
    out.paste(im, (0, 0), im)
    return out


def simulate_cells(rgba: Image.Image, cols: int = 150, gap: float = 0.16) -> Image.Image:
    """Rough CPU preview of the shader (straight subpixel strips, no SDF/glow)."""
    w, h = rgba.size
    arr = np.asarray(rgba, dtype=np.float32) / 255.0
    rgb, alpha = arr[..., :3], arr[..., 3]
    cell = w / cols
    rows = int(round(h / cell))
    ch, cw = h / rows, w / cols

    def pool(channel: int, off: float) -> np.ndarray:
        sx = np.clip(np.arange(cols) * cw + cw * (0.5 + off), 0, w - 1).astype(int)
        sy = np.clip(np.arange(rows) * ch + ch * 0.5, 0, h - 1).astype(int)
        # average over the cell footprint, channel-weighted by the horizontal offset
        acc = np.zeros((rows, cols), dtype=np.float32)
        cnt = np.zeros((rows, cols), dtype=np.float32)
        for dy in (-0.28, 0.0, 0.28):
            for dx in (-0.28, 0.0, 0.28):
                yy = np.clip((sy[:, None] + dy * ch).astype(int), 0, h - 1)
                xx = np.clip((sx[None, :] + (off + dx) * cw).astype(int), 0, w - 1)
                acc += rgb[yy, xx, channel]
                cnt += 1.0
        return acc / cnt

    r, g, b = pool(0, -1 / 3), pool(1, 0.0), pool(2, 1 / 3)

    sy = np.clip(np.arange(rows) * ch + ch * 0.5, 0, h - 1).astype(int)
    sx = np.clip(np.arange(cols) * cw + cw * 0.5, 0, w - 1).astype(int)
    cell_a = alpha[sy][:, sx]

    # strip masks inside one cell, evaluated at 4x supersampling
    ss = 4
    yy, xx = np.mgrid[0 : int(round(ch)), 0 : int(round(cw))].astype(np.float32)
    yy = (yy + 0.5) / round(ch) * ss
    xx = (xx + 0.5) / round(cw) * ss
    pad = gap / 2
    inner = 1 - pad * 2
    strips = []
    for i in range(3):
        x0 = pad + i * inner / 3 + 0.012
        x1 = pad + (i + 1) * inner / 3 - 0.012
        m = ((xx > x0 * ss) & (xx < x1 * ss) & (yy > pad * ss) & (yy < (1 - pad) * ss)).astype(np.float32)
        strips.append(m)

    out = np.zeros((rows, cols, round(ch), round(cw), 4), dtype=np.float32)
    for i, (channel, strip) in enumerate(zip((r, g, b), strips)):
        gain = channel[..., None, None] * cell_a[..., None, None]
        out[..., i] = np.clip(gain * strip[None, None, :, :], 0, 1)
        # glow / black-matrix leakage
        out[..., i] += gain * 0.14 * (1.0 - strip[None, None, :, :])
    out[..., :3] = np.clip(out[..., :3], 0, 1)
    out[..., 3] = cell_a[..., None, None]
    tile = np.transpose(out, (0, 2, 1, 3, 4)).reshape(rows * round(ch), cols * round(cw), 4)
    img = Image.fromarray((np.clip(tile, 0, 1) * 255).astype(np.uint8), "RGBA")
    return img.resize((w, h), Image.LANCZOS)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="u2net_human_seg")
    ap.add_argument("--alpha-matting", action="store_true", default=True)
    ap.add_argument("--no-alpha-matting", dest="alpha_matting", action="store_false")
    ap.add_argument("--end-frac", type=float, default=0.56, help="crop ends at this fraction of head-to-feet height")
    ap.add_argument("--top-margin", type=float, default=0.09, help="headroom as fraction of crop height")
    ap.add_argument("--width", type=int, default=900, help="final crop width in px (2:3 frame)")
    ap.add_argument("--bleed", type=int, default=48)
    ap.add_argument("--erode", type=int, default=1, help="alpha erosion in px before feathering")
    ap.add_argument("--feather", type=float, default=1.1, help="alpha feather radius in px")
    args = ap.parse_args()

    OUT_PUBLIC.mkdir(parents=True, exist_ok=True)
    OUT_WORK.mkdir(parents=True, exist_ok=True)

    src = ImageOps.exif_transpose(Image.open(SRC)).convert("RGB")
    print(f"source {src.width}x{src.height}")

    from rembg import new_session, remove  # imported late so --help stays cheap

    session = new_session(args.model)
    cut = remove(
        src,
        session=session,
        alpha_matting=args.alpha_matting,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=12,
        alpha_matting_erode_size=10,
    ).convert("RGBA")
    cut.save(OUT_WORK / "cutout-raw.png")
    print(f"rembg model={args.model} alpha_matting={args.alpha_matting}")

    rgb = np.asarray(cut.convert("RGB"), dtype=np.float32)
    a = np.asarray(cut.getchannel("A"), dtype=np.float32) / 255.0
    a = largest_component(a)
    a = erode_alpha(a, args.erode)
    a = feather_alpha(a, args.feather)
    rgb = colour_bleed(rgb, a, args.bleed)

    solid = a > 0.25
    ys, xs = np.where(solid)
    top, bottom = ys.min(), ys.max()
    left, right = xs.min(), xs.max()
    subject_h = bottom - top + 1
    subject_w = right - left + 1
    print(
        f"mask bbox x[{left},{right}] y[{top},{bottom}] "
        f"w={subject_w} ({subject_w / src.width:.3f} of frame) h={subject_h} ({subject_h / src.height:.3f})"
    )

    # --- half-body crop: head margin above the head, end at the crossed hands
    body_end = top + args.end_frac * subject_h
    crop_h = (body_end - top) / (1.0 - args.top_margin)
    crop_w = crop_h / 3 * 2
    cy0 = top - crop_h * args.top_margin
    # horizontal centre: mean of head + torso, so the face sits on the frame axis
    head_band = solid[top : int(top + 0.16 * subject_h)]
    hx = np.where(head_band)[1].mean()
    torso_band = solid[int(top + 0.30 * subject_h) : int(top + 0.42 * subject_h)]
    tx = np.where(torso_band)[1].mean() if torso_band.any() else (left + right) / 2
    cx = (hx * 0.62) + (tx * 0.38)
    cx0 = cx - crop_w / 2
    cx0 = min(max(cx0, 0), src.width - crop_w)
    cy0 = min(max(cy0, 0), src.height - crop_h)
    box = (int(round(cx0)), int(round(cy0)), int(round(cx0 + crop_w)), int(round(cy0 + crop_h)))
    print(f"crop box {box} size {crop_w:.0f}x{crop_h:.0f}")

    rgba = np.dstack([rgb, a * 255.0])
    crop = Image.fromarray(np.clip(rgba, 0, 255).astype(np.uint8), "RGBA").crop(box)

    out_w = args.width
    out_h = int(round(out_w * 3 / 2))
    crop = crop.resize((out_w, out_h), Image.LANCZOS)
    crgb = crop.convert("RGB").filter(ImageFilter.MedianFilter(3))
    ca = crop.getchannel("A").filter(ImageFilter.GaussianBlur(0.6))
    crop = Image.merge("RGBA", (*crgb.split(), ca))
    print(f"output {out_w}x{out_h} (upscale x{out_w / crop_w:.2f})")
    print(f"silhouette occupies {subject_w / crop_w:.0%} of frame width, "
          f"{min(subject_h, body_end - top) / crop_h:.0%} of height")

    png = OUT_PUBLIC / "portrait-halfbody.png"
    crop.save(png, optimize=True)  # no exif/icc -> no GPS
    crop.save(OUT_PUBLIC / "portrait-halfbody.webp", quality=92, method=6)

    poster = crop.resize((360, 540), Image.LANCZOS)
    poster.save(OUT_PUBLIC / "portrait-poster.webp", quality=84, method=6)

    # --- previews (work dir only, never shipped)
    paper = Image.new("RGBA", crop.size, (231, 225, 213, 255))
    layered(crop, paper).convert("RGB").save(OUT_WORK / "preview-paper.jpg", quality=92)
    layered(crop, checker(crop.size)).save(OUT_WORK / "preview-checker.png")
    dark = Image.new("RGBA", crop.size, (11, 11, 10, 255))
    layered(crop, dark).convert("RGB").save(OUT_WORK / "preview-dark.jpg", quality=92)
    simulate_cells(crop, cols=150).convert("RGBA").save(OUT_WORK / "preview-cells.png")
    cells = Image.open(OUT_WORK / "preview-cells.png")
    layered(cells, paper).convert("RGB").save(OUT_WORK / "preview-cells-paper.jpg", quality=92)
    layered(cells, Image.new("RGBA", cells.size, (11, 11, 10, 255))).convert("RGB").save(
        OUT_WORK / "preview-cells-dark.jpg", quality=92
    )

    face = crop.crop((int(out_w * 0.22), 0, int(out_w * 0.78), int(out_h * 0.42)))
    face.resize((face.width * 2, face.height * 2), Image.LANCZOS).convert("RGB").save(
        OUT_WORK / "preview-edge.jpg", quality=94
    )

    meta = {
        "source": {"w": src.width, "h": src.height},
        "subject": {
            "w": int(subject_w),
            "h": int(subject_h),
            "w_ratio": round(float(subject_w / src.width), 3),
            "h_ratio": round(float(subject_h / src.height), 3),
            "bbox": [int(left), int(top), int(right), int(bottom)],
        },
        "crop_box": [int(v) for v in box],
        "crop_px": [int(round(crop_w)), int(round(crop_h))],
        "output_px": [out_w, out_h],
        "model": args.model,
        "params": {
            "end_frac": args.end_frac,
            "top_margin": args.top_margin,
            "erode": args.erode,
            "feather": args.feather,
            "bleed": args.bleed,
        },
    }
    (OUT_WORK / "metrics.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(json.dumps(meta["subject"]))

    # EXIF guard: the original has GPS metadata, every published file must not
    for f in sorted(OUT_PUBLIC.iterdir()):
        im = Image.open(f)
        exif = im.getexif()
        assert len(exif) == 0, f"{f.name} still carries EXIF"
        print(f"{f.name} {im.size} {im.mode} {f.stat().st_size // 1024}KB exif=0")


if __name__ == "__main__":
    main()
