"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { EASE } from "@/lib/gsap";
import { REVIEWS } from "@/lib/content";

const MotionImage = motion.create(Image);

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const group = useId();
  const r = REVIEWS[idx];
  const show = (i: number) => setIdx(i);

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container testimonials__grid">
        <div className="testimonials__side">
          <Reveal as="span" className="eyebrow" x={-16} y={0}>
            Testimonials
          </Reveal>
          <ol className="testimonials__counter" aria-hidden="true">
            {REVIEWS.map((_, i) => (
              <li key={i} className={i === idx ? "is-active" : undefined}>
                {i === idx && <motion.span layoutId={`${group}-tick`} className="testimonials__tick" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                {String(i + 1).padStart(2, "0")}
              </li>
            ))}
          </ol>
          <Avatar i={0} active={idx === 0} onClick={() => show(0)} side />
        </div>

        <Reveal as="figure" className="testimonials__figure" y={40}>
          <button
            type="button"
            onClick={() => show((idx + 1) % REVIEWS.length)}
            aria-label="Next review"
            data-cursor="Next"
            style={{ position: "absolute", inset: 0, zIndex: 3, background: "none", border: 0, padding: 0, cursor: "pointer" }}
          />
          <AnimatePresence initial={false}>
            <MotionImage
              key={idx}
              src={r.img}
              alt={r.alt}
              width={1000}
              height={1080}
              sizes="(max-width: 980px) 100vw, 44vw"
              quality={80}
              initial={{ clipPath: "inset(0% 0% 0% 100%)", scale: 1.12, zIndex: 2 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, zIndex: 2 }}
              exit={{ scale: 1.04, zIndex: 1, transition: { duration: 1 } }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            />
          </AnimatePresence>
        </Reveal>

        <div className="testimonials__content">
          <motion.span
            key={`mark-${idx}`}
            className="testimonials__mark"
            aria-hidden="true"
            initial={{ opacity: 0, rotate: -25, y: 10 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            ”
          </motion.span>

          <Reveal className="stack" y={30}>
            <AnimatePresence initial={false}>
              <motion.blockquote
                key={idx}
                className="testimonials__quote"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.022, delayChildren: 0.25 } },
                  exit: { opacity: 0, y: -14, transition: { duration: 0.3, ease: EASE } },
                }}
              >
                {r.q.split(" ").map((w, i) => (
                  <motion.span
                    key={i}
                    style={{ display: "inline-block" }}
                    variants={{
                      hidden: { opacity: 0, y: "45%", filter: "blur(6px)" },
                      show: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
                    }}
                  >
                    {w}&nbsp;
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </Reveal>

          <Reveal className="stack" y={20} delay={0.1}>
            <AnimatePresence initial={false}>
              <motion.p
                key={idx}
                className="testimonials__author"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.5, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
              >
                <em>{r.n}</em>
                <span className="dash">—</span>
                <span>{r.r}</span>
              </motion.p>
            </AnimatePresence>
          </Reveal>

          <Reveal className="testimonials__avatars" delay={0.15}>
            {[1, 2, 3, 4].map((i) => (
              <Avatar key={i} i={i} active={idx === i} onClick={() => show(i)} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Avatar({ i, active, onClick, side }: { i: number; active: boolean; onClick: () => void; side?: boolean }) {
  return (
    <motion.button
      className={`avatar${side ? " avatar--side" : ""}${active ? " is-active" : ""}`}
      aria-label={`Show review ${i + 1}`}
      aria-pressed={active}
      onClick={onClick}
      data-cursor={active ? undefined : "Read"}
      whileTap={{ scale: 0.94 }}
    >
      <Image src={REVIEWS[i].thumb} alt="" width={300} height={300} sizes={side ? "130px" : "140px"} quality={70} />
    </motion.button>
  );
}
