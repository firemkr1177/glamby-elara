"use client";

import Link from "next/link";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { Children, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight } from "@/components/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { Roll } from "@/components/motion/Roll";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { useShown } from "@/components/motion/Ready";
import { useLenis } from "@/components/motion/SmoothScroll";
import { EASE, gsap, prefersReducedMotion } from "@/lib/gsap";
import { BOOKING_OPTIONS, BOOKING_SERVICES, CONTACT } from "@/lib/content";

/* Demo mode unless NEXT_PUBLIC_BOOKING_ENDPOINT is set (e.g. a Formspree URL).
   The endpoint receives JSON: service, serviceName, date, name, email, phone, message, from. */
const ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
const fmtDate = (value: string) => {
  const d = new Date(`${value}T12:00:00`);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Result = { first: string; ref: string; rows: [string, string][] };

export function Booking() {
  const [service, setService] = useState("");
  const [minDate, setMinDate] = useState("");
  const [invalid, setInvalid] = useState<Set<string>>(() => new Set());
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [scope, animate] = useAnimate<HTMLFormElement>();
  const section = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const shown = useShown();

  useEffect(() => {
    setMinDate(iso(new Date()));
    // Pre-select from ?service=bridal (looks grid, services page, hero card)
    const pre = new URLSearchParams(window.location.search).get("service");
    if (pre && BOOKING_SERVICES[pre]) setService(pre);
  }, []);

  const svc = BOOKING_SERVICES[service];
  const hint = svc?.from ? `From ${gbp(svc.from)} · ${svc.note}. Final quote confirmed by email.` : "";

  const scrollTo = (el: Element | null, offset = -100) => {
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset, duration: 1.1 });
    else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };

  const clearInvalid = (name: string) =>
    setInvalid((s) => {
      if (!s.has(name)) return s;
      const next = new Set(s);
      next.delete(name);
      return next;
    });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const s = {
      service: String(data.get("service") || ""),
      date: String(data.get("date") || ""),
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
    const checks: [string, boolean, string][] = [
      ["service", Boolean(BOOKING_SERVICES[s.service]), "Choose a service."],
      ["date", Boolean(s.date) && s.date >= minDate, "Pick a date — today or later."],
      ["name", s.name.length > 1, "Add your name."],
      ["email", emailOk(s.email), "Add a valid email address."],
    ];
    const failed = checks.filter(([, ok]) => !ok);
    setInvalid(new Set(failed.map(([n]) => n)));

    if (failed.length) {
      setError(failed.map(([, , msg]) => msg).join(" "));
      if (!prefersReducedMotion()) {
        failed.forEach(([n]) => animate(`[data-field="${n}"]`, { x: [0, -9, 8, -6, 4, -2, 0] }, { duration: 0.5, ease: "easeOut" }));
      }
      const first = e.currentTarget.elements.namedItem(failed[0][0]) as HTMLElement | null;
      scrollTo(first?.closest(".field") ?? null, -window.innerHeight / 3);
      first?.focus({ preventScroll: true });
      return;
    }
    setError("");
    setSending(true);

    const chosen = BOOKING_SERVICES[s.service];
    const payload = { ...s, serviceName: chosen.name, from: chosen.from ?? null };
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 900)); // demo delay
        console.info("[GlamBy Elara] Enquiry (demo mode):", payload);
      }
      const now = new Date();
      const ref = `GE-${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const rows: [string, string][] = [
        ["Service", chosen.name],
        ["Date", fmtDate(s.date)],
        ["Reply to", s.email],
      ];
      if (chosen.from) rows.push(["Starts from", gbp(chosen.from)]);
      setResult({ first: s.name.split(" ")[0] || "there", ref, rows });
      requestAnimationFrame(() => scrollTo(section.current, 0));
    } catch {
      setError(`Something went wrong sending that. Please try again or email ${CONTACT.email}.`);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setResult(null);
    setService("");
    setInvalid(new Set());
    setError("");
    requestAnimationFrame(() => scrollTo(section.current, 0));
  };

  return (
    <section className="page-head booking" id="book" ref={section}>
      <AnimatePresence mode="wait" initial={false}>
        {!result ? (
          <motion.div
            key="form"
            className="container booking__grid"
            id="bookingLayout"
            exit={{ opacity: 0, y: -30, transition: { duration: 0.45, ease: EASE } }}
          >
            <div className="booking__text">
              <Reveal as="span" className="eyebrow eyebrow--light" x={-16} y={0} delay={0.1}>
                Book Your Glam
              </Reveal>
              <SplitReveal as="h1" className="page-head__title booking__title" start={false} delay={0.15} stagger={0.12}>
                Pick a time&nbsp;— <br />
                I&apos;ll <em>handle the rest.</em>
              </SplitReveal>
              <Reveal as="p" className="page-head__intro" delay={0.45}>
                One short form, under a minute. You&apos;ll get availability, a quote and next steps within one working day. Nothing is charged online and
                no deposit is taken until we&apos;ve spoken.
              </Reveal>
            </div>

            <motion.form
              ref={scope}
              className="form form--light booking__form"
              id="bookingForm"
              noValidate
              onSubmit={onSubmit}
              onInput={(e) => {
                const name = (e.target as HTMLInputElement).name;
                if (name) clearInvalid(name);
              }}
              initial={{ opacity: 0, y: 60, rotate: 1.5 }}
              animate={shown ? { opacity: 1, y: 0, rotate: 0 } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
            >
              <div className="booking__form-head">
                <span className="eyebrow">Quick enquiry</span>
                <h2 className="booking__form-title">Just the essentials</h2>
                <p className="booking__form-intro">
                  Tell us what you&apos;re after and when. Everything else like venue, timings and how many faces, we&apos;ll sort out together.
                </p>
              </div>

              <div className="form__row">
                <Field name="service" label="Service" invalid={invalid} shown={shown} index={0}>
                  <select name="service" id="serviceSelect" required value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {BOOKING_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence initial={false} mode="wait">
                    {hint && (
                      <motion.small
                        key={hint}
                        className="field__hint"
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {hint}
                      </motion.small>
                    )}
                  </AnimatePresence>
                </Field>
                <Field name="date" label="Event date" invalid={invalid} shown={shown} index={1}>
                  <input type="date" name="date" id="dateInput" required min={minDate || undefined} />
                </Field>
              </div>

              <div className="form__row">
                <Field name="name" label="Full name" invalid={invalid} shown={shown} index={2}>
                  <input type="text" name="name" autoComplete="name" required placeholder="Your name" />
                </Field>
                <Field name="email" label="Email" invalid={invalid} shown={shown} index={3}>
                  <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
                </Field>
              </div>

              <Field name="phone" label="Phone / WhatsApp" optional invalid={invalid} shown={shown} index={4}>
                <input type="tel" name="phone" autoComplete="tel" placeholder="07000 000 000" />
              </Field>

              <Field name="message" label="Anything we should know?" optional invalid={invalid} shown={shown} index={5}>
                <textarea name="message" rows={3} placeholder="Venue, number of people, the look you're after…" />
              </Field>

              <div className="form__foot">
                <p className="form__hint">Reply within one working day. No spam, no newsletters.</p>
                <motion.button type="submit" className="btn-arrow" disabled={sending} whileTap={{ scale: 0.97 }}>
                  <span className="pill pill--lg">
                    {sending ? (
                      <span>
                        Sending
                        <span className="dots" aria-hidden="true">
                          <i>.</i>
                          <i>.</i>
                          <i>.</i>
                        </span>
                      </span>
                    ) : (
                      <Roll>Send enquiry</Roll>
                    )}
                  </span>
                  <span className="circle circle--outline">
                    <motion.span
                      style={{ display: "inline-flex" }}
                      animate={sending ? { rotate: 360 } : { rotate: 0 }}
                      transition={sending ? { duration: 1, ease: "linear", repeat: Infinity } : { duration: 0.3 }}
                    >
                      <ArrowUpRight />
                    </motion.span>
                  </span>
                </motion.button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="form__error"
                    id="formError"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>

            <div className="booking__more">
              <ol className="booking__steps">
                {[
                  ["Send your enquiry", "Under a minute. Nothing is charged online."],
                  ["Quote within a day", "Elara replies personally with availability and a price — studio or on location."],
                  ["Your date is secured", "A £50 deposit holds a wedding date, only once we've spoken. Occasions are simply confirmed."],
                ].map(([h, p], i) => (
                  <Reveal as="li" key={h} delay={0.5 + i * 0.1} y={16}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{h}</strong>
                      <p>{p}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
              <Reveal className="booking__talk" delay={0.2}>
                <p className="booking__talk-title">Prefer to talk?</p>
                <ul className="booking__talk-links">
                  <li>
                    <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </li>
                  <li>
                    <a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a> <small>WhatsApp</small>
                  </li>
                </ul>
                <p className="booking__talk-meta">Studio 4, Maple Street, Nottingham · On location UK-wide</p>
              </Reveal>
            </div>
          </motion.div>
        ) : (
          <Success key="success" result={result} onAgain={reset} />
        )}
      </AnimatePresence>
    </section>
  );
}

type FieldProps = { name: string; label: string; optional?: boolean; invalid: Set<string>; shown: boolean; index: number; children: ReactNode };

function Field({ name, label, optional, invalid, shown, index, children }: FieldProps) {
  // The first child is the control; anything after it (the service hint) sits below the focus line.
  const [control, ...rest] = Children.toArray(children);
  return (
    <motion.label
      className={`field${invalid.has(name) ? " is-invalid" : ""}`}
      data-field={name}
      initial={{ opacity: 0, y: 18 }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE, delay: 0.6 + index * 0.06 }}
    >
      <span>
        {label} {optional && <small>(optional)</small>}
      </span>
      <span className="field__control">
        {control}
        <span className="field__bar" aria-hidden="true" />
      </span>
      {rest}
    </motion.label>
  );
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Success({ result, onAgain }: { result: Result; onAgain: () => void }) {
  const refEl = useRef<HTMLElement>(null);

  // Reference number decodes itself (GSAP ScrambleText).
  useEffect(() => {
    const el = refEl.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = result.ref;
      return;
    }
    const tween = gsap.to(el, {
      duration: 1.6,
      delay: 0.7,
      scrambleText: { text: result.ref, chars: "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789", speed: 0.5, revealDelay: 0.3 },
    });
    return () => {
      tween.kill();
    };
  }, [result.ref]);

  return (
    <motion.div
      className="container booking-success"
      id="bookingSuccess"
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.div
        className="booking-success__card"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
      >
        <motion.span className="form__success-mark" aria-hidden="true" variants={{ hidden: { scale: 0.5, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 18 } } }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <motion.path
              d="m5 11.5 4 4 8-9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            />
          </svg>
        </motion.span>
        <motion.span className="eyebrow" variants={item}>
          Enquiry received
        </motion.span>
        <motion.h2 className="booking-success__title" variants={item}>
          Thank you, <em id="successName">{result.first}</em>.
        </motion.h2>
        <motion.p className="booking-success__ref" variants={item}>
          Reference{" "}
          <strong id="successRef" ref={refEl}>
            GE-0000-0000
          </strong>
        </motion.p>
        <motion.dl className="summary__list" id="successList" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          {result.rows.map(([k, v]) => (
            <motion.div key={k} variants={item}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </motion.div>
          ))}
        </motion.dl>
        <motion.div className="booking-success__next" variants={item}>
          <h3>What happens next</h3>
          <ol>
            <li>
              <span>01</span>Elara checks the date and replies within one working day with a quote.
            </li>
            <li>
              <span>02</span>Happy? A £50 deposit secures a wedding date; occasion bookings are simply confirmed.
            </li>
            <li>
              <span>03</span>Trial booked, schedule sent the week before, and the morning takes care of itself.
            </li>
          </ol>
        </motion.div>
        <motion.div className="booking-success__actions" variants={item}>
          <Link href="/" className="pill">
            <Roll>Back to home</Roll>
          </Link>
          <button type="button" className="pill" id="bookAgain" onClick={onAgain}>
            <Roll>Send another enquiry</Roll>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
