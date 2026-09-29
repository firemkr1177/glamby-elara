"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ClipImage } from "@/components/motion/ClipImage";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { SlideLines } from "@/components/motion/SlideLines";
import { KIT_SERVICES, u } from "@/lib/content";

const DEFAULT = "occasion";

export function Kit() {
  const [active, setActive] = useState(DEFAULT);

  return (
    <section className="kit" id="services">
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

        <div className="kit__hero">
          <SlideLines
            className="kit__title"
            lineClass="kit__line"
            lines={[
              { text: "We blend artistry and technique —" },
              { text: "to create makeup that lasts.", className: "kit__line--right", from: "right" },
              { text: "No heavy layers, just looks that celebrate your real features.", className: "kit__line--justify" },
            ]}
          />
          <figure className="kit__figure">
            <ClipImage
              src={u("1657563920440-0ac6d8932f20", "w=1200&q=80&auto=format&fit=crop")}
              alt="Makeup artist working on a client's look"
              width={1200}
              height={1224}
              sizes="(max-width: 980px) 100vw, 45vw"
              quality={80}
              from="right"
            />
          </figure>
        </div>

        <ul className="service-list" onPointerLeave={() => setActive(DEFAULT)}>
          {KIT_SERVICES.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.07} y={16}>
              <Link
                href={`/services#${s.id}`}
                className="service-list__row"
                data-cursor="View"
                onPointerEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(DEFAULT)}
              >
                {active === s.id && (
                  <motion.span layoutId="kit-highlight" className="service-list__hl" transition={{ type: "spring", stiffness: 420, damping: 38 }} />
                )}
                <span className="service-list__name">
                  {s.name[0]} <em>{s.name[1]}</em>
                </span>
                <span className="service-list__note">{s.note}</span>
                <span className="service-list__detail">{s.detail}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
