import { FC } from 'react';
import SEO from '../../components/SEO';
import { PageHeader, Section } from '../../components/sorsogon/kit';
import CapitolDirectory from '../../components/sorsogon/directory/CapitolDirectory';
import LguCard from '../../components/sorsogon/directory/LguCard';
import { lgus } from '../../components/sorsogon/directory/data';

/**
 * Directory of Offices — the Provincial Capitol offices (with a client-side
 * filter) and every city and municipality of Sorsogon.
 */
const DirectoryPage: FC = () => {
  return (
    <>
      <SEO title='Directory of Offices' />
      <PageHeader
        eyebrow='Directory'
        title='Directory of Offices'
        subtitle='Provincial Capitol offices and all 15 local governments of Sorsogon.'
      />

      <Section
        eyebrow='Provincial Government'
        title='Provincial Capitol'
        description='Email is the most dependable way to reach these offices — most publish an official @sorsogon.gov.ph address. Use the filter to find an office by name or function.'
      >
        <CapitolDirectory />
      </Section>

      <Section
        variant='slate'
        eyebrow='Local Government'
        title='Cities & Municipalities'
        description='One city and fourteen municipalities. Open a local government to see its officials, contact channels, and emergency numbers.'
      >
        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {lgus.map(lgu => (
            <LguCard key={lgu.slug} lgu={lgu} />
          ))}
        </ul>
      </Section>
    </>
  );
};

export default DirectoryPage;
