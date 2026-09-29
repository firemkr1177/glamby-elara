"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useShown } from "@/components/motion/Ready";
import { PROCESS } from "@/lib/content";
import { SectionHead } from "./Benefits";

/** About page: Enquire → Trial → The Day. */
export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const inView = useInView(list, { once: true, margin: "0px 0px -15% 0px" });
  const shown = useShown();

  return (
    <section className="process-section section">
      <div className="container">
        <SectionHead
          eyebrow="How It Works"
          lines={[
            { text: "Three Steps From" },
            { text: "First Message to", className: "benefits__line--right", from: "right" },
            { text: <em>First Look</em> },
          ]}
        />
        <ol className="process" ref={list} data-anim={inView && shown ? "done" : "pending"}>
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.h} delay={i * 0.15} y={30}>
              <span className="process__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
