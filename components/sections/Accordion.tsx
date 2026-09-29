"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { EASE } from "@/lib/gsap";
import type { Faq } from "@/lib/content";

/** FAQ list. Several can be open at once (like the original <details>); height animates open/closed. */
export function Accordion({ items, firstOpen = true }: { items: Faq[]; firstOpen?: boolean }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(firstOpen ? [0] : []));
  const id = useId();

  const toggle = (i: number) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.q} className={`accordion__item${isOpen ? " is-open" : ""}`}>
            <button className="accordion__summary" aria-expanded={isOpen} aria-controls={`${id}-${i}`} onClick={() => toggle(i)}>
              <span>{item.q}</span>
              <i aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  role="region"
                  className="accordion__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.55, ease: EASE }, opacity: { duration: 0.35 } }}
                >
                  <motion.div
                    className="accordion__body"
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    exit={{ y: -8 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}
