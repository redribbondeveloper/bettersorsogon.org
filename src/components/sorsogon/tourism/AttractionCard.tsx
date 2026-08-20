import { FC, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge, UnverifiedBadge, WaveDivider } from '../kit';
import {
  categoryVariant,
  formatCategory,
  humanizeMunicipality,
  type Attraction,
} from './helpers';

/**
 * Attraction card. Two header treatments over one identical body:
 *  - photo cards: a 4:3 image with a bottom-edge credit strip (CC attribution).
 *  - photoless cards: a decorative wave band so they read as intentional, not
 *    broken, beside the photo cards.
 * The card wrapper mirrors the kit Card surface tokens (minus padding) so the
 * flush-to-edge image can clip to the rounded corners.
 */
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
    <article className='flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]'>
      {a.photo ? (
        <div className='relative aspect-[4/3] w-full overflow-hidden bg-slate-100'>
          <img
            src={a.photo.src}
            alt={a.name}
            loading='lazy'
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent px-3 pt-9 pb-2'>
            <a
              href={a.photo.source}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block rounded text-[10px] leading-tight text-white/75 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
            >
              Photo: {a.photo.author} · {a.photo.license}
            </a>
            {a.photo.note && (
              <p className='mt-0.5 text-[10px] leading-tight text-white/60'>
                {a.photo.note}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className='relative h-24 overflow-hidden bg-gradient-to-br from-teal-950/5 via-slate-50 to-slate-100'>
          <WaveDivider
            className='pointer-events-none absolute inset-x-0 -bottom-3 h-24 w-full text-teal-800'
            opacity={0.1}
          />
        </div>
      )}

      <div className='flex flex-1 flex-col p-6'>
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
          <p className='mt-3 text-xs leading-relaxed text-slate-500'>
            {a.notes}
          </p>
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
      </div>
    </article>
  );
};

export default AttractionCard;
