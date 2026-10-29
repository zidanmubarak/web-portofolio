"""Signature vectorisation pipeline (T4).

Source: ``assets/source/ttd-asli.jpg`` (a PNG with a misleading extension).
Output: ``public/signature/signature.svg`` (filled silhouette),
``public/signature/signature-strokes.json`` (ordered centre lines + timing)
and ``components/signature/signature-data.ts`` (typed copy for the component).

Stages
------
1. content-sniffed decode -> adaptive ink mask (paper texture removed)
2. Lee skeleton -> skan branch graph
3. natural pen strokes from the verified plan in ``plan.py``
4. Savitzky-Golay smoothing -> centripetal Catmull-Rom -> cubic Bezier
5. pressure width from the distance transform (reported in the JSON)
6. silhouette from the ink contour, smoothed the same way

Run:  scripts/signature/.venv/Scripts/python scripts/signature/build.py
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, Iterable, List, Sequence, Tuple

import cv2
import numpy as np
from scipy.signal import savgol_filter
from skan import Skeleton, summarize
from skimage.morphology import skeletonize

from fitcurve import fit_closed_path, fit_path
from imgutil import crop_to_ink, ink_mask, load_image, sniff_format
from plan import PLAN, SKIPPED_BRANCHES

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_SRC = ROOT / "assets" / "source" / "ttd-asli.jpg"
PUBLIC_OUT = ROOT / "public" / "signature"
TS_OUT = ROOT / "components" / "signature" / "signature-data.ts"
DEBUG_OUT = Path(__file__).resolve().parent / "out"
VAULT_OUT = Path(r"D:\github\hermes-workspace\opencode-brain\web-portofolio-v2")

Point = Tuple[float, float]


# --------------------------------------------------------------------------- #
# graph
# --------------------------------------------------------------------------- #


@dataclass
class Branch:
    id: int
    a: int
    b: int
    points: List[Point]
    length: float

    def oriented(self, reversed_: bool) -> List[Point]:
        return list(reversed(self.points)) if reversed_ else list(self.points)


@dataclass
class Stroke:
    id: int
    name: str
    points: List[Point]
    order: int = 0
    lift_before: float = 0.0
    width_max: float = 0.0
    width_min: float = 0.0
    mask_width: float = 0.0
    length: float = 0.0
    curvature: float = 0.0
    duration: float = 0.0
    speed: float = 1.0
    d: str = ""


def branches_from_skeleton(skel: np.ndarray) -> Dict[int, Branch]:
    sk = Skeleton(skel)
    table = summarize(sk, separator="_")
    branches: Dict[int, Branch] = {}
    for pid, row in table.iterrows():
        pid = int(pid)  # skan's path id is the DataFrame index
        coords = sk.path_coordinates(pid)
        pts = [(float(x), float(y)) for y, x in coords]
        if not pts:
            continue
        branches[pid] = Branch(
            id=pid,
            a=int(row["node_id_src"]),
            b=int(row["node_id_dst"]),
            points=pts,
            length=float(row["branch_distance"]),
        )

    # Drop dangling hairs (never real pen ends: the plan accounts for all ink).
    for _ in range(8):
        inc: Dict[int, List[int]] = {}
        for br in branches.values():
            inc.setdefault(br.a, []).append(br.id)
            inc.setdefault(br.b, []).append(br.id)
        drop = {
            br.id
            for br in branches.values()
            if br.length < 7
            and (len(inc.get(br.a, [])) == 1 or len(inc.get(br.b, [])) == 1)
        }
        if not drop:
            break
        for pid in drop:
            branches.pop(pid, None)
    return branches


def _dist(a: Point, b: Point) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])


def _polyline_length(pts: Sequence[Point]) -> float:
    return sum(_dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))


def assemble_strokes(branches: Dict[int, Branch]) -> List[Stroke]:
    used: List[int] = []
    strokes: List[Stroke] = []
    prev_end: Point | None = None
    for order, (name, parts) in enumerate(PLAN):
        pts: List[Point] = []
        for pid, rev in parts:
            br = branches.get(pid)
            if br is None:
                raise SystemExit(f"plan references missing branch {pid} ({name})")
            used.append(pid)
            chunk = br.oriented(rev)
            if pts:
                # Bridge any sub-pixel/px gap so smoothing stays continuous.
                if _dist(pts[-1], chunk[0]) > 0.01:
                    pts.append(chunk[0])
                chunk = chunk[1:]
            pts.extend(chunk)
        lift = _dist(prev_end, pts[0]) if prev_end else 0.0
        strokes.append(
            Stroke(id=order, name=name, points=pts, order=order + 1, lift_before=lift)
        )
        prev_end = pts[-1]

    missing = [
        pid
        for pid in branches
        if pid not in used and pid not in SKIPPED_BRANCHES
    ]
    if missing:
        raise SystemExit(f"branches not covered by plan: {sorted(missing)}")
    duplicate = {pid for pid in used if used.count(pid) > 1}
    if duplicate:
        raise SystemExit(f"branches used twice by plan: {sorted(duplicate)}")
    return strokes


# --------------------------------------------------------------------------- #
# smoothing + path building
# --------------------------------------------------------------------------- #


def resample(pts: Sequence[Point], step: float = 2.0) -> np.ndarray:
    p = np.asarray(pts, dtype=float)
    if len(p) < 2:
        return p
    d = np.linalg.norm(np.diff(p, axis=0), axis=1)
    p = p[np.concatenate([[True], d > 1e-6])]
    if len(p) < 2:
        return p
    s = np.concatenate([[0.0], np.cumsum(np.linalg.norm(np.diff(p, axis=0), axis=1))])
    total = s[-1]
    n = max(3, int(math.ceil(total / step)) + 1)
    target = np.linspace(0, total, n)
    return np.stack(
        [np.interp(target, s, p[:, 0]), np.interp(target, s, p[:, 1])], axis=1
    )


def smooth(pts: np.ndarray, window: int = 9, poly: int = 3) -> np.ndarray:
    if len(pts) < window + 2:
        return pts
    out = pts.copy()
    out[:, 0] = savgol_filter(pts[:, 0], window, poly, mode="interp")
    out[:, 1] = savgol_filter(pts[:, 1], window, poly, mode="interp")
    out[0], out[-1] = pts[0], pts[-1]
    return out


def catmull_rom_path(points: np.ndarray, closed: bool = False) -> str:
    """Centripetal Catmull-Rom through the points, emitted as cubic Beziers."""
    p = np.asarray(points, dtype=float)
    if len(p) < 2:
        return ""
    if closed:
        pts = np.vstack([p[-1], p, p[0], p[1]])
    else:
        pts = np.vstack([p[0], p, p[-1]])
    for i in range(1, len(pts)):
        if np.allclose(pts[i], pts[i - 1]):
            pts[i] = pts[i] + 1e-4
    segs = [f"M{p[0][0]:.1f} {p[0][1]:.1f}"]
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[i + 1], pts[i + 2]
        if not closed and i == 1:
            p0 = p1
        if not closed and i == len(pts) - 3:
            p3 = p2
        d1 = max(np.linalg.norm(p1 - p0) ** 0.5, 1e-6)
        d2 = max(np.linalg.norm(p2 - p1) ** 0.5, 1e-6)
        d3 = max(np.linalg.norm(p3 - p2) ** 0.5, 1e-6)
        b1 = (p1 * d2 + p0 * d1) / (d1 + d2)
        b2 = (p2 * d2 + p3 * d3) / (d2 + d3)
        c1 = p1 + (b1 - p1) * (2 / 3)
        c2 = p2 + (b2 - p2) * (2 / 3)
        segs.append(
            f"C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}"
        )
    if closed:
        segs.append("Z")
    return "".join(segs)


def curvature(points: np.ndarray) -> float:
    if len(points) < 5:
        return 0.0
    v = np.diff(points, axis=0)
    v = v / np.maximum(np.linalg.norm(v, axis=1, keepdims=True), 1e-6)
    dots = np.clip(np.sum(v[1:] * v[:-1], axis=1), -1, 1)
    ang = np.arccos(dots)
    dist = np.linalg.norm(np.diff(points, axis=0), axis=1)[1:]
    return float(np.sum(ang) / max(np.sum(dist), 1e-6))


# --------------------------------------------------------------------------- #
# silhouette
# --------------------------------------------------------------------------- #


def silhouette_path(mask: np.ndarray) -> Tuple[str, float]:
    contours, hierarchy = cv2.findContours(
        mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE
    )
    if not contours:
        raise ValueError("no contour")
    outer = max(contours, key=cv2.contourArea)
    parts: List[str] = []
    holes_area = 0.0
    for idx, contour in enumerate(contours):
        area = cv2.contourArea(contour)
        is_outer = hierarchy is None or int(hierarchy[0][idx][3]) == -1
        # keep every outer ink boundary + real holes (loop interiors); drop
        # one-pixel grain specks
        if not is_outer and area < 60:
            continue
        if not is_outer:
            holes_area += area
        c = contour.reshape(-1, 2)
        approx = cv2.approxPolyDP(c.reshape(-1, 1, 2), 0.9, True).reshape(-1, 2)
        pts = approx.astype(float)
        for _ in range(2):
            pts = _chaikin_closed(pts)
        pts = _resample_closed(pts, 5.0 if not is_outer else 6.0)
        parts.append(fit_closed_path(pts, error=0.7))
    return "".join(parts), float(cv2.contourArea(outer) - holes_area)


def _chaikin_closed(pts: np.ndarray) -> np.ndarray:
    out = []
    n = len(pts)
    for i in range(n):
        p0, p1 = pts[i], pts[(i + 1) % n]
        out.append(0.75 * p0 + 0.25 * p1)
        out.append(0.25 * p0 + 0.75 * p1)
    return np.asarray(out)


def _resample_closed(pts: np.ndarray, step: float) -> np.ndarray:
    closed = np.vstack([pts, pts[0]])
    d = np.linalg.norm(np.diff(closed, axis=0), axis=1)
    s = np.concatenate([[0], np.cumsum(d)])
    total = s[-1]
    n = max(12, int(total / step))
    target = np.linspace(0, total, n, endpoint=False)
    return np.stack(
        [np.interp(target, s, closed[:, 0]), np.interp(target, s, closed[:, 1])],
        axis=1,
    )


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", type=Path, default=DEFAULT_SRC)
    ap.add_argument("--target", type=float, default=2.8, help="loader draw duration (s)")
    args = ap.parse_args()

    for d in (PUBLIC_OUT, TS_OUT.parent, DEBUG_OUT):
        d.mkdir(parents=True, exist_ok=True)

    fmt = sniff_format(args.src)
    bgr = load_image(args.src)
    full_mask = ink_mask(bgr)
    mask, (ox, oy) = crop_to_ink(full_mask, pad=9)
    h, w = mask.shape

    skel = skeletonize(mask > 0, method="lee")
    branches = branches_from_skeleton(skel)
    strokes = assemble_strokes(branches)

    dist = cv2.distanceTransform(mask, cv2.DIST_L2, 5)

    for s in strokes:
        arr = resample(s.points, 2.0)
        arr = smooth(arr, window=9, poly=3)
        arr = resample(arr, 3.2)
        s.points = [(float(x), float(y)) for x, y in arr]
        s.d = fit_path(arr, error=0.45)
        s.length = _polyline_length(s.points)
        s.curvature = curvature(arr)
        widths = [
            float(
                dist[
                    int(round(np.clip(y, 0, h - 1))),
                    int(round(np.clip(x, 0, w - 1))),
                ]
            )
            * 2.0
            for x, y in arr
        ]
        s.width_max = max(widths) if widths else 2.0
        s.width_min = min(widths) if widths else 1.0
        # Mask stroke width: use the 90th percentile of the local ink width so
        # a crossing blob does not inflate one stroke's mask over its neighbour.
        mask_width = float(np.percentile(widths, 90)) * 1.18 + 3.0 if widths else 4.0
        s.mask_width = min(max(mask_width, s.width_max * 0.9), 28.0)
        # speed: quick on straight runs, slower through loops. The coefficient
        # is measured, not per-stroke hand tuning (k is mean rad/px).
        s.speed = float(np.clip(1.0 / (1.0 + 22.0 * s.curvature), 0.55, 1.0))

    # ---- timing at 1x --------------------------------------------------- #
    lift_time = 0.0
    for s in strokes[1:]:
        lift_time += float(np.clip(0.06 + s.lift_before * 0.0016, 0.06, 0.12))
    draw_budget = max(1.3, args.target - lift_time)
    weights = [s.length / max(s.speed, 0.4) for s in strokes]
    total_w = sum(weights)
    for s, wt in zip(strokes, weights):
        s.duration = draw_budget * wt / total_w
    total_duration = sum(s.duration for s in strokes) + lift_time

    # ---- outputs -------------------------------------------------------- #
    sil, sil_area = silhouette_path(mask)
    payload = {
        "viewBox": [w, h],
        "silhouette": sil,
        "strokes": [
            {
                "id": s.id,
                "order": s.order,
                "name": s.name,
                "d": s.d,
                "width": round(s.mask_width, 2),
                "inkWidth": [round(s.width_min, 2), round(s.width_max, 2)],
                "length": round(s.length, 1),
                "curvature": round(s.curvature, 5),
                "speed": round(s.speed, 3),
                "duration": round(s.duration, 4),
                "liftBefore": round(s.lift_before, 1),
                "start": [round(s.points[0][0], 1), round(s.points[0][1], 1)],
                "end": [round(s.points[-1][0], 1), round(s.points[-1][1], 1)],
            }
            for s in strokes
        ],
        "totalDuration": round(total_duration, 3),
        "source": {
            "file": args.src.name,
            "format": fmt,
            "pixels": [bgr.shape[1], bgr.shape[0]],
            "crop": [ox, oy, w, h],
        },
    }

    (PUBLIC_OUT / "signature.svg").write_text(_svg_document(payload), encoding="utf-8")
    (PUBLIC_OUT / "signature-strokes.json").write_text(
        json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    TS_OUT.write_text(_ts_module(payload), encoding="utf-8")

    debug_images(mask, skel, strokes, (ox, oy), bgr)

    print(f"format           : {fmt}")
    print(f"source pixels    : {bgr.shape[1]}x{bgr.shape[0]}")
    print(f"crop             : x={ox} y={oy} {w}x{h}")
    print(f"skeleton pixels  : {int(skel.sum())}")
    print(f"branches / strokes: {len(branches)} / {len(strokes)}")
    print(f"silhouette area  : {sil_area:.0f}px2")
    print(
        f"draw / total     : {draw_budget:.2f}s + {lift_time:.2f}s lifts = {total_duration:.2f}s"
    )
    for s in strokes:
        print(
            f"  {s.order:2d} {s.name:22s} len={s.length:6.1f} curv={s.curvature:.4f} "
            f"speed={s.speed:.2f} dur={s.duration:.3f}s lift={s.lift_before:5.1f}px "
            f"ink={s.width_min:.1f}-{s.width_max:.1f}"
        )
    print(f"\nwrote {PUBLIC_OUT / 'signature.svg'}")
    print(f"wrote {PUBLIC_OUT / 'signature-strokes.json'}")
    print(f"wrote {TS_OUT}")


def _svg_document(payload: dict) -> str:
    w, h = payload["viewBox"]
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'role="img" aria-label="Zidan Mubarak signature">'
        f'<path d="{payload["silhouette"]}" fill="currentColor" fill-rule="evenodd"/>'
        "</svg>\n"
    )


def _ts_module(payload: dict) -> str:
    data = json.dumps(payload, ensure_ascii=False, indent=2)
    return (
        "// AUTO-GENERATED by scripts/signature/build.py — do not edit by hand.\n"
        "// Source: assets/source/ttd-asli.jpg (PNG content). Regenerate with\n"
        "//   scripts/signature/.venv/Scripts/python scripts/signature/build.py\n"
        'import type { SignatureData } from "./types";\n\n'
        f"export const signatureData: SignatureData = {data};\n"
    )


def debug_images(
    mask: np.ndarray,
    skel: np.ndarray,
    strokes: List[Stroke],
    offset: Tuple[int, int],
    bgr: np.ndarray,
) -> None:
    h, w = mask.shape
    ox, oy = offset
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)[oy : oy + h, ox : ox + w]

    canvas = np.full((h, w * 3 + 40, 3), 11, np.uint8)
    canvas[:, :w] = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
    canvas[:, w + 20 : 2 * w + 20] = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR) // 4
    skel_vis = np.zeros((h, w, 3), np.uint8)
    skel_vis[skel] = (200, 200, 200)
    canvas[:, w + 20 : 2 * w + 20] = np.clip(
        canvas[:, w + 20 : 2 * w + 20].astype(int) + skel_vis, 0, 255
    ).astype(np.uint8)
    smooth_vis = np.zeros((h, w, 3), np.uint8)
    for s in strokes:
        pts = np.asarray(s.points, dtype=np.int32).reshape(-1, 1, 2)
        cv2.polylines(smooth_vis, [pts], False, (235, 235, 235), 2, cv2.LINE_AA)
    canvas[:, 2 * w + 40 :] = smooth_vis
    cv2.imwrite(str(DEBUG_OUT / "05-stages.png"), canvas)

    order_vis = cv2.cvtColor(255 - mask, cv2.COLOR_GRAY2BGR)
    order_vis = (order_vis * 0.28).astype(np.uint8)
    rng = np.random.default_rng(11)
    for s in strokes:
        colour = tuple(int(c) for c in rng.integers(90, 255, 3))
        pts = np.asarray(s.points, dtype=np.int32).reshape(-1, 1, 2)
        cv2.polylines(order_vis, [pts], False, colour, 3, cv2.LINE_AA)
        cv2.circle(order_vis, tuple(int(v) for v in s.points[0]), 5, (0, 0, 255), -1)
        cv2.putText(
            order_vis,
            str(s.order),
            (int(s.points[0][0]) + 6, int(s.points[0][1]) - 6),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255, 255, 255),
            2,
            cv2.LINE_AA,
        )
    cv2.imwrite(str(DEBUG_OUT / "06-stroke-order.png"), order_vis)
    print(f"debug images   : {DEBUG_OUT}")


if __name__ == "__main__":
    main()
