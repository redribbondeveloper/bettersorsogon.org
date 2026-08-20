import { FC } from 'react';
import SEO from '../components/SEO';
import { Btn } from '../components/sorsogon/kit';

const NotFound: FC = () => {
  return (
    <>
      <SEO title='Page not found' noIndex />
      <section className='mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-600'>
          Error 404
        </p>
        <h1 className='mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl'>
          Page not found
        </h1>
        <div className='mt-5 h-px w-12 bg-amber-400' />
        <p className='mt-5 max-w-md text-[15px] leading-relaxed text-slate-600'>
          The page you are looking for may have been moved or is not part of this
          portal.
        </p>
        <div className='mt-8'>
          <Btn to='/' variant='primary'>
            Return home
          </Btn>
        </div>
      </section>
    </>
  );
};

export default NotFound;
