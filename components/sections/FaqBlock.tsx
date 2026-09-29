import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import type { Faq } from "@/lib/content";
import { Accordion } from "./Accordion";

type Props = { eyebrow: string; title: ReactNode; text: ReactNode; items: Faq[]; className?: string };

/** Intro column + accordion, used on the FAQ page and the pricing questions on Services. */
export function FaqBlock({ eyebrow, title, text, items, className = "" }: Props) {
  return (
    <div className={`container faq__grid ${className}`}>
      <div className="faq__intro">
        <Reveal as="span" className="eyebrow" x={-16} y={0}>
          {eyebrow}
        </Reveal>
        <SplitReveal className="faq__title">{title}</SplitReveal>
        <Reveal as="p" className="faq__text" delay={0.2}>
          {text}
        </Reveal>
      </div>
      <Reveal className="accordion" delay={0.1}>
        <Accordion items={items} />
      </Reveal>
    </div>
  );
}
