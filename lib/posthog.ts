import posthog from "posthog-js";

/* ============================================================================
   PostHog: who visits, what they do, and recordings of their visits, read
   back by the AGM portal's Search → Visitors and Sessions tabs.
   ────────────────────────────────────────────────────────────────────────────
   One PostHog project holds every AGM client site; AGM tells this one apart
   by the address its events come from, so nothing here names the business.
   The project token is public by design (it is in every page's source).

   Consent (UK PECR) follows the site's own cookie choices (lib/consent.ts):
   `cookieless_mode: 'on_reject'`. Until a visitor allows Analytics cookies,
   PostHog stores nothing on their device and counts them with a daily,
   anonymous server-side hash: no recordings, no location. Allowing Analytics
   turns on the rest; withdrawing it turns it off again. Capturing is off by
   default, so a visitor who has not answered is counted, from their first
   page, as one who declined.

   Never started in `next dev` or inside the portal's preview, where the
   visits are AGM's and the business's own.
   ========================================================================= */

const TOKEN = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_rJGcKKXMwYF9oqz928BHf2uGdNoSJo2RKVsUcoo4tYbB";

let started = false;

/** Starts PostHog once, in a real visitor's browser. False where it never runs. */
export function startPostHog(): boolean {
  if (started) return true;
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") return false;

  posthog.init(TOKEN, {
    api_host: "https://eu.i.posthog.com",
    defaults: "2026-08-30",
    cookieless_mode: "on_reject",
    opt_out_capturing_by_default: true,
    person_profiles: "identified_only",
    capture_pageleave: true,
    capture_performance: { web_vitals: true },
    // Forms carry names, numbers and addresses: never in a recording.
    session_recording: { maskAllInputs: true },
  });

  started = true;
  return true;
}

export { posthog };
