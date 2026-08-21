import { FC, ReactNode } from 'react';
import SEO from '../../components/SEO';
import {
  PageHeader,
  Section,
  Card,
  UnverifiedBadge,
  Btn,
} from '../../components/sorsogon/kit';
import lgus from '../../data/sorsogon/lgus.json';

/* ------------------------------------------------------------------ */
/* Local helpers for the About page.                                   */
/* ------------------------------------------------------------------ */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Format an ISO yyyy-mm-dd date without timezone drift. */
function formatVerifiedDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Inline external link, styled to the kit's brand link convention. */
const Ext: FC<{ href: string; children: ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='rounded text-brand-800 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-brand-900 hover:decoration-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
  >
    {children}
  </a>
);

/** The three-step verification pipeline. */
const PIPELINE: { title: string; body: string }[] = [
  {
    title: 'Researched from official sources',
    body: 'Each entry begins with a primary, government-published source — never hearsay or an unverified repost.',
  },
  {
    title: 'Independently cross-checked',
    body: 'A second volunteer confirms every detail against that source before it is trusted for publication.',
  },
  {
    title: 'Published with its source links',
    body: 'The links an entry was built from travel with it, so anyone can retrace and check our work.',
  },
];

/* Shared editorial column width — a single readable measure. */
const COL = 'max-w-3xl';

/**
 * About — what this portal is, who maintains it, where its data comes from,
 * and its limits. Editorial single-column reading page.
 */
const AboutPage: FC = () => {
  return (
    <>
      <SEO title='About' />
      <PageHeader
        eyebrow='About'
        title='About BetterGov Sorsogon'
        subtitle='An unofficial, community-run portal that gathers the public information Sorsoganons need — contacts, hotlines, services, and disaster guidance — into one place that is easy to search and easy to check.'
      />

      {/* 1 — What is BetterGov Sorsogon? */}
      <Section
        variant='white'
        eyebrow='The project'
        title='What is BetterGov Sorsogon?'
      >
        <div
          className={`${COL} space-y-4 text-[15px] leading-relaxed text-slate-600`}
        >
          <p>
            BetterGov Sorsogon is a volunteer, community-run website for the whole
            Province of Sorsogon. It brings everyday public information together —
            from the provincial capitol in Sorsogon City to all 15 local
            government units (LGUs) — so residents can find a phone number, an
            office, or a service without hunting across a dozen scattered pages.
          </p>
          <p>
            It is built by people who live here and simply want government
            information to be easier to reach. It is free to use and always will
            be.
          </p>
        </div>

        <Card className={`${COL} mt-8 border-l-4 border-l-amber-400`}>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-600'>
            Please read
          </p>
          <p className='mt-3 text-[15px] leading-relaxed text-slate-700'>
            This is{' '}
            <strong className='font-semibold text-slate-900'>
              not a government website.
            </strong>{' '}
            BetterGov Sorsogon is independent and is not affiliated with, endorsed
            by, or operated by the Provincial Government of Sorsogon, any city or
            municipal government, or any public office or official. For official
            transactions, always confirm directly with the office concerned.
          </p>
        </Card>
      </Section>

      {/* 2 — Why it exists */}
      <Section variant='slate' eyebrow='Mission' title='Why it exists'>
        <div
          className={`${COL} space-y-4 text-[15px] leading-relaxed text-slate-600`}
        >
          <p>
            When you need a government contact, you usually need it quickly — and
            too often it is buried in an old post, a screenshot, or a page that no
            longer loads. Sorsogon sits along a coast that faces real typhoons, and
            in those moments the gap between a working hotline and a dead link is
            not an inconvenience. It is safety.
          </p>
          <p>
            So the aim is plain: take information the public already has a right to,
            and make it fast to find, clear to read, and honest about how sure we
            are.
          </p>
        </div>

        <figure className={`${COL} mt-10`}>
          <div className='h-px w-12 bg-amber-400' />
          <blockquote className='mt-6 text-xl font-medium leading-snug tracking-tight text-slate-900 md:text-2xl'>
            Public information should be easy to find — especially when a typhoon
            is coming.
          </blockquote>
        </figure>
      </Section>

      {/* 3 — Where the data comes from */}
      <Section
        variant='white'
        eyebrow='Sources & method'
        title='Where the data comes from'
      >
        <div
          className={`${COL} space-y-4 text-[15px] leading-relaxed text-slate-600`}
        >
          <p>
            Everything here is compiled from public, official sources — and every
            entry keeps the links it came from, so you never have to take our word
            for it:
          </p>
        </div>

        <ul className={`${COL} mt-6 space-y-3`}>
          <li className='flex gap-3 text-[15px] leading-relaxed text-slate-600'>
            <span
              aria-hidden='true'
              className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700'
            />
            <span>
              <span className='font-medium text-slate-900'>
                Official government websites
              </span>{' '}
              — such as{' '}
              <Ext href='https://sorsogon.gov.ph'>sorsogon.gov.ph</Ext>, the
              Philippine Coast Guard at{' '}
              <Ext href='https://coastguard.gov.ph'>coastguard.gov.ph</Ext>, and
              national agency portals.
            </span>
          </li>
          <li className='flex gap-3 text-[15px] leading-relaxed text-slate-600'>
            <span
              aria-hidden='true'
              className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700'
            />
            <span>
              <span className='font-medium text-slate-900'>DILG directories</span>{' '}
              — the Department of the Interior and Local Government's published
              lists of local officials and offices.
            </span>
          </li>
          <li className='flex gap-3 text-[15px] leading-relaxed text-slate-600'>
            <span
              aria-hidden='true'
              className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700'
            />
            <span>
              <span className='font-medium text-slate-900'>
                Official LGU Facebook pages
              </span>{' '}
              — the verified pages the province and its cities and municipalities
              use to reach the public.
            </span>
          </li>
        </ul>

        <div className={`${COL} mt-8 flex items-center gap-3`}>
          <span aria-hidden='true' className='h-px w-8 shrink-0 bg-amber-400' />
          <p className='text-sm text-slate-500'>
            Data verified as of{' '}
            <span className='font-medium text-slate-700'>
              {formatVerifiedDate(lgus.verified_at)}
            </span>
            .
          </p>
        </div>

        <div className={`${COL} mt-12`}>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
            How each entry is checked
          </p>
          <p className='mt-3 text-[15px] leading-relaxed text-slate-600'>
            Before it appears on the site, every entry passes three checks:
          </p>

          <ol className='mt-6 space-y-6'>
            {PIPELINE.map((step, i) => (
              <li key={step.title} className='flex gap-4'>
                <span
                  aria-hidden='true'
                  className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold tabular-nums text-white'
                >
                  {i + 1}
                </span>
                <div>
                  <p className='text-[15px] font-semibold text-slate-900'>
                    {step.title}
                  </p>
                  <p className='mt-1 text-[15px] leading-relaxed text-slate-600'>
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className='mt-8 text-[15px] leading-relaxed text-slate-600'>
            Anything we cannot independently confirm is marked{' '}
            <UnverifiedBadge /> or left out entirely. When in doubt, we would
            rather show less than show something wrong.
          </p>
        </div>
      </Section>

      {/* 4 — Help keep it accurate */}
      <Section
        id='contribute'
        variant='slate'
        eyebrow='Contribute'
        title='Help keep it accurate'
      >
        <div
          className={`${COL} space-y-4 text-[15px] leading-relaxed text-slate-600`}
        >
          <p>
            Spotted a wrong number, a changed office, or a link that no longer
            works? Corrections are welcome — and so is help. Whether you can verify
            a single hotline for your municipality or maintain a whole section,
            there is a place for you here.
          </p>
          <p>
            BetterGov Sorsogon is open source and built on{' '}
            <Ext href='https://bettergov.ph'>BetterGov.ph</Ext>, the volunteer
            civic project released into the public domain (CC0). You are free to
            read and reuse the underlying code on{' '}
            <Ext href='https://github.com/bettergovph/bettergov'>GitHub</Ext>.
          </p>
        </div>

        <div className={`${COL} mt-6 flex flex-wrap gap-3`}>
          <Btn
            variant='secondary'
            href='https://bettergov.ph'
            target='_blank'
            rel='noopener noreferrer'
          >
            Visit BetterGov.ph
          </Btn>
          <Btn
            variant='secondary'
            href='https://github.com/bettergovph/bettergov'
            target='_blank'
            rel='noopener noreferrer'
          >
            Source on GitHub
          </Btn>
        </div>

        <Card className={`${COL} mt-8`}>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Sending a correction
          </p>
          <p className='mt-3 text-[15px] leading-relaxed text-slate-700'>
            Spotted a wrong number, an outdated official, or a missing office?
            Email{' '}
            <a
              href='mailto:hello@bettersorsogon.org'
              className='rounded font-medium text-brand-800 transition-colors duration-150 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
            >
              hello@bettersorsogon.org
            </a>{' '}
            with a link to an official source and we will verify and update it.
            The project repository will also be published for corrections via
            pull request.
          </p>
        </Card>
      </Section>

      {/* 5 — Terms & licenses */}
      <Section variant='white' eyebrow='Legal' title='Terms & licenses'>
        <div
          className={`${COL} space-y-4 text-[15px] leading-relaxed text-slate-600`}
        >
          <p>
            The information on this site is provided as-is and without warranty of
            any kind. We work to keep it correct, but details change and mistakes
            happen — for anything official, verify with the relevant office before
            you act or transact.
          </p>
          <p>
            Your privacy is respected by design: BetterGov Sorsogon sets no
            cookies, requires no accounts, and builds no personal profiles. We
            keep standard server logs for security and reliability
            (auto-deleted after 90 days) and count aggregate, cookieless
            pageviews and clicks to understand which information helps people
            — never who you are.
          </p>
        </div>

        <div className={`${COL} mt-10`}>
          <div className='h-px w-12 bg-amber-400' />
          <p className='mt-6 text-[15px] font-medium text-slate-900'>
            Code: open source · Content: CC BY 4.0 · Cost to the People of Sorsogon:
            ₱0.
          </p>
          <p className='mt-4 text-sm text-slate-500'>
            Province silhouette derived from{' '}
            <Ext href='https://commons.wikimedia.org/wiki/File:Sorsogon_in_Philippines.svg'>
              Sorsogon in Philippines.svg
            </Ext>{' '}
            by Milenioscuro (CC BY-SA 4.0).
          </p>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;
