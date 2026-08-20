import { FC, useMemo, useState } from 'react';
import SEO from '../../components/SEO';
import { Section, Btn, WaveDivider } from '../../components/sorsogon/kit';
import tourismData from '../../data/sorsogon/tourism.json';
import {
  CATEGORY_ORDER,
  formatCategory,
  humanizeMunicipality,
  type Attraction,
  type Photo,
  type Video,
} from '../../components/sorsogon/tourism/helpers';
import TourismHero from '../../components/sorsogon/tourism/TourismHero';
import WatchSorsogon from '../../components/sorsogon/tourism/WatchSorsogon';
import AttractionCard from '../../components/sorsogon/tourism/AttractionCard';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const attractions = tourismData.attractions as unknown as Attraction[];
const videos = tourismData.media.videos as unknown as Video[];

const presentCategories = CATEGORY_ORDER.filter(cat =>
  attractions.some(a => a.category === cat)
);

const presentMunicipalities = Array.from(
  new Set(attractions.map(a => a.municipality))
).sort();

/** Iconic landscape from the dataset, reused as the photographic hero. */
const heroImage: Photo | undefined = attractions.find(
  a => a.slug === 'bulusan-volcano-natural-park'
)?.photo;

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
    className={`h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
      active
        ? 'bg-brand-800 text-white hover:bg-brand-900'
        : 'border border-slate-300 text-slate-700 hover:border-brand-800 hover:text-brand-800'
    }`}
  >
    {label}
  </button>
);

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

      <TourismHero image={heroImage} />

      <WatchSorsogon videos={videos} />

      <Section
        variant='white'
        eyebrow='WHERE TO GO'
        title='Places to explore'
        description='Beaches, volcano trails, springs, heritage churches, and festivals across the province. Filter by interest or municipality.'
      >
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
              className='h-11 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 md:flex-none'
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
          <div className='mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3'>
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
      <section className='relative overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white'>
        <WaveDivider className='pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-brand-300' />
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
