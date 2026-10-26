"use client";

import { openCookieSettings } from "@/components/CookieConsent";

export function CookieSettingsButton() {
  return (
    <button type="button" className="footer__bar-btn" onClick={openCookieSettings}>
      Cookie settings
    </button>
  );
}
