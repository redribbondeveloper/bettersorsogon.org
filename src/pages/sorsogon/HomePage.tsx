import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Siren,
  Building2,
  FileText,
  Wind,
  Compass,
  Mail,
  Globe,
  Facebook,
} from 'lucide-react';
import SEO from '../../components/SEO';
import {
  HeroShell,
  Section,
  Card,
  StatCard,
  ContactRow,
  Btn,
  WaveDivider,
} from '../../components/sorsogon/kit';
import ActionCard from '../../components/sorsogon/home/ActionCard';
import LeaderCard from '../../components/sorsogon/home/LeaderCard';
import ExchangeRates from '../../components/sorsogon/home/ExchangeRates';
import LguCard from '../../components/sorsogon/directory/LguCard';
import lguDataRaw from '../../data/sorsogon/lgus.json';

/* ------------------------------------------------------------------ */
/* Types — the page renders strictly from lgus.json.                   */
/* ------------------------------------------------------------------ */
interface Official {
  name: string;
}
interface Lgu {
  name: string;
  slug: string;
  type: 'city' | 'municipality';
  zip_code: string;
  income_class: string | null;
  population_2020: number | null;
  barangays: number | null;
  mayor: Official;
  vice_mayor: Official;
  address: string | null;
  phone: string[];
  email: string | null;
  facebook: string | null;
  website: string | null;
  sources: string[];
  verification: string;
}
interface Province {
  name: string;
  governor: Official;
  vice_governor: Official;
  address: string;
  phone: string[];
  email: string | null;
  website: string | null;
  facebook: string | null;
  sources: string[];
  verification: string;
}
interface LguData {
  generated: string;
  verified_at: string;
  province: Province;
  lgus: Lgu[];
}

const data = lguDataRaw as unknown as LguData;
const { province, lgus } = data;

const fmt = (n: number): string => n.toLocaleString('en-US');

const displayUrl = (url: string): string =>
  url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/+$/, '');

/* ------------------------------------------------------------------ */
/* Derived stats.                                                      */
/* ------------------------------------------------------------------ */
const cityCount = lgus.filter(l => l.type === 'city').length;
const municipalityCount = lgus.filter(l => l.type === 'municipality').length;

const barangayValues = lgus
  .map(l => l.barangays)
  .filter((b): b is number => typeof b === 'number');
const populationValues = lgus
  .map(l => l.population_2020)
  .filter((p): p is number => typeof p === 'number');

const totalBarangays = barangayValues.reduce((a, b) => a + b, 0);
const totalPopulation = populationValues.reduce((a, b) => a + b, 0);

// Only surface a computed stat when most LGUs actually carry the figure.
const majority = lgus.length / 2;
const showBarangays = barangayValues.length >= majority;
const showPopulation = populationValues.length >= majority;

const mostRequested: { label: string; to: string }[] = [
  { label: 'Birth certificate', to: '/services' },
  { label: 'Business permit', to: '/services' },
  { label: 'Real property tax', to: '/services' },
  { label: 'PhilHealth', to: '/services' },
  { label: 'Scholarships', to: '/services' },
];

const provinceUnverified = province.verification === 'single-source';

/* ------------------------------------------------------------------ */
/* Page.                                                               */
/* ------------------------------------------------------------------ */
const HomePage: FC = () => {
  return (
    <>
      <SEO title='Home' />

      {/* Hero + "What do you need today?" action panel */}
      <HeroShell
        eyebrow='MARHAY NA ALDAW · PROVINCE OF SORSOGON'
        title='Government services and emergency lines for all of Sorsogon'
        subtitle={
          <>
            The unofficial, community-run guide to government services, offices,
            and emergency lines across all of Sorsogon.
            <span className='mt-3 block text-sm text-slate-300'>
              Not an official government website — independently maintained by
              volunteers.
            </span>
          </>
        }
      >
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-400'>
            What do you need today?
          </p>
          <div className='mt-5 grid gap-4'>
            <ActionCard
              wide
              emergency
              to='/hotlines'
              title='Emergency Hotlines'
              description='Police, fire, medical, rescue, and coast guard numbers for every part of Sorsogon.'
              icon={<Siren className='h-6 w-6' />}
            />
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <ActionCard
                to='/directory'
                title='Find an Office'
                description='Local government units, mayors, and where to reach them.'
                icon={<Building2 className='h-6 w-6' />}
              />
              <ActionCard
                to='/services'
                title='Get a Service'
                description='Permits, certificates, and how to request them.'
                icon={<FileText className='h-6 w-6' />}
              />
              <ActionCard
                to='/disaster'
                title='Typhoon & Disaster Guide'
                description='Prepare, evacuate, and recover safely.'
                icon={<Wind className='h-6 w-6' />}
              />
              <ActionCard
                to='/tourism'
                title='Explore Sorsogon'
                description='Whale sharks, volcanoes, and island escapes.'
                icon={<Compass className='h-6 w-6' />}
              />
            </div>
          </div>
        </div>
      </HeroShell>

      {/* Most requested — slim utility bar */}
      <div className='border-b border-slate-200 bg-white'>
        <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6'>
            <p className='shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600'>
              Most requested
            </p>
            <ul className='flex flex-wrap items-center gap-x-5 gap-y-2'>
              {mostRequested.map(item => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='rounded text-sm font-medium text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Peso exchange rates — OFW-relevant, live, and fail-silent */}
      <ExchangeRates />

      {/* Stats */}
      <Section
        variant='slate'
        eyebrow='Sorsogon at a glance'
        title='One province, fifteen local governments'
      >
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          <StatCard value={fmt(cityCount)} label='City' />
          <StatCard value={fmt(municipalityCount)} label='Municipalities' />
          {showBarangays && (
            <StatCard value={fmt(totalBarangays)} label='Barangays' />
          )}
          {showPopulation && (
            <StatCard
              value={fmt(totalPopulation)}
              label='Residents · 2020 Census'
            />
          )}
        </div>
      </Section>

      {/* Provincial Leadership */}
      <Section
        eyebrow='Provincial Leadership'
        title='The provincial government'
        description='The Provincial Government of Sorsogon sits at the Capitol in Sorsogon City.'
      >
        <div className='grid gap-6 lg:grid-cols-3'>
          <LeaderCard name={province.governor.name} title='Governor' />
          <LeaderCard
            name={province.vice_governor.name}
            title='Vice Governor'
          />
          <Card>
            <h3 className='text-base font-semibold tracking-tight text-slate-900'>
              Provincial Capitol
            </h3>
            <p className='mt-1 text-sm leading-relaxed text-slate-500'>
              {province.address}
            </p>
            <div className='mt-4 divide-y divide-slate-100'>
              {province.email && (
                <ContactRow
                  label='Email'
                  value={province.email}
                  href={`mailto:${province.email}`}
                  icon={<Mail className='h-4 w-4' />}
                  unverified={provinceUnverified}
                />
              )}
              {province.facebook && (
                <ContactRow
                  label='Facebook'
                  value={displayUrl(province.facebook)}
                  href={province.facebook}
                  icon={<Facebook className='h-4 w-4' />}
                  unverified={provinceUnverified}
                />
              )}
              {province.website && (
                <ContactRow
                  label='Website'
                  value={displayUrl(province.website)}
                  href={province.website}
                  icon={<Globe className='h-4 w-4' />}
                  unverified={provinceUnverified}
                />
              )}
            </div>
          </Card>
        </div>
      </Section>

      {/* Cities & Municipalities */}
      <Section
        variant='slate'
        eyebrow='Local Government'
        title='Cities & Municipalities'
        description='All fifteen local government units of the province. Select one for its officials and offices.'
      >
        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {lgus.map(lgu => (
            <LguCard key={lgu.slug} lgu={lgu} />
          ))}
        </ul>
      </Section>

      {/* Why this exists — closing dark band */}
      <section className='relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white'>
        <WaveDivider className='pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full text-teal-300' />
        <div className='relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-400'>
            Why this exists
          </p>
          <h2 className='mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-3xl'>
            Public information should be easy to find — especially when a typhoon
            is coming.
          </h2>
          <p className='mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-300'>
            BetterGov Sorsogon gathers the province&rsquo;s offices, services,
            and emergency lines into one clear, fast, mobile-friendly place —
            built and maintained by volunteers, free for everyone to use.
          </p>
          <div className='mt-8'>
            <Btn
              to='/about'
              variant='secondary'
              className='border-white/40! text-white! hover:border-white! hover:bg-white/10! hover:text-white!'
            >
              About this project
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
