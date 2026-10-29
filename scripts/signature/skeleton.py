"""Zhang-Suen thinning + skeleton graph tracing.

No scipy/skimage dependency: the project only guarantees numpy + OpenCV in
``scripts/signature/requirements.txt``.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Tuple

import numpy as np

Point = Tuple[int, int]  # (x, y)

# 8-neighbourhood, clockwise starting north.
NEIGHBOURS: Tuple[Point, ...] = (
    (0, -1),
    (1, -1),
    (1, 0),
    (1, 1),
    (0, 1),
    (-1, 1),
    (-1, 0),
    (-1, -1),
)


def _neighbour_matrix(img: np.ndarray) -> np.ndarray:
    """Return (8, H, W) array with each neighbour-shifted image."""
    padded = np.pad(img, 1, mode="constant")
    h, w = img.shape
    stack = []
    for dy, dx in NEIGHBOURS:
        stack.append(padded[1 + dy : 1 + dy + h, 1 + dx : 1 + dx + w])
    return np.stack(stack)


def thin_zhang_suen(binary: np.ndarray, max_iter: int = 200) -> np.ndarray:
    """Thin a 0/1 mask to a 1px skeleton (Zhang-Suen, vectorised)."""
    img = (binary > 0).astype(np.uint8)
    for _ in range(max_iter):
        changed = False
        for step in (0, 1):
            n = _neighbour_matrix(img)
            p2, p3, p4, p5, p6, p7, p8, p9 = n
            b = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9
            a = (
                ((p2 == 0) & (p3 == 1)).astype(np.uint8)
                + ((p3 == 0) & (p4 == 1)).astype(np.uint8)
                + ((p4 == 0) & (p5 == 1)).astype(np.uint8)
                + ((p5 == 0) & (p6 == 1)).astype(np.uint8)
                + ((p6 == 0) & (p7 == 1)).astype(np.uint8)
                + ((p7 == 0) & (p8 == 1)).astype(np.uint8)
                + ((p8 == 0) & (p9 == 1)).astype(np.uint8)
                + ((p9 == 0) & (p2 == 1)).astype(np.uint8)
            )
            if step == 0:
                cond = (
                    (img == 1)
                    & (b >= 2)
                    & (b <= 6)
                    & (a == 1)
                    & ((p2 * p4 * p6) == 0)
                    & ((p4 * p6 * p8) == 0)
                )
            else:
                cond = (
                    (img == 1)
                    & (b >= 2)
                    & (b <= 6)
                    & (a == 1)
                    & ((p2 * p4 * p8) == 0)
                    & ((p2 * p6 * p8) == 0)
                )
            if cond.any():
                img[cond] = 0
                changed = True
        if not changed:
            break
    return img.astype(bool)


@dataclass
class Edge:
    id: int
    start: Point
    end: Point
    points: List[Point] = field(default_factory=list)

    @property
    def length(self) -> float:
        p = np.asarray(self.points, dtype=float)
        if len(p) < 2:
            return 0.0
        return float(np.sum(np.linalg.norm(np.diff(p, axis=0), axis=1)))


@dataclass
class SkeletonGraph:
    nodes: Dict[Point, List[int]]  # node -> incident edge ids
    edges: Dict[int, Edge]
    pixel_count: int

    def endpoint_nodes(self) -> List[Point]:
        return [n for n, ids in self.nodes.items() if len(ids) == 1]

    def junction_nodes(self) -> List[Point]:
        return [n for n, ids in self.nodes.items() if len(ids) >= 3]

    def degree(self, node: Point) -> int:
        return len(self.nodes.get(node, []))


def _pixel_neighbours(skel: np.ndarray, x: int, y: int) -> List[Point]:
    h, w = skel.shape
    out: List[Point] = []
    for dx, dy in NEIGHBOURS:
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and skel[ny, nx]:
            out.append((nx, ny))
    return out


def _count_neighbours(skel: np.ndarray) -> np.ndarray:
    n = _neighbour_matrix(skel.astype(np.uint8))
    return n.sum(axis=0)


def prune_spurs(skel: np.ndarray, min_len: int = 7, rounds: int = 10) -> np.ndarray:
    """Remove short hairs produced by thinning."""
    skel = skel.copy()
    for _ in range(rounds):
        counts = _count_neighbours(skel)
        ys, xs = np.nonzero(skel & (counts == 1))
        removed = False
        for y, x in zip(ys, xs):
            if not skel[y, x]:
                continue
            path = [(x, y)]
            prev = None
            cur = (x, y)
            for _step in range(min_len):
                nbrs = [p for p in _pixel_neighbours(skel, *cur) if p != prev]
                if len(nbrs) != 1:
                    break
                nxt = nbrs[0]
                if counts[nxt[1], nxt[0]] > 2:
                    break
                prev, cur = cur, nxt
                path.append(cur)
            if len(path) <= min_len and counts[path[-1][1], path[-1][0]] > 2:
                for px, py in path[:-1]:
                    skel[py, px] = False
                removed = True
        if not removed:
            break
    return skel


def trace_graph(skel: np.ndarray) -> SkeletonGraph:
    """Split a skeleton into edges between endpoints/junctions."""
    counts = _count_neighbours(skel)
    h, w = skel.shape
    node_mask = skel & (counts != 2)
    nodes: Dict[Point, List[int]] = {}
    edges: Dict[int, Edge] = {}
    visited: set[Point] = set()
    next_id = 0

    def add_edge(start: Point, first: Point) -> Edge:
        nonlocal next_id
        pts = [start, first]
        prev, cur = start, first
        while True:
            if cur != start and counts[cur[1], cur[0]] != 2:
                break
            nbrs = [p for p in _pixel_neighbours(skel, *cur) if p != prev]
            # avoid stepping into an already claimed edge interior
            nbrs = [p for p in nbrs if p not in visited]
            if not nbrs:
                break
            nxt = nbrs[0]
            pts.append(nxt)
            prev, cur = cur, nxt
            if len(pts) > 20000:
                break
        edge = Edge(id=next_id, start=start, end=pts[-1], points=pts)
        edges[next_id] = edge
        next_id += 1
        for p in pts[1:-1]:
            visited.add(p)
        return edge

    def incident(edge: Edge, node: Point) -> None:
        nodes.setdefault(node, [])
        if edge.id not in nodes[node]:
            nodes[node].append(edge.id)

    # Trace from every node pixel, consuming unvisited interior pixels.
    ys, xs = np.nonzero(node_mask)
    node_pixels = set(zip(xs.tolist(), ys.tolist()))
    traced_pairs: set[frozenset] = set()
    for node in sorted(node_pixels):
        nodes.setdefault(node, [])
        for nxt in _pixel_neighbours(skel, *node):
            if nxt in visited:
                continue
            if nxt in node_pixels:
                # Adjacent node pixels: only trace once per pair.
                pair = frozenset((node, nxt))
                if pair in traced_pairs:
                    continue
                traced_pairs.add(pair)
            edge = add_edge(node, nxt)
            incident(edge, edge.start)
            incident(edge, edge.end)

    # Isolated closed loops (all pixels have exactly two neighbours).
    for y in range(h):
        for x in range(w):
            if not skel[y, x] or not counts[y, x] == 2 or (x, y) in visited:
                continue
            start = (x, y)
            pts = [start]
            prev = None
            cur = start
            for _step in range(20000):
                nbrs = [p for p in _pixel_neighbours(skel, *cur) if p != prev]
                nbrs = [p for p in nbrs if p not in pts[1:]]
                if not nbrs:
                    break
                nxt = nbrs[0]
                prev, cur = cur, nxt
                if cur == start:
                    pts.append(start)
                    break
                pts.append(cur)
            if len(pts) > 3:
                edges[next_id] = Edge(
                    id=next_id, start=start, end=start, points=pts
                )
                nodes.setdefault(start, []).append(next_id)
                next_id += 1
                for p in pts:
                    visited.add(p)
                    skel[p[1], p[0]] = False

    return SkeletonGraph(nodes=nodes, edges=edges, pixel_count=int(skel.sum()))
