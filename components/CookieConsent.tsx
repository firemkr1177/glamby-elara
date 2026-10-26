"use client";

import { useEffect, useState } from 'react'
import { posthog, startPostHog } from '@/lib/posthog'

/* The visitor's answer, kept so the bar asks once. A record of a cookie
   choice is itself allowed without consent: it is what remembers it. */
const ANSWER_KEY = 'glamby-elara-cookie-choice'

const OPEN_EVENT = 'cookie-settings:open'

/** For a "Cookie settings" link or button (the footer is the usual place). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

function readAnswer(): string | null {
  try {
    return window.localStorage.getItem(ANSWER_KEY)
  } catch {
    return null
  }
}

function saveAnswer(answer: 'accepted' | 'declined') {
  try {
    window.localStorage.setItem(ANSWER_KEY, answer)
  } catch {
    /* Private window: they will be asked again next visit. */
  }
}

/**
 * The cookie bar: a small card at the foot of the page, asked once. Accept
 * lets PostHog keep its cookie, so a visit can be recorded and placed on the
 * map; Decline keeps it to the anonymous count it already makes. Drawn only
 * in the browser, after PostHog has started, so the built HTML never has it.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!startPostHog()) return
    if (readAnswer() === null && posthog.get_explicit_consent_status() !== 'granted') setOpen(true)
    // A "Cookie settings" link anywhere on the site asks again
    // (`openCookieSettings()` below), so a visitor can change their mind.
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  if (!open) return null

  function choose(accept: boolean) {
    if (accept) posthog.opt_in_capturing()
    else {
      posthog.opt_out_capturing()
      // Withdrawing removes what accepting stored.
      for (const name of document.cookie.split('; ').map((c) => c.split('=')[0])) {
        if (/^ph_.+_posthog/.test(name)) document.cookie = `${name}=; Max-Age=0; path=/`
      }
    }
    saveAnswer(accept ? 'accepted' : 'declined')
    setOpen(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="cookie"
    >
      <p className="cookie__text">
        Can we use cookies to see how the site is used? It helps make it better. Nothing is shared or sold.
      </p>
      <div className="cookie__actions">
        <button
          type="button"
          onClick={() => choose(false)}
          className="cookie__btn"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="cookie__btn cookie__btn--solid"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
