import { Footer } from "@/components/layout/Footer";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Benefits } from "@/components/sections/Benefits";
import { Hero } from "@/components/sections/Hero";
import { Kit } from "@/components/sections/Kit";
import { Looks } from "@/components/sections/Looks";
import { Statement } from "@/components/sections/Statement";
import { Testimonials } from "@/components/sections/Testimonials";
import { u } from "@/lib/content";

export default function Home() {
  return (
    <>
      <main id="top">
        <Hero />
        <Statement
          img={u("1704621354138-e124277356f2", "w=1200&q=80&auto=format&fit=crop")}
          alt="Makeup brushes dusted with powder against a dark background"
          tag="The Artist"
          lead="Let's Be Real About Your Makeup"
          lines={["You tried the twelve-step base.", "You bought the viral palette.", "You followed the tutorial.", "And still — it slid off by nine."]}
          thumbs={[
            u("1709477542149-f4e0e21d590b", "w=200&h=200&fit=crop&q=70&auto=format"),
            u("1709477542153-5bedab2b5657", "w=200&h=200&fit=crop&q=70&auto=format"),
            u("1556262965-917187357da4", "w=200&h=200&fit=crop&q=70&auto=format"),
          ]}
          title={
            <>
              Makeup That
              <br />
              Doesn&apos;t —<br />
              <em>Mask</em> You
            </>
          }
          note={[
            "We're not here to hide you.",
            "We're here to make sure the best version of your face",
            "shows up in every photo — honestly, unmistakably you.",
          ]}
        />
        <AboutTeaser />
        <Kit />
        <Benefits />
        <Looks
          teaser
          title={
            <>
              Find the Look Your <br />
              Occasion Actually Needs to <br />
              <em>Feel Right</em>
            </>
          }
        />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
