import { FC } from 'react';
import { ExternalLink, Phone, Square } from 'lucide-react';
import SEO from '../../components/SEO';
import {
  Btn,
  Card,
  EmergencyCard,
  PageHeader,
  Section,
} from '../../components/sorsogon/kit';
import hotlinesData from '../../data/sorsogon/hotlines.json';

/* ------------------------------------------------------------------ */
/* Types + helpers (urgent contacts rendered strictly from data).      */
/* ------------------------------------------------------------------ */
type Hotline = {
  name: string;
  category: string;
  scope: string;
  numbers: string[];
  facebook: string | null;
  notes: string | null;
  sources: string[];
  verification: string;
};

const hotlines = hotlinesData.hotlines as Hotline[];

const humanize = (slug: string): string =>
  slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const telHref = (num: string): string => `tel:${num.replace(/[^\d+]/g, '')}`;

const domainOf = (url: string): string => {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
};

/* Section 1 — provincial/national help for the categories that matter now. */
const HELP_CATEGORIES = new Set(['emergency', 'disaster', 'medical']);
const urgentHotlines = hotlines.filter(
  h =>
    (h.scope === 'national' || h.scope === 'province') &&
    HELP_CATEGORIES.has(h.category)
);

/* Section 2 — provincial DRRMO Facebook pages, if any exist in the data. */
const pdrrmoLinks = hotlines.filter(
  h => h.scope === 'province' && h.category === 'disaster' && h.facebook
);

/* Fixed national monitoring agencies (official sites, not phone numbers). */
const officialSources = [
  {
    title: 'PAGASA',
    desc: 'Weather forecasts, tropical cyclone tracking, and rainfall or flood advisories.',
    href: 'https://www.pagasa.dost.gov.ph',
  },
  {
    title: 'PHIVOLCS',
    desc: 'Bulusan Volcano bulletins, plus earthquake and tsunami information.',
    href: 'https://www.phivolcs.dost.gov.ph',
  },
  {
    title: 'NDRRMC',
    desc: 'National disaster situation reports, advisories, and response updates.',
    href: 'https://ndrrmc.gov.ph',
  },
];

/* ------------------------------------------------------------------ */
/* Static reference content (general, PAGASA-accurate, no local policy).*/
/* ------------------------------------------------------------------ */
const windSignals = [
  {
    n: 1,
    winds: '39–61 km/h',
    lead: 'within 36 hrs',
    impact:
      'Minimal to minor threat. Twigs and small branches may break; very light damage to houses of light materials.',
  },
  {
    n: 2,
    winds: '62–88 km/h',
    lead: 'within 24 hrs',
    impact:
      'Minor to moderate threat. Old or poorly built structures may be damaged; some trees may tilt or be uprooted.',
  },
  {
    n: 3,
    winds: '89–117 km/h',
    lead: 'within 18 hrs',
    impact:
      'Moderate to significant threat. Many light-material houses may be unroofed; many trees uprooted; travel becomes dangerous.',
  },
  {
    n: 4,
    winds: '118–184 km/h',
    lead: 'within 12 hrs',
    impact:
      'Significant to severe threat. Extensive damage to light structures; many sturdier buildings affected; widespread power and communication outages.',
  },
  {
    n: 5,
    winds: '≥185 km/h',
    lead: 'within 12 hrs',
    impact:
      'Extreme threat to life and property. Violent winds; most structures may suffer severe damage; widespread destruction expected.',
  },
];

const goBag = [
  { item: 'Water', hint: '1 gallon per person per day, 3-day supply' },
  { item: 'Food', hint: 'Non-perishable, ready-to-eat, 3-day supply' },
  { item: 'Medicine', hint: 'Maintenance medicines and prescriptions' },
  { item: 'Flashlight', hint: 'With spare batteries' },
  {
    item: 'Battery or hand-crank radio',
    hint: 'For official bulletins when power is out',
  },
  { item: 'Power bank', hint: 'Fully charged, with charging cables' },
  {
    item: 'Important documents',
    hint: 'IDs and records sealed in a waterproof bag',
  },
  { item: 'Cash', hint: 'Small bills; card and ATM systems may be down' },
  { item: 'Whistle', hint: 'To signal for help if trapped' },
  { item: 'First-aid kit', hint: 'Bandages, antiseptic, gloves' },
  { item: 'Extra clothes', hint: 'Sturdy shoes and rain gear' },
  { item: 'Hygiene items', hint: 'Soap, toothbrush, sanitary supplies' },
];

const phases = [
  {
    title: 'Before',
    steps: [
      'Monitor PAGASA and your local DRRMO for the latest wind signal and warnings.',
      'Ready your go-bag and at least three days of water, food, and medicine.',
      'Fully charge phones and power banks; save emergency numbers offline.',
      'Secure or bring in loose objects; reinforce roofs, doors, and windows.',
      'Know your evacuation center and route; leave early if you are in a flood- or landslide-prone area.',
      'Seal documents and valuables in waterproof bags and move them to higher ground.',
    ],
  },
  {
    title: 'During',
    steps: [
      'Stay indoors and away from windows; keep listening to official bulletins.',
      'Evacuate at once if advised by authorities, or if flooding or landslides begin.',
      'Switch off the main electrical supply if flooding threatens your home.',
      'Never cross flooded roads, rivers, or bridges — turn around, do not drown.',
      'Do not go out during the calm eye of the storm; strong winds return quickly.',
      'Conserve battery; use text messages or short calls to reach family.',
    ],
  },
  {
    title: 'After',
    steps: [
      'Wait for authorities to declare it safe before returning home or travelling.',
      'Watch for downed power lines, weakened structures, and standing floodwater.',
      'Do not use wet electrical appliances until they have been checked.',
      'Boil or disinfect water if you are unsure it is safe to drink.',
      'Photograph damage for assistance claims and check on your neighbours.',
      'Clean and dry your home; avoid wading in floodwater to prevent leptospirosis.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* LinkCard — external official source, styled to match kit Card.      */
/* ------------------------------------------------------------------ */
const LinkCard: FC<{ href: string; title: string; desc: string }> = ({
  href,
  title,
  desc,
}) => (
  <Card href={href} className='group'>
    <div className='flex items-center justify-between gap-3'>
      <h3 className='text-base font-semibold tracking-tight text-slate-900'>
        {title}
      </h3>
      <ExternalLink
        aria-hidden='true'
        className='h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-teal-800'
      />
    </div>
    <p className='mt-2 text-sm leading-relaxed text-slate-600'>{desc}</p>
    <p className='mt-3 text-xs uppercase tracking-wide text-slate-400'>
      {domainOf(href)}
    </p>
  </Card>
);

/* ------------------------------------------------------------------ */
/* DisasterPage (/disaster)                                            */
/* ------------------------------------------------------------------ */
const DisasterPage: FC = () => (
  <>
    <SEO title='Typhoon & Disaster Guide' />
    <PageHeader
      eyebrow='Preparedness'
      title='Typhoon & Disaster Guide'
      subtitle='Sorsogon sits along the Bicol typhoon corridor and beneath Bulusan Volcano. Keep this guide ready: who to call, where to check, and what to do before, during, and after a storm.'
    />

    {/* 1 — Immediate help ------------------------------------------- */}
    <Section
      eyebrow='Immediate help'
      title='If you need help now'
      description='Call the line that matches your emergency. Provincial and national teams operate around the clock.'
      variant='white'
    >
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {urgentHotlines.map(h => (
          <EmergencyCard key={h.name} title={h.name}>
            <div className='flex flex-col items-start gap-1'>
              {h.numbers.map(num => (
                <a
                  key={num}
                  href={telHref(num)}
                  className='inline-flex min-h-11 w-fit items-center gap-2 rounded text-lg font-semibold tabular-nums text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
                >
                  <Phone
                    aria-hidden='true'
                    className='h-4 w-4 shrink-0 text-teal-700/70'
                  />
                  {num}
                </a>
              ))}
            </div>
            <p className='mt-3 text-xs font-medium uppercase tracking-wide text-red-700/70'>
              {humanize(h.scope)} · {humanize(h.category)}
            </p>
          </EmergencyCard>
        ))}
      </div>
    </Section>

    {/* 2 — Official updates ----------------------------------------- */}
    <Section
      eyebrow='Stay informed'
      title='Where to check official updates'
      description='Trust primary sources for signals and bulletins. Beware of unverified forwards during a storm.'
      variant='slate'
    >
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {officialSources.map(source => (
          <LinkCard
            key={source.href}
            href={source.href}
            title={source.title}
            desc={source.desc}
          />
        ))}
        {pdrrmoLinks.map(h => (
          <LinkCard
            key={h.name}
            href={h.facebook as string}
            title={h.name}
            desc='Official Facebook page for provincial disaster advisories, evacuation notices, and situation updates.'
          />
        ))}
      </div>
    </Section>

    {/* 3 — Wind signals --------------------------------------------- */}
    <Section
      eyebrow='Reference'
      title='Tropical cyclone wind signals'
      description='PAGASA raises a wind signal for areas expecting tropical-cyclone winds. Higher numbers mean stronger winds and less time to prepare.'
      variant='white'
    >
      <div className='overflow-x-auto rounded-2xl border border-slate-200'>
        <table className='w-full min-w-[640px] border-collapse text-left text-sm'>
          <thead className='bg-slate-50 text-xs uppercase tracking-wide text-slate-500'>
            <tr>
              <th className='px-4 py-3 font-semibold'>Signal</th>
              <th className='px-4 py-3 font-semibold'>Winds</th>
              <th className='px-4 py-3 font-semibold'>Lead time</th>
              <th className='px-4 py-3 font-semibold'>What to expect</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {windSignals.map(s => (
              <tr key={s.n} className='align-top'>
                <td className='px-4 py-4'>
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold tabular-nums ${
                      s.n >= 3
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {s.n}
                  </span>
                </td>
                <td className='whitespace-nowrap px-4 py-4 font-semibold tabular-nums text-slate-900'>
                  {s.winds}
                </td>
                <td className='whitespace-nowrap px-4 py-4 text-slate-600'>
                  {s.lead}
                </td>
                <td className='px-4 py-4 leading-relaxed text-slate-600'>
                  {s.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className='mt-4 text-sm leading-relaxed text-slate-500'>
        Wind ranges follow PAGASA&rsquo;s Tropical Cyclone Wind Signal (TCWS)
        system, which replaced the older Public Storm Warning Signals. Always
        check{' '}
        <a
          href='https://www.pagasa.dost.gov.ph'
          target='_blank'
          rel='noopener noreferrer'
          className='rounded font-medium text-teal-800 transition-colors duration-150 hover:text-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2'
        >
          PAGASA
        </a>{' '}
        for the signal currently in effect for your area.
      </p>
    </Section>

    {/* 4 — Go-bag --------------------------------------------------- */}
    <Section
      eyebrow='Prepare'
      title='Go-bag checklist'
      description='Pack a bag you can grab in under a minute. Keep it dry, accessible, and ready before the rains begin.'
      variant='slate'
    >
      <Card>
        <ul className='grid gap-x-8 gap-y-4 sm:grid-cols-2'>
          {goBag.map(entry => (
            <li key={entry.item} className='flex items-start gap-3'>
              <Square
                aria-hidden='true'
                className='mt-0.5 h-5 w-5 shrink-0 text-teal-700'
              />
              <div>
                <p className='text-[15px] font-medium text-slate-900'>
                  {entry.item}
                </p>
                <p className='text-sm text-slate-500'>{entry.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Section>

    {/* 5 — Before / During / After ---------------------------------- */}
    <Section
      eyebrow='Action plan'
      title='Before, during & after'
      description='Practical steps for each stage of a typhoon. Follow the instructions of your local officials first.'
      variant='white'
    >
      <div className='grid gap-6 md:grid-cols-3'>
        {phases.map(phase => (
          <Card key={phase.title}>
            <h3 className='text-base font-semibold tracking-tight text-slate-900'>
              {phase.title}
            </h3>
            <ol className='mt-4 space-y-3'>
              {phase.steps.map((step, i) => (
                <li key={i} className='flex gap-3'>
                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-800 text-xs font-semibold tabular-nums text-white'>
                    {i + 1}
                  </span>
                  <span className='text-sm leading-relaxed text-slate-600'>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>
    </Section>

    {/* 6 — Evacuation closing --------------------------------------- */}
    <Section variant='slate'>
      <Card className='border-teal-800/20 bg-teal-50/40'>
        <div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h3 className='text-base font-semibold tracking-tight text-slate-900'>
              Where do I evacuate?
            </h3>
            <p className='mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600'>
              Evacuation centers are designated by your municipal or city DRRMO
              (MDRRMO/CDRRMO) and can change with each storm. Contact your local
              disaster office for the nearest active center and any pre-emptive
              evacuation orders.
            </p>
          </div>
          <Btn to='/hotlines' variant='primary' className='shrink-0'>
            Find your DRRMO hotline
          </Btn>
        </div>
      </Card>
    </Section>
  </>
);

export default DisasterPage;
