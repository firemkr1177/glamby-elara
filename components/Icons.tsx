import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const LogoMark = (p: P) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" {...p}>
    <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.1" />
    <path d="M13 4.5c1.5 4.5 4 7 8.5 8.5-4.5 1.5-7 4-8.5 8.5-1.5-4.5-4-7-8.5-8.5 4.5-1.5 7-4 8.5-8.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" {...p}>
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...p}>
    <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRightSmall = (p: P) => (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true" {...p}>
    <path d="M2 10 10 2M4 2h6v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" {...p}>
    <path d="M5 1v8M1.5 5.5 5 9l3.5-3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Heart = (p: P) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const Search = (p: P) => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" {...p}>
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const Filter = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" {...p}>
    <path d="M2 4h10M2 7h6M2 10h8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const Check = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" {...p}>
    <path d="m5 11.5 4 4 8-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Large decorative star-in-circles used on the statement panels. */
export const Glyph = (p: P) => (
  <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" {...p}>
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
    <path d="M100 10c15 45 40 70 90 90-50 15-75 40-90 90-15-50-40-75-90-90 50-20 75-45 90-90Z" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export const TikTok = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 3 2.5 5 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Pinterest = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 16.5 12.5 9M9.5 12.5c-.5-2.5 1-4.5 3-4.5s3 1.5 2.5 3.5-2 3-3.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...p}>
    <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6H14v-6h2.5l.5-3.5h-3V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

/* ---- Benefit line icons (100×100, 1px strokes) ---- */
const iconProps = { viewBox: "0 0 100 100", fill: "none", "aria-hidden": true } as const;

export const BENEFIT_ICONS = [
  (p: P) => (
    <svg {...iconProps} {...p}>
      <g stroke="currentColor" strokeWidth="1">
        <path d="M8 56c8-26 16-26 24 0s16 26 24 0 16-26 24 0 12 14 14 0" />
        <path d="M14 44c8-24 16-24 24 0s16 24 24 0 16-24 24 0" />
        <path d="M8 56h84" />
        {[18, 30, 42, 54, 66, 78].map((cx) => (
          <circle key={cx} cx={cx} cy="56" r="3.5" fill="#f4efe7" />
        ))}
      </g>
    </svg>
  ),
  (p: P) => (
    <svg {...iconProps} {...p}>
      <g stroke="currentColor" strokeWidth="1">
        <path d="M50 8c8 20 26 30 26 54a26 26 0 0 1-52 0C24 38 42 28 50 8Z" />
        <path d="M50 32c5 12 16 18 16 32a16 16 0 0 1-32 0c0-14 11-20 16-32Z" />
        <path d="M50 56c2 6 8 9 8 15a8 8 0 0 1-16 0c0-6 6-9 8-15Z" />
      </g>
    </svg>
  ),
  (p: P) => (
    <svg {...iconProps} {...p}>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="30" r="16" />
        <circle cx="50" cy="70" r="16" />
        <circle cx="30" cy="50" r="16" />
        <circle cx="70" cy="50" r="16" />
        <circle cx="50" cy="50" r="5" />
      </g>
    </svg>
  ),
  (p: P) => (
    <svg {...iconProps} {...p}>
      <g stroke="currentColor" strokeWidth="1">
        <path d="M8 50c12-18 26-27 42-27s30 9 42 27c-12 18-26 27-42 27S20 68 8 50Z" />
        <circle cx="50" cy="50" r="17" />
        <ellipse cx="50" cy="50" rx="8" ry="15" />
      </g>
    </svg>
  ),
  (p: P) => (
    <svg {...iconProps} {...p}>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="38" />
        <circle cx="50" cy="50" r="24" />
        <circle cx="50" cy="50" r="10" />
        <path d="M50 12v76M12 50h76M23 23l54 54M77 23 23 77" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </g>
    </svg>
  ),
  (p: P) => (
    <svg {...iconProps} {...p}>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="38" r="22" />
        <circle cx="38" cy="58" r="22" />
        <circle cx="62" cy="58" r="22" />
      </g>
    </svg>
  ),
];
