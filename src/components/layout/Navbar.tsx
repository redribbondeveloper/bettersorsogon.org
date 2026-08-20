import { FC, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainNavigation } from '../../data/navigation';

/** Custom wordmark — no official seal. Teal monogram + BetterGov Sorsogon. */
const Wordmark: FC = () => (
  <Link
    to='/'
    className='flex items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
    aria-label='BetterGov Sorsogon — home'
  >
    <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-800 text-[17px] font-semibold text-white'>
      S
    </span>
    <span className='text-lg tracking-tight text-slate-900'>
      <span className='font-semibold'>BetterGov</span>{' '}
      <span className='font-light'>Sorsogon</span>
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
    return `font-medium ${active ? 'text-teal-800' : 'text-slate-700 hover:text-teal-800'}`;
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
    'transition-colors duration-150 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2';

  return (
    // Fragment root: the sticky <nav> must be a direct child of the
    // full-height page wrapper — inside a header-sized div it has no
    // scroll room and never actually sticks.
    <>
      {/* Slim unofficial-portal notice */}
      <div className='bg-amber-50 py-1.5 text-center text-xs text-amber-900 print:hidden'>
        Unofficial community portal — not affiliated with any government office.
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
          </div>

          {/* Mobile toggle */}
          <button
            type='button'
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className='inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 md:hidden'
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
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
