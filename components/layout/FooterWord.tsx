"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Giant "elara" at the foot of every page: letters rise into place as you reach the end. */
export function FooterWord() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll(".ch"), {
        yPercent: 55,
        opacity: 0,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
      });
    },
    { scope: ref },
  );

  return (
    <div className="footer__word" aria-hidden="true" ref={ref}>
      <span className="footer__word-inner">
        {"elara".split("").map((c, i) => (
          <span className="ch" key={i}>{c}</span>
        ))}
      </span>
    </div>
  );
}
