"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { LogoMark } from "@/components/Icons";
import { useLenis } from "./SmoothScroll";
import { useSetReady } from "./Ready";

export const INTRO_KEY = "ge-intro";

/** Runs before first paint: returning visitors (this tab session) skip the intro. */
export const introScript = `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

/**
 * First-visit intro: logo mark draws, "elara" rises in the wordmark gradient,
 * a hairline counts to 100, then the panel lifts off the page.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const setReady = useSetReady();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (gone) lenis.start();
    else lenis.stop();
  }, [lenis, gone]);

  useGSAP(
    () => {
      const skip = document.documentElement.dataset.intro === "skip" || prefersReducedMotion();
      if (skip) {
        setReady(true);
        setGone(true);
        return;
      }
      window.scrollTo(0, 0);
      const q = gsap.utils.selector(root);
      const chars = q(".preloader__word .ch");
      const count = q(".preloader__count")[0];
      const counter = { v: 0 };

      gsap
        .timeline({
          onComplete: () => {
            try {
              sessionStorage.setItem(INTRO_KEY, "1");
            } catch {}
            setGone(true);
          },
        })
        .from(q(".preloader__mark circle, .preloader__mark path"), { drawSVG: "0%", duration: 1.1, ease: "power2.inOut", stagger: 0.18 })
        .from(q(".preloader__mark"), { rotate: -60, scale: 0.8, duration: 1.4, ease: "glam" }, 0)
        .to(chars, { y: 0, yPercent: 0, duration: 1.1, ease: "glam", stagger: 0.07 }, 0.3)
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count) count.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0)
        .to(q(".preloader__fill"), { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(chars, { yPercent: -115, duration: 0.6, ease: "power3.in", stagger: 0.045 }, "+=0.15")
        .to(q(".preloader__mark, .preloader__foot"), { opacity: 0, y: -16, duration: 0.45, ease: "power2.in" }, "<")
        .add(() => setReady(true), "-=0.05")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "curtain" }, "-=0.1");
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__glow" />
      <LogoMark className="preloader__mark" />
      <div className="preloader__word">
        {"elara".split("").map((c, i) => (
          <span className="ch" key={i}>{c}</span>
        ))}
      </div>
      <div className="preloader__foot">
        <em>GlamBy Elara</em>
        <span className="preloader__bar"><span className="preloader__fill" /></span>
        <span className="preloader__count">000</span>
      </div>
    </div>
  );
}
