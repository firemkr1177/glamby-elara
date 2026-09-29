"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useShown } from "./Ready";

/**
 * Counts up from 0 when scrolled into view (Motion's `animate`).
 * Server HTML carries the real number, so it reads correctly without JS.
 */
export function Counter({ to, className, duration = 1.8, delay = 0 }: { to: number; className?: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const shown = useShown();
  const finished = useRef(false);

  useEffect(() => {
    if (ref.current && !prefersReducedMotion() && !finished.current) ref.current.textContent = "0";
  }, []);

  // No "started" guard: under StrictMode the effect runs twice, and the second run must restart the count.
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || !shown || finished.current || prefersReducedMotion()) return;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-GB");
      },
      onComplete: () => {
        finished.current = true;
      },
    });
    return () => controls.stop();
  }, [inView, shown, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {to.toLocaleString("en-GB")}
    </span>
  );
}
