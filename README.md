# GlamBy Elara — demo website

Five-page demo site for **GlamBy Elara** (bridal, occasion & editorial makeup artist), built to match the
"sincère" skincare reference layout: warm cocoa/cream palette, giant wordmark hero, statement panel,
about + stats, "inside the kit" service list, six benefits grid, filterable looks grid, testimonials,
CTA band and footer wordmark. Fully responsive (desktop / tablet / phone).

## Pages

| Page | What's on it |
| --- | --- |
| `index.html` | Hero, statement, about teaser, services list, benefits, 6 looks (+ "See all"), testimonials, CTA |
| `about.html` | Story + stats, kit statement, 3-step process, values, testimonials |
| `services.html` | Full service detail with prices, pricing notes, all 9 looks with filters (`?cat=bridal` deep-links), pricing FAQ |
| `faq.html` | 12 questions in three groups |
| `booking.html` | Booking flow: service cards → date / time / location / people / add-ons → details. Live estimate (sticky card on desktop, sticky bar on mobile), validation, confirmation with reference number. `?service=bridal` pre-selects a service. |

## Run it

Static HTML — no build step.

- Double-click `index.html`, **or**
- serve the folder: `python -m http.server 5173` then open <http://localhost:5173>

Deploy anywhere static (Vercel/Netlify/GitHub Pages): drop the folder in, no config needed.

## Files

```
*.html          the five pages (header/footer markup is repeated in each — edit all five)
css/styles.css  design tokens, layout, responsive rules
js/main.js      shared: header, mobile menu, reveal-on-scroll, looks filter/search, testimonials
js/booking.js   booking page: quick enquiry validation, "from" price hint, confirmation
favicon.svg
```

## Booking form

A quick enquiry: service, event date, name, email, plus optional phone and message.
Runs in **demo mode**: validates service / date / name / email and shows the confirmation state
(the enquiry is logged to the console). "From" prices under the service dropdown live in `js/booking.js` (`SERVICES`).

To send real requests, add an endpoint to the form tag in `booking.html`, e.g. Formspree:

```html
<form class="form form--light booking__form" id="bookingForm" novalidate data-endpoint="https://formspree.io/f/XXXXXXXX">
```

The script POSTs JSON: `service, serviceName, date, name, email, phone, message, from`.

## Before showing the client — placeholders to swap

- Studio address, phone and email (`#enquire` aside + footer)
- Prices: service list (`index.html`, `services.html`), look cards, booking cards and `SERVICES` in `js/booking.js`
- Stats (8+ years, 500+ faces, 100% five-star)
- Testimonial names/quotes
- Photos — currently hot-linked from Unsplash (free licence). Replace with the client's own portfolio
  by swapping the `src` URLs; keep roughly the same crops (portrait hero, square look cards).

## Photo credits (Unsplash IDs)

hero `1653640869615`, statement `1704621354138`, about `1709477542153` / `1556262965`,
kit `1657563920440`, kit bg `1709477542149`, looks `1501175635532`, `1778109303745`, `1711128636863`,
`1730320870329`, `1765813107112`, `1600523063811`, `1536567307162`, `1722805740076`, `1709477542170`,
testimonial `1492175742197`, avatars `1759268130715`.
