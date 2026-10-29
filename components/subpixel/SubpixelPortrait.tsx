"use client";

import NextImage from "next/image";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { markReady, registerReadyTask } from "@/lib/loader/ready";

import { FINAL_PRESET, hexToRgb, mergeParams, type SubpixelParams } from "./presets";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./shaders";

export type SubpixelPortraitHandle = {
  /** Macro -> resolved camera pull-back with a diagonal light sweep. */
  playIntro: () => Promise<void>;
  /** 0 = settled, 1 = fully unravelled (hero leaving the viewport). */
  setScroll: (progress: number) => void;
};

export type SubpixelPortraitProps = {
  /** RGBA cutout, transparent outside the subject. */
  src: string;
  /** Low-res poster; also the static fallback and the LCP candidate. */
  poster?: string;
  className?: string;
  /** "auto" plays the intro once on first view; "manual" waits for playIntro(). */
  intro?: "auto" | "manual";
  /** Loupe follows the pointer (and drifts on touch devices when idle). */
  lens?: boolean;
  /** Paints the paper plate behind the subject inside the canvas. */
  plate?: boolean;
  onReady?: () => void;
  /** Accessible name; the canvas is exposed as role="img". */
  label?: string;
  /** Overrides for /dev/subpixel; production keeps FINAL_PRESET. */
  params?: Partial<SubpixelParams>;
  /** Frame aspect ratio used before the image decodes (avoids layout shift). */
  ratio?: [number, number];
  /** Dev-only frame-rate probe. */
  onFps?: (fps: number) => void;
};

type QualityLevel = 0 | 1 | 2;

/** Loader readiness task id (lib/loader/ready). Documented in subpixel-notes. */
export const READY_TASK = "hero-portrait";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("subpixel: createShader failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "unknown";
    gl.deleteShader(shader);
    throw new Error(`subpixel: shader compile failed — ${log}`);
  }
  return shader;
}

function buildProgram(gl: WebGL2RenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("subpixel: createProgram failed");
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? "unknown";
    gl.deleteProgram(program);
    throw new Error(`subpixel: program link failed — ${log}`);
  }
  return program;
}

const UNIFORM_NAMES = [
  "uTex",
  "uRes",
  "uGrid",
  "uGap",
  "uFringe",
  "uGlow",
  "uEmit",
  "uLift",
  "uRim",
  "uSat",
  "uScan",
  "uLens",
  "uLensRadius",
  "uLensPos",
  "uIntroLit",
  "uScroll",
  "uDelta",
  "uPaper",
  "uPlate",
  "uTime",
] as const;

type UniformName = (typeof UNIFORM_NAMES)[number];

const SubpixelPortrait = forwardRef<SubpixelPortraitHandle, SubpixelPortraitProps>(
  function SubpixelPortrait(
    {
      src,
      poster,
      className,
      intro = "auto",
      lens = true,
      plate = false,
      onReady,
      label = "Portrait of Zidan Mubarak, rendered as an RGB subpixel matrix",
      params,
      ratio = [2, 3],
      onFps,
    },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const hostRef = useRef<HTMLDivElement | null>(null);
    const [mode, setMode] = useState<"loading" | "webgl" | "fallback">("loading");
    const [dims, setDims] = useState({ w: ratio[0], h: ratio[1] });

    const configRef = useRef<SubpixelParams>(mergeParams(FINAL_PRESET, params));
    configRef.current = mergeParams(FINAL_PRESET, params);

    // Keep callbacks in refs: an inline onReady/onFps must not tear down WebGL.
    const onReadyRef = useRef(onReady);
    onReadyRef.current = onReady;
    const onFpsRef = useRef(onFps);
    onFpsRef.current = onFps;

    const engineRef = useRef<{
      playIntro: () => Promise<void>;
      setScroll: (p: number) => void;
      dispose: () => void;
    } | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        playIntro: () => engineRef.current?.playIntro() ?? Promise.resolve(),
        setScroll: (p: number) => engineRef.current?.setScroll(p),
      }),
      [],
    );

    const handleFallback = useCallback(() => {
      engineRef.current?.dispose();
      engineRef.current = null;
      setMode("fallback");
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      const host = hostRef.current;
      if (!canvas || !host || typeof window === "undefined") return;

      const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const coarseQuery = window.matchMedia("(pointer: coarse)");
      let alive = true;

      const gl = canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      });

      if (!gl) {
        setMode("fallback");
        return;
      }

      let program: WebGLProgram | null = null;
      let texture: WebGLTexture | null = null;
      let uniforms: Partial<Record<UniformName, WebGLUniformLocation | null>> = {};
      let raf = 0;
      let disposed = false;
      let contextLost = false;
      let releaseTask: (() => void) | null = null;
      let readyMarked = false;

      const state = {
        image: null as HTMLImageElement | null,
        ready: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        width: 1,
        height: 1,
        quality: 0 as QualityLevel,
        introProgress: 1,
        introRunning: false,
        introPending: false,
        introResolvers: [] as Array<() => void>,
        sweep: 1,
        scroll: 0,
        scrollTarget: 0,
        lens: 0,
        lensTarget: 0,
        lensX: 0,
        lensY: 0,
        lensTargetX: 0,
        lensTargetY: 0,
        lastPointer: -1e9,
        visible: true,
        inView: true,
        lastFrame: 0,
        frameAvg: 16.7,
        frames: 0,
        fpsAvg: 60,
        started: performance.now(),
      };

      const qualityScale = (q: QualityLevel) => (q === 0 ? 1 : q === 1 ? 0.85 : 0.7);
      // Ceiling for the fragment budget; the effect is fragment-bound, so a
      // huge hero must not quietly turn into a 12-megapixel shader run.
      const PIXEL_BUDGET = 1_800_000;

      const resize = () => {
        if (!alive || disposed) return;
        const rect = host.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return;
        const scale = qualityScale(state.quality);
        let dpr = Math.min(window.devicePixelRatio || 1, 2) * scale;
        const area = rect.width * rect.height * dpr * dpr;
        if (area > PIXEL_BUDGET) dpr *= Math.sqrt(PIXEL_BUDGET / area);
        state.dpr = dpr;
        state.width = Math.max(2, Math.round(rect.width * dpr));
        state.height = Math.max(2, Math.round(rect.height * dpr));
        if (canvas.width !== state.width || canvas.height !== state.height) {
          canvas.width = state.width;
          canvas.height = state.height;
        }
        if (!state.lensX && !state.lensY) {
          state.lensX = state.lensTargetX = state.width * 0.55;
          state.lensY = state.lensTargetY = state.height * 0.62;
        }
      };

      const initGl = () => {
        program = buildProgram(gl);
        uniforms = {};
        for (const name of UNIFORM_NAMES) {
          uniforms[name] = gl.getUniformLocation(program, name);
        }
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        gl.useProgram(program);
        gl.uniform1i(uniforms.uTex ?? null, 0);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        gl.clearColor(0, 0, 0, 0);
      };

      const uploadTexture = () => {
        if (!texture || !state.image) return;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, state.image);
        gl.generateMipmap(gl.TEXTURE_2D);
        state.ready = true;
      };

      const draw = (time: number) => {
        if (!program || !texture) return;
        const cfg = configRef.current;
        const dt = state.lastFrame ? clamp((time - state.lastFrame) / 1000, 0, 0.1) : 1 / 60;
        state.lastFrame = time;

        // ----- frame budget -> automatic quality drop
        state.frameAvg = state.frameAvg * 0.9 + dt * 1000 * 0.1;
        state.frames += 1;
        if (state.frames > 30) {
          if (state.frameAvg > 34 && state.quality < 2) {
            state.quality = (state.quality + 1) as QualityLevel;
            state.frames = 0;
            resize();
          } else if (state.frameAvg > 24 && state.quality === 0) {
            state.quality = 1;
            state.frames = 0;
            resize();
          } else if (state.frames > 240) {
            state.frames = 0;
            state.fpsAvg = 1000 / Math.max(state.frameAvg, 1);
            onFpsRef.current?.(Math.round(state.fpsAvg));
          }
        }

        // ----- intro progress (macro -> resolved + diagonal sweep)
        if (state.introRunning) {
          state.introProgress = clamp(state.introProgress + dt / 1.7, 0, 1);
          // The light sweep runs in the first half: the grid is never an empty plate.
          state.sweep = clamp(state.introProgress / 0.52, 0, 1);
          if (state.introProgress >= 1) {
            state.introRunning = false;
            state.sweep = 1;
            const resolvers = state.introResolvers.splice(0);
            resolvers.forEach((fn) => fn());
          }
        } else if (state.introProgress >= 1) {
          state.sweep = 1;
        }

        // ----- smoothed inputs
        state.scroll += (state.scrollTarget - state.scroll) * Math.min(1, dt * 4.5);
        state.lens += (state.lensTarget - state.lens) * Math.min(1, dt * 6);

        if (coarseQuery.matches && lens && state.lensTarget > 0.05) {
          const idle = performance.now() - state.lastPointer;
          if (idle > 2600) {
            const t = (performance.now() - state.started) / 1000;
            // Drift around the head/shoulders, not the middle of the frame.
            const cx = state.width * 0.5;
            const cy = state.height * 0.66;
            const r = Math.min(state.width, state.height) * 0.1;
            state.lensTargetX = cx + Math.sin(t * 0.42) * r;
            state.lensTargetY = cy + Math.cos(t * 0.31) * r * 0.6;
          }
        }
        state.lensX += (state.lensTargetX - state.lensX) * Math.min(1, dt * 7);
        state.lensY += (state.lensTargetY - state.lensY) * Math.min(1, dt * 7);

        // ----- grid, snapped to whole device pixels (no moiré)
        const baseCell = lerp(cfg.introCellSize, cfg.cellSize, easeInOutCubic(state.introProgress));
        const scrollGrowth = 1 + 0.85 * state.scroll;
        const cellCss = baseCell * scrollGrowth * (state.quality === 2 ? 1.25 : 1);
        const targetDev = Math.max(2, Math.round(cellCss * state.dpr));
        const cols = Math.max(4, Math.round(state.width / targetDev));
        const cellDev = state.width / cols;
        const rows = Math.max(4, Math.round(state.height / cellDev));

        const t = (time - state.started) / 1000;
        gl.viewport(0, 0, state.width, state.height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const paper = hexToRgb(cfg.paper);
        gl.uniform2f(uniforms.uRes ?? null, state.width, state.height);
        gl.uniform2f(uniforms.uGrid ?? null, cols, rows);
        gl.uniform1f(uniforms.uGap ?? null, cfg.gap);
        gl.uniform1f(uniforms.uFringe ?? null, cfg.fringe);
        gl.uniform1f(uniforms.uGlow ?? null, cfg.glow * (state.quality === 0 ? 1 : 0.7));
        gl.uniform1f(uniforms.uEmit ?? null, cfg.emit);
        gl.uniform1f(uniforms.uLift ?? null, cfg.lift);
        gl.uniform1f(uniforms.uRim ?? null, cfg.rim);
        gl.uniform1f(uniforms.uSat ?? null, cfg.sat);
        gl.uniform1f(uniforms.uScan ?? null, cfg.scan);
        gl.uniform1f(uniforms.uLens ?? null, cfg.lensMag > 1.02 ? state.lens * (cfg.lensMag - 1) : 0);
        gl.uniform1f(
          uniforms.uLensRadius ?? null,
          Math.max(8, Math.min(cfg.lensRadius * state.dpr, Math.min(state.width, state.height) * 0.32)),
        );
        gl.uniform2f(uniforms.uLensPos ?? null, state.lensX, state.lensY);
        gl.uniform1f(uniforms.uIntroLit ?? null, state.sweep);
        gl.uniform1f(uniforms.uScroll ?? null, state.scroll);
        gl.uniform1f(uniforms.uDelta ?? null, cfg.layout === "delta" ? 1 : 0);
        gl.uniform3f(uniforms.uPaper ?? null, paper[0], paper[1], paper[2]);
        gl.uniform1f(uniforms.uPlate ?? null, plate ? 1 : 0);
        gl.uniform1f(uniforms.uTime ?? null, t);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // Loader contract (T4): resolved once the texture has actually painted.
        if (!readyMarked) {
          readyMarked = true;
          markReady(READY_TASK);
        }
      };

      const tick = (time: number) => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        if (!state.ready || !state.visible || !state.inView || contextLost) return;
        draw(time);
      };

      const prepare = async () => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        try {
          await img.decode();
        } catch {
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`subpixel: could not load ${src}`));
          });
        }
        if (!alive || disposed) return;
        state.image = img;
        setDims({ w: img.naturalWidth, h: img.naturalHeight });
        initGl();
        uploadTexture();
        resize();
        setMode("webgl");
        onReadyRef.current?.();

        if (intro === "auto" || state.introPending) {
          state.introPending = false;
          state.introProgress = 0;
          state.sweep = 0;
          state.introRunning = true;
        }
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const ro = new ResizeObserver(() => {
        resize();
      });
      ro.observe(host);

      const io = new IntersectionObserver(
        (entries) => {
          state.inView = entries.some((e) => e.isIntersecting);
        },
        { threshold: 0.01 },
      );
      io.observe(host);

      const onVisibility = () => {
        state.visible = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVisibility);

      const onContextLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        for (const name of UNIFORM_NAMES) uniforms[name] = null;
        program = null;
        texture = null;
      };
      const onContextRestored = () => {
        contextLost = false;
        try {
          initGl();
          uploadTexture();
          resize();
          if (!raf) raf = requestAnimationFrame(tick);
        } catch {
          setMode("fallback");
        }
      };
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);

      // ----- pointer / loupe
      const toDevice = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((clientX - rect.left) / Math.max(rect.width, 1)) * state.width;
        const y = (1 - (clientY - rect.top) / Math.max(rect.height, 1)) * state.height;
        return { x, y };
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!lens) return;
        const { x, y } = toDevice(event.clientX, event.clientY);
        state.lensTargetX = x;
        state.lensTargetY = y;
        state.lensTarget = 1;
        state.lastPointer = performance.now();
      };
      const onPointerDown = (event: PointerEvent) => {
        if (!lens) return;
        const { x, y } = toDevice(event.clientX, event.clientY);
        state.lensTargetX = x;
        state.lensTargetY = y;
        state.lensTarget = 1;
        state.lastPointer = performance.now();
      };
      const onPointerLeave = (event: PointerEvent) => {
        // Touch pointers "leave" the moment the finger lifts; keep the loupe alive
        // there so it can drift on its own while idle.
        if (event.pointerType === "touch") return;
        state.lensTarget = 0;
      };
      host.addEventListener("pointermove", onPointerMove, { passive: true });
      host.addEventListener("pointerdown", onPointerDown, { passive: true });
      host.addEventListener("pointerleave", onPointerLeave);
      host.addEventListener("pointercancel", onPointerLeave);

      const onReducedMotion = () => {
        if (reduceQuery.matches) handleFallback();
      };
      reduceQuery.addEventListener("change", onReducedMotion);

      const engine = {
        playIntro: () =>
          new Promise<void>((resolve) => {
            state.introProgress = 0;
            state.sweep = 0;
            state.introResolvers.push(resolve);
            if (!state.ready) {
              // Renderer not up yet: start the intro as soon as it is.
              state.introPending = true;
              return;
            }
            state.introRunning = true;
          }),
        setScroll: (p: number) => {
          state.scrollTarget = clamp(p, 0, 1);
        },
        dispose: () => {
          disposed = true;
          cancelAnimationFrame(raf);
          raf = 0;
          ro.disconnect();
          io.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          canvas.removeEventListener("webglcontextlost", onContextLost);
          canvas.removeEventListener("webglcontextrestored", onContextRestored);
          host.removeEventListener("pointermove", onPointerMove);
          host.removeEventListener("pointerdown", onPointerDown);
          host.removeEventListener("pointerleave", onPointerLeave);
          host.removeEventListener("pointercancel", onPointerLeave);
          reduceQuery.removeEventListener("change", onReducedMotion);
          const resolvers = state.introResolvers.splice(0);
          resolvers.forEach((fn) => fn());
          releaseTask?.();
          releaseTask = null;
          if (program) gl.deleteProgram(program);
          if (texture) gl.deleteTexture(texture);
        },
      };
      engineRef.current = engine;

      if (reduceQuery.matches) {
        // Static fallback: nothing to wait for, so no readiness task at all.
        setMode("fallback");
        return () => engine.dispose();
      }

      releaseTask = registerReadyTask(READY_TASK, { weight: 2 });

      prepare().catch(() => {
        if (!alive) return;
        // The poster cutout is already on screen; let the loader move on.
        if (!readyMarked) {
          readyMarked = true;
          markReady(READY_TASK);
        }
        setMode("fallback");
      });

      return () => {
        alive = false;
        engine.dispose();
      };
    }, [src, intro, lens, plate, handleFallback]);

    const showCanvas = mode === "webgl";
    const fallbackLabel = mode === "fallback" ? label : undefined;

    return (
      <div
        ref={hostRef}
        className={className}
        data-subpixel=""
        data-mode={mode}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${dims.w} / ${dims.h}`,
          overflow: "hidden",
          // The cutout is transparent outside the subject; keep it out of hit-testing
          // so the hero container keeps its own pointer handling.
          isolation: "isolate",
        }}
      >
        {/* Base layer: the still cutout. Doubles as the static fallback and the
            early LCP paint before the first WebGL frame. */}
        <NextImage
          src={poster ?? src}
          alt=""
          aria-hidden="true"
          fill
          loading="eager"
          sizes="(max-width: 900px) 100vw, 44vw"
          draggable={false}
          style={{
            objectFit: "contain",
            objectPosition: "bottom center",
            opacity: showCanvas ? 0 : 1,
            transition: "opacity 180ms linear",
            userSelect: "none",
          }}
        />

        {/* Static fallback overlay: three-colour subpixel stripes + black matrix. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: showCanvas ? 0 : 1,
            transition: "opacity 180ms linear",
            mixBlendMode: "multiply",
            backgroundImage:
              "repeating-linear-gradient(90deg," +
              " rgba(255,64,48,0.20) 0 1px," +
              " rgba(48,255,120,0.18) 1px 2px," +
              " rgba(64,112,255,0.20) 2px 3px)," +
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0 1px, rgba(0,0,0,0) 1px 4px)",
          }}
        />

        <canvas
          ref={canvasRef}
          role={showCanvas ? "img" : undefined}
          aria-label={showCanvas ? label : undefined}
          aria-hidden={showCanvas ? undefined : true}
          data-ready={showCanvas ? "true" : "false"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            opacity: showCanvas ? 1 : 0,
            transition: "opacity 220ms linear",
            touchAction: "pan-y",
          }}
        />

        {fallbackLabel ? <span className="sr-only">{fallbackLabel}</span> : null}
      </div>
    );
  },
);

export default SubpixelPortrait;
