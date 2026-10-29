import * as React from "react";

/**
 * LoaderGate — the pre-paint half of the loader.
 *
 * Place `<LoaderGate />` once in the root layout (inside `<head>` is ideal; the
 * top of `<body>` also works because the inline script is parser-blocking).
 * It is a server component: no client JS, no state.
 *
 * Why it exists
 * - The loader must not flash the page before it paints. A plain inline script
 *   runs before the first paint and marks `<html data-loader>`.
 * - Repeat visits (same session) and `prefers-reduced-motion` skip the overlay
 *   from the very first frame, without waiting for hydration.
 * - If the Loader is ever missing (or a script fails), a 6 s fail-safe reveals
 *   the page instead of leaving it hidden.
 *
 * Integration (T6/T9):
 *
 * ```tsx
 * // app/layout.tsx
 * import { LoaderGate } from "@/components/loader/loader-gate";
 * import { Loader } from "@/components/loader/loader";
 *
 * <html data-loader="pending">
 *   <head><LoaderGate /></head>
 *   <body>
 *     <Loader />
 *     <SmoothScrollProvider>…</SmoothScrollProvider>
 *   </body>
 * </html>
 * ```
 *
 * The `data-loader="pending"` on `<html>` is a no-JS fallback: the boot script
 * overwrites it immediately.
 */

export const LOADER_STORAGE_KEY = "rubric:loaded";

const BOOT = `(function(){try{var d=document.documentElement;var seen=false;try{seen=sessionStorage.getItem(${JSON.stringify(
  LOADER_STORAGE_KEY
)})==="1"}catch(e){}var reduce=false;try{reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}if(seen||reduce){d.dataset.loader="done";d.dataset.loaded="true"}else{d.dataset.loader="pending";d.dataset.loaded="false";setTimeout(function(){if(d.dataset.loader!=="done"){d.dataset.loader="done";d.dataset.loaded="true"}},6000)}}catch(e){try{document.documentElement.dataset.loader="done"}catch(_){}}})();`;

const STYLE = `
html[data-loader="pending"] #main,
html[data-loader="pending"] [data-shell="topbar"] {
  opacity: 0;
}
html[data-loader="pending"] body {
  overflow: hidden;
}
html[data-loader="done"] [data-loader-root] {
  display: none !important;
}
`;

export function LoaderGate() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
    </>
  );
}
