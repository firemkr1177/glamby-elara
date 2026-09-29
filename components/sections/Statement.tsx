"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { Glyph } from "@/components/Icons";
import { useShown } from "@/components/motion/Ready";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  img: string;
  alt: string;
  tag: string;
  lead: string;
  lines: string[];
  thumbs: string[];
  title: ReactNode;
  note: string[];
};

export function Statement({ img, alt, tag, lead, lines, thumbs, title, note }: Props) {
  const root = useRef<HTMLElement>(null);
  const shown = useShown();

  useGSAP(
    () => {
      if (!shown || !root.current) return;
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const media = q(".statement__media")[0];
      const panel = q(".statement__panel")[0];

      // Both halves unmask upward as the section arrives.
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 82%", once: true }, defaults: { ease: "curtain" } })
        .from(media, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3 })
        .from(panel, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3 }, 0.12)
        .from(q(".statement__tag, .statement__lead, .statement__line"), { y: 18, opacity: 0, duration: 0.9, stagger: 0.08, ease: "glam" }, 0.6)
        .from(q(".statement__thumbs img"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: "glam" }, 0.75)
        .from(q(".statement__glyph circle, .statement__glyph path"), { drawSVG: "0%", duration: 2.2, stagger: 0.2, ease: "power2.inOut" }, 0.5);

      // Slow push-in on the photo and a lazy spin on the glyph while scrolling.
      gsap.fromTo(q(".statement__img"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(q(".statement__glyph"), { rotate: 90, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    { dependencies: [shown], scope: root },
  );

  return (
    <section className="statement" ref={root}>
      <div className="statement__media">
        <Image className="statement__img" src={img} alt={alt} width={1200} height={1320} sizes="(max-width: 980px) 100vw, 50vw" quality={80} />
        <span className="statement__tag">{tag}</span>
        <div className="statement__text">
          <p className="statement__lead">{lead}</p>
          <p className="statement__lines">
            {lines.map((l, i) => (
              <span key={i} className="statement__line" style={{ display: "block" }}>
                {l}
              </span>
            ))}
          </p>
        </div>
        <div className="statement__thumbs" aria-hidden="true">
          {thumbs.map((t, i) => (
            <Image key={t} className={i === 1 ? "is-active" : undefined} src={t} alt="" width={200} height={200} sizes="88px" quality={70} />
          ))}
        </div>
      </div>
      <div className="statement__panel">
        <SplitReveal className="statement__title" start="top 75%" delay={0.3}>
          {title}
        </SplitReveal>
        <Glyph className="statement__glyph" />
        <Reveal as="p" className="statement__note" delay={0.2}>
          {note.map((n, i) => (
            <span key={i}>
              {n}
              {i < note.length - 1 && (
                <>
                  {" "}
                  <br />
                </>
              )}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
