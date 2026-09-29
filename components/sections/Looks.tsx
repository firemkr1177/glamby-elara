"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Filter, Heart, Search } from "@/components/Icons";
import { useShown } from "@/components/motion/Ready";
import { Reveal } from "@/components/motion/Reveal";
import { Roll } from "@/components/motion/Roll";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { EASE } from "@/lib/gsap";
import { LOOK_TABS, LOOKS, type Look, type LookCat } from "@/lib/content";

type Props = {
  title: ReactNode;
  /** Home page: three looks stay tucked away until you filter/search, plus a "See all looks" link. */
  teaser?: boolean;
};

export function Looks({ title, teaser = false }: Props) {
  const [filter, setFilter] = useState<"all" | LookCat>("all");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const tabGroup = useId();

  // Deep link: /services?cat=bridal#looks
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && LOOK_TABS.some((t) => t.value === cat)) setFilter(cat as LookCat);
  }, []);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      LOOKS.filter((l) => {
        const matchesFilter = filter === "all" || l.cat === filter;
        const matchesSearch = !q || `${l.title} ${l.text} ${l.price} ${l.cat}`.toLowerCase().includes(q);
        const tucked = teaser && l.extra && filter === "all" && !q;
        return matchesFilter && matchesSearch && !tucked;
      }),
    [filter, q, teaser],
  );

  // First reveal staggers the grid in; after that, filter changes animate instantly.
  const grid = useRef<HTMLDivElement>(null);
  const inView = useInView(grid, { once: true, margin: "0px 0px -10% 0px" });
  const pageShown = useShown();
  const shown = inView && pageShown;
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setSettled(true), 1600);
    return () => clearTimeout(t);
  }, [shown]);

  const toggleSaved = (id: string) =>
    setSaved((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="looks" id="looks">
      <div className="container">
        <Reveal as="span" className="eyebrow eyebrow--light" x={-16} y={0}>
          Looks We Craft Carefully
        </Reveal>

        <div className="looks__head">
          <SplitReveal className="looks__title">{title}</SplitReveal>
          <Reveal as="p" className="looks__intro" delay={0.2}>
            Every look here earns its place — built around your face, your outfit and the light you&apos;ll be standing in.
          </Reveal>
        </div>

        <Reveal className="looks__toolbar">
          <div className="tabs" role="tablist" aria-label="Filter looks">
            {LOOK_TABS.map((t) => {
              const active = filter === t.value;
              return (
                <button
                  key={t.value}
                  className={`pill pill--tab${active ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(t.value)}
                >
                  {active && <motion.span layoutId={`${tabGroup}-tab`} className="tab__bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  {t.label}
                </button>
              );
            })}
          </div>
          <div className="looks__search">
            <label className="search">
              <Search />
              <input type="search" placeholder="Search here" aria-label="Search looks" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <span className="circle circle--outline circle--light" aria-hidden="true">
              <Filter />
            </span>
          </div>
        </Reveal>

        <div className="looks__grid" ref={grid} style={{ position: "relative" }}>
          <AnimatePresence mode="popLayout">
            {visible.map((look, i) => (
              <LookCard
                key={look.id}
                look={look}
                index={i}
                shown={shown}
                stagger={!settled}
                saved={saved.has(look.id)}
                onSave={() => toggleSaved(look.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {visible.length === 0 && (
            <motion.p
              className="looks__empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              No looks match that search — try “bridal” or “evening”.
            </motion.p>
          )}
        </AnimatePresence>

        {teaser && (
          <Reveal className="looks__more">
            <Link className="pill pill--light pill--lg" href="/services#looks">
              <Roll>See all looks</Roll>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

type CardProps = { look: Look; index: number; shown: boolean; stagger: boolean; saved: boolean; onSave: () => void };

function LookCard({ look, index, shown, stagger, saved, onSave }: CardProps) {
  const delay = stagger ? (index % 3) * 0.12 + Math.floor(index / 3) * 0.1 : 0;
  return (
    <motion.article
      layout
      className="look"
      data-cat={look.cat}
      initial={{ opacity: 0, y: 40 }}
      animate={shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.3, ease: EASE } }}
      transition={{ duration: 0.9, ease: EASE, delay, layout: { duration: 0.6, ease: EASE } }}
    >
      <Link href={`/booking?service=${look.service}`} className="look__media" data-cursor="Book" tabIndex={-1} aria-hidden="true">
        <Image src={look.img} alt={look.alt} width={800} height={800} sizes="(max-width: 980px) 50vw, 33vw" />
      </Link>
      <h3 className="look__title">{look.title}</h3>
      <p className="look__text">{look.text}</p>
      <div className="look__row">
        <span className="look__price">{look.price}</span>
        <div className="look__actions">
          <Link href={`/booking?service=${look.service}`} className="pill pill--light">
            <Roll>Book now</Roll>
          </Link>
          <HeartButton label={look.title} on={saved} onToggle={onSave} />
        </div>
      </div>
    </motion.article>
  );
}

const BURST = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);

function HeartButton({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  const [bursts, setBursts] = useState(0);
  return (
    <motion.button
      className={`circle circle--outline circle--light heart${on ? " is-on" : ""}`}
      aria-label={`Save ${label}`}
      aria-pressed={on}
      whileTap={{ scale: 0.82 }}
      onClick={() => {
        if (!on) setBursts((b) => b + 1);
        onToggle();
      }}
    >
      <motion.span
        key={on ? "on" : "off"}
        style={{ display: "inline-flex" }}
        initial={{ scale: on ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 14 }}
      >
        <Heart />
      </motion.span>
      <AnimatePresence>
        {bursts > 0 && on && (
          <span key={bursts} aria-hidden="true">
            {BURST.map((a, i) => (
              <motion.i
                key={i}
                className="heart__dot"
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: Math.cos(a) * 30, y: Math.sin(a) * 30, scale: 0, opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
              />
            ))}
          </span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
