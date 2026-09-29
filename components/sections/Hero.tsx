"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRightSmall } from "@/components/Icons";
import { Counter } from "@/components/motion/Counter";
import { useShown } from "@/components/motion/Ready";
import { EASE, gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { HERO_REVIEWS, u } from "@/lib/content";

const FACES = ["1759268130715-ea0bae615ae7", "1778109303745-8a5d68af26b4", "1536567307162-551e460b7fc2"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const shown = useShown();

  /* Entrance (GSAP timeline, waits for the intro / curtain) + scroll-out parallax */
  useGSAP(
    () => {
      if (!shown || !root.current) return;
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-hero-in]"), { visibility: "visible" });
      if (prefersReducedMotion()) return;

      gsap
        .timeline({ defaults: { ease: "glam" } })
        .from(q(".hero__word .ch"), { yPercent: 70, opacity: 0, filter: "blur(14px)", duration: 1.6, stagger: 0.09, clearProps: "filter" }, 0)
        .from(q(".hero__img"), { clipPath: "inset(100% 0% 0% 0%)", scale: 1.25, duration: 1.7, ease: "curtain" }, 0.15)
        .from(q(".hero__card-in"), { x: 60, y: 30, rotate: 4, transformOrigin: "70% 45%", opacity: 0, duration: 1.3 }, 0.9)
        .from(q(".hero__left > *"), { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.8)
        .from(q(".hero__faces img, .hero__faces span"), { scale: 0.4, opacity: 0, duration: 0.8, stagger: 0.07, ease: "back.out(2)" }, 1)
        .from(q(".hero__right > *"), { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 1)
        .from(q(".hero__quote-avatar"), { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1 }, 1.05)
        .from(q(".hero__explore-inner > *"), { y: 20, opacity: 0, duration: 1, stagger: 0.1 }, 1.2);

      // Scroll-out (desktop only; on phones the side copy sits in the reading flow):
      // the wordmark lags, the portrait rises, side copy fades.
      gsap.matchMedia().add("(min-width: 981px)", () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".hero__word-inner"), { yPercent: 28, ease: "none", scrollTrigger: st });
        gsap.to(q(".hero__img-shift"), { yPercent: -8, ease: "none", scrollTrigger: st });
        gsap.to(q(".hero__left, .hero__right, .hero__explore-inner"), { opacity: 0, y: -40, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
      });
    },
    { dependencies: [shown], scope: root },
  );

  /* Soft light that follows the pointer (Motion springs) */
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section className="hero" ref={root} onPointerMove={onPointerMove}>
      <div className="hero__glow" aria-hidden="true" />
      <motion.div className="hero__spot" style={{ x: sx, y: sy }} aria-hidden="true" />

      <div className="hero__word" aria-hidden="true" data-hero-in="">
        <span className="hero__word-inner">
          {"elara".split("").map((c, i) => (
            <span className="ch" key={i}>{c}</span>
          ))}
        </span>
      </div>

      <figure className="hero__figure">
        <div className="hero__img-shift" style={{ position: "absolute", inset: 0 }} data-hero-in="">
          <Image
            className="hero__img"
            src={u("1653640869615-e9878a2c8344", "w=1100&q=80&auto=format&fit=crop")}
            alt="Bride with soft glam makeup, hand resting on her cheek"
            width={1100}
            height={1650}
            sizes="(max-width: 980px) 84vw, 42vw"
            quality={80}
            preload
          />
        </div>
        <HeroCard />
      </figure>

      <div className="hero__left" data-hero-in="">
        <div className="hero__stat">
          <span className="hero__stat-num">
            <Counter to={100} duration={2.2} delay={0.9} />
            <sup>%</sup>
          </span>
          <span className="hero__stat-label">Five-star rated.</span>
        </div>
        <div className="hero__faces">
          {FACES.map((id) => (
            <Image key={id} src={u(id, "w=96&h=96&fit=crop&q=70&auto=format")} alt="" width={96} height={96} sizes="38px" quality={70} />
          ))}
          <span>500+</span>
        </div>
        <p className="hero__copy">Built for real faces — bridal, occasion and editorial. Skin-first prep. Long-wear finish. No touch-ups needed.</p>
      </div>

      <a href="#about" className="hero__explore">
        <span className="hero__explore-inner" data-hero-in="">
          <span>
            Explore <em>The Artistry</em>
          </span>
          <ArrowDown />
        </span>
      </a>

      <HeroReviews />
    </section>
  );
}

/* Product-style card overlapping the portrait: floats gently, lifts on hover */
// Three layers so GSAP (entrance) and Motion (float, hover) never fight over one transform.
function HeroCard() {
  return (
    <div className="hero__card-in" data-hero-in="" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
    <motion.div
      className="hero__card-float"
      style={{ position: "absolute", inset: 0 }}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    >
      <MotionLink
        href="/booking?service=trial"
        className="hero__card"
        data-cursor="Book"
        style={{ pointerEvents: "auto" }}
        whileHover={{ y: -6, rotate: -1.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span className="hero__card-window" aria-hidden="true" />
        <span className="hero__card-body">
          <span className="hero__card-title">
            Bridal Trial
            <br />
            Signature Look
          </span>
          <span className="hero__card-row">
            <span className="hero__card-price">From £60</span>
            <span className="hero__card-cta">
              <span className="pill pill--tiny">Book now</span>
              <span className="circle circle--tiny">
                <ArrowUpRightSmall />
              </span>
            </span>
          </span>
        </span>
      </MotionLink>
    </motion.div>
    </div>
  );
}

const MotionLink = motion.create(Link);

/* Mini reviews with arrows: slides in the direction you pressed */
function HeroReviews() {
  const [[idx, dir], setState] = useState<[number, number]>([0, 1]);
  const r = HERO_REVIEWS[idx];
  const go = (d: number) => setState(([i]) => [(i + d + HERO_REVIEWS.length) % HERO_REVIEWS.length, d]);

  // Drift to the next review every 7s until someone takes over.
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setState(([i]) => [(i + 1) % HERO_REVIEWS.length, 1]), 7000);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <div className="hero__right" data-hero-in="">
      <div className="hero__quote-top">
        <Image
          className="hero__quote-avatar"
          src={u("1759268130715-ea0bae615ae7", "w=220&h=200&fit=crop&q=70&auto=format")}
          alt=""
          width={220}
          height={200}
          sizes="104px"
          quality={70}
        />
        <div className="hero__quote-arrows" id="heroArrows">
          <button
            aria-label="Previous review"
            onClick={() => {
              setAuto(false);
              go(-1);
            }}
          >
            ←
          </button>
          <button
            aria-label="Next review"
            onClick={() => {
              setAuto(false);
              go(1);
            }}
          >
            →
          </button>
        </div>
      </div>
      <div className="hero__quote-body" aria-live={auto ? "off" : "polite"}>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: 24 * d, filter: "blur(4px)" }),
              center: { opacity: 1, x: 0, filter: "blur(0px)" },
              exit: (d: number) => ({ opacity: 0, x: -24 * d, filter: "blur(4px)" }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="hero__quote" id="heroQuote">{r.q}</p>
            <p className="hero__quote-meta">
              <em id="heroName">{r.n}</em>
              <span className="dash">—</span>
              <span id="heroRole">{r.r}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
