/**
 * Privacy-respecting analytics (Umami Cloud).
 *
 * Cookieless, no persistent identifiers, aggregate-only. Loads NOTHING until
 * UMAMI_WEBSITE_ID is set — with an empty id this module is a no-op, so the
 * site ships analytics-free until the id is configured.
 *
 * Click tracking is attribute-driven: any element with `data-umami-event`
 * (plus optional `data-umami-event-*` payload attributes) is reported by the
 * Umami script automatically — no per-component imports needed.
 */

const UMAMI_WEBSITE_ID = '28969e96-631f-48e9-9f49-889d5c2d2be8';
const UMAMI_SRC = 'https://cloud.umami.is/script.js';

export function initAnalytics(): void {
  if (!UMAMI_WEBSITE_ID) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = UMAMI_SRC;
  s.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
  document.head.appendChild(s);
}

/** Programmatic event helper — safe no-op when analytics is disabled. */
export function track(event: string, data?: Record<string, unknown>): void {
  (
    window as { umami?: { track: (e: string, d?: object) => void } }
  ).umami?.track(event, data);
}
