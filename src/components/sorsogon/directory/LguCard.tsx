import { FC } from 'react';
import { ChevronRight } from 'lucide-react';
import { Badge, Card } from '../kit';
import { Lgu, titleCase } from './data';

interface LguCardProps {
  lgu: Lgu;
}

/** A single local-government card linking to its detail page. */
const LguCard: FC<LguCardProps> = ({ lgu }) => (
  <li>
    <Card to={`/directory/${lgu.slug}`} className='group h-full'>
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-base font-semibold tracking-tight text-slate-900'>
          {lgu.name}
        </h3>
        <ChevronRight
          className='mt-1 h-5 w-5 shrink-0 text-slate-300 transition-colors duration-150 group-hover:text-brand-800'
          aria-hidden='true'
        />
      </div>

      <div className='mt-2'>
        <Badge variant='slate'>{titleCase(lgu.type)}</Badge>
      </div>

      <div className='mt-4 border-t border-slate-100 pt-4'>
        <p className='text-xs uppercase tracking-wide text-slate-400'>Mayor</p>
        <p className='mt-0.5 text-sm font-medium text-slate-700'>
          {lgu.mayor.name}
        </p>
      </div>
    </Card>
  </li>
);

export default LguCard;
