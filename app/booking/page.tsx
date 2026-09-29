import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Booking } from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Book",
  description: "Enquire about bridal, occasion or editorial makeup with GlamBy Elara. One short form — get availability and a quote within one working day.",
};

export default function BookingPage() {
  return (
    <>
      <main id="top">
        <Booking />
      </main>
      <Footer cta={false} />
    </>
  );
}
