import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Pinterest, TikTok } from "@/components/Icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { Roll } from "@/components/motion/Roll";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { CONTACT, u } from "@/lib/content";
import { FooterWord } from "./FooterWord";

const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "TikTok", Icon: TikTok },
  { label: "Pinterest", Icon: Pinterest },
  { label: "Facebook", Icon: Facebook },
];

const COLS = [
  {
    label: "Services",
    links: [
      { href: "/services#bridal", text: "Bridal Makeup" },
      { href: "/services#party", text: "Bridal Party" },
      { href: "/services#occasion", text: "Occasion Glam" },
      { href: "/services#editorial", text: "Editorial & Shoots" },
      { href: "/services#lesson", text: "Makeup Lessons" },
    ],
  },
  {
    label: "Explore",
    links: [
      { href: "/about", text: "About" },
      { href: "/services#looks", text: "Looks" },
      { href: "/#testimonials", text: "Testimonials" },
      { href: "/faq", text: "FAQ" },
    ],
  },
  {
    label: "Company",
    links: [
      { href: "/booking", text: "Book now" },
      { href: `mailto:${CONTACT.email}`, text: CONTACT.email },
      { href: `tel:${CONTACT.tel}`, text: CONTACT.phone },
    ],
  },
];

export function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer className={`footer${cta ? "" : " footer--plain"}`}>
      <ParallaxImage
        className="footer__bg"
        src={u("1730320870329-616a2fe8a8e8", "w=1400&q=60&auto=format&fit=crop")}
        alt=""
        aria-hidden="true"
        width={1400}
        height={933}
        sizes="100vw"
        quality={60}
        speed={10}
        mode="settle"
      />
      <div className="footer__shade" aria-hidden="true" />

      {cta && (
        <div className="container cta">
          <Reveal as="span" className="eyebrow eyebrow--light eyebrow--center" y={10}>
            Your Day Deserves Better
          </Reveal>
          <SplitReveal className="cta__title">
            Book a look that lasts&nbsp;— simple, <br />
            personal, and <em>made for real faces.</em>
          </SplitReveal>
          <Reveal delay={0.25}>
            <Magnetic strength={0.25}>
              <Link href="/booking" className="btn-arrow">
                <span className="pill pill--light pill--lg">
                  <Roll>Book now</Roll>
                </span>
                <span className="circle circle--outline circle--light">
                  <ArrowUpRight />
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      )}

      <div className="container footer__grid">
        <Reveal className="footer__col footer__col--brand">
          <span className="footer__label">Studio</span>
          <p>
            {CONTACT.address[0]}
            <br />
            {CONTACT.address[1]}
          </p>
          <div className="socials">
            {SOCIALS.map(({ label, Icon }) => (
              <Magnetic key={label} strength={0.4}>
                <a className="circle circle--outline circle--light" href="#" aria-label={label}>
                  <Icon />
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>

        {COLS.map((col, i) => (
          <Reveal key={col.label} className="footer__col" delay={0.08 * (i + 1)}>
            <span className="footer__label">{col.label}</span>
            {col.links.map((l) =>
              l.href.startsWith("/") ? (
                <Link key={l.href} href={l.href}>
                  {l.text}
                </Link>
              ) : (
                <a key={l.href} href={l.href}>
                  {l.text}
                </a>
              ),
            )}
          </Reveal>
        ))}
      </div>

      <FooterWord />

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>© 2026 GlamBy Elara. All rights reserved.</span>
          <span className="footer__bar-mid">Made for real faces, everywhere.</span>
          <span className="footer__bar-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
