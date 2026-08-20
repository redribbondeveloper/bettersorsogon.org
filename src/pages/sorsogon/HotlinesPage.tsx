import { FC, useMemo, useState } from 'react';
import { ExternalLink, Facebook, Phone, Printer, Search } from 'lucide-react';
import SEO from '../../components/SEO';
import {
  Badge,
  Btn,
  Card,
  PageHeader,
  Section,
  UnverifiedBadge,
} from '../../components/sorsogon/kit';
import hotlinesData from '../../data/sorsogon/hotlines.json';

/* ------------------------------------------------------------------ */
/* Types + helpers (rendered strictly from data).                      */
/* ------------------------------------------------------------------ */
type Hotline = {
  name: string;
  category: string;
  scope: string;
  numbers: string[];
  facebook: string | null;
  notes: string | null;
  sources: string[];
  verification: string;
};

const hotlines = hotlinesData.hotlines as Hotline[];

/** Categories that carry an emergency (red) badge. */
const RED_CATEGORIES = new Set(['emergency', 'disaster', 'fire', 'medical']);

/** "prieto-diaz" -> "Prieto Diaz", "coast-guard" -> "Coast Guard". */
const humanize = (slug: string): string =>
  slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

/** Dialable tel: target — keep digits and a leading +, drop the rest. */
const telHref = (num: string): string => `tel:${num.replace(/[^\d+]/g, '')}`;

/** Label for a scope group header. */
const scopeLabel = (scope: string): string =>
  scope === 'national'
    ? 'National'
    : scope === 'province'
      ? 'Province-wide'
      : humanize(scope);

/** LGU options for the area select — derived from data, never hardcoded. */
const lguSlugs = Array.from(new Set(hotlines.map(h => h.scope)))
  .filter(scope => scope !== 'national' && scope !== 'province')
  .sort((a, b) => humanize(a).localeCompare(humanize(b)));

/* ------------------------------------------------------------------ */
/* HotlineItem — one contact, built for a thumb and for print.         */
/* ------------------------------------------------------------------ */
const HotlineItem: FC<{ hotline: Hotline }> = ({ hotline }) => (
  <Card as='li' className='break-inside-avoid print:shadow-none'>
    <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
      <h3 className='text-base font-semibold tracking-tight text-slate-900'>
        {hotline.name}
      </h3>
      <Badge variant={RED_CATEGORIES.has(hotline.category) ? 'red' : 'slate'}>
        {humanize(hotline.category)}
      </Badge>
      {hotline.verification === 'single-source' && <UnverifiedBadge />}
    </div>

    <div className='mt-3 flex flex-col items-start gap-1'>
      {hotline.numbers.map(num => (
        <a
          key={num}
          href={telHref(num)}
          className='inline-flex min-h-11 w-fit items-center gap-2 rounded text-xl font-semibold tabular-nums text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
        >
          <Phone aria-hidden='true' className='h-4 w-4 shrink-0 text-teal-700/70' />
          {num}
        </a>
      ))}
    </div>

    {hotline.facebook && (
      <a
        href={hotline.facebook}
        target='_blank'
        rel='noopener noreferrer'
        className='mt-2 inline-flex items-center gap-1.5 rounded text-sm text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
      >
        <Facebook aria-hidden='true' className='h-4 w-4' />
        Facebook page
        <ExternalLink aria-hidden='true' className='h-3.5 w-3.5' />
      </a>
    )}

    {hotline.notes && (
      <p className='mt-2 text-sm leading-relaxed text-slate-500'>
        {hotline.notes}
      </p>
    )}
  </Card>
);

/* ------------------------------------------------------------------ */
/* HotlinesPage (/hotlines)                                            */
/* ------------------------------------------------------------------ */
const HotlinesPage: FC = () => {
  const [area, setArea] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();

    const inArea = (h: Hotline): boolean => {
      if (h.scope === 'national' || h.scope === 'province') return true;
      if (area === 'all') return true;
      return h.scope === area;
    };

    const matchesQuery = (h: Hotline): boolean => {
      if (!q) return true;
      const haystack = [
        h.name,
        humanize(h.category),
        scopeLabel(h.scope),
        h.notes ?? '',
        ...h.numbers,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    };

    const filtered = hotlines.filter(h => inArea(h) && matchesQuery(h));

    const rank = (scope: string): number =>
      scope === 'national' ? 0 : scope === 'province' ? 1 : 2;

    const scopes = Array.from(new Set(filtered.map(h => h.scope))).sort(
      (a, b) =>
        rank(a) - rank(b) || scopeLabel(a).localeCompare(scopeLabel(b))
    );

    return scopes.map(scope => ({
      scope,
      label: scopeLabel(scope),
      items: filtered.filter(h => h.scope === scope),
    }));
  }, [area, query]);

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <>
      <SEO title='Emergency Hotlines' />

      {/* Life-line band — the one place 911 is hardcoded. */}
      <div className='bg-red-700 text-white print:border-b print:border-red-200 print:bg-white print:text-red-700'>
        <div className='mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-red-100 print:text-red-600'>
              Life-threatening emergency?
            </p>
            <p className='mt-1 text-lg font-semibold'>
              Call <span className='tabular-nums'>911</span> for police, fire,
              and medical response — nationwide, 24/7.
            </p>
          </div>
          <Btn
            href='tel:911'
            variant='danger'
            className='h-14 w-full px-8 text-lg ring-2 ring-white/70 ring-offset-2 ring-offset-red-700 sm:w-auto print:hidden'
          >
            <Phone aria-hidden='true' className='h-5 w-5' />
            Call 911
          </Btn>
        </div>
      </div>

      <PageHeader
        eyebrow='Emergency'
        title='Emergency Hotlines'
        subtitle='Emergency and public-service numbers across Sorsogon Province — national and provincial lines, plus the disaster office for every city and municipality.'
      >
        <Btn
          variant='secondary'
          onClick={() => window.print()}
          className='print:hidden'
        >
          <Printer aria-hidden='true' className='h-4 w-4' />
          Print this list
        </Btn>
      </PageHeader>

      <Section variant='slate' className='print:bg-white'>
        {/* Controls */}
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-end print:hidden'>
          <div className='sm:w-64'>
            <label
              htmlFor='area'
              className='block text-xs font-semibold uppercase tracking-wide text-slate-500'
            >
              Area
            </label>
            <select
              id='area'
              value={area}
              onChange={e => setArea(e.target.value)}
              className='mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-[15px] text-slate-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
            >
              <option value='all'>All areas</option>
              <option value='province'>Province-wide</option>
              {lguSlugs.map(slug => (
                <option key={slug} value={slug}>
                  {humanize(slug)}
                </option>
              ))}
            </select>
          </div>

          <div className='flex-1'>
            <label
              htmlFor='filter'
              className='block text-xs font-semibold uppercase tracking-wide text-slate-500'
            >
              Search
            </label>
            <div className='relative mt-2'>
              <Search
                aria-hidden='true'
                className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400'
              />
              <input
                id='filter'
                type='search'
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Search by name, town, or service…'
                className='h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-[15px] text-slate-700 transition-colors duration-150 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
              />
            </div>
          </div>
        </div>

        <p className='mb-10 text-sm text-slate-500'>
          Showing{' '}
          <span className='font-medium tabular-nums text-slate-700'>
            {total}
          </span>{' '}
          hotline{total === 1 ? '' : 's'}. National and province-wide lines stay
          visible for every area. Last checked{' '}
          <span className='tabular-nums'>{hotlinesData.verified_at}</span>.
        </p>

        {groups.length === 0 ? (
          <div className='rounded-2xl border border-slate-200 bg-white p-10 text-center'>
            <p className='text-[15px] text-slate-600'>
              No hotlines match your search.
            </p>
            <button
              type='button'
              onClick={() => {
                setArea('all');
                setQuery('');
              }}
              className='mt-3 rounded font-medium text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className='space-y-12'>
            {groups.map(group => (
              <section key={group.scope}>
                <div className='flex items-baseline gap-3 border-b border-slate-200 pb-2 break-after-avoid'>
                  <h2 className='text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl'>
                    {group.label}
                  </h2>
                  <span className='text-sm tabular-nums text-slate-400'>
                    {group.items.length}
                  </span>
                </div>
                <ul className='mt-6 grid gap-6 sm:grid-cols-2 print:grid-cols-2'>
                  {group.items.map(hotline => (
                    <HotlineItem key={hotline.name} hotline={hotline} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default HotlinesPage;
