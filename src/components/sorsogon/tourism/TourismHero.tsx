import { FC } from 'react';
import type { Photo } from './helpers';

/**
 * Photographic hero. A full-bleed landscape sits under a dark gradient so the
 * eyebrow / title / subtitle keep contrast; a small credit links to the photo's
 * Commons source (a CC attribution requirement). Falls back to the brand
 * gradient if no image is supplied, so the h1 always renders.
 */
interface TourismHeroProps {
  image?: Photo;
}

const TourismHero: FC<TourismHeroProps> = ({ image }) => (
  <section className='relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white'>
    {image && (
      <img
        src={image.src}
        alt=''
        aria-hidden='true'
        className='absolute inset-0 h-full w-full object-cover'
      />
    )}
    <div
      aria-hidden='true'
      className='absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/60 to-slate-950/80'
    />

    <div className='relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-28 sm:px-6'>
      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-400'>
        EXPLORE THE PROVINCE
      </p>
      <h1 className='mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl'>
        Explore Sorsogon
      </h1>
      <p className='mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-200 md:text-lg'>
        Whale sharks, volcano lakes, and the Pacific's quiet beaches.
      </p>
    </div>

    {image && (
      <a
        href={image.source}
        target='_blank'
        rel='noopener noreferrer'
        className='absolute right-4 bottom-3 z-10 rounded text-[11px] text-white/70 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
      >
        Photo: {image.author} · {image.license}
      </a>
    )}
  </section>
);

export default TourismHero;
