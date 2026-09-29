import { ClipImage } from "@/components/motion/ClipImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { u } from "@/lib/content";
import { Stats } from "./Stats";

export function AboutTeaser() {
  return (
    <section className="about section" id="about">
      <div className="container about__grid">
        <Reveal as="span" className="eyebrow" x={-16} y={0}>
          About Elara
        </Reveal>

        <div className="about__images">
          <ClipImage
            className="about__img about__img--top"
            src={u("1709477542153-5bedab2b5657", "w=520&h=520&fit=crop&q=75&auto=format")}
            alt="Close-up of lashes being applied"
            width={520}
            height={520}
            sizes="(max-width: 980px) 50vw, 15vw"
            from="top"
          />
          <ClipImage
            className="about__img about__img--bottom"
            src={u("1556262965-917187357da4", "w=640&h=640&fit=crop&q=75&auto=format")}
            alt="Professional brush set in golden light"
            width={640}
            height={640}
            sizes="(max-width: 980px) 50vw, 15vw"
            from="bottom"
            delay={0.15}
          />
        </div>

        <div className="about__content">
          <SplitReveal className="about__title">
            Less Layers. <em>More You.</em>
          </SplitReveal>
          <ScrollText className="about__lead" text="No caking. No 3AM wedding-eve panic. Just skin-first artistry that does what it says." />
          <Reveal as="p" className="about__muted">
            Because your face deserves to be seen, <br />
            not covered.
          </Reveal>

          <Stats
            items={[
              { num: 8, sup: "+", label: "Years behind the brush." },
              { num: 500, sup: "+", label: "Faces glammed." },
              { num: 100, sup: "%", label: "Five-star reviews." },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
