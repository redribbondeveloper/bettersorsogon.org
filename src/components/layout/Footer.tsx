import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import SorsogonMark from '../sorsogon/SorsogonMark';
import versionData from '../../version.json';

type Version = { head_commit?: string };

const linkClass =
  'rounded text-sm text-slate-300 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

const creditLinkClass =
  'rounded text-white underline decoration-white/30 underline-offset-2 transition-colors duration-150 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

const Footer: FC = () => {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const v = versionData as Version;
    if (v?.head_commit) setVersion(v.head_commit.substring(0, 6));
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className='bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white print:hidden'>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Brand + disclaimer */}
          <div>
            <div className='flex items-center gap-2.5'>
              <SorsogonMark className='h-9 w-auto shrink-0 text-brand-300' />
              <span className='text-lg tracking-tight text-white'>
                <span className='font-semibold'>BetterGov</span>{' '}
                <span className='font-light'>Sorsogon</span>
              </span>
            </div>
            <p className='mt-4 text-sm leading-relaxed text-slate-300'>
              BetterGov Sorsogon is an unofficial, community-run portal. It is
              not affiliated with any government office or official.
            </p>
          </div>

          {/* Link columns — Navigate and Data sources */}
          {footerNavigation.sections.map(section => (
            <div key={section.title}>
              <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-400'>
                {section.title}
              </h3>
              <ul className='mt-4 space-y-2.5'>
                {section.links.map(link => {
                  const external = link.href.startsWith('http');
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={`inline-flex items-center gap-1 ${linkClass}`}
                        >
                          {link.label}
                          <ArrowUpRight
                            aria-hidden='true'
                            className='h-3.5 w-3.5 opacity-50'
                          />
                        </a>
                      ) : (
                        <Link to={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Credits */}
          <div>
            <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-400'>
              Credits
            </h3>
            <ul className='mt-4 space-y-2.5 text-sm leading-relaxed text-slate-300'>
              <li>
                <a
                  href='https://github.com/johnpaulgarcia/bettersorsogon.org'
                  target='_blank'
                  rel='noopener noreferrer'
                  data-umami-event='github-footer'
                  className={creditLinkClass}
                >
                  Contribute on GitHub
                </a>{' '}
                — corrections, photos, and code welcome
              </li>
              <li>
                Built on the open-source{' '}
                <a
                  href='https://bettergov.ph'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={creditLinkClass}
                >
                  BetterGov.ph
                </a>{' '}
                (
                <a
                  href='https://github.com/bettergovph/bettergov'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={creditLinkClass}
                >
                  GitHub
                </a>
                , CC0)
              </li>
              <li className='text-slate-400'>
                Content: community-verified as of 2026-08-20
              </li>
              <li className='text-slate-400'>
                Code: open source · Content: CC BY 4.0
              </li>
            </ul>
          </div>
        </div>

        {/* Amber hairline + small print */}
        <div className='mt-14'>
          <div className='h-px w-full bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent' />
          <div className='mt-6 flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-slate-300'>
              Cost to the People of Sorsogon:{' '}
              <span className='font-semibold tabular-nums text-amber-400'>
                ₱0
              </span>
              {' · '}Contact us:{' '}
              <a
                href='mailto:hello@bettersorsogon.org'
                className='rounded text-brand-300 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
              >
                hello@bettersorsogon.org
              </a>
            </p>
            <div className='flex items-center gap-4'>
              <span>&copy; {year} BetterGov Sorsogon</span>
              {version && (
                <span className='tabular-nums text-slate-500'>
                  Ver. {version}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
