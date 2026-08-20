import { FC, ReactNode, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SEO from '../../components/SEO';
import {
  HeroShell,
  Section,
  Card,
  Badge,
  Btn,
  WaveDivider,
  UnverifiedBadge,
} from '../../components/sorsogon/kit';
import tourismData from '../../data/sorsogon/tourism.json';

/* ------------------------------------------------------------------ */
/* Data types + helpers                                                */
/* ------------------------------------------------------------------ */
interface Attraction {
  name: string;
  slug: string;
  municipality: string;
  category: string;
  summary: string;
  how_to_get_there: string | null;
  best_time: string | null;
  fees: string | null;
  contact: string | null;
  facebook: string | null;
  notes: string | null;
  sources: string[];
  verification: string;
}

const attractions = tourismData.attractions as Attraction[];

/** Canonical display order for category pills; only those present render. */
const CATEGORY_ORDER = [
  'nature',
  'beach',
  'diving',
  'heritage',
  'festival',
  'food',
  'wellness',
];

const formatCategory = (cat: string): string =>
  cat.charAt(0).toUpperCase() + cat.slice(1);

/** "sorsogon-city" -> "Sorsogon City"; "province" -> "Province-wide". */
const humanizeMunicipality = (slug: string): string =>
  slug === 'province'
    ? 'Province-wide'
    : slug
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

const categoryVariant = (cat: string): 'amber' | 'teal' | 'slate' => {
  if (cat === 'festival') return 'amber';
  if (cat === 'nature' || cat === 'beach') return 'teal';
  return 'slate';
};

const presentCategories = CATEGORY_ORDER.filter(cat =>
  attractions.some(a => a.category === cat)
);

const presentMunicipalities = Array.from(
  new Set(attractions.map(a => a.municipality))
).sort();

/* ------------------------------------------------------------------ */
/* CategoryPill                                                        */
/* ------------------------------------------------------------------ */
const CategoryPill: FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    aria-pressed={active}
    className={`h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
      active
        ? 'bg-teal-800 text-white hover:bg-teal-900'
        : 'border border-slate-300 text-slate-700 hover:border-teal-800 hover:text-teal-800'
    }`}
  >
    {label}
  </button>
);

/* ------------------------------------------------------------------ */
/* AttractionCard                                                      */
/* ------------------------------------------------------------------ */
const AttractionCard: FC<{ a: Attraction }> = ({ a }) => {
  const planRows: Array<{ term: string; node: ReactNode }> = [];
  if (a.how_to_get_there)
    planRows.push({ term: 'How to get there', node: a.how_to_get_there });
  if (a.best_time) planRows.push({ term: 'Best time', node: a.best_time });
  if (a.fees)
    planRows.push({
      term: 'Fees',
      node: (
        <>
          {a.fees}
          <span className='text-slate-400'> — confirm before traveling</span>
        </>
      ),
    });
  if (a.contact) planRows.push({ term: 'Contact', node: a.contact });
  if (a.facebook)
    planRows.push({
      term: 'Facebook',
      node: (
        <a
          href={a.facebook}
          target='_blank'
          rel='noopener noreferrer'
          className='rounded text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
        >
          Open Facebook page
        </a>
      ),
    });

  return (
    <Card as='article' className='flex h-full flex-col'>
      <div className='flex items-center justify-between gap-3'>
        <Badge variant={categoryVariant(a.category)}>
          {formatCategory(a.category)}
        </Badge>
        <span className='text-sm text-slate-500'>
          {humanizeMunicipality(a.municipality)}
        </span>
      </div>

      <h3 className='mt-3 text-base font-semibold tracking-tight text-slate-900'>
        {a.name}
      </h3>

      {a.verification === 'single-source' && (
        <div className='mt-2'>
          <UnverifiedBadge />
        </div>
      )}

      <p className='mt-2 text-[15px] leading-relaxed text-slate-600'>
        {a.summary}
      </p>

      {a.notes && (
        <p className='mt-3 text-xs leading-relaxed text-slate-500'>{a.notes}</p>
      )}

      {planRows.length > 0 && (
        <details className='group mt-auto border-t border-slate-100 pt-4'>
          <summary className='flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded text-sm font-medium text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden'>
            <span>Plan your visit</span>
            <ChevronDown
              aria-hidden='true'
              className='h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180'
            />
          </summary>
          <dl className='mt-3 space-y-3'>
            {planRows.map(row => (
              <div key={row.term}>
                <dt className='text-xs uppercase tracking-wide text-slate-500'>
                  {row.term}
                </dt>
                <dd className='mt-1 text-sm leading-relaxed text-slate-700'>
                  {row.node}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/* TourismPage                                                         */
/* ------------------------------------------------------------------ */
const TourismPage: FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [municipality, setMunicipality] = useState<string>('all');

  const filtered = useMemo(
    () =>
      attractions.filter(
        a =>
          (category === 'all' || a.category === category) &&
          (municipality === 'all' || a.municipality === municipality)
      ),
    [category, municipality]
  );

  const resetFilters = () => {
    setCategory('all');
    setMunicipality('all');
  };

  return (
    <>
      <SEO
        title='Tourism'
        description='Explore Sorsogon — whale sharks in Donsol, Bulusan volcano and lake, Pacific beaches in Gubat and Matnog, heritage churches, and provincial festivals. Community-verified visitor information.'
      />

      <HeroShell
        className='[&>div]:pt-16 [&>div]:pb-16'
        eyebrow='EXPLORE THE PROVINCE'
        title='Explore Sorsogon'
        subtitle="Whale sharks, volcano lakes, and the Pacific's quiet beaches."
      />

      <Section variant='white'>
        <h2 className='sr-only'>Places to explore in Sorsogon</h2>

        {/* Filters */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div
            role='group'
            aria-label='Filter by category'
            className='flex flex-wrap gap-2'
          >
            <CategoryPill
              label='All'
              active={category === 'all'}
              onClick={() => setCategory('all')}
            />
            {presentCategories.map(cat => (
              <CategoryPill
                key={cat}
                label={formatCategory(cat)}
                active={category === cat}
                onClick={() => setCategory(cat)}
              />
            ))}
          </div>

          <div className='flex items-center gap-2 md:justify-end'>
            <label
              htmlFor='municipality-filter'
              className='shrink-0 text-sm text-slate-500'
            >
              Municipality
            </label>
            <select
              id='municipality-filter'
              value={municipality}
              onChange={e => setMunicipality(e.target.value)}
              className='h-11 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 md:flex-none'
            >
              <option value='all'>All municipalities</option>
              {presentMunicipalities.map(m => (
                <option key={m} value={m}>
                  {humanizeMunicipality(m)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        <p className='mt-6 text-sm tabular-nums text-slate-500'>
          {filtered.length === attractions.length
            ? `${attractions.length} places to explore`
            : `Showing ${filtered.length} of ${attractions.length}`}
        </p>

        {/* Grid / empty state */}
        {filtered.length > 0 ? (
          <div className='mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {filtered.map(a => (
              <AttractionCard key={a.slug} a={a} />
            ))}
          </div>
        ) : (
          <div className='mt-6 rounded-2xl border border-slate-200/80 bg-slate-50 p-10 text-center'>
            <p className='text-[15px] text-slate-600'>
              No attractions match these filters.
            </p>
            <div className='mt-4 flex justify-center'>
              <Btn variant='secondary' onClick={resetFilters}>
                Clear filters
              </Btn>
            </div>
          </div>
        )}
      </Section>

      {/* Closing band → Directory */}
      <section className='relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white'>
        <WaveDivider className='pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-teal-300' />
        <div className='relative mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-2xl font-semibold tracking-tight'>
              Planning around offices and LGUs?
            </h2>
            <p className='mt-2 text-[15px] leading-relaxed text-slate-300'>
              Find contacts in the Directory.
            </p>
          </div>
          <Btn
            to='/directory'
            variant='secondary'
            className='border-white/30! text-white! hover:border-white/60! hover:bg-white/5! hover:text-white!'
          >
            Open the Directory
          </Btn>
        </div>
      </section>
    </>
  );
};

export default TourismPage;
