"use client";

import Link from "next/link";
import { useRef, useState, type ComponentProps } from "react";
import { ArrowUpRight, BENEFIT_ICONS } from "@/components/Icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { useShown } from "@/components/motion/Ready";
import { Reveal } from "@/components/motion/Reveal";
import { SlideLines } from "@/components/motion/SlideLines";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const BENEFITS = [
  { title: "Skin-First Prep", text: "Your base starts with skincare, not concealer." },
  { title: "Lasts All Day", text: "From first look to last dance. No touch-ups." },
  { title: "Products That Matter", text: "Pro-grade, photo-safe, no flashback." },
  { title: "Enhance, Not Mask", text: "Still you, just polished." },
  { title: "Stress-Free Timing", text: "Precise schedules, calm mornings." },
  { title: "Feel Like Yourself", text: "Confidence that shows in every photo." },
];

export function Benefits({ eyebrow = "What You Get?" }: { eyebrow?: string }) {
  const grid = useRef<HTMLOListElement>(null);
  const shown = useShown();
  const [anim, setAnim] = useState<"pending" | "done">("pending");

  // Line icons draw themselves in; the diamond markers spin in once the grid arrives.
  useGSAP(
    () => {
      if (!shown || !grid.current) return;
      if (prefersReducedMotion()) return setAnim("done");
      gsap.utils.toArray<SVGSVGElement>(".benefit__icon", grid.current).forEach((icon) => {
        gsap.from(icon.querySelectorAll("path, circle, ellipse"), {
          drawSVG: "0%",
          duration: 1.8,
          stagger: 0.12,
          ease: "power2.inOut",
          scrollTrigger: { trigger: icon, start: "top 92%", once: true },
        });
      });
      gsap.from(".benefit__num", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "glam",
        scrollTrigger: { trigger: grid.current, start: "top 85%", once: true, onEnter: () => setAnim("done") },
      });
    },
    { dependencies: [shown], scope: grid },
  );

  return (
    <section className="benefits section">
      <div className="container">
        <SectionHead
          eyebrow={eyebrow}
          lines={[
            { text: "Results That Go Beyond Just" },
            { text: "Looking Good in Photos,", className: "benefits__line--right", from: "right" },
            { text: "Providing Real Confidence", className: "benefits__line--justify" },
            {
              text: (
                <>
                  and <em>Real Calm on Your Day</em>
                </>
              ),
            },
          ]}
        />

        <ol className="benefits__grid" ref={grid} data-anim={anim}>
          {BENEFITS.map((b, i) => {
            const Icon = BENEFIT_ICONS[i];
            return (
              <Reveal as="li" className="benefit" key={b.title} delay={(i % 3) * 0.1} y={30}>
                <span className="benefit__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="benefit__title">{b.title}</h3>
                <p className="benefit__text">{b.text}</p>
                <Icon className="benefit__icon" />
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Eyebrow · zig-zag title · circle CTA row, shared by Benefits and the About process block. */
export function SectionHead({ eyebrow, lines }: { eyebrow: string; lines: ComponentProps<typeof SlideLines>["lines"] }) {
  return (
    <div className="benefits__head">
      <Reveal as="span" className="eyebrow" x={-16} y={0}>
        {eyebrow}
      </Reveal>
      <SlideLines className="benefits__title" lineClass="benefits__line" lines={lines} />
      <Reveal className="benefits__cta" scale={0.6} y={0}>
        <Magnetic>
          <Link href="/booking" className="circle circle--outline circle--arrow" aria-label="Book now">
            <ArrowUpRight />
          </Link>
        </Magnetic>
      </Reveal>
    </div>
  );
}
