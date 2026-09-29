"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useShown } from "./Ready";

type Props = ImageProps & { from?: "bottom" | "right" | "left" | "top"; delay?: number };

const CLIP = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  right: "inset(0% 0% 0% 100%)",
  left: "inset(0% 100% 0% 0%)",
};

/** next/image that unmasks from one edge while settling from a slight zoom, when scrolled into view. */
export function ClipImage({ from = "bottom", delay = 0, ...img }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const shown = useShown();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !shown) return;
      if (prefersReducedMotion()) return;
      gsap.from(el, {
        clipPath: CLIP[from],
        scale: 1.2,
        duration: 1.5,
        delay,
        ease: "curtain",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { dependencies: [shown] },
  );

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image ref={ref} {...img} />;
}
