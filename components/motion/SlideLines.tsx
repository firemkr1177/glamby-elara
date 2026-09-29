"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useShown } from "./Ready";

type Line = { text: ReactNode; className?: string; from?: "left" | "right" };

/**
 * For the zig-zag headings (left / right / justified lines): each line glides in
 * from the side it's aligned to, un-blurring as it lands.
 */
export function SlideLines({ lines, className, lineClass }: { lines: Line[]; className: string; lineClass: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const shown = useShown();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !shown) return;
      gsap.set(el, { visibility: "visible" });
      if (prefersReducedMotion()) return;
      const spans = gsap.utils.toArray<HTMLElement>(el.children);
      gsap.from(spans, {
        x: (i) => (spans[i].dataset.from === "right" ? 70 : -70),
        opacity: 0,
        filter: "blur(8px)",
        duration: 1.2,
        ease: "glam",
        stagger: 0.12,
        clearProps: "filter",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { dependencies: [shown], scope: ref },
  );

  return (
    <h2 ref={ref} className={className} data-split="">
      {lines.map((l, i) => (
        <span key={i} className={l.className ? `${lineClass} ${l.className}` : lineClass} data-from={l.from ?? "left"}>
          {l.text}
        </span>
      ))}
    </h2>
  );
}
