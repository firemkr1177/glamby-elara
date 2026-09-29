import type { ReactNode } from "react";
import { ClipImage } from "@/components/motion/ClipImage";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  figure?: { src: string; alt: string };
  steps?: string[];
};

/** Dark intro block at the top of inner pages. */
export function PageHead({ eyebrow, title, intro, figure, steps }: Props) {
  return (
    <section className={`page-head${figure ? " page-head--figure" : ""}`}>
      <div className="container page-head__grid">
        <div className="page-head__text">
          <Reveal as="span" className="eyebrow eyebrow--light" x={-16} y={0} delay={0.1}>
            {eyebrow}
          </Reveal>
          <SplitReveal as="h1" className="page-head__title" start={false} delay={0.15} stagger={0.12}>
            {title}
          </SplitReveal>
          <Reveal as="p" className="page-head__intro" delay={0.45}>
            {intro}
          </Reveal>
          {steps && (
            <ol className="steps">
              {steps.map((s, i) => (
                <Reveal as="li" key={s} delay={0.6 + i * 0.1} y={14}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </Reveal>
              ))}
            </ol>
          )}
        </div>
        {figure && (
          <figure className="page-head__figure">
            <ClipImage src={figure.src} alt={figure.alt} width={1000} height={1250} sizes="(max-width: 980px) 420px, 40vw" quality={80} preload delay={0.2} />
          </figure>
        )}
      </div>
    </section>
  );
}
