import { FC, useEffect, useState } from 'react';

/**
 * ExchangeRates — OFW-relevant peso exchange rates for the home page.
 *
 * Honest and fail-silent by design: it fetches live mid-market rates
 * client-side, caches them in sessionStorage for six hours, and renders
 * NOTHING while loading or on any failure (no spinners, no broken boxes,
 * no fake numbers). A row of rates only ever appears when real data is in
 * hand. Source: open.er-api.com (free, CORS-open, no key).
 */

/* Minimal shape of the open.er-api.com response we rely on. */
interface ErApiResponse {
  result: string;
  base_code: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
}

interface CachedFx {
  fetchedAt: number;
  payload: ErApiResponse;
}

const FX_ENDPOINT = 'https://open.er-api.com/v6/latest/PHP';
const CACHE_KEY = 'bgs-fx';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

/**
 * Currencies to surface, in OFW relevance order. `per` is the number of
 * foreign units the peso value is quoted against: 1 for most, 100 for JPY
 * so the figure reads at a human scale. `note` qualifies that scale.
 */
const CURRENCIES: { code: string; per: number; note?: string }[] = [
  { code: 'USD', per: 1 },
  { code: 'EUR', per: 1 },
  { code: 'SAR', per: 1 },
  { code: 'AED', per: 1 },
  { code: 'JPY', per: 100, note: 'per ¥100' },
];

const isValidPayload = (data: unknown): data is ErApiResponse => {
  if (!data || typeof data !== 'object') return false;
  const d = data as Partial<ErApiResponse>;
  return (
    d.result === 'success' &&
    d.base_code === 'PHP' &&
    !!d.rates &&
    typeof d.rates === 'object' &&
    CURRENCIES.every(
      c => typeof d.rates![c.code] === 'number' && d.rates![c.code] > 0
    )
  );
};

const readCache = (): ErApiResponse | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedFx;
    if (
      !cached ||
      typeof cached.fetchedAt !== 'number' ||
      Date.now() - cached.fetchedAt > CACHE_TTL_MS ||
      !isValidPayload(cached.payload)
    ) {
      return null;
    }
    return cached.payload;
  } catch {
    return null;
  }
};

const writeCache = (payload: ErApiResponse): void => {
  try {
    const entry: CachedFx = { fetchedAt: Date.now(), payload };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignore storage failures (private mode / quota) — the band still renders.
  }
};

const ExchangeRates: FC = () => {
  const [data, setData] = useState<ErApiResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Serve fresh cache immediately without touching the network.
    const cached = readCache();
    if (cached) {
      setData(cached);
      return;
    }

    (async () => {
      try {
        const res = await fetch(FX_ENDPOINT);
        if (!res.ok) return;
        const json: unknown = await res.json();
        if (!isValidPayload(json)) return;
        writeCache(json);
        if (!cancelled) setData(json);
      } catch {
        // Fail-silent: network / CORS / parse errors render nothing.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Render only on success — nothing while loading or on any failure.
  if (!data) return null;

  const tiles = CURRENCIES.map(c => ({
    code: c.code,
    note: c.note,
    value: (c.per / data.rates[c.code]).toFixed(2),
  }));

  const updated = new Date(data.time_last_update_utc);
  const updatedLabel = Number.isNaN(updated.getTime())
    ? data.time_last_update_utc
    : updated.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      });

  return (
    <section className='border-b border-slate-200 bg-white'>
      <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-600'>
          Peso exchange rates
        </p>

        <div className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
          {tiles.map(t => (
            <div
              key={t.code}
              className='rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
            >
              <div className='text-xs uppercase tracking-wide text-slate-500'>
                {t.code}
                {t.note && <span className='normal-case'> · {t.note}</span>}
              </div>
              <div className='mt-1 text-2xl font-semibold tabular-nums text-slate-900'>
                ₱{t.value}
              </div>
            </div>
          ))}
        </div>

        <p className='mt-4 text-xs leading-relaxed text-slate-500'>
          Indicative mid-market rates · updated {updatedLabel} · source:{' '}
          <a
            href='https://www.exchangerate-api.com'
            rel='noopener noreferrer'
            target='_blank'
            className='rounded text-brand-800 underline-offset-2 transition-colors duration-150 hover:text-brand-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
          >
            Exchange Rate API
          </a>{' '}
          — banks and padala centers apply their own rates.
        </p>
      </div>
    </section>
  );
};

export default ExchangeRates;
