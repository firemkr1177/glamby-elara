"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Unsplash image loader. Source URLs keep their original crop (w + h + fit=crop);
 * we swap in the requested width and scale the height to keep the same aspect ratio.
 * Params are rebuilt in a fixed order so the result never string-equals the source
 * (Next's dev check reads that as "loader ignores width").
 */
export default function unsplashLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  const w0 = Number(url.searchParams.get("w"));
  const h0 = Number(url.searchParams.get("h"));
  const params = new URLSearchParams({ auto: "format", fit: "crop", q: String(quality ?? 75), w: String(width) });
  if (w0 && h0) params.set("h", String(Math.round((width * h0) / w0)));
  return `${url.origin}${url.pathname}?${params}`;
}
