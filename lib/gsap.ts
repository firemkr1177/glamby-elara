"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin, CustomEase, useGSAP);
  // Same curve as the site's CSS --ease, so GSAP, Motion and CSS transitions all feel alike.
  CustomEase.create("glam", "0.2, 0.7, 0.2, 1");
  // Slow-in, slow-out for full-screen curtains.
  CustomEase.create("curtain", "0.76, 0, 0.24, 1");
}

/** Motion's cubic-bezier version of the same curve. */
export const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
