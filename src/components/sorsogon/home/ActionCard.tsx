import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ActionCard — a large, keyboard-focusable quick action used inside the
 * dark home hero. Two treatments: the default teal-glass card and the
 * `emergency` red-glass card (reserved for the hotlines action). Pass
 * `wide` for the full-width, horizontal layout.
 */
export interface ActionCardProps {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
  emergency?: boolean;
  wide?: boolean;
}

const ActionCard: FC<ActionCardProps> = ({
  to,
  title,
  description,
  icon,
  emergency = false,
  wide = false,
}) => {
  const surface = emergency
    ? 'border-red-400/30 bg-red-500/10 hover:border-red-400/60 hover:bg-red-500/[0.16] focus-visible:ring-red-500'
    : 'border-white/10 bg-white/[0.06] hover:border-white/25 hover:bg-white/[0.1] focus-visible:ring-teal-400';
  const iconWrap = emergency
    ? 'bg-red-500/20 text-red-300'
    : 'bg-teal-400/15 text-teal-200';
  const arrow = emergency
    ? 'text-red-300'
    : 'text-slate-400 group-hover:text-white';

  return (
    <Link
      to={to}
      className={`group relative flex h-full rounded-2xl border p-5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${surface} ${
        wide ? 'flex-row items-center gap-5' : 'flex-col'
      }`}
    >
      <span
        aria-hidden='true'
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
      >
        {icon}
      </span>

      <span className={wide ? 'min-w-0 flex-1' : 'mt-4 block'}>
        <span className='block text-base font-semibold tracking-tight text-white'>
          {title}
        </span>
        <span
          className={`mt-1 block text-sm leading-relaxed ${
            emergency ? 'text-red-100/90' : 'text-slate-300'
          }`}
        >
          {description}
        </span>
      </span>

      <ArrowRight
        aria-hidden='true'
        className={`h-5 w-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${arrow} ${
          wide ? 'self-center' : 'absolute right-5 top-5'
        }`}
      />
    </Link>
  );
};

export default ActionCard;
