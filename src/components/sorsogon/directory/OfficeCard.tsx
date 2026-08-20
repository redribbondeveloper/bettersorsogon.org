import { FC } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Badge, Card, ContactRow, UnverifiedBadge } from '../kit';
import { CapitolOffice, isUnverified, telHref } from './data';

const MAX_SERVICES = 4;

interface OfficeCardProps {
  office: CapitolOffice;
}

/**
 * One Provincial Capitol office. Email is the strong, verified signal for
 * these offices, so it leads the contact block; phone rows appear only when a
 * number is actually published.
 */
const OfficeCard: FC<OfficeCardProps> = ({ office }) => {
  const shownServices = office.services.slice(0, MAX_SERVICES);
  const extraServices = office.services.length - shownServices.length;

  return (
    <Card as='li' className='flex flex-col'>
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-base font-semibold leading-snug tracking-tight text-slate-900'>
          {office.office}
        </h3>
        {office.abbreviation && (
          <Badge variant='slate' className='mt-0.5 shrink-0'>
            {office.abbreviation}
          </Badge>
        )}
      </div>

      {office.head && (
        <div className='mt-2'>
          <p className='text-sm font-medium text-slate-700'>
            {office.head.name}
          </p>
          <p className='text-sm text-slate-500'>{office.head.title}</p>
        </div>
      )}

      {(office.email || office.phone.length > 0) && (
        <div className='mt-4 space-y-1 border-t border-slate-100 pt-4 [overflow-wrap:anywhere]'>
          {office.email && (
            <ContactRow
              label='Email'
              value={office.email}
              href={`mailto:${office.email}`}
              icon={<Mail className='h-4 w-4' aria-hidden='true' />}
            />
          )}
          {office.phone.map(number => (
            <ContactRow
              key={number}
              label='Phone'
              value={number}
              href={telHref(number)}
              icon={<Phone className='h-4 w-4' aria-hidden='true' />}
            />
          ))}
        </div>
      )}

      {office.location && (
        <div className='mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-500'>
          <MapPin
            className='mt-0.5 h-4 w-4 shrink-0 text-slate-400'
            aria-hidden='true'
          />
          <span>{office.location}</span>
        </div>
      )}

      {office.services.length > 0 && (
        <div className='mt-4 border-t border-slate-100 pt-4'>
          <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
            Services
          </p>
          <ul className='mt-2 space-y-1.5'>
            {shownServices.map(service => (
              <li
                key={service}
                className='flex gap-2 text-sm leading-snug text-slate-600'
              >
                <span
                  className='mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-300'
                  aria-hidden='true'
                />
                <span>{service}</span>
              </li>
            ))}
          </ul>
          {extraServices > 0 && (
            <p className='mt-1.5 text-xs text-slate-400'>
              +{extraServices} more
            </p>
          )}
        </div>
      )}

      {isUnverified(office.verification) && (
        <div className='mt-4 pt-1'>
          <UnverifiedBadge />
        </div>
      )}
    </Card>
  );
};

export default OfficeCard;
