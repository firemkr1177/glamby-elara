/* All site copy, prices and photo URLs in one place.
   Photos are hot-linked from Unsplash (free licence); swap for the client's portfolio. */

export const u = (id: string, params: string) => `https://images.unsplash.com/photo-${id}?${params}`;

export const CONTACT = {
  email: "hello@glambyelara.co.uk",
  phone: "07000 000 000",
  tel: "+447000000000",
  address: ["Studio 4, 27 Maple Street", "Nottingham, NG1 4AB · On location UK-wide"],
};

/* ---------------------------------------------------------------- Looks */
export type LookCat = "bridal" | "bridesmaid" | "evening" | "editorial" | "lessons";

export type Look = {
  id: string;
  cat: LookCat;
  title: string;
  text: string;
  price: string;
  service: string;
  img: string;
  alt: string;
  extra?: boolean; // hidden on the home page until the user filters or searches
};

export const LOOKS: Look[] = [
  { id: "signature-bridal", cat: "bridal", title: "Signature Bridal", text: "Luminous, long-wear skin with soft definition. Built to last 16+ hours and photograph flawlessly.", price: "From £180", service: "bridal", img: u("1501175635532-bdd01562edb2", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Bride in soft glam makeup with a veil" },
  { id: "soft-glam-bridesmaid", cat: "bridesmaid", title: "Soft Glam Bridesmaid", text: "Cohesive with the bride, never competing. Fresh skin, soft eye, a lip that matches the palette.", price: "From £65", service: "party", img: u("1778109303745-8a5d68af26b4", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Woman with soft glam makeup looking upward" },
  { id: "evening-smoke", cat: "evening", title: "Evening Smoke", text: "A sculpted, smoky eye with a statement lip. Made for candlelight, dinners and dance floors.", price: "From £70", service: "occasion", img: u("1711128636863-e0b5c93bb2d6", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Evening makeup with deep red lip and smoky eye" },
  { id: "editorial-glow", cat: "editorial", title: "Editorial Glow", text: "Glass skin, sculpted light and a concept-led finish for campaigns, lookbooks and content days.", price: "From £150", service: "editorial", img: u("1730320870329-616a2fe8a8e8", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Editorial beauty portrait in dappled golden light" },
  { id: "radiant-guest", cat: "evening", title: "Radiant Guest", text: "Polished and glowing without stealing the show. For wedding guests, christenings and parties.", price: "From £60", service: "occasion", img: u("1765813107112-5a8740b1511b", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Warm-toned occasion makeup portrait" },
  { id: "masterclass", cat: "lessons", title: "1:1 Masterclass", text: "Learn your face. Ninety minutes of technique, product edits and a routine you'll actually use.", price: "From £90", service: "lesson", img: u("1600523063811-4e78e3e088b8", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Woman applying makeup in a hand mirror" },
  { id: "bridal-trial", cat: "bridal", title: "Bridal Trial", text: "A relaxed two-hour session to test skin prep, tones and longevity before the big day.", price: "From £60", service: "trial", img: u("1536567307162-551e460b7fc2", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Smiling bride by a window", extra: true },
  { id: "mother-of-the-bride", cat: "bridal", title: "Mother of the Bride", text: "Elegant, age-appropriate radiance that looks like your best skin day, not a different person.", price: "From £75", service: "party", img: u("1722805740076-7c51a8669afc", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Bride in an off-the-shoulder gown", extra: true },
  { id: "group-lesson", cat: "lessons", title: "Group Lesson", text: "Hen parties, mums and daughters, best friends. Up to four faces, one very fun afternoon.", price: "From £55 pp", service: "lesson", img: u("1709477542170-f11ee7d471a0", "w=800&h=800&fit=crop&q=75&auto=format"), alt: "Makeup artist blending eyeshadow on a client", extra: true },
];

export const LOOK_TABS: { value: "all" | LookCat; label: string }[] = [
  { value: "all", label: "All Looks" },
  { value: "bridal", label: "Bridal" },
  { value: "bridesmaid", label: "Bridesmaid" },
  { value: "evening", label: "Evening" },
  { value: "editorial", label: "Editorial" },
  { value: "lessons", label: "Lessons" },
];

/* ---------------------------------------------------------------- Reviews */
export const HERO_REVIEWS = [
  { q: "“Didn't expect much from a trial, but my makeup lasted sixteen hours. Zero touch-ups.”", n: "Amira Okafor", r: "Bride, June 2026" },
  { q: "“She made my mum cry — in the good way. Soft, glowing, and still her.”", n: "Hannah Whitmore", r: "Bride, August 2026" },
  { q: "“Skin looked like skin under studio lights. The retoucher had nothing to do.”", n: "Priya Nair", r: "Creative Director" },
];

export const REVIEWS = [
  { q: "I stopped worrying about my makeup halfway through the day. It lasted from first look to the very last dance.", n: "Amira Okafor", r: "Bride, June 2026", img: u("1492175742197-ed20dc5a6bed", "w=1000&q=80&auto=format&fit=crop"), alt: "Bride in window light holding a bouquet", thumb: u("1759268130715-ea0bae615ae7", "w=300&h=300&fit=crop&q=70&auto=format") },
  { q: "Elara listened. No heavy contour, no lashes I didn't ask for — just me, but the version I see on good days.", n: "Sophie Reynolds", r: "Bridesmaid, May 2026", img: u("1778109303745-8a5d68af26b4", "w=1000&q=80&auto=format&fit=crop"), alt: "Bridesmaid with soft glam makeup", thumb: u("1778109303745-8a5d68af26b4", "w=300&h=300&fit=crop&q=70&auto=format") },
  { q: "Booked her for our campaign shoot. Skin looked like skin under studio lights — the retoucher barely had anything to do.", n: "Priya Nair", r: "Creative Director", img: u("1730320870329-616a2fe8a8e8", "w=1000&q=80&auto=format&fit=crop"), alt: "Editorial beauty portrait in golden light", thumb: u("1730320870329-616a2fe8a8e8", "w=300&h=300&fit=crop&q=70&auto=format") },
  { q: "Calm, on time, and somehow made six bridesmaids look cohesive without making anyone look the same.", n: "Hannah Whitmore", r: "Bride, August 2026", img: u("1536567307162-551e460b7fc2", "w=1000&q=80&auto=format&fit=crop"), alt: "Smiling bride by a window", thumb: u("1536567307162-551e460b7fc2", "w=300&h=300&fit=crop&q=70&auto=format") },
  { q: "The lesson changed how I do my makeup every morning. Ten minutes now, and it actually looks good.", n: "Leila Hassan", r: "Masterclass client", img: u("1765813107112-5a8740b1511b", "w=1000&q=80&auto=format&fit=crop"), alt: "Warm-toned makeup portrait", thumb: u("1765813107112-5a8740b1511b", "w=300&h=300&fit=crop&q=70&auto=format") },
];

/* ---------------------------------------------------------------- Kit list (home) */
export const KIT_SERVICES = [
  { id: "bridal", name: ["Bridal", "Makeup"], note: "Skin-first, long-wear base", detail: "Trial included · From £180" },
  { id: "party", name: ["Bridal", "Party"], note: "Bridesmaids, mothers, guests", detail: "Per person · From £65" },
  { id: "occasion", name: ["Occasion", "Glam"], note: "Proms, parties, dinners", detail: "60 minutes · From £70" },
  { id: "editorial", name: ["Editorial", "& Shoots"], note: "Campaigns, lookbooks, content", detail: "Half / full day · From £150" },
  { id: "lesson", name: ["Makeup", "Lessons"], note: "1:1 or small group", detail: "90 minutes · From £90" },
];

/* ---------------------------------------------------------------- Services detail */
export const SERVICE_DETAIL = [
  { id: "bridal", name: ["Bridal", "Makeup"], desc: "The full bridal service: skin-first prep, a long-wear base built for sixteen hours and flash photography, and a look designed around your dress, venue and light. Includes a two-hour trial and a touch-up plan for the day.", includes: ["Two-hour trial", "Skin prep & primer", "Individual lashes", "Lip touch-up kit"], meta: "Trial + ~75 min on the day", price: 180 },
  { id: "party", name: ["Bridal", "Party"], desc: "Bridesmaids, mothers, flower girls and guests, styled to sit beautifully alongside the bride without anyone looking the same. Booked alongside a bridal service or on its own.", includes: ["45 min per person", "Lashes optional", "Cohesive palette", "Schedule sent in advance"], meta: "Per person · from 45 min", price: 65 },
  { id: "occasion", name: ["Occasion", "Glam"], desc: "Proms, parties, dinners, races and anything with a dress code. Soft glam through to a full evening smoke, finished with a setting routine that survives the dance floor.", includes: ["60 min session", "Studio or on location", "Lashes optional", "Photo-safe finish"], meta: "60 minutes", price: 70 },
  { id: "editorial", name: ["Editorial", "& Shoots"], desc: "Campaigns, lookbooks, brand content and portraits. Concept-led looks with clean, retouch-friendly skin, on set for the duration with touch-ups between setups.", includes: ["Half or full day", "Pre-shoot consultation", "On-set touch-ups", "Up to 3 looks per model"], meta: "Half day (4h) · full day (8h)", price: 150 },
  { id: "lesson", name: ["Makeup", "Lessons"], desc: "Learn your own face. Ninety minutes of technique, an honest edit of your existing kit, and a ten-minute routine you'll actually use. One-to-one, or a small group for hens and mother-daughter afternoons.", includes: ["90 min session", "Kit edit & product list", "Written routine to keep", "Groups up to 4"], meta: "90 minutes · 1:1 or group", price: 90 },
];

export const PRICING_NOTES = [
  { h: "Travel", p: "Included within 20 miles of NG1. Beyond that, 45p per mile each way, quoted up front. Overnight stays for far-flung venues are arranged at cost." },
  { h: "Early starts", p: "Ready-by times before 7am carry a £25 early-start fee. Most wedding mornings begin between 6am and 8am depending on party size." },
  { h: "Deposits", p: "A £50 deposit secures a wedding date once we've spoken; the balance is due one week before. Occasion bookings are paid on the day." },
  { h: "Groups", p: "Six or more faces on one morning brings an assistant artist so nobody is rushed. Group lessons are £55 per person, minimum three." },
];

/* ---------------------------------------------------------------- Booking */
export const BOOKING_SERVICES: Record<string, { name: string; from?: number; note?: string }> = {
  bridal: { name: "Signature Bridal", from: 180, note: "trial included" },
  trial: { name: "Bridal Trial", from: 60, note: "two hours in the studio" },
  party: { name: "Bridal Party", from: 65, note: "per person" },
  occasion: { name: "Occasion Glam", from: 70, note: "per person" },
  editorial: { name: "Editorial & Shoots", from: 150, note: "half or full day" },
  lesson: { name: "Makeup Lesson", from: 90, note: "1:1 or group" },
  unsure: { name: "Not sure yet" },
};

export const BOOKING_OPTIONS = [
  { value: "bridal", label: "Signature Bridal" },
  { value: "trial", label: "Bridal Trial" },
  { value: "party", label: "Bridal Party" },
  { value: "occasion", label: "Occasion Glam" },
  { value: "editorial", label: "Editorial & Shoots" },
  { value: "lesson", label: "Makeup Lesson" },
  { value: "unsure", label: "Not sure yet — help me choose" },
];

/* ---------------------------------------------------------------- FAQ */
export type Faq = { q: string; a: string };

export const PRICING_FAQ: Faq[] = [
  { q: "Is the trial really included?", a: "Yes — every bridal package includes a two-hour studio trial. If you'd like a second trial (a different look, or a new dress), it's £60." },
  { q: "What does a bridal party of six cost?", a: "Bride £180 plus five at £65 — £505 in total, with an assistant artist included so the morning runs to time. Lashes are £15 per person if wanted." },
  { q: "Can I hold a date before paying a deposit?", a: "Dates are pencilled for seven days after your quote, free of charge. After that the £50 deposit confirms it." },
];

export const FAQ_GROUPS: { eyebrow: string; title: [string, string]; text: string; items: Faq[] }[] = [
  {
    eyebrow: "Booking",
    title: ["Dates, deposits", "and timing."],
    text: "Peak season (May–September) books nine to twelve months ahead. If your date is closer than that, ask anyway — cancellations happen.",
    items: [
      { q: "How far in advance should I book?", a: "Bridal dates go 9–12 months ahead, especially May to September. Occasion and editorial bookings are usually fine with 2–4 weeks' notice, but earlier is always safer." },
      { q: "How do I secure my date?", a: "Send a booking request, we'll confirm availability and a quote within a working day, and a £50 deposit then holds the date. Dates are pencilled free for seven days while you decide." },
      { q: "What is your cancellation policy?", a: "Deposits are non-refundable but transferable to a new date once, subject to availability. Balances are due one week before the wedding; occasion bookings are paid on the day." },
      { q: "Do you travel to me on the day?", a: "Yes. Wedding-morning makeup is done on location so nobody is rushing across town. Travel is included within 20 miles of the studio; further afield is quoted per booking." },
    ],
  },
  {
    eyebrow: "On The Day",
    title: ["Calm mornings,", "by design."],
    text: "A schedule is sent the week before: who sits when, what time Elara arrives and when the bride needs to be in the chair.",
    items: [
      { q: "How long does each person take?", a: "Roughly 60–75 minutes for the bride and 45 minutes per bridal party member. With six or more faces an assistant artist joins so the morning still runs to time." },
      { q: "What time do you arrive?", a: "Usually two to three hours before the ready-by time, depending on party size. Ready-by times before 7am carry a £25 early-start fee." },
      { q: "Will my makeup last all day?", a: "That's the point of the prep. Long-wear base, set and sealed, with a lip touch-up kit left with the bride. Clients regularly report sixteen hours with no touch-ups — including tears." },
      { q: "Do you do hair as well?", a: "Not personally, but Elara works alongside two trusted bridal hair stylists and can arrange a joint booking so timings line up." },
    ],
  },
  {
    eyebrow: "Products & Skin",
    title: ["Real skin,", "real light."],
    text: "Every product in the kit is professional, photo-safe and tested across skin tones and types. Sensitive skin is welcome — just say so.",
    items: [
      { q: "Is a trial included with bridal makeup?", a: "Every bridal package includes a two-hour trial. We test skin prep, tones and longevity so the wedding morning holds no surprises." },
      { q: "What products do you use?", a: "Professional, photo-safe formulas chosen for your skin type — no SPF flashback, no heavy silicone layers. The kit is cruelty-free and sanitised between every face." },
      { q: "I have sensitive or acne-prone skin. Can you still work with it?", a: "Yes. Mention it when you book and bring anything you're currently using to the trial. Prep is adjusted for reactive skin, and nothing goes on that hasn't been patch-tested first." },
      { q: "Do you use false lashes?", a: "Only if you want them. Individual lashes are a £15 add-on and are applied to look like yours, only better. Strip lashes are available for editorial looks." },
    ],
  },
];

/* ---------------------------------------------------------------- Process (about) */
export const PROCESS = [
  { h: "Enquire", p: "Send the date, the occasion and where you're getting ready. You'll hear back within a working day with availability and a clear quote — no deposit until we've spoken." },
  { h: "Trial", p: "Two relaxed hours in the studio. We test skin prep, tones and longevity, photograph the result in daylight and flash, and write the plan for the morning." },
  { h: "The Day", p: "Elara arrives early, sets up quietly and works to a schedule sent the week before. Bride last, so you're freshest for the first look. Then she disappears — and it stays put." },
];
