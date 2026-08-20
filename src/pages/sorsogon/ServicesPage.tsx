import { FC, useMemo, useState } from 'react';
import { Info, Search } from 'lucide-react';
import SEO from '../../components/SEO';
import { Card, PageHeader, Section } from '../../components/sorsogon/kit';
import {
  ServiceCard,
  type Service,
} from '../../components/sorsogon/services/ServiceCard';
import servicesData from '../../data/sorsogon/services.json';

const services = servicesData.services as Service[];

/**
 * Canonical display order for the service categories. Categories with no
 * services in the data are omitted entirely (derived below).
 */
const CATEGORY_SLUG_ORDER = [
  'certificates-ids',
  'business-trade',
  'health-social',
  'education',
  'employment',
  'transport',
  'disaster-weather',
];

/** Categories present in the data, in canonical order. Names come from data. */
const presentCategories = CATEGORY_SLUG_ORDER.map(slug => {
  const match = services.find(s => s.category.slug === slug);
  return match ? { slug, name: match.category.name } : null;
}).filter((c): c is { slug: string; name: string } => c !== null);

const ServicesPage: FC = () => {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (s: Service): boolean => {
      if (activeCat !== 'all' && s.category.slug !== activeCat) return false;
      if (!q) return true;
      return `${s.service} ${s.description}`.toLowerCase().includes(q);
    };
    const filtered = services.filter(matches);
    return presentCategories
      .map(cat => ({
        ...cat,
        items: filtered.filter(s => s.category.slug === cat.slug),
      }))
      .filter(group => group.items.length > 0);
  }, [activeCat, query]);

  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const hasFilters = activeCat !== 'all' || query.trim() !== '';

  const clearFilters = (): void => {
    setActiveCat('all');
    setQuery('');
  };

  const pills = [{ slug: 'all', name: 'All services' }, ...presentCategories];

  return (
    <>
      <SEO title='Get a Government Service' />

      <PageHeader
        eyebrow='For Residents'
        title='Get a Government Service'
        subtitle='Where to go and what to bring — links go to official government channels.'
      />

      {/* Filter controls — a compact bar that sticks below the site header. */}
      {/* Solid background: translucent+blur let card text ghost through on
          some renderers, making the pinned bar look broken mid-scroll. */}
      <div className='sticky top-16 z-30 border-b border-slate-200 bg-white shadow-sm'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 py-3'>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div
              role='group'
              aria-label='Filter by category'
              className='-mx-4 -my-1 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:my-0 md:flex-wrap md:overflow-visible md:px-0 md:py-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            >
              {pills.map(pill => {
                const active = activeCat === pill.slug;
                return (
                  <button
                    key={pill.slug}
                    type='button'
                    aria-pressed={active}
                    onClick={() => setActiveCat(pill.slug)}
                    className={`inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
                      active
                        ? 'border border-teal-800 bg-teal-800 text-white'
                        : 'border border-slate-300 text-slate-700 hover:border-teal-800 hover:text-teal-800'
                    }`}
                  >
                    {pill.name}
                  </button>
                );
              })}
            </div>

            <div className='relative md:w-72 md:shrink-0'>
              <label htmlFor='service-search' className='sr-only'>
                Search services
              </label>
              <Search
                aria-hidden='true'
                className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400'
              />
              <input
                id='service-search'
                type='search'
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Search services…'
                className='h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-[15px] text-slate-700 transition-colors duration-150 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Result summary. */}
      <div className='border-b border-slate-200 bg-white'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 py-3 text-sm text-slate-500'>
          {hasFilters ? (
            <>
              Showing{' '}
              <span className='font-medium tabular-nums text-slate-700'>
                {total}
              </span>{' '}
              of <span className='tabular-nums'>{services.length}</span> services.
            </>
          ) : (
            <>
              <span className='font-medium tabular-nums text-slate-700'>
                {services.length}
              </span>{' '}
              services across{' '}
              <span className='tabular-nums'>{presentCategories.length}</span>{' '}
              categories.
            </>
          )}{' '}
          Last checked{' '}
          <span className='tabular-nums'>{servicesData.verified_at}</span>.
        </div>
      </div>

      {groups.length === 0 ? (
        <Section variant='slate'>
          <div className='rounded-2xl border border-slate-200 bg-white p-10 text-center'>
            <p className='text-[15px] text-slate-600'>
              No services match your search.
            </p>
            <button
              type='button'
              onClick={clearFilters}
              className='mt-3 rounded font-medium text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
            >
              Clear filters
            </button>
          </div>
        </Section>
      ) : (
        groups.map((group, index) => (
          <Section
            key={group.slug}
            id={group.slug}
            variant={index % 2 === 0 ? 'white' : 'slate'}
            eyebrow={`${group.items.length} ${
              group.items.length === 1 ? 'service' : 'services'
            }`}
            title={group.name}
            className='scroll-mt-40'
          >
            <ul className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {group.items.map(service => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </ul>
          </Section>
        ))
      )}

      {/* Closing disclaimer. */}
      <Section variant={groups.length % 2 === 0 ? 'white' : 'slate'}>
        <Card className='flex items-start gap-3'>
          <Info
            aria-hidden='true'
            className='mt-0.5 h-5 w-5 shrink-0 text-amber-500'
          />
          <p className='text-sm leading-relaxed text-slate-600'>
            Fees and requirements change — always confirm with the office or
            official site before traveling.
          </p>
        </Card>
      </Section>
    </>
  );
};

export default ServicesPage;
