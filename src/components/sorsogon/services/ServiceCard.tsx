/**
 * BetterGov Sorsogon — ServiceCard
 * --------------------------------
 * One government service, rendered strictly from data. Only non-null fields
 * appear; single-source records carry an UnverifiedBadge. The official link is
 * a primary action; the local office is an inset reference block.
 */
import { FC } from 'react';
import { ExternalLink, Phone } from 'lucide-react';
import { Btn, Card, ContactRow, UnverifiedBadge } from '../kit';

export type ServiceOffice = {
  name: string;
  address: string | null;
  phone: string | null;
};

export type Service = {
  service: string;
  slug: string;
  category: { name: string; slug: string };
  description: string;
  url: string | null;
  local_office: ServiceOffice | null;
  sources: string[];
  verification: string;
};

/** Dialable tel: target — keep digits and a leading +, drop the rest. */
const telHref = (num: string): string => `tel:${num.replace(/[^\d+]/g, '')}`;

export const ServiceCard: FC<{ service: Service }> = ({ service }) => {
  const office = service.local_office;
  const unverified = service.verification === 'single-source';

  return (
    <Card as='li' className='flex h-full flex-col'>
      <div className='flex flex-wrap items-start gap-x-2 gap-y-1'>
        <h3 className='text-base font-semibold tracking-tight text-slate-900'>
          {service.service}
        </h3>
        {unverified && <UnverifiedBadge />}
      </div>

      <p className='mt-2 text-[15px] leading-relaxed text-slate-600'>
        {service.description}
      </p>

      {(service.url || office) && (
        <div className='mt-auto space-y-4 pt-5'>
          {service.url && (
            <div>
              <Btn
                href={service.url}
                target='_blank'
                rel='noopener noreferrer'
                className='w-full sm:w-auto'
              >
                Go to official site
                <ExternalLink aria-hidden='true' className='h-4 w-4' />
              </Btn>
            </div>
          )}

          {office && (
            <div className='rounded-lg bg-slate-50 p-4'>
              <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                Local office
              </p>
              <p className='mt-1.5 font-medium text-slate-900'>{office.name}</p>
              {office.address && (
                <p className='mt-1 text-sm leading-relaxed text-slate-600'>
                  {office.address}
                </p>
              )}
              {office.phone && (
                <ContactRow
                  className='mt-1'
                  label='Phone'
                  value={office.phone}
                  href={telHref(office.phone)}
                  icon={<Phone aria-hidden='true' className='h-4 w-4' />}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ServiceCard;
