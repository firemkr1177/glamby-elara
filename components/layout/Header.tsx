"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Glyph, LogoMark } from "@/components/Icons";
import { Roll } from "@/components/motion/Roll";
import { useShown } from "@/components/motion/Ready";
import { useLenis } from "@/components/motion/SmoothScroll";
import { EASE } from "@/lib/gsap";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
];

const MOBILE = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services & Looks" },
  { href: "/faq", label: "FAQ" },
];

const MotionLink = motion.create(Link);

export function Header() {
  const pathname = usePathname();
  const shown = useShown();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const stoppedByMenu = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!lenis) return;
    if (open) {
      lenis.stop();
      stoppedByMenu.current = true;
    } else if (stoppedByMenu.current) {
      stoppedByMenu.current = false;
      lenis.start();
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className={`header${scrolled ? " is-scrolled" : ""}`}
        id="header"
        initial={{ y: -28, opacity: 0 }}
        animate={shown ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
      >
        <div className="header__inner">
          <nav className="header__nav header__nav--left" aria-label="Primary">
            {NAV.map((l) => (
              <Link key={l.href} className={`pill pill--nav${current(l.href) ? " is-current" : ""}`} href={l.href}>
                <Roll>{l.label}</Roll>
              </Link>
            ))}
          </nav>

          <Link href="/" className="logo" aria-label="GlamBy Elara — home">
            <LogoMark className="logo__mark" />
            <span className="logo__text">
              GlamBy <em>Elara</em>
            </span>
          </Link>

          <nav className="header__nav header__nav--right" aria-label="Secondary">
            <Link className={`pill pill--nav${current("/booking") ? " is-current" : ""}`} href="/booking">
              <Roll>Book now</Roll>
            </Link>
            <Link className="pill pill--nav pill--icon" href="/booking" aria-label="Go to booking">
              <ArrowRight />
            </Link>
          </nav>

          <button
            className="burger"
            id="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} id="mobileMenu" aria-hidden={!open}>
        <Glyph className="mobile-menu__glyph" />
        {MOBILE.map((l, i) => (
          <MotionLink
            key={l.href}
            href={l.href}
            className={current(l.href) ? "is-current" : undefined}
            tabIndex={open ? undefined : -1}
            initial={false}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.7, ease: EASE, delay: open ? 0.18 + i * 0.06 : 0 }}
          >
            {l.label}
          </MotionLink>
        ))}
        <MotionLink
          href="/booking"
          className="mobile-menu__cta"
          tabIndex={open ? undefined : -1}
          initial={false}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.7, ease: EASE, delay: open ? 0.18 + MOBILE.length * 0.06 : 0 }}
        >
          Book now
        </MotionLink>
      </div>
    </>
  );
}
