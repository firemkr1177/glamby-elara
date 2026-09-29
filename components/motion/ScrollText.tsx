"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Words light up (muted → ink) as the paragraph scrolls through the viewport.
 * Same window as the original: starts at 85% of the viewport, done by 35%.
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      if (!ref.current) return;
      const spans = ref.current.querySelectorAll(".w");
      if (prefersReducedMotion()) {
        gsap.set(spans, { color: "var(--ink)" });
        return;
      }
      gsap.fromTo(
        spans,
        { color: "#b8ada2" },
        {
          color: "#1b1613",
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 35%", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className} data-scroll-text="" aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
