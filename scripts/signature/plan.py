"""Natural writing plan for the Zidan signature.

The skeleton graph (see ``signature-pipeline.md``) splits the signature into
38 branches at every self-crossing. A pen does not lift at a crossing, so the
branches are regrouped here into pen strokes.

Ordering rationale
------------------
* The signature is read and written left to right.
* The left flourish is a loop that ends inside itself; the diagonal is a
  separate quick stroke laid over it (the ink shows the diagonal on top).
* The five ``uuu`` taps share a baseline: the baseline zigzag is one stroke,
  the three inner verticals are quick pen-down taps.
* The tall vertical is the climax: left side up, closed top loop, crossbar,
  front edge, bottom loop, and the long vertical last.
* The humps and the big right bowl close the signature; the final hook is the
  last ink on the page.

Each entry is (branch id, reversed). Branch ids come from the skan graph of
the Lee skeleton and are stable for this source image; ``build.py`` verifies
that every branch is used or explicitly skipped, so a regenerated skeleton
cannot silently drop ink.
"""

from __future__ import annotations

# (stroke name, [(branch id, reversed), ...])
PLAN: list[tuple[str, list[tuple[int, bool]]]] = [
    ("left-loop", [(17, True)]),
    ("diagonal", [(18, True), (7, False)]),
    ("tail-and-left-dip", [(20, False), (27, False), (28, False), (30, False), (29, True)]),
    ("uuu-baseline", [(26, False), (38, True), (37, True), (36, False), (35, False), (25, True)]),
    ("uuu-tap-1", [(24, False)]),
    ("uuu-tap-2", [(22, False)]),
    ("uuu-tap-3", [(23, False)]),
    ("tall-left", [(15, True), (8, False)]),
    ("tall-top-loop", [(2, False), (4, False), (5, False), (1, False)]),
    ("tall-crossbar", [(3, False)]),
    ("tall-front", [(16, False)]),
    ("tall-bottom", [(33, False), (34, False), (39, False)]),
    ("tall-long-vertical", [(6, False)]),
    (
        "humps-and-right-bowl",
        [(13, True), (14, False), (32, False), (10, True), (11, False), (21, False)],
    ),
]

# Branches that are pure skeleton artefacts: short chords at a crossing whose
# ink is already covered by the two long branches that meet there.
SKIPPED_BRANCHES: dict[int, str] = {
    12: "22px chord inside the right-loop crossing; ink already in b10/b11",
    19: "1.4px connector at the left-hook crossing",
    31: "6px chord of the left-dip loop; ink already in b30",
}
