import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';
import {
  Badge,
  Btn,
  Card,
  ContactRow,
  EmergencyCard,
  PageHeader,
  Section,
  StatCard,
  UnverifiedBadge,
} from '../../components/sorsogon/kit';
import {
  displayUrl,
  hotlines,
  isUnverified,
  lgus,
  telHref,
  titleCase,
} from '../../components/sorsogon/directory/data';

/**
 * LGU detail page — rendered at /directory/:slug. Renders strictly from the
 * verified dataset: officials, whatever public contact channels exist, local
 * emergency numbers, census figures, and the sources behind them.
 */
const LguDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const lgu = lgus.find(item => item.slug === slug);

  if (!lgu) {
    return (
      <>
        <SEO title='Local government not found' noIndex />
        <PageHeader
          eyebrow='Directory'
          title='Local government not found'
          subtitle="We couldn't find that city or municipality in the Sorsogon directory."
          hideNote
        />
        <Section>
          <Card className='max-w-xl'>
            <p className='text-[15px] leading-relaxed text-slate-600'>
              This page isn't one of the fifteen local governments of Sorsogon.
              The address may have been mistyped or the page may have moved.
            </p>
            <div className='mt-6'>
              <Btn to='/directory' variant='secondary'>
                Back to the directory
              </Btn>
            </div>
          </Card>
        </Section>
      </>
    );
  }

  const localHotlines = hotlines.filter(hotline => hotline.scope === lgu.slug);
  const hasFacebook = Boolean(lgu.facebook);
  const hasWebsite = Boolean(lgu.website);
  const hasDirectContact =
    Boolean(lgu.address) || lgu.phone.length > 0 || Boolean(lgu.email);
  const hasStats = lgu.population_2020 != null || lgu.barangays != null;

  return (
    <>
      <SEO title={lgu.name} />

      <header className='border-b border-slate-200 bg-white'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16'>
          <nav aria-label='Breadcrumb' className='text-sm text-slate-400'>
            <Link
              to='/directory'
              className='rounded transition-colors duration-150 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
            >
              Directory
            </Link>
            <span className='px-2' aria-hidden='true'>
              /
            </span>
            <span className='text-slate-500'>{lgu.name}</span>
          </nav>

          <h1 className='mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900'>
            {lgu.name}
          </h1>
          <div className='mt-5 h-px w-12 bg-amber-400' />

          <div className='mt-5 flex flex-wrap items-center gap-2'>
            <Badge variant='teal'>{titleCase(lgu.type)}</Badge>
            {lgu.income_class && (
              <Badge variant='slate'>{lgu.income_class} income class</Badge>
            )}
            <span className='text-sm tabular-nums text-slate-500'>
              ZIP {lgu.zip_code}
            </span>
          </div>
        </div>
      </header>

      <Section>
        <div className='grid gap-6 md:grid-cols-2'>
          {/* Officials & contact */}
          <Card as='article'>
            <h2 className='text-base font-semibold tracking-tight text-slate-900'>
              Officials &amp; Contact
            </h2>

            <dl className='mt-4 divide-y divide-slate-100'>
              <div className='flex items-baseline justify-between gap-4 py-2.5'>
                <dt className='text-sm text-slate-500'>Mayor</dt>
                <dd className='text-right text-sm font-medium text-slate-800'>
                  {lgu.mayor.name}
                </dd>
              </div>
              <div className='flex items-baseline justify-between gap-4 py-2.5'>
                <dt className='text-sm text-slate-500'>Vice Mayor</dt>
                <dd className='text-right text-sm font-medium text-slate-800'>
                  {lgu.vice_mayor.name}
                </dd>
              </div>
            </dl>

            {(hasWebsite || hasFacebook) && (
              <div className='mt-4 space-y-1 border-t border-slate-100 pt-4 [overflow-wrap:anywhere]'>
                {lgu.website && (
                  <ContactRow
                    label='Website'
                    value={displayUrl(lgu.website)}
                    href={lgu.website}
                    icon={<ExternalLink className='h-4 w-4' aria-hidden='true' />}
                  />
                )}
                {lgu.facebook && (
                  <ContactRow
                    label='Facebook'
                    value='Official page'
                    href={lgu.facebook}
                    icon={<ExternalLink className='h-4 w-4' aria-hidden='true' />}
                  />
                )}
              </div>
            )}

            {!hasDirectContact && (
              <p className='mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-500'>
                The municipal hall's direct contact details are not yet published
                on a verifiable official source.
              </p>
            )}
          </Card>

          {/* Local emergency numbers */}
          <EmergencyCard title={`Emergency numbers in ${lgu.name}`}>
            {localHotlines.length > 0 ? (
              <ul className='space-y-4'>
                {localHotlines.map(hotline => (
                  <li
                    key={hotline.name}
                    className='border-b border-red-100 pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex flex-wrap items-center gap-2'>
                      <span className='text-sm font-medium text-slate-700'>
                        {hotline.name}
                      </span>
                      {isUnverified(hotline.verification) && <UnverifiedBadge />}
                    </div>
                    <div className='mt-1.5 flex flex-wrap gap-x-5 gap-y-1'>
                      {hotline.numbers.map(number => (
                        <a
                          key={number}
                          href={telHref(number)}
                          className='rounded text-lg font-semibold tabular-nums text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p className='text-sm leading-relaxed text-slate-600'>
                  No verified local numbers yet — see province-wide hotlines.
                </p>
                <Btn to='/hotlines' variant='secondary' className='mt-4'>
                  Province-wide hotlines
                </Btn>
              </div>
            )}
          </EmergencyCard>
        </div>

        {hasStats && (
          <div className='mt-8 grid gap-6 sm:grid-cols-2'>
            {lgu.population_2020 != null && (
              <StatCard
                value={lgu.population_2020.toLocaleString('en-US')}
                label='Residents · 2020 Census'
              />
            )}
            {lgu.barangays != null && (
              <StatCard value={lgu.barangays} label='Barangays' />
            )}
          </div>
        )}

        {lgu.sources.length > 0 && (
          <details className='mt-10'>
            <summary className='inline-flex cursor-pointer items-center rounded text-sm font-medium text-slate-500 transition-colors duration-150 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'>
              Data sources
            </summary>
            <ul className='mt-3 space-y-2'>
              {lgu.sources.map(source => (
                <li key={source}>
                  <a
                    href={source}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-start gap-1.5 rounded text-sm text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 [overflow-wrap:anywhere]'
                  >
                    <ExternalLink
                      className='mt-0.5 h-3.5 w-3.5 shrink-0'
                      aria-hidden='true'
                    />
                    <span>{displayUrl(source)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}
      </Section>

      <Section
        variant='slate'
        title={`Explore ${lgu.name}`}
        description='Services, places to visit, and the emergency lines that cover this area.'
      >
        <div className='grid gap-6 sm:grid-cols-3'>
          <Card to='/services' className='group h-full'>
            <div className='flex items-start justify-between gap-3'>
              <h3 className='text-base font-semibold tracking-tight text-slate-900'>
                Government services
              </h3>
              <ChevronRight
                className='mt-0.5 h-5 w-5 shrink-0 text-slate-300 transition-colors duration-150 group-hover:text-teal-800'
                aria-hidden='true'
              />
            </div>
            <p className='mt-2 text-sm leading-relaxed text-slate-500'>
              Permits, certificates, and how to request them across Sorsogon.
            </p>
          </Card>

          <Card to='/tourism' className='group h-full'>
            <div className='flex items-start justify-between gap-3'>
              <h3 className='text-base font-semibold tracking-tight text-slate-900'>
                Things to do
              </h3>
              <ChevronRight
                className='mt-0.5 h-5 w-5 shrink-0 text-slate-300 transition-colors duration-150 group-hover:text-teal-800'
                aria-hidden='true'
              />
            </div>
            <p className='mt-2 text-sm leading-relaxed text-slate-500'>
              Beaches, nature, and heritage sites around {lgu.name} and the
              wider province.
            </p>
          </Card>

          <Card to='/hotlines' className='group h-full'>
            <div className='flex items-start justify-between gap-3'>
              <h3 className='text-base font-semibold tracking-tight text-slate-900'>
                Emergency hotlines
              </h3>
              <ChevronRight
                className='mt-0.5 h-5 w-5 shrink-0 text-slate-300 transition-colors duration-150 group-hover:text-teal-800'
                aria-hidden='true'
              />
            </div>
            <p className='mt-2 text-sm leading-relaxed text-slate-500'>
              Police, fire, medical, and disaster numbers for every area.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default LguDetailPage;
