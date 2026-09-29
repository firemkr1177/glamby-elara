"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useShown } from "./Ready";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  stagger?: number;
  /** ScrollTrigger start. Pass false to play as soon as the page is uncovered. */
  start?: string | false;
  id?: string;
};

/**
 * Headline reveal: GSAP SplitText cuts the heading into masked lines that rise into place.
 * Re-splits on resize/font load (autoSplit) without replaying.
 */
export function SplitReveal({ as: Tag = "h2", className, children, delay = 0, stagger = 0.1, start = "top 88%", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const shown = useShown();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !shown) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          return gsap.from(self.lines, {
            yPercent: 115,
            rotate: 2.5,
            transformOrigin: "0% 100%",
            duration: 1.15,
            ease: "glam",
            stagger,
            delay,
            scrollTrigger: start ? { trigger: el, start, once: true } : undefined,
          });
        },
      });
    },
    { dependencies: [shown], scope: ref },
  );

  return (
    <Tag ref={ref} className={className} data-split="" id={id}>
      {children}
    </Tag>
  );
}
