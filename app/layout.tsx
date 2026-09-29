import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { CursorLabel } from "@/components/motion/CursorLabel";
import { PageTransition } from "@/components/motion/PageTransition";
import { Preloader, introScript } from "@/components/motion/Preloader";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Providers } from "@/components/Providers";
import "./globals.css";
import "./motion.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-inter", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "GlamBy Elara — Bridal & Occasion Makeup Artist",
    template: "%s — GlamBy Elara",
  },
  description:
    "GlamBy Elara is a bridal, occasion and editorial makeup artist. Skin-first, long-wear looks that photograph beautifully and last from first look to last dance.",
};

export const viewport: Viewport = {
  themeColor: "#1a1310",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>
        <Script id="intro-flag" strategy="beforeInteractive">
          {introScript}
        </Script>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <Header />
          {children}
          <PageTransition />
          <CursorLabel />
        </Providers>
      </body>
    </html>
  );
}
