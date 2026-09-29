import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { PageHead } from "@/components/sections/PageHead";
import { FAQ_GROUPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Booking lead times, deposits, timings on the day, products and skin: the questions GlamBy Elara gets asked most, answered.",
};

export default function FaqPage() {
  return (
    <>
      <main id="top">
        <PageHead
          eyebrow="Good To Know"
          title={
            <>
              Questions, <em>answered.</em>
            </>
          }
          intro="Everything brides, bridesmaids and brands tend to ask before they book. Anything missing? Send it with your booking request and it'll be answered in the reply."
        />
        <section className="faq faq--page section">
          {FAQ_GROUPS.map((g) => (
            <FaqBlock
              key={g.eyebrow}
              className="faq-group"
              eyebrow={g.eyebrow}
              title={
                <>
                  {g.title[0]} <br />
                  <em>{g.title[1]}</em>
                </>
              }
              text={g.text}
              items={g.items}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
