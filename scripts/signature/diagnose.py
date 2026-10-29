"""Stage 1 diagnostic: binarise, thin, build graph, report.

Run:  python scripts/signature/diagnose.py
Outputs to scripts/signature/out/ (gitignored).
"""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np

from imgutil import crop_to_ink, ink_mask, load_image, sniff_format
from skeleton import prune_spurs, thin_zhang_suen, trace_graph

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "assets" / "source" / "ttd-asli.jpg"
OUT = Path(__file__).resolve().parent / "out"


def main() -> None:
    OUT.mkdir(exist_ok=True)
    print("source format:", sniff_format(SRC))
    bgr = load_image(SRC)
    print("shape:", bgr.shape)

    mask = ink_mask(bgr)
    cropped, offset = crop_to_ink(mask, pad=8)
    print("crop offset:", offset, "shape:", cropped.shape)
    cv2.imwrite(str(OUT / "01-mask.png"), cropped)

    skel = thin_zhang_suen(cropped > 0)
    print("skeleton px:", int(skel.sum()))
    cv2.imwrite(str(OUT / "02-skel.png"), (skel * 255).astype(np.uint8))

    pruned = prune_spurs(skel, min_len=6)
    print("pruned px:", int(pruned.sum()))
    cv2.imwrite(str(OUT / "03-skel-pruned.png"), (pruned * 255).astype(np.uint8))

    graph = trace_graph(pruned)
    print("nodes:", len(graph.nodes), "edges:", len(graph.edges))
    print("endpoints:", len(graph.endpoint_nodes()), graph.endpoint_nodes())
    print("junctions:", len(graph.junction_nodes()))
    for e in sorted(graph.edges.values(), key=lambda e: -e.length):
        print(
            f"edge {e.id:3d} {e.start}->{e.end} pts={len(e.points):4d} len={e.length:7.1f}"
        )

    # Colour-code edges on top of the mask for visual inspection.
    vis = cv2.cvtColor(cropped, cv2.COLOR_GRAY2BGR)
    vis = (vis * 0.25).astype(np.uint8)
    rng = np.random.default_rng(7)
    for e in graph.edges.values():
        colour = tuple(int(c) for c in rng.integers(80, 255, 3))
        pts = np.asarray(e.points, dtype=np.int32).reshape(-1, 1, 2)
        cv2.polylines(vis, [pts], False, colour, 2)
    for node in graph.nodes:
        colour = (0, 0, 255) if graph.degree(node) >= 3 else (0, 255, 0)
        cv2.circle(vis, node, 4, colour, -1)
    cv2.imwrite(str(OUT / "04-edges.png"), vis)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
