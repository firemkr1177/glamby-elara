"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { EASE } from "@/lib/gsap";
import { useShown } from "./Ready";

type Tag = "div" | "p" | "span" | "li" | "ul" | "ol" | "figure" | "blockquote" | "h2" | "h3" | "section" | "article";

type RevealProps = {
  as?: Tag;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  duration?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

/**
 * Fade/lift in when scrolled into view (Motion). Replaces the static site's `.reveal`.
 * Waits for the page to be uncovered, and never animates back out.
 */
export function Reveal({ as = "div", delay = 0, y = 22, x = 0, scale = 1, blur = 0, duration = 0.9, amount = 0.08, className, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px -8% 0px" });
  const shown = useShown();
  const show = inView && shown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = motion[as] as any;
  return (
    <Comp
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? `blur(${blur}px)` : undefined }}
      animate={show ? { opacity: 1, y: 0, x: 0, scale: 1, filter: blur ? "blur(0px)" : undefined } : undefined}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
