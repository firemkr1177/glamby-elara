"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A small cream bubble that follows the pointer over anything with data-cursor="Label".
 * Native cursor everywhere else. Only on devices with a precise pointer.
 */
export function CursorLabel() {
  const [label, setLabel] = useState<string | null>(null);
  const pathname = usePathname();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let px = -200;
    let py = -200;
    const pick = (target: Element | null) => {
      const hit = target?.closest?.("[data-cursor]");
      setLabel(hit ? hit.getAttribute("data-cursor") : null);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      x.set(px);
      y.set(py);
      pick(e.target as Element);
    };
    // Content scrolls under a still pointer: re-check what's beneath it.
    const onScroll = () => pick(document.elementFromPoint(px, py));
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  useEffect(() => setLabel(null), [pathname]);

  return (
    <AnimatePresence>
      {label && (
        <motion.div
          className="cursor-label"
          style={{ x: sx, y: sy }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          aria-hidden="true"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={label}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
