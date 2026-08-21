import { FC, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import SorsogonMark from '../sorsogon/SorsogonMark';
import hotlinesData from '../../data/sorsogon/hotlines.json';

const REPO_URL = 'https://github.com/johnpaulgarcia/bettersorsogon.org';

/* Minimal shape needed from hotlines.json for the top utility bar. */
interface Hotline {
  name: string;
  category: string;
  scope: string;
  numbers: string[];
}

/**
 * Key provincial emergency contact for the utility bar — resolved
 * programmatically from the data (never hardcoded): the first provincial
 * disaster office. Everything degrades gracefully if the entry is absent.
 */
const { hotlines } = hotlinesData as unknown as { hotlines: Hotline[] };
const provincialDisaster = hotlines.find(
  h => h.scope === 'province' && h.category === 'disaster'
);
const provDisasterNumber = provincialDisaster?.numbers[0];
// Prefer the parenthetical abbreviation in the office name, e.g. "SPDRRMO".
const provDisasterShort =
  provincialDisaster?.name.match(/\(([^)]+)\)/)?.[1] ?? provincialDisaster?.name;
const provDisasterTel = provDisasterNumber
  ? `tel:${provDisasterNumber.replace(/[^\d+]/g, '')}`
  : undefined;

/** Custom wordmark — no official seal. Province silhouette + BetterGov Sorsogon. */
const Wordmark: FC = () => (
  <Link
    to='/'
    className='flex min-h-11 items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
    aria-label='BetterGov Sorsogon — home'
  >
    <SorsogonMark className='h-9 w-auto shrink-0 text-brand-800' />
    <span className='flex flex-col'>
      <span className='text-lg leading-tight tracking-tight text-slate-900'>
        <span className='font-semibold'>BetterGov</span>{' '}
        <span className='font-light'>Sorsogon</span>
      </span>
      {/* Tagline hides below ~380px so the 375px layout stays clean. */}
      <span className='hidden text-[11px] leading-tight text-slate-500 min-[380px]:block'>
        A community-run portal for the province
      </span>
    </span>
  </Link>
);

const isActivePath = (pathname: string, href: string): boolean => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
};

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Returns just the colour + weight utilities for a nav item.
  const linkTone = (item: { label: string; href: string }): string => {
    const active = isActivePath(pathname, item.href);
    return `font-medium ${active ? 'text-brand-800' : 'text-slate-700 hover:text-brand-800'}`;
  };

  // Hotlines keeps a small red urgency dot without spending the red signal on
  // nav chrome; every other item renders its plain label.
  const renderLabel = (label: string): ReactNode =>
    label === 'Hotlines' ? (
      <>
        <span
          aria-hidden='true'
          className='mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-red-600'
        />
        {label}
      </>
    ) : (
      label
    );

  const focusRing =
    'transition-colors duration-150 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

  // Utility-bar link tones. Emergency numbers are the one place red is spent
  // on the top bar (they are genuine emergency data); the hotlines link stays
  // neutral amber so red keeps its signal.
  const emergencyTelCls =
    'rounded font-semibold tabular-nums text-red-700 transition-colors duration-150 hover:text-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';
  const utilLinkCls =
    'rounded font-medium text-amber-900 underline-offset-2 transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

  return (
    // Fragment root: the sticky <nav> must be a direct child of the
    // full-height page wrapper — inside a header-sized div it has no
    // scroll room and never actually sticks.
    <>
      {/* Utility bar: the unofficial-portal disclaimer (non-negotiable) plus
          key emergency numbers. Numbers are data-driven from hotlines.json;
          only "911" is a literal. */}
      <div className='bg-amber-50 text-xs text-amber-900 print:hidden'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6'>
          {/* Desktop: disclaimer left · emergency numbers right */}
          <div className='hidden items-center justify-between gap-4 py-1.5 md:flex'>
            <p className='min-w-0'>
              Unofficial community portal — not affiliated with any government
              office.
            </p>
            <p className='flex shrink-0 items-center gap-x-1.5'>
              <span>Emergency</span>
              <a href='tel:911' className={emergencyTelCls}>
                911
              </a>
              {provDisasterTel && provDisasterNumber && (
                <>
                  <span aria-hidden='true' className='text-amber-400'>
                    ·
                  </span>
                  <span>{provDisasterShort}</span>
                  <a href={provDisasterTel} className={emergencyTelCls}>
                    {provDisasterNumber}
                  </a>
                </>
              )}
              <span aria-hidden='true' className='text-amber-400'>
                ·
              </span>
              <Link to='/hotlines' className={utilLinkCls}>
                All hotlines →
              </Link>
            </p>
          </div>

          {/* Mobile: two ultra-slim rows (disclaimer above, emergency below) */}
          <div className='md:hidden'>
            <p className='py-0.5 text-center leading-tight'>
              Unofficial community portal — not affiliated with any government
              office.
            </p>
            <p className='flex items-center justify-center gap-x-1.5 border-t border-amber-100 py-1 leading-tight'>
              <span>Emergency</span>
              <a href='tel:911' className={emergencyTelCls}>
                911
              </a>
              <span aria-hidden='true' className='text-amber-400'>
                ·
              </span>
              <Link to='/hotlines' className={utilLinkCls}>
                All hotlines →
              </Link>
            </p>
          </div>
        </div>
      </div>

      <nav className='sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur print:hidden'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6'>
          <div className='flex h-16 items-center'>
            <Wordmark />
          </div>

          {/* Desktop navigation */}
          <div className='hidden items-center gap-7 md:flex'>
            {mainNavigation.map(item => (
              <Link
                key={item.label}
                to={item.href}
                className={`inline-flex h-16 items-center text-sm ${focusRing} ${linkTone(item)}`}
              >
                {renderLabel(item.label)}
              </Link>
            ))}
            <span aria-hidden='true' className='h-4 w-px bg-slate-200' />
            <a
              href={REPO_URL}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Contribute on GitHub'
              title='Contribute on GitHub'
              data-umami-event='github-nav'
              className={`inline-flex h-16 items-center text-slate-500 hover:text-brand-800 ${focusRing}`}
            >
              <Github aria-hidden='true' className='h-[18px] w-[18px]' />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type='button'
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className='inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 md:hidden'
          >
            {open ? (
              <svg
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                aria-hidden='true'
              >
                <path d='M18 6 6 18M6 6l12 12' />
              </svg>
            ) : (
              <svg
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                aria-hidden='true'
              >
                <path d='M3 6h18M3 12h18M3 18h18' />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className='border-t border-slate-200 bg-white md:hidden'>
            <div className='mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6'>
              {mainNavigation.map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center py-2 text-[15px] ${focusRing} ${linkTone(item)}`}
                >
                  {renderLabel(item.label)}
                </Link>
              ))}
              <a
                href={REPO_URL}
                target='_blank'
                rel='noopener noreferrer'
                data-umami-event='github-nav'
                className={`flex min-h-11 items-center gap-2 border-t border-slate-100 py-2 text-[15px] font-medium text-slate-700 hover:text-brand-800 ${focusRing}`}
              >
                <Github aria-hidden='true' className='h-[18px] w-[18px]' />
                Contribute on GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
