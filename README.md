# GlamBy Elara — Next.js

A one-to-one rebuild of the static GlamBy Elara demo site (bridal, occasion and editorial makeup artist) as a
Next.js 16 App Router app, with a motion layer on top. Same markup structure, same stylesheet, same copy, same
photos. Every page is prerendered as static HTML.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes static)
npm run typecheck
```

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero, statement, about teaser, "inside the kit" list, benefits, looks (filter/search, 3 tucked away), testimonials, CTA |
| `/about` | Page head, story + stats, kit statement, 3-step process, values, testimonials |
| `/services` | Service detail with prices, pricing notes, all 9 looks (`?cat=bridal` deep-links), pricing FAQ |
| `/faq` | 12 questions in three groups |
| `/booking` | Quick enquiry form (`?service=bridal` pre-selects), validation, confirmation with reference number |

The old `*.html` URLs redirect permanently to the new routes (`next.config.ts`).

## Motion stack

| Library | Used for |
| --- | --- |
| **Lenis** | Smooth scrolling on desktop, driven by GSAP's ticker (touch devices keep native scroll) |
| **GSAP** + ScrollTrigger, SplitText, DrawSVG, ScrambleText, CustomEase | Hero entrance timeline and scroll-out, masked headline line reveals, zig-zag title slides, scroll-lit paragraph, image unmasking, parallax, line-icon drawing, footer wordmark, page-transition curtain, first-visit intro, booking reference decode, magnetic buttons |
| **Motion** (`motion/react`, formerly Framer Motion, and Motion's vanilla `animate`) | Fade/lift reveals, number counters, looks filter layout animation, sliding tab + service highlights (`layoutId`), testimonial image wipe and word-by-word quote, hero review carousel, accordion height, form states, heart burst, cursor label, scroll progress |

Framer Motion was renamed Motion (motion.dev); the `motion` package is both, so it is installed once.

Everything respects `prefers-reduced-motion`: the intro and curtain are skipped, smooth wheel is off, GSAP
effects don't run and Motion drops transform animations.

### How it hangs together

- `components/motion/Ready.tsx` — "the page is uncovered" flag. Entrance animations wait for it, so nothing
  plays hidden behind the intro or the curtain.
- `components/motion/Preloader.tsx` — first visit per browser tab only (sessionStorage), skipped before first
  paint by a tiny inline script.
- `components/motion/PageTransition.tsx` — catches same-origin link clicks, sweeps the curtain up, navigates
  underneath, lifts it. Same-page `#hash` links smooth-scroll instead.
- `components/motion/CursorLabel.tsx` — anything with `data-cursor="Label"` gets a following label bubble.
- `app/globals.css` is the original stylesheet (1:1). `app/motion.css` only adds what the animations need.

## Content

All copy, prices, looks, reviews, FAQs and photo URLs live in `lib/content.ts`.
Photos are hot-linked from Unsplash (free licence) through a small custom `next/image` loader
(`lib/image-loader.ts`), so Unsplash's CDN does the resizing — no Vercel image optimisation is used.

Before showing the client, swap the placeholders: studio address, phone and email (`CONTACT`), prices,
stats, testimonial names/quotes, and the photos.

## Booking form

Runs in **demo mode** (validates, shows the confirmation, logs the enquiry to the console).
To send real enquiries, set an endpoint that accepts a JSON POST (e.g. Formspree):

```bash
NEXT_PUBLIC_BOOKING_ENDPOINT=https://formspree.io/f/XXXXXXXX
```

Payload: `service, serviceName, date, name, email, phone, message, from`.
