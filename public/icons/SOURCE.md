# Icons — source, licence, usage

12 brand marks in `public/icons/`, each a single 24×24 path.

| File | Mark | Source |
|---|---|---|
| `python.svg` | Python | Simple Icons — <https://simpleicons.org/icons/python.svg> |
| `pytorch.svg` | PyTorch | Simple Icons — `simpleicons.org/icons/pytorch.svg` |
| `tensorflow.svg` | TensorFlow | Simple Icons — `simpleicons.org/icons/tensorflow.svg` |
| `scikitlearn.svg` | scikit-learn | Simple Icons — `simpleicons.org/icons/scikitlearn.svg` |
| `pandas.svg` | pandas | Simple Icons — `simpleicons.org/icons/pandas.svg` |
| `fastapi.svg` | FastAPI | Simple Icons — `simpleicons.org/icons/fastapi.svg` |
| `huggingface.svg` | Hugging Face | Simple Icons — `simpleicons.org/icons/huggingface.svg` |
| `jupyter.svg` | Jupyter | Simple Icons — `simpleicons.org/icons/jupyter.svg` |
| `streamlit.svg` | Streamlit | Simple Icons — `simpleicons.org/icons/streamlit.svg` |
| `git.svg` | Git | Simple Icons — `simpleicons.org/icons/git.svg` |
| `docker.svg` | Docker | Simple Icons — `simpleicons.org/icons/docker.svg` |
| `linux.svg` | Linux | Simple Icons — `simpleicons.org/icons/linux.svg` |

## Licence

The SVG path data is from **Simple Icons**, released under **CC0 1.0 Universal**
(public-domain dedication): <https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md>.
No attribution is required by CC0; this file is the provenance record anyway.
Fetched 2026-10-28 from `https://cdn.simpleicons.org/<slug>`.

The marks themselves are trademarks of their respective owners (Python Software
Foundation, Meta, Google, the scikit-learn contributors, NumFOCUS/pandas, Sebastián
Ramírez, Hugging Face, Project Jupyter, Streamlit Inc., the Git project, Docker Inc.,
the Linux Foundation). They are used here as **nominative references** — "this person
uses this tool" — not as endorsement, and not as part of a logo for this site.

## Transformation applied

Each downloaded file was rewritten to:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
     fill="currentColor" role="img" aria-hidden="true" focusable="false">
  <title>Python</title><path d="…"/>
</svg>
```

- brand colours removed (`fill="#3776AB"` → `fill="currentColor"`), one colour only;
- `viewBox="0 0 24 24"` on all 12 (asserted, no exceptions);
- `aria-hidden="true"` because every icon in the skills strip is paired with a
  visible or `.sr-only` text label; the `<title>` stays for tooling.

## Usage note (important)

`currentColor` only resolves when the SVG is **inlined in the document** (React
component, `dangerouslySetInnerHTML`, or a sprite `<symbol>`). Loaded through
`<img src="…svg">` the icon inherits no colour and renders black. Inline them, sized
`width:24px;height:24px`, and colour them by setting `color` on the parent cell.

Total weight: **20,793 bytes** for all 12 files (heaviest: `linux.svg` 5.5 KB).
