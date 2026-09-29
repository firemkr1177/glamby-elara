"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Counter } from "@/components/motion/Counter";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { Roll } from "@/components/motion/Roll";
import { PRICING_NOTES, SERVICE_DETAIL, u } from "@/lib/content";

/** Services page: full service list with prices + pricing notes. */
export function ServiceDetail() {
  const pathname = usePathname();
  const [target, setTarget] = useState<string | null>(null);

  // Arriving via /services#bridal (footer links, home kit list): flash that row once.
  useEffect(() => {
    const flash = () => {
      const id = window.location.hash.slice(1);
      if (!SERVICE_DETAIL.some((s) => s.id === id)) return;
      setTarget(null);
      requestAnimationFrame(() => setTarget(id));
    };
    const t = setTimeout(flash, 900);
    window.addEventListener("hashchange", flash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", flash);
    };
  }, [pathname]);

  return (
    <section className="kit kit--services" id="services">
      <ParallaxImage
        className="kit__bg"
        src={u("1709477542149-f4e0e21d590b", "w=1400&q=60&auto=format&fit=crop")}
        alt=""
        aria-hidden="true"
        width={1400}
        height={933}
        sizes="100vw"
        quality={60}
        speed={5}
      />
      <div className="kit__shade" aria-hidden="true" />
      <div className="container kit__inner">
        <Reveal as="span" className="eyebrow eyebrow--light" x={-16} y={0}>
          Inside The Kit
        </Reveal>
        <ul className="svc-list">
          {SERVICE_DETAIL.map((s) => (
            <Reveal as="li" key={s.id} className={`svc${target === s.id ? " is-target" : ""}`} id={s.id} y={30}>
              <h3 className="svc__name">
                {s.name[0]} <em>{s.name[1]}</em>
              </h3>
              <div className="svc__body">
                <p className="svc__desc">{s.desc}</p>
                <ul className="svc__includes">
                  {s.includes.map((inc, i) => (
                    <Reveal as="li" key={inc} delay={0.3 + i * 0.07} y={8}>
                      {inc}
                    </Reveal>
                  ))}
                </ul>
              </div>
              <p className="svc__meta">{s.meta}</p>
              <div className="svc__price">
                <span>From</span>
                <strong>
                  £<Counter className="svc__num" to={s.price} duration={1.4} delay={0.2} />
                </strong>
                <Link href={`/booking?service=${s.id}`} className="pill pill--light">
                  <Roll>Book</Roll>
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="notes">
          {PRICING_NOTES.map((n, i) => (
            <Reveal key={n.h} delay={i * 0.1}>
              <h3>{n.h}</h3>
              <p>{n.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
