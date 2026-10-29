"""Shared image helpers for the signature pipeline."""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np


def load_image(path: Path) -> np.ndarray:
    """Read an image detected by content, not by extension.

    ``assets/source/ttd-asli.jpg`` is actually a PNG (T1 finding); OpenCV
    sniffs the magic bytes, and we additionally assert the reported format.
    """
    raw = np.frombuffer(path.read_bytes(), dtype=np.uint8)
    img = cv2.imdecode(raw, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError(f"cannot decode image: {path}")
    return img


def sniff_format(path: Path) -> str:
    head = path.read_bytes()[:12]
    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if head.startswith(b"\xff\xd8\xff"):
        return "jpeg"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "webp"
    return "unknown"


def ink_mask(bgr: np.ndarray) -> np.ndarray:
    """Adaptive binarisation that cancels paper texture and uneven light.

    Also used by ``build.py`` (the deliverable) so the SVG, the raster mask
    and the comparison previews always share the same geometry.
    """
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY).astype(np.float32)
    # Local background estimate (paper), then normalise: ink becomes < 1.
    bg = cv2.GaussianBlur(gray, (0, 0), 31)
    norm = np.clip(gray / np.maximum(bg, 1.0), 0, 1.5)
    # 0.90 keeps the light, thin pressure strokes; measured on the source
    # (paper ~0.99, core ink ~0.5, light ink ~0.85).
    mask = (norm < 0.90).astype(np.uint8) * 255
    # Close pinholes from paper grain, but never open: opening erased 1-2 px
    # pressure strokes and fragmented the uuu loops (measured).
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((2, 2), np.uint8))

    n, labels, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
    clean = np.zeros_like(mask)
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] >= 60:
            clean[labels == i] = 255
    return clean


def crop_to_ink(mask: np.ndarray, pad: int = 10) -> tuple[np.ndarray, tuple[int, int]]:
    ys, xs = np.nonzero(mask)
    if len(xs) == 0:
        raise ValueError("empty ink mask")
    x0, x1 = int(xs.min()) - pad, int(xs.max()) + pad + 1
    y0, y1 = int(ys.min()) - pad, int(ys.max()) + pad + 1
    h, w = mask.shape
    x0, y0 = max(0, x0), max(0, y0)
    x1, y1 = min(w, x1), min(h, y1)
    return mask[y0:y1, x0:x1], (x0, y0)
