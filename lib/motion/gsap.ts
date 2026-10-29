/**
 * Single GSAP registration point.
 *
 * Import `gsap`, `ScrollTrigger`, `SplitText`, `Flip`, `DrawSVG` and `useGSAP`
 * from here — never from the package directly — so a plugin is registered once
 * and the ticker is configured consistently across sections.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, DrawSVGPlugin);

if (typeof window !== "undefined") {
  // Lenis drives the ticker; keep GSAP from jumping after a background tab.
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, SplitText, Flip, DrawSVGPlugin, useGSAP };
