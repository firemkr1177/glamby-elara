"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { LogoMark } from "@/components/Icons";
import { useLenis } from "./SmoothScroll";
import { useSetReady } from "./Ready";

/**
 * Cocoa curtain page transition.
 * Catches every same-origin link click (capture phase, so it runs before next/link),
 * sweeps the curtain up, navigates underneath it, then lifts it off the new page.
 * Same-page hash links just smooth-scroll with Lenis.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const setReady = useSetReady();

  const curtainRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);
  const coverTl = useRef<gsap.core.Timeline | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const scrollToHash = useCallback((hash: string, immediate: boolean) => {
    const l = lenisRef.current;
    const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (!el) {
      if (l) l.scrollTo(0, { immediate, force: true });
      else window.scrollTo(0, 0);
      return;
    }
    if (l) l.scrollTo(el, { offset: -70, immediate, force: true, duration: 1.4 });
    else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  }, []);

  const reveal = useCallback(
    (href: string) => {
      clearTimeout(safety.current);
      const curtain = curtainRef.current;
      const mark = markRef.current;
      if (!curtain || !mark) return;
      const hash = new URL(href, window.location.href).hash;
      scrollToHash(hash, true);
      ScrollTrigger.refresh();

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(curtain, { visibility: "hidden", pointerEvents: "none" });
            gsap.set(mark, { opacity: 1, y: 0 });
            busy.current = false;
          },
        })
        .to(mark, { opacity: 0, y: -18, duration: 0.3, ease: "power2.in" })
        .to(curtain, { yPercent: -100, duration: 0.8, ease: "curtain" }, "-=0.08")
        .add(() => {
          setReady(true);
          lenisRef.current?.start();
        }, "-=0.62");
    },
    [scrollToHash, setReady],
  );

  const cover = useCallback(
    (href: string) => {
      const curtain = curtainRef.current;
      const mark = markRef.current;
      if (!curtain || !mark) return router.push(href);
      busy.current = true;
      pending.current = href;
      lenisRef.current?.stop();
      router.prefetch(href);

      const strokes = mark.querySelectorAll("circle, path");
      coverTl.current = gsap
        .timeline()
        .set(curtain, { visibility: "visible", pointerEvents: "auto", yPercent: 100 })
        .set(strokes, { drawSVG: "0%" })
        .set(mark, { opacity: 1, y: 0, rotate: -40 })
        .to(curtain, { yPercent: 0, duration: 0.7, ease: "curtain" })
        .to(strokes, { drawSVG: "100%", duration: 0.75, ease: "power2.inOut", stagger: 0.1 }, "-=0.35")
        .to(mark, { rotate: 0, duration: 0.9, ease: "glam" }, "<")
        .add(() => {
          setReady(false);
          router.push(href, { scroll: false });
        }, 0.7);

      // If navigation never lands (offline, error), don't leave the curtain down.
      safety.current = setTimeout(() => {
        if (pending.current === href) {
          pending.current = null;
          reveal(href);
        }
      }, 6000);
    },
    [router, setReady, reveal],
  );

  // Intercept clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const raw = a.getAttribute("href");
      if (!raw || /^(mailto|tel|sms):/.test(raw)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const samePath = url.pathname === window.location.pathname;
      if (samePath && url.search === window.location.search) {
        e.preventDefault();
        if (raw === "#") return;
        scrollToHash(url.hash, false);
        if (url.hash && url.hash !== window.location.hash) {
          // Keep the URL in sync (and let sections react) without a Next navigation.
          window.history.replaceState(window.history.state, "", url.hash);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
        return;
      }
      // Query-only changes and reduced motion fall through to next/link.
      if (samePath || prefersReducedMotion()) return;
      e.preventDefault();
      if (busy.current) return;
      cover(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [cover, scrollToHash]);

  // New route rendered under the curtain: lift it.
  useEffect(() => {
    const href = pending.current;
    if (!href) return;
    pending.current = null;
    const run = () => requestAnimationFrame(() => reveal(href));
    const tl = coverTl.current;
    if (tl && tl.isActive()) tl.eventCallback("onComplete", run);
    else run();
  }, [pathname, reveal]);

  useEffect(() => () => clearTimeout(safety.current), []);

  return (
    <div className="curtain" ref={curtainRef} aria-hidden="true">
      <LogoMark ref={markRef} className="curtain__mark" />
    </div>
  );
}
