import { FC } from 'react';
import { Card } from '../kit';

/**
 * Reduce a full name to display initials, ignoring quoted nicknames
 * ("Boboy") and generational suffixes (II, Jr.). Uses the first letter
 * of the first and last remaining name parts.
 */
const getInitials = (fullName: string): string => {
  const cleaned = fullName.replace(/"[^"]*"/g, ' ').replace(/[.,]/g, ' ');
  const suffixes = new Set(['jr', 'sr', 'ii', 'iii', 'iv', 'v']);
  const parts = cleaned
    .split(/\s+/)
    .filter(part => part && !suffixes.has(part.toLowerCase()));
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export interface LeaderCardProps {
  name: string;
  title: string;
}

/**
 * LeaderCard — a dignified profile card for a provincial official:
 * an initials avatar in a brand-blue disc, the office title, and the name.
 */
const LeaderCard: FC<LeaderCardProps> = ({ name, title }) => (
  <Card className='flex items-center gap-4 self-start'>
    <span
      aria-hidden='true'
      className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-800 text-lg font-semibold tracking-tight text-white'
    >
      {getInitials(name)}
    </span>
    <span className='min-w-0'>
      <span className='block text-xs font-semibold uppercase tracking-wide text-amber-600'>
        {title}
      </span>
      <span className='mt-1 block text-base font-semibold tracking-tight text-slate-900'>
        {name}
      </span>
    </span>
  </Card>
);

export default LeaderCard;
