"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = ImageProps & {
  /** Travel in % of the image's own height, split either side of centre. */
  speed?: number;
  /** "through" = while the parent crosses the viewport; "settle" = drifts into its resting place as the parent arrives (for things at the very bottom of the page). */
  mode?: "through" | "settle";
};

/** next/image that drifts against the scroll (GSAP ScrollTrigger scrub). Keeps any CSS transform (e.g. scale) it already has. */
export function ParallaxImage({ speed = 6, mode = "through", ...img }: Props) {
  const ref = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const trigger = el.parentElement ?? el;
    if (mode === "settle") {
      gsap.fromTo(el, { yPercent: -speed }, { yPercent: 0, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom bottom", scrub: true } });
    } else {
      gsap.fromTo(el, { yPercent: -speed }, { yPercent: speed, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } });
    }
  });

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image ref={ref} {...img} />;
}
