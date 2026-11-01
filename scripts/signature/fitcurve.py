"""Cubic Bezier fitting (Schneider, Graphics Gems 1990).

Used instead of one-Bezier-per-sample Catmull-Rom so the SVG/JSON payload
stays small (the loader ships the signature on the critical path) while the
curve still passes through the smoothed centre line within `error` pixels.
"""

from __future__ import annotations

import math
from typing import Iterable, List, Sequence, Tuple

import numpy as np

Point = np.ndarray
Cubic = Tuple[Point, Point, Point, Point]


def _chord_parameterize(points: np.ndarray) -> np.ndarray:
    d = np.linalg.norm(np.diff(points, axis=0), axis=1)
    total = d.sum()
    if total <= 1e-9:
        return np.linspace(0, 1, len(points))
    u = np.concatenate([[0.0], np.cumsum(d) / total])
    return u


def _bezier(control: Cubic, u: np.ndarray) -> np.ndarray:
    p0, p1, p2, p3 = control
    uu = 1 - u
    return (
        (uu**3)[:, None] * p0
        + (3 * u * uu**2)[:, None] * p1
        + (3 * u**2 * uu)[:, None] * p2
        + (u**3)[:, None] * p3
    )


def _bezier_derivative(control: Cubic, u: np.ndarray) -> np.ndarray:
    p0, p1, p2, p3 = control
    uu = 1 - u
    return (
        (3 * uu**2)[:, None] * (p1 - p0)
        + (6 * u * uu)[:, None] * (p2 - p1)
        + (3 * u**2)[:, None] * (p3 - p2)
    )


def _generate_bezier(
    points: np.ndarray, u: np.ndarray, t1: np.ndarray, t2: np.ndarray
) -> Cubic:
    p0, p3 = points[0], points[-1]
    c00 = c01 = c11 = 0.0
    x0 = x1 = 0.0
    for i, p in enumerate(points):
        uu = 1 - u[i]
        b0 = uu**3
        b1 = 3 * u[i] * uu**2
        b2 = 3 * u[i] ** 2 * uu
        b3 = u[i] ** 3
        a1 = t1 * b1
        a2 = t2 * b2
        c00 += float(a1 @ a1)
        c01 += float(a1 @ a2)
        c11 += float(a2 @ a2)
        tmp = p - (p0 * (b0 + b1) + p3 * (b2 + b3))
        x0 += float(a1 @ tmp)
        x1 += float(a2 @ tmp)
    c10 = c01
    det = c00 * c11 - c10 * c01
    chord = float(np.linalg.norm(p3 - p0))
    if abs(det) > 1e-12:
        alpha1 = (x0 * c11 - x1 * c01) / det
        alpha2 = (c00 * x1 - c10 * x0) / det
    else:
        alpha1 = alpha2 = chord / 3
    if alpha1 < 1e-6 or alpha2 < 1e-6:
        alpha1 = alpha2 = chord / 3
    # Schneider's least squares can ask for a handle much longer than the
    # chord on near-degenerate segments, which produces visible loops/spikes
    # (measured on the right-bowl hole). Clamp to a plausible pen handle.
    limit = max(chord * 1.2, 1e-6)
    alpha1 = min(alpha1, limit)
    alpha2 = min(alpha2, limit)
    p1 = p0 + t1 * alpha1
    p2 = p3 + t2 * alpha2
    return (p0, p1, p2, p3)


def _max_error(
    points: np.ndarray, control: Cubic, u: np.ndarray
) -> Tuple[float, int]:
    curve = _bezier(control, u)
    d = np.linalg.norm(curve - points, axis=1)
    idx = int(np.argmax(d))
    return float(d[idx]), idx


def _reparameterize(
    points: np.ndarray, u: np.ndarray, control: Cubic
) -> np.ndarray:
    for _ in range(4):
        curve = _bezier(control, u)
        deriv = _bezier_derivative(control, u)
        diff = curve - points
        num = np.sum(diff * deriv, axis=1)
        den = np.sum(deriv * deriv, axis=1)
        safe = np.abs(den) > 1e-12
        u = np.where(safe, u - num / np.where(safe, den, 1.0), u)
        u = np.clip(u, 0, 1)
        u[0], u[-1] = 0.0, 1.0
    return u


def _normalize(v: np.ndarray) -> np.ndarray:
    n = float(np.linalg.norm(v))
    return v / n if n > 1e-9 else np.array([1.0, 0.0])


def fit_cubic(points: np.ndarray, t1: np.ndarray, t2: np.ndarray, error: float) -> List[Cubic]:
    if len(points) == 2:
        dist = float(np.linalg.norm(points[1] - points[0])) / 3
        return [
            (points[0], points[0] + t1 * dist, points[1] + t2 * dist, points[1])
        ]

    u = _chord_parameterize(points)
    control = _generate_bezier(points, u, t1, t2)
    max_err, split = _max_error(points, control, u)

    if max_err < error:
        return [control]

    # Try improving the parameterisation once; if the error drops enough the
    # curve is accepted (saves one split, keeps the segment count low).
    if max_err < error * error:
        for _ in range(4):
            u = _reparameterize(points, u, control)
            control = _generate_bezier(points, u, t1, t2)
            max_err, split = _max_error(points, control, u)
            if max_err < error:
                return [control]

    split = min(max(split, 1), len(points) - 2)
    center = _normalize(points[split - 1] - points[split + 1])
    left = fit_cubic(points[: split + 1], t1, center, error)
    right = fit_cubic(points[split:], -center, t2, error)
    return left + right


def _fmt(point: Point) -> str:
    return f"{point[0]:.1f} {point[1]:.1f}"


def fit_path(points: Sequence[Point], error: float = 0.5) -> str:
    """Return an SVG path (`M … C …`) through all points."""
    if len(points) < 2:
        return ""
    pts = np.asarray(points, dtype=float)
    # drop consecutive duplicates; Schneider divides by chord length
    keep = np.concatenate(
        [[True], np.linalg.norm(np.diff(pts, axis=0), axis=1) > 1e-6]
    )
    pts = pts[keep]
    if len(pts) < 2:
        return ""
    if len(pts) == 2:
        t = _normalize(pts[1] - pts[0])
        curves = fit_cubic(pts, t, -t, error)
    else:
        t1 = _normalize(pts[1] - pts[0])
        t2 = _normalize(pts[-2] - pts[-1])
        curves = fit_cubic(pts, t1, t2, error)
    parts = [f"M{_fmt(curves[0][0])}"]
    for _, c1, c2, end in curves:
        parts.append(f"C{_fmt(c1)} {_fmt(c2)} {_fmt(end)}")
    return "".join(parts)


def fit_closed_path(points: Sequence[Point], error: float = 0.6) -> str:
    """Fit a ring; the seam is placed at the least curved point.

    The start/end tangents are the same (central difference at the seam), so
    the closed path is C1 and cannot grow a cusp where it closes.
    """
    pts = np.asarray(points, dtype=float)
    if len(pts) < 4:
        return ""
    # curvature proxy: angle between neighbours at each point
    prev = np.roll(pts, 1, axis=0)
    nxt = np.roll(pts, -1, axis=0)
    a = np.linalg.norm(prev - pts, axis=1)
    b = np.linalg.norm(nxt - pts, axis=1)
    c = np.linalg.norm(nxt - prev, axis=1)
    # law of cosines; small angle change = straight = good seam
    cos = (a**2 + b**2 - c**2) / np.maximum(2 * a * b, 1e-9)
    angle = np.arccos(np.clip(cos, -1, 1))
    start = int(np.argmin(angle))
    ring = np.vstack([pts[start:], pts[:start], pts[start : start + 1]])
    seam_tangent = _normalize(pts[(start + 1) % len(pts)] - pts[(start - 1) % len(pts)])
    curves = fit_cubic(ring, seam_tangent, -seam_tangent, error)
    parts = [f"M{_fmt(curves[0][0])}"]
    for _, c1, c2, end in curves:
        parts.append(f"C{_fmt(c1)} {_fmt(c2)} {_fmt(end)}")
    return "".join(parts) + "Z"
