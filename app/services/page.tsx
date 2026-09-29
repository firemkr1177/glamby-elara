import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { Looks } from "@/components/sections/Looks";
import { PageHead } from "@/components/sections/PageHead";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { PRICING_FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Bridal makeup, bridal party, occasion glam, editorial shoots and lessons. Clear from-prices, travel included within 20 miles, trial included with bridal.",
};

export default function ServicesPage() {
  return (
    <>
      <main id="top">
        <PageHead
          eyebrow="Services & Pricing"
          title={
            <>
              Five services. <em>One standard.</em>
            </>
          }
          intro="Everything is priced from, quoted clearly before you commit, and built around real faces in real light. Travel is included within 20 miles of the studio; further afield is quoted per booking."
          steps={["Choose a service", "Pick your date", "Confirmed within a working day"]}
        />
        <ServiceDetail />
        <Looks
          title={
            <>
              Every Look We Craft, <br />
              Filtered by <em>Occasion</em>
            </>
          }
        />
        <section className="faq section">
          <FaqBlock
            eyebrow="Pricing Questions"
            title={
              <>
                Before You <br />
                <em>Book.</em>
              </>
            }
            text={
              <>
                Three questions almost everyone asks. The rest live on the <Link href="/faq">FAQ page</Link>.
              </>
            }
            items={PRICING_FAQ}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
