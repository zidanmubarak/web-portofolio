"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import SubpixelPortrait, {
  type SubpixelPortraitHandle,
} from "@/components/subpixel/SubpixelPortrait";
import { FINAL_PRESET, PRESET_LABEL, type SubpixelParams } from "@/components/subpixel/presets";

const SRC = "/images/portrait/portrait-halfbody.webp";
const POSTER = "/images/portrait/portrait-poster.webp";

type TpBinding = {
  on: (event: string, callback: (ev: { value: never }) => void) => TpBinding;
};
type TpFolder = {
  addBinding: (target: object, key: string, opts?: Record<string, unknown>) => TpBinding;
  addFolder: (opts: { title: string }) => TpFolder;
  addButton: (opts: { title: string }) => TpBinding;
  on: (event: string, callback: () => void) => void;
};
type TpPane = TpFolder & { dispose: () => void };

const CORNERS: Array<{
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  bt?: boolean;
  bb?: boolean;
  bl?: boolean;
  br?: boolean;
}> = [
  { top: 10, left: 10, bt: true, bl: true },
  { top: 10, right: 10, bt: true, br: true },
  { bottom: 10, left: 10, bb: true, bl: true },
  { bottom: 10, right: 10, bb: true, br: true },
];

const NUMERIC_KEYS = [
  "cellSize",
  "introCellSize",
  "gap",
  "matrix",
  "fringe",
  "glow",
  "lift",
  "rim",
  "sat",
  "lensRadius",
  "lensMag",
  "scan",
] as const;

/** Dev-only: ?cellSize=5&rim=0&layout=delta overrides the preset for A/B shots. */
function queryOverrides(): Partial<SubpixelParams> {
  if (typeof window === "undefined") return {};
  const out: Record<string, unknown> = {};
  const url = new URLSearchParams(window.location.search);
  for (const key of NUMERIC_KEYS) {
    const raw = url.get(key);
    if (raw !== null && !Number.isNaN(Number(raw))) out[key] = Number(raw);
  }
  const layout = url.get("layout");
  if (layout === "stripe" || layout === "delta") out.layout = layout;
  const paper = url.get("paper");
  if (paper) out.paper = paper.startsWith("#") ? paper : `#${paper}`;
  return out as Partial<SubpixelParams>;
}

const STYLES = `
.t3-lab {
  min-height: 100svh;
  background: #0B0B0A;
  color: #F2EDE4;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  line-height: 1.6;
  padding: 88px 32px 48px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 32px;
  align-items: start;
}
.t3-lab__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  border-bottom: 1px solid #2B2A26;
  padding-bottom: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9A968C;
  margin-bottom: 20px;
}
.t3-lab__head b { color: #FF4A2E; font-weight: 400; }
.t3-lab__body { display: flex; gap: 28px; align-items: flex-start; flex-wrap: wrap; }
.t3-lab__plate {
  position: relative;
  width: min(44vw, 520px);
  aspect-ratio: 2 / 3;
  background: #E7E1D5;
  flex: 0 0 auto;
}
.t3-lab__side { display: flex; flex-direction: column; gap: 14px; width: 280px; }
.t3-lab__side p { margin: 0; }
.t3-lab__label { letter-spacing: 0.12em; text-transform: uppercase; color: #F2EDE4; }
.t3-lab__muted { color: #9A968C; }
.t3-lab__btn {
  font: inherit;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #3D3B35;
  background: transparent;
  color: #F2EDE4;
  padding: 10px 14px;
  cursor: pointer;
  width: fit-content;
  text-align: left;
}
.t3-lab__btn:hover { border-color: #FF4A2E; color: #FF4A2E; }
.t3-lab__json {
  font: inherit;
  color: #9A968C;
  border-top: 1px solid #2B2A26;
  padding-top: 10px;
  margin: 0;
  white-space: pre-wrap;
  max-height: 220px;
  overflow: auto;
}
.t3-lab__pane { position: sticky; top: 88px; align-self: start; }
.t3-lab__foot {
  margin-top: 24px;
  padding-top: 10px;
  border-top: 1px solid #2B2A26;
  color: #9A968C;
}
@media (max-width: 900px) {
  .t3-lab { grid-template-columns: 1fr; padding: 76px 16px 32px; }
  .t3-lab__body { flex-direction: column; gap: 20px; }
  .t3-lab__plate { width: 100%; }
  .t3-lab__side { width: 100%; }
  .t3-lab__pane { position: static; width: 100%; }
}
`;

/**
 * /dev/subpixel - tuning bench for the RGB subpixel portrait.
 * Only reachable outside production builds (see page.tsx).
 */
export function SubpixelLab() {
  const handleRef = useRef<SubpixelPortraitHandle | null>(null);
  const paneHostRef = useRef<HTMLDivElement | null>(null);
  const plateRef = useRef<HTMLDivElement | null>(null);

  // Tweakpane mutates this object in place; React state is a shallow copy of it.
  // Query overrides are applied after mount so SSR and hydration agree.
  const paramsRef = useRef<SubpixelParams>({ ...FINAL_PRESET });
  const [params, setParams] = useState<SubpixelParams>({ ...FINAL_PRESET });
  const [scroll, setScroll] = useState(0);
  const [lens, setLens] = useState(true);
  const [plate, setPlate] = useState(true);
  const [intro, setIntro] = useState<"auto" | "manual">("manual");
  const [mode, setMode] = useState("loading");
  const [fps, setFps] = useState(0);
  const [presetJson, setPresetJson] = useState("");

  const sync = useCallback(() => setParams({ ...paramsRef.current }), []);

  // Dev-only URL overrides, applied once after hydration.
  useEffect(() => {
    const overrides = queryOverrides();
    if (Object.keys(overrides).length) {
      Object.assign(paramsRef.current, overrides);
      setParams({ ...paramsRef.current });
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get("plate") === "0") setPlate(false);
    if (params.get("lens") === "0") setLens(false);
    if (params.get("intro") === "auto") setIntro("auto");
  }, []);

  useEffect(() => {
    let disposed = false;
    let pane: TpPane | null = null;
    const cfg = paramsRef.current;

    void (async () => {
      const { Pane } = await import("tweakpane");
      if (disposed || !paneHostRef.current) return;

      // tweakpane ships without @tweakpane/core types in this install, so the
      // pane is typed structurally for the small surface this bench uses.
      const created = new Pane({
        container: paneHostRef.current,
        title: "SUBPIXEL / T3",
      }) as unknown as TpPane;

      const grid = created.addFolder({ title: "grid" });
      grid.addBinding(cfg, "cellSize", { min: 1.5, max: 8, step: 0.1, label: "cell px" });
      grid.addBinding(cfg, "introCellSize", { min: 10, max: 40, step: 1, label: "intro px" });
      grid.addBinding(cfg, "gap", { min: 0, max: 0.4, step: 0.01, label: "matrix" });
      grid.addBinding(cfg, "layout", { options: { stripe: "stripe", delta: "delta" } });

      const screen = created.addFolder({ title: "screen" });
      screen.addBinding(cfg, "matrix", { min: 0, max: 1, step: 0.01, label: "rgb strips" });
      screen.addBinding(cfg, "fringe", { min: 0, max: 3, step: 0.05, label: "edge fringe" });
      screen.addBinding(cfg, "scan", { min: 0, max: 1, step: 1, label: "scanline" });

      const light = created.addFolder({ title: "light" });
      light.addBinding(cfg, "glow", { min: 0, max: 1, step: 0.01 });
      light.addBinding(cfg, "lift", { min: 0, max: 2, step: 0.01, label: "shadow lift" });
      light.addBinding(cfg, "rim", { min: 0, max: 1.5, step: 0.01 });
      light.addBinding(cfg, "sat", { min: 0.4, max: 2, step: 0.01 });

      const loupe = created.addFolder({ title: "loupe" });
      loupe.addBinding(cfg, "lensRadius", { min: 40, max: 200, step: 2, label: "radius px" });
      loupe.addBinding(cfg, "lensMag", { min: 1, max: 2.5, step: 0.01, label: "mag" });
      loupe.addBinding(cfg, "paper", { label: "paper" });

      created.on("change", () => sync());
      pane = created;
    })();

    return () => {
      disposed = true;
      pane?.dispose();
    };
  }, [sync]);

  // Mirror the renderer mode (webgl / fallback) into the HUD.
  useEffect(() => {
    const node = plateRef.current?.querySelector("[data-subpixel]");
    if (!node) return;
    const read = () => setMode(node.getAttribute("data-mode") ?? "loading");
    read();
    const observer = new MutationObserver(read);
    observer.observe(node, { attributes: true, attributeFilter: ["data-mode"] });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="t3-lab" data-subpixel-lab="">
      <style>{STYLES}</style>

      <section style={{ minWidth: 0 }}>
        <header className="t3-lab__head">
          <b>T3 / SUBPIXEL PORTRAIT</b>
          <span>
            {mode} · {fps || "-"} fps · {PRESET_LABEL}
          </span>
        </header>

        <div className="t3-lab__body">
          {/* Paper plate, exactly as the hero will place it (design-direction §4.2). */}
          <div
            ref={plateRef}
            className="t3-lab__plate"
            style={{ background: plate ? "#E7E1D5" : "#0B0B0A" }}
          >
            {CORNERS.map((pos, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: 12,
                  height: 12,
                  borderTop: pos.bt ? "1px solid #5F5B52" : undefined,
                  borderBottom: pos.bb ? "1px solid #5F5B52" : undefined,
                  borderLeft: pos.bl ? "1px solid #5F5B52" : undefined,
                  borderRight: pos.br ? "1px solid #5F5B52" : undefined,
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  zIndex: 2,
                }}
              />
            ))}
            <SubpixelPortrait
              ref={handleRef}
              src={SRC}
              poster={POSTER}
              className="h-full w-full"
              intro={intro}
              lens={lens}
              plate={plate}
              params={params}
              onReady={() => setMode("webgl")}
              onFps={setFps}
            />
          </div>

          <div className="t3-lab__side">
            <p className="t3-lab__label">How to look</p>
            <p className="t3-lab__muted">
              Pointer over the plate → loupe. Scroll slider → grid unravels. Replay intro → macro
              pull-back with a diagonal sweep.
            </p>

            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={lens} onChange={(e) => setLens(e.target.checked)} />
              loupe
            </label>

            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={plate} onChange={(e) => setPlate(e.target.checked)} />
              paper plate
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span>scroll {scroll.toFixed(2)}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={scroll}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setScroll(v);
                  handleRef.current?.setScroll(v);
                }}
              />
            </label>

            <button
              type="button"
              className="t3-lab__btn"
              onClick={() => void handleRef.current?.playIntro()}
            >
              replay intro
            </button>

            <button
              type="button"
              className="t3-lab__btn"
              style={{ borderColor: "#2B2A26", color: "#9A968C" }}
              onClick={() => {
                const json = JSON.stringify(paramsRef.current, null, 2);
                setPresetJson(json);
                void navigator.clipboard?.writeText(json).catch(() => undefined);
              }}
            >
              copy preset
            </button>

            <pre className="t3-lab__json">{presetJson || "copy preset writes JSON here"}</pre>
          </div>
        </div>

        <p className="t3-lab__foot">
          390 / 768 / 1024 / 1440 · reduced motion and no-WebGL fall back to the static cutout plus
          a three-colour stripe overlay · <code>?rim=0&amp;layout=delta</code> overrides any preset
          value for A/B shots.
        </p>
      </section>

      <aside ref={paneHostRef} className="t3-lab__pane" />
    </main>
  );
}
