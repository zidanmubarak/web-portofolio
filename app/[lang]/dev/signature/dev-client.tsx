"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signatureData } from "@/components/signature/signature-data";
import {
  SignatureDraw,
  type SignatureDrawHandle,
} from "@/components/signature/SignatureDraw";
import { Loader, type LoaderExitDetail } from "@/components/loader/loader";
import { drawTotal } from "@/components/signature/timing";

type LoaderResult = {
  skipped: boolean;
  reason: string;
  ms: number;
} | null;

function pad2(value: number): string {
  return Math.round(value).toString().padStart(3, "0");
}

function Panel({
  index,
  title,
  note,
  children,
  className,
}: {
  index: string;
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-line py-8 md:py-12", className)}>
      <div className="grid gap-6 md:grid-cols-12">
        <header className="md:col-span-3">
          <p className="u-label text-accent">{index}</p>
          <h2 className="u-display mt-2 text-heading">{title}</h2>
          {note ? (
            <p className="mt-3 max-w-[32ch] text-small text-ink-muted">{note}</p>
          ) : null}
        </header>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export function SignatureDev() {
  const signatureRef = React.useRef<SignatureDrawHandle>(null);
  const progressRef = React.useRef(0);
  const [progress, setProgress] = React.useState(0);
  const [speed, setSpeed] = React.useState(1);
  const [playing, setPlaying] = React.useState(false);
  const [compare, setCompare] = React.useState(48);
  const [originalOk, setOriginalOk] = React.useState(true);
  const [loaderKey, setLoaderKey] = React.useState(0);
  const [loaderOpen, setLoaderOpen] = React.useState(false);
  const [loaderMode, setLoaderMode] = React.useState<"first" | "repeat">("first");
  const [loaderResult, setLoaderResult] = React.useState<LoaderResult>(null);
  const startedAt = React.useRef(0);

  const seek = React.useCallback((value: number) => {
    const next = Math.min(1, Math.max(0, value));
    progressRef.current = next;
    setProgress(next * 100);
    setPlaying(false);
    signatureRef.current?.seek(next);
  }, []);

  const playFromStart = React.useCallback(() => {
    const handle = signatureRef.current;
    if (!handle) return;
    handle.seek(0);
    handle.play();
    setPlaying(true);
  }, []);

  React.useEffect(() => {
    const handle = signatureRef.current;
    if (!handle) return;
    handle.seek(progressRef.current);
  }, [speed]);

  const runLoader = (mode: "first" | "repeat") => {
    try {
      if (mode === "first") sessionStorage.removeItem("rubric:loaded");
      else sessionStorage.setItem("rubric:loaded", "1");
    } catch {
      /* ignore */
    }
    setLoaderResult(null);
    startedAt.current = performance.now();
    setLoaderMode(mode);
    // The real app sets this before paint via LoaderGate; the dev player
    // reproduces it so the loader's first/again behaviour is visible.
    document.documentElement.dataset.loader =
      mode === "first" ? "pending" : "done";
    setLoaderKey((key) => key + 1);
    setLoaderOpen(true);
  };

  const onLoaderExit = (detail: LoaderExitDetail) => {
    setLoaderResult({
      skipped: detail.skipped,
      reason: detail.reason,
      ms: performance.now() - startedAt.current,
    });
    setLoaderOpen(false);
  };

  const crop = signatureData.source.crop; // [x, y, w, h]
  const pixels = signatureData.source.pixels; // [w, h]
  const frame = { width: crop[2], height: crop[3] };
  const sourceStyle: React.CSSProperties = {
    position: "absolute",
    width: `${(pixels[0] / frame.width) * 100}%`,
    height: `${(pixels[1] / frame.height) * 100}%`,
    left: `${(-crop[0] / frame.width) * 100}%`,
    top: `${(-crop[1] / frame.height) * 100}%`,
    maxWidth: "none",
  };

  const drawingSeconds = drawTotal(signatureData.strokes);

  return (
    <div className="pb-24">
      {loaderOpen ? (
        <Loader
          key={loaderKey}
          force={loaderMode === "first"}
          persist={false}
          onExit={onLoaderExit}
        />
      ) : null}

      <header className="border-b border-line pb-8 pt-[calc(var(--topbar-h)+48px)] md:pb-12">
        <p className="u-label text-accent">T4 / DEV</p>
        <h1 className="u-display mt-4 text-display">Signature and loader</h1>
        <p className="mt-4 max-w-[62ch] text-lead text-ink-muted">
          Vector pipeline evidence for the drawn signature, the readiness
          registry contract, and the loader. This route returns 404 in
          production.
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-4 md:grid-cols-4">
          {[
            ["Source", `${pixels[0]}×${pixels[1]} ${signatureData.source.format.toUpperCase()}`],
            ["ViewBox", `${signatureData.viewBox[0]}×${signatureData.viewBox[1]}`],
            ["Strokes", String(signatureData.strokes.length)],
            ["Draw at 1×", `${drawingSeconds.toFixed(2)} s`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="u-label text-ink-muted">{label}</dt>
              <dd className="u-mono mt-1 text-small text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="u-container">
        <Panel
          index="01 / LOADER"
          title="First visit, again, reduced motion"
          note="The loader is mounted by T9 in the layout. This player reproduces the pre-paint state and clears the session flag."
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => runLoader("first")}
              className="u-label inline-flex h-12 items-center border border-line-strong px-4 text-ink transition-colors duration-ui hover:border-accent hover:text-accent"
            >
              Play first visit
            </button>
            <button
              type="button"
              onClick={() => runLoader("repeat")}
              className="u-label inline-flex h-12 items-center border border-line px-4 text-ink transition-colors duration-ui hover:border-line-strong"
            >
              Simulate repeat visit
            </button>
            <span className="u-mono text-small text-ink-muted">
              sessionStorage rubric:loaded
            </span>
          </div>
          {loaderResult ? (
            <p className="mt-4 border-t border-line pt-4 u-mono text-small text-ink">
              exit: {loaderResult.reason} · {Math.round(loaderResult.ms)} ms ·
              skipped={String(loaderResult.skipped)}
            </p>
          ) : (
            <p className="mt-4 border-t border-line pt-4 u-mono text-small text-ink-muted">
              Loader has not run in this tab yet.
            </p>
          )}
          <p className="mt-4 max-w-[62ch] text-small text-ink-muted">
            Reduced motion is honoured from the boot script: set the OS
            preference to “reduce” and reload - the page renders without the
            overlay. Readiness tasks come from{" "}
            <code className="u-mono">lib/loader/ready.ts</code>.
          </p>
        </Panel>

        <Panel
          index="02 / PLAYER"
          title="Scrub the pen"
          note="One timeline, 14 pen strokes. The mask reveals the filled silhouette, so the stroke width stays calligraphic."
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
            <div className="border border-line bg-surface-elevated p-6 md:p-10">
              <SignatureDraw
                ref={signatureRef}
                variant="plain"
                play="manual"
                speed={speed}
                className="mx-auto w-full max-w-[560px]"
                onTimeline={(timeline) => {
                  if (!timeline) return;
                  timeline.eventCallback("onUpdate", () => {
                    const value = timeline.progress() * 100;
                    progressRef.current = value / 100;
                    setProgress(value);
                  });
                  timeline.pause();
                  timeline.progress(progressRef.current);
                }}
                onComplete={() => setPlaying(false)}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="sig-progress" className="u-label text-ink-muted">
                    Progress
                  </label>
                  <span className="u-mono text-small text-ink">
                    {pad2(progress)}
                  </span>
                </div>
                <input
                  id="sig-progress"
                  type="range"
                  min={0}
                  max={100}
                  step={0.5}
                  value={progress}
                  onChange={(event) => seek(Number(event.target.value) / 100)}
                  className="mt-3 h-1 w-full cursor-pointer appearance-none bg-line accent-accent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={playFromStart}
                  className="u-label h-10 border border-line-strong px-3 text-ink hover:border-accent hover:text-accent"
                >
                  {playing ? "Replay" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    signatureRef.current?.pause();
                    setPlaying(false);
                  }}
                  className="u-label h-10 border border-line px-3 text-ink hover:border-line-strong"
                >
                  Pause
                </button>
                <button
                  type="button"
                  onClick={() => seek(1)}
                  className="u-label h-10 border border-line px-3 text-ink hover:border-line-strong"
                >
                  End
                </button>
              </div>
              <div>
                <p className="u-label text-ink-muted">Speed</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[0.25, 0.5, 1, 1.5, 2].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSpeed(value)}
                      aria-pressed={speed === value}
                      className={cn(
                        "u-mono h-9 border text-small",
                        speed === value
                          ? "border-accent text-accent"
                          : "border-line text-ink-muted hover:border-line-strong"
                      )}
                    >
                      {value}×
                    </button>
                  ))}
                </div>
              </div>
              <dl className="border-t border-line pt-4">
                <div className="flex justify-between">
                  <dt className="u-label text-ink-muted">Draw</dt>
                  <dd className="u-mono text-small">
                    {(drawingSeconds / speed).toFixed(2)} s
                  </dd>
                </div>
                <div className="mt-2 flex justify-between">
                  <dt className="u-label text-ink-muted">Exit</dt>
                  <dd className="u-mono text-small">0.65 s</dd>
                </div>
              </dl>
            </div>
          </div>

          <ol className="mt-8 grid gap-x-8 gap-y-2 border-t border-line pt-4 sm:grid-cols-2">
            {signatureData.strokes.map((stroke) => (
              <li
                key={stroke.id}
                className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-1"
              >
                <span className="u-mono text-small text-ink">
                  {String(stroke.order).padStart(2, "0")}{" "}
                  <span className="text-ink-muted">{stroke.name}</span>
                </span>
                <span className="u-mono text-label text-ink-muted">
                  {stroke.length.toFixed(0)}px · {stroke.duration.toFixed(2)}s
                  {stroke.liftBefore > 1
                    ? ` · lift ${stroke.liftBefore.toFixed(0)}px`
                    : ""}
                </span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel
          index="03 / COMPARE"
          title="Source vs smooth"
          note="Drag the divider. The original photo is streamed from a dev-only route (assets/source stays out of public/ and the build)."
        >
          <div className="relative mx-auto w-full max-w-[760px] border border-line bg-surface-elevated">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
            >
              {/* final, smoothed vector */}
              <div className="absolute inset-0 text-ink">
                <svg
                  viewBox={`0 0 ${signatureData.viewBox[0]} ${signatureData.viewBox[1]}`}
                  className="h-full w-full"
                  role="img"
                  aria-label="Smoothed signature result"
                >
                  <path
                    d={signatureData.silhouette}
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              {/* original, clipped from the left */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - compare}% 0 0)` }}
              >
                {originalOk ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/dev/signature/source"
                    alt="Original signature photograph"
                    className="opacity-90"
                    style={sourceStyle}
                    onError={() => setOriginalOk(false)}
                  />
                ) : (
                  <div className="grid h-full place-items-center p-6">
                    <p className="u-mono max-w-[32ch] text-center text-small text-ink-muted">
                      assets/source/ttd-asli.jpg not found. Put the source file
                      back to compare.
                    </p>
                  </div>
                )}
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 w-px bg-accent"
                style={{ left: `${compare}%` }}
                aria-hidden="true"
              />
              <span className="pointer-events-none absolute left-3 top-3 u-label text-ink">
                SOURCE
              </span>
              <span className="pointer-events-none absolute right-3 top-3 u-label text-accent">
                SMOOTH
              </span>
            </div>
            <div className="border-t border-line p-4">
              <label htmlFor="compare" className="u-label text-ink-muted">
                Divider {compare}%
              </label>
              <input
                id="compare"
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={compare}
                onChange={(event) => setCompare(Number(event.target.value))}
                className="mt-3 h-1 w-full cursor-pointer appearance-none bg-line accent-accent"
              />
            </div>
          </div>
          <p className="mt-4 max-w-[62ch] text-small text-ink-muted">
            The published asset is the smoothed silhouette only; the source
            photograph never enters <code className="u-mono">public/</code>.
            Vault evidence: <code className="u-mono">signature-pipeline.md</code>.
          </p>
        </Panel>

        <Panel
          index="04 / VARIANTS"
          title="Logo, footer, plain"
          note="The same data, three sizes. The footer plays when it enters the viewport; the logo draws once on mount."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border border-line p-6">
              <p className="u-label text-ink-muted">logo · 112px</p>
              <div className="mt-6 flex h-24 items-center">
                <SignatureDraw variant="logo" play="mount" duration={1.4} />
              </div>
            </div>
            <div className="border border-line bg-surface-sunken p-6">
              <p className="u-label text-ink-muted">footer · 200px</p>
              <div className="mt-6">
                <SignatureDraw variant="footer" play="viewport" duration={1.3} />
              </div>
            </div>
            <div className="border border-line p-6 md:col-span-2">
              <p className="u-label text-ink-muted">
                paper surface · currentColor
              </p>
              <div className="mt-6 bg-paper p-8 text-paper-ink">
                <SignatureDraw variant="footer" play="viewport" duration={1.3} />
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          index="05 / CONTRACT"
          title="Readiness registry"
          note="Other terminals register work without touching the loader."
        >
          <pre className="overflow-x-auto border border-line bg-surface-elevated p-4 u-mono text-[0.75rem] leading-relaxed text-ink-muted">
            {`import { registerReadyTask, markReady, useAppProgress } from "@/lib/loader/ready";

// inside a client component
useEffect(() => {
  const cancel = registerReadyTask("hero-texture", { weight: 2 });
  texture.load().then(() => markReady("hero-texture"));
  return cancel;
}, []);

// anywhere client-side
const progress = useAppProgress(); // 0-100, weighted, monotonic

// Loader exit (hero intro):
useEffect(() => {
  const onExit = (event: Event) => startHeroIntro(event);
  window.addEventListener("rubric:loader-exit", onExit);
  return () => window.removeEventListener("rubric:loader-exit", onExit);
}, []);`}
          </pre>
          <p className="mt-4 text-small text-ink-muted">
            Built-ins registered by the Loader: <code className="u-mono">fonts</code>{" "}
            (weight 2) and <code className="u-mono">document</code>. Hard cap 4 s.
            Repeat visits and reduced motion never mount the overlay.
          </p>
        </Panel>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="u-label text-ink-muted">RUBRIC / T4</p>
          <Link href="/dev/style" className="u-label text-ink underline-offset-4 hover:underline">
            /dev/style ↗
          </Link>
        </footer>
      </div>
    </div>
  );
}
