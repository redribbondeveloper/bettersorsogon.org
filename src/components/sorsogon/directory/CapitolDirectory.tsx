import { FC, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import OfficeCard from './OfficeCard';
import { capitolOffices } from './data';

/**
 * The Provincial Capitol office list with a single client-side text filter.
 * Filtering spans the office name, abbreviation, department head, and the
 * office's listed services.
 */
const CapitolDirectory: FC = () => {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!needle) return capitolOffices;
    return capitolOffices.filter(office => {
      const haystack = [
        office.office,
        office.abbreviation ?? '',
        office.head?.name ?? '',
        office.head?.title ?? '',
        ...office.services,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [needle]);

  const total = capitolOffices.length;

  return (
    <div>
      <div className='max-w-md'>
        <label htmlFor='capitol-filter' className='sr-only'>
          Filter Capitol offices
        </label>
        <div className='relative'>
          <Search
            className='pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400'
            aria-hidden='true'
          />
          <input
            id='capitol-filter'
            type='text'
            inputMode='search'
            autoComplete='off'
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder='Filter by office, official, or service…'
            className='h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-12 text-[15px] text-slate-900 placeholder:text-slate-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
          />
          {query && (
            <button
              type='button'
              onClick={() => setQuery('')}
              aria-label='Clear filter'
              className='absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-slate-400 transition-colors duration-150 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
            >
              <X className='h-4 w-4' aria-hidden='true' />
            </button>
          )}
        </div>
      </div>

      <p className='mt-3 text-sm tabular-nums text-slate-500' aria-live='polite'>
        {filtered.length === total
          ? `${total} offices`
          : `${filtered.length} of ${total} offices`}
      </p>

      {filtered.length > 0 ? (
        <ul className='mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map(office => (
            <OfficeCard key={office.office} office={office} />
          ))}
        </ul>
      ) : (
        <div className='mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 text-center'>
          <p className='text-[15px] text-slate-600'>
            No offices match{' '}
            <span className='font-medium text-slate-800'>“{query}”</span>.
          </p>
          <button
            type='button'
            onClick={() => setQuery('')}
            className='mt-3 rounded text-sm font-medium text-brand-800 transition-colors duration-150 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};

export default CapitolDirectory;
