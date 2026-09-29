import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { Benefits } from "@/components/sections/Benefits";
import { PageHead } from "@/components/sections/PageHead";
import { Process } from "@/components/sections/Process";
import { Statement } from "@/components/sections/Statement";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { u } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Elara: eight years, 500+ faces, skin-first bridal and occasion makeup based in Nottingham and working across the UK.",
};

export default function AboutPage() {
  return (
    <>
      <main id="top">
        <PageHead
          eyebrow="About Elara"
          title={
            <>
              Makeup that looks like <em>you</em>&nbsp;— <br />
              on your best day.
            </>
          }
          intro="Eight years, five hundred faces and one rule: the person in the photos should still be you. Elara is a bridal, occasion and editorial makeup artist based in Nottingham, working on location across the UK."
          figure={{ src: u("1636023730877-233b9237d4ec", "w=1000&q=80&auto=format&fit=crop"), alt: "Elara working on a client in the studio" }}
        />

        <section className="story section">
          <div className="container story__grid">
            <Reveal as="span" className="eyebrow" x={-16} y={0}>
              The Story
            </Reveal>
            <div className="story__content">
              <ScrollText
                className="story__lead"
                text="It started with a bridesmaid who cried because she didn't recognise herself. Elara decided that would never happen on her watch again."
              />
              <div className="story__cols">
                <Reveal as="p">
                  Trained in London and honed on wedding mornings from the Cotswolds to the Lake District, Elara built her approach around one thing
                  photographers and brides both ask for: skin that looks like skin. Prep comes first, product comes second, and nothing goes on the face that
                  won&apos;t survive a sixteen-hour day, happy tears included.
                </Reveal>
                <Reveal as="p" delay={0.12}>
                  Today the diary is a mix of bridal parties, editorial shoots and one-to-one lessons. The kit is professional and photo-safe, tested on every
                  skin tone and type, and the schedule for the morning is sent a week ahead so nobody is rushing. Calm is part of the service.
                </Reveal>
              </div>
              <Stats
                items={[
                  { num: 8, sup: "+", label: "Years behind the brush." },
                  { num: 500, sup: "+", label: "Faces glammed." },
                  { num: 120, sup: "+", label: "Weddings, UK-wide." },
                ]}
              />
            </div>
          </div>
        </section>

        <Statement
          img={u("1556262965-917187357da4", "w=1200&q=80&auto=format&fit=crop")}
          alt="Professional brush set in golden light"
          tag="The Kit"
          lead="What's Actually In The Bag"
          lines={["Pro-grade, photo-safe formulas.", "Shades for every skin tone.", "Sanitised between every face.", "Nothing you'd be embarrassed to ask about."]}
          thumbs={[
            u("1522335789203-aabd1fc54bc9", "w=200&h=200&fit=crop&q=70&auto=format"),
            u("1516975080664-ed2fc6a32937", "w=200&h=200&fit=crop&q=70&auto=format"),
            u("1609127688872-ceab312c9af8", "w=200&h=200&fit=crop&q=70&auto=format"),
          ]}
          title={
            <>
              Skin First.
              <br />
              Product
              <br />
              <em>Second.</em>
            </>
          }
          note={["Every face gets twenty minutes of prep before a single drop of base.", "That's why it lasts. That's why it photographs.", "That's why you still look like you."]}
        />

        <Process />
        <Benefits eyebrow="What Elara Stands For" />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
