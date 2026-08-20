import { FC, useState } from 'react';
import { Section } from '../kit';
import type { Video } from './helpers';

/**
 * Click-to-play facade: nothing loads from YouTube until the visitor clicks.
 * We show the static thumbnail + a play button, then swap in the privacy-
 * enhanced (youtube-nocookie) iframe on demand.
 */
const VideoFacade: FC<{ video: Video }> = ({ video }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          className='aspect-video w-full rounded-2xl'
        />
      ) : (
        <button
          type='button'
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${video.title}`}
          className='group relative block aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2'
        >
          <img
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt=''
            loading='lazy'
            className='absolute inset-0 h-full w-full object-cover'
          />
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-slate-950/25 transition-colors duration-150 group-hover:bg-slate-950/10'
          />
          <span
            aria-hidden='true'
            className='relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-800 text-white shadow-lg transition-colors duration-150 group-hover:bg-brand-900'
          >
            <svg viewBox='0 0 24 24' className='ml-1 h-7 w-7'>
              <path d='M8 5v14l11-7z' fill='currentColor' />
            </svg>
          </span>
        </button>
      )}

      <figcaption className='mt-3'>
        <p className='font-medium text-slate-900'>{video.title}</p>
        <p className='text-sm text-slate-500'>{video.channel}</p>
      </figcaption>
    </figure>
  );
};

const WatchSorsogon: FC<{ videos: Video[] }> = ({ videos }) => {
  if (videos.length === 0) return null;

  return (
    <Section
      variant='slate'
      eyebrow='WATCH'
      title='Watch Sorsogon'
      description='Official productions from the Department of Tourism and WWF-Philippines. Nothing loads from YouTube until you press play.'
    >
      <div className='grid gap-6 sm:grid-cols-2'>
        {videos.map(v => (
          <VideoFacade key={v.id} video={v} />
        ))}
      </div>
    </Section>
  );
};

export default WatchSorsogon;
