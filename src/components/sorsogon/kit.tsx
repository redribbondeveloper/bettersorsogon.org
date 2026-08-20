/**
 * BetterGov Sorsogon — Shared Design Kit
 * ---------------------------------------
 * The single source of visual truth for every Sorsogon page.
 * Institutional-premium, "Sorsogon identity". Compose pages from these
 * primitives rather than reinventing markup.
 *
 * Palette: ink slate-900 · body slate-600/700 · primary brand-800 (hover brand-900)
 * dark surfaces slate-950→brand-950→slate-900 · gold amber-400/500 accents only
 * emergency red-700 · verified brand-700.
 *
 * Uppercase label tracking has two tiers: tracking-[0.2em] is reserved for
 * section/page eyebrows (HeroShell / PageHeader / Section kickers); every
 * in-card uppercase micro-label uses tracking-wide.
 */
import {
  FC,
  ReactNode,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/* WaveDivider — the Sorsogon wave motif, standalone.                  */
/* ------------------------------------------------------------------ */
interface WaveDividerProps {
  className?: string;
  opacity?: number;
}

export const WaveDivider: FC<WaveDividerProps> = ({
  className = '',
  opacity = 0.06,
}) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 1200 200'
    preserveAspectRatio='none'
    className={className}
    style={{ opacity }}
  >
    <path
      d='M0 120 C 150 60, 350 60, 600 120 S 1050 180, 1200 120'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M0 150 C 150 90, 350 90, 600 150 S 1050 210, 1200 150'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M0 90 C 150 30, 350 30, 600 90 S 1050 150, 1200 90'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* HeroShell — dark gradient hero with wave motif, eyebrow, h1, sub.   */
/* ------------------------------------------------------------------ */
interface HeroShellProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const HeroShell: FC<HeroShellProps> = ({
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}) => (
  <section
    className={`relative overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white ${className}`}
  >
    <WaveDivider className='pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full text-brand-300' />
    <div className='relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-24'>
      {eyebrow && (
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-400'>
          {eyebrow}
        </p>
      )}
      <h1 className='mt-4 max-w-3xl text-4xl md:text-5xl font-semibold tracking-tight'>
        {title}
      </h1>
      {subtitle && (
        <p className='mt-5 max-w-2xl text-[15px] md:text-lg leading-relaxed text-slate-300'>
          {subtitle}
        </p>
      )}
      {children && <div className='mt-8'>{children}</div>}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* PageHeader — standard interior page header + integrity note.        */
/* ------------------------------------------------------------------ */
interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Hide the "community-maintained" integrity line. Default shown. */
  hideNote?: boolean;
  children?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  hideNote = false,
  children,
}) => (
  <header className='border-b border-slate-200 bg-white'>
    <div className='mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16'>
      {eyebrow && (
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-600'>
          {eyebrow}
        </p>
      )}
      <h1 className='mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900'>
        {title}
      </h1>
      <div className='mt-5 h-px w-12 bg-amber-400' />
      {subtitle && (
        <p className='mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600'>
          {subtitle}
        </p>
      )}
      {!hideNote && (
        <p className='mt-4 text-sm text-slate-500'>
          Community-maintained information — verify with the office before
          transacting.
        </p>
      )}
      {children && <div className='mt-6'>{children}</div>}
    </div>
  </header>
);

/* ------------------------------------------------------------------ */
/* Section — vertical rhythm wrapper with optional heading block.      */
/* ------------------------------------------------------------------ */
interface SectionProps {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: 'white' | 'slate';
  children?: ReactNode;
  className?: string;
  /** id for in-page anchors */
  id?: string;
}

export const Section: FC<SectionProps> = ({
  eyebrow,
  title,
  description,
  variant = 'white',
  children,
  className = '',
  id,
}) => (
  <section
    id={id}
    className={`${variant === 'slate' ? 'bg-slate-50' : 'bg-white'} py-16 md:py-20 ${className}`}
  >
    <div className='mx-auto max-w-6xl px-4 sm:px-6'>
      {(eyebrow || title || description) && (
        <div className='mb-10 max-w-2xl'>
          {eyebrow && (
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-600'>
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className='mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900'>
              {title}
            </h2>
          )}
          {description && (
            <p className='mt-4 text-[15px] leading-relaxed text-slate-600'>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Card — the base surface.                                            */
/* ------------------------------------------------------------------ */
interface CardProps {
  children?: ReactNode;
  className?: string;
  /** Render as an internal router Link when set. */
  to?: string;
  /** Render as an external anchor when set (http targets open in a new tab). */
  href?: string;
  as?: 'div' | 'article' | 'li';
  /** Apply the interactive hover affordance to a non-link (`as`) card. */
  interactive?: boolean;
}

const cardBase =
  'bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all p-6';
const cardInteractive = 'hover:shadow-md hover:border-brand-800/30';
const cardLinkCls = `block ${cardBase} ${cardInteractive} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2`;

export const Card: FC<CardProps> = ({
  children,
  className = '',
  to,
  href,
  as = 'div',
  interactive = false,
}) => {
  if (to) {
    return (
      <Link to={to} className={`${cardLinkCls} ${className}`}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${cardLinkCls} ${className}`}
      >
        {children}
      </a>
    );
  }
  const Tag = as;
  return (
    <Tag
      className={`${cardBase} ${interactive ? cardInteractive : ''} ${className}`}
    >
      {children}
    </Tag>
  );
};

/* ------------------------------------------------------------------ */
/* StatCard — a single figure with a label.                            */
/* ------------------------------------------------------------------ */
interface StatCardProps {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({
  value,
  label,
  className = '',
}) => (
  <div className={`${cardBase} ${className}`}>
    <div className='text-3xl font-semibold tabular-nums text-slate-900'>
      {value}
    </div>
    <div className='mt-1 text-sm text-slate-500'>{label}</div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Badge — small status pills.                                         */
/* ------------------------------------------------------------------ */
type BadgeVariant = 'slate' | 'amber' | 'red' | 'brand' | 'leaf';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  slate: 'bg-slate-100 text-slate-700',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-700',
  brand: 'bg-brand-100 text-brand-800',
  leaf: 'bg-emerald-100 text-emerald-800',
};

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'slate',
  className = '',
}) => (
  <span
    className={`inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5 ${badgeVariants[variant]} ${className}`}
  >
    {children}
  </span>
);

/* ------------------------------------------------------------------ */
/* UnverifiedBadge — single-source data marker. The item WAS audited   */
/* against an official source; the badge only signals that a second    */
/* independent source hasn't confirmed it yet.                         */
/* ------------------------------------------------------------------ */
export const UnverifiedBadge: FC<{ className?: string }> = ({
  className = '',
}) => (
  <span
    title='Verified against one official source; not yet independently cross-checked'
    className={`inline-flex items-center text-[11px] uppercase tracking-wide text-slate-500 border border-slate-400 rounded-full px-2 py-0.5 ${className}`}
  >
    Single source
  </span>
);

/* ------------------------------------------------------------------ */
/* ContactRow — a labelled, actionable contact line.                   */
/* ------------------------------------------------------------------ */
interface ContactRowProps {
  label: ReactNode;
  /** Displayed value. Falls back to href text. */
  value?: ReactNode;
  /** tel: / mailto: / https: target. When absent the value renders as text. */
  href?: string;
  icon?: ReactNode;
  unverified?: boolean;
  className?: string;
}

export const ContactRow: FC<ContactRowProps> = ({
  label,
  value,
  href,
  icon,
  unverified = false,
  className = '',
}) => {
  const isPhone = href?.startsWith('tel:');
  const external = href?.startsWith('http');
  return (
    <div className={`min-h-11 flex items-center gap-3 ${className}`}>
      {icon && <span className='shrink-0 text-slate-400'>{icon}</span>}
      <span className='shrink-0 text-sm text-slate-500'>{label}</span>
      {href ? (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`min-w-0 [overflow-wrap:anywhere] text-sm text-brand-800 hover:text-brand-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded ${
            isPhone ? 'font-medium tabular-nums' : ''
          }`}
        >
          {value ?? href}
        </a>
      ) : value ? (
        <span className='min-w-0 [overflow-wrap:anywhere] text-sm text-slate-700'>{value}</span>
      ) : (
        <span className='text-sm text-slate-400'>—</span>
      )}
      {unverified && <UnverifiedBadge />}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* EmergencyCard — Card variant for hotlines / urgent info.            */
/* ------------------------------------------------------------------ */
interface EmergencyCardProps {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const EmergencyCard: FC<EmergencyCardProps> = ({
  title,
  children,
  className = '',
}) => (
  <div
    className={`rounded-2xl border border-red-200 bg-red-50/60 shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-6 ${className}`}
  >
    {title && (
      <h3 className='text-base font-semibold tracking-tight text-red-700'>
        {title}
      </h3>
    )}
    {children && <div className={title ? 'mt-3' : ''}>{children}</div>}
  </div>
);

/* ------------------------------------------------------------------ */
/* Btn — buttons and button-styled links.                              */
/* ------------------------------------------------------------------ */
type BtnVariant = 'primary' | 'secondary' | 'danger';

const btnBase =
  'h-11 px-5 rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const btnVariants: Record<BtnVariant, string> = {
  primary: 'bg-brand-800 hover:bg-brand-900 text-white',
  secondary:
    'border border-slate-300 text-slate-700 hover:border-brand-800 hover:text-brand-800',
  danger: 'bg-red-700 hover:bg-red-800 text-white',
};

interface BtnAsButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  href?: undefined;
  to?: undefined;
}
interface BtnAsAnchor
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: BtnVariant;
  href: string;
  to?: undefined;
}
interface BtnAsLink {
  variant?: BtnVariant;
  to: string;
  href?: undefined;
  children?: ReactNode;
  className?: string;
}
type BtnProps = BtnAsButton | BtnAsAnchor | BtnAsLink;

export const Btn: FC<BtnProps> = props => {
  const { variant = 'primary', className = '', children } = props;
  const cls = `${btnBase} ${btnVariants[variant]} ${className}`;

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    );
  }
  if ('href' in props && props.href !== undefined) {
    const { variant: _v, className: _c, href, ...rest } = props as BtnAsAnchor;
    void _v;
    void _c;
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  const { variant: _v, className: _c, ...rest } = props as BtnAsButton;
  void _v;
  void _c;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
};

/* ------------------------------------------------------------------ */
/* Default aggregate export for convenience.                           */
/* ------------------------------------------------------------------ */
const kit = {
  HeroShell,
  PageHeader,
  Section,
  Card,
  StatCard,
  ContactRow,
  Badge,
  UnverifiedBadge,
  EmergencyCard,
  Btn,
  WaveDivider,
};

export default kit;
