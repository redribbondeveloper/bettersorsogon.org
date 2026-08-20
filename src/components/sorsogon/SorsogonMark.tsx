import { FC } from 'react';

/**
 * SorsogonMark — the BetterGov Sorsogon brand mark.
 *
 * A stylized silhouette of Sorsogon province: the western Donsol arm, the
 * Bacon peninsula, Sorsogon Bay biting up through the middle, and the southern
 * mass tapering to the Matnog point. Instantly recognizable to locals, and it
 * reads cleanly down to favicon sizes.
 *
 * Geometry is a hand-simplified (Douglas–Peucker) reduction of the Sorsogon
 * polygon extracted from the Wikimedia Commons locator map
 * "Sorsogon in Philippines.svg" by Milenioscuro (CC BY-SA 4.0), normalized to a
 * square 0 0 100 100 viewBox. See the About page's Terms & licenses for credit.
 *
 * Colour comes from `currentColor`, so set the tone with a text-* class
 * (e.g. `text-brand-800`). No external requests.
 */
const PROVINCE_PATH =
  'M5 28.9L11.9 36L15 34.7L27 44.9L27.6 39.5L32 37.3L30 40.1L31.1 44.2L33.7 43.9L32.1 40.9L36.3 42.7L34.3 43.4L37.4 48L41.4 43.1L45.8 45.2L49.1 43.7L50.3 40.1L52.8 40.5L55.8 31L60.9 30.7L63.2 33.7L74 32L75.5 37.3L72.4 43.5L69.6 45.2L64 43.6L63 47.7L59.6 48.4L52.9 43.6L49.3 50.4L54.9 72L60.6 76.9L62.5 75.8L67.2 85.1L75.6 87.9L82.6 85.3L82.7 74.5L87.9 70L86.9 62.1L90 52.1L88.6 42L85.4 39.6L88.6 35.5L90.4 26.7L92.4 27.5L95 24.9L93.3 19L85.3 18.9L81 27.5L69.3 15.9L60.2 12.1L57.8 22.8L52.2 22.6L40.4 29.7L33.9 22.8L23.6 26.7L12.9 24.8Z';

interface SorsogonMarkProps {
  /** Sizing/colour utilities. Height + a `text-*` colour is the usual pair. */
  className?: string;
  /** Accessible name, rendered as an SVG <title>. */
  title?: string;
}

const SorsogonMark: FC<SorsogonMarkProps> = ({
  className,
  title = 'Sorsogon province',
}) => (
  <svg
    className={className}
    viewBox='0 0 100 100'
    fill='currentColor'
    role='img'
    aria-label={title}
    xmlns='http://www.w3.org/2000/svg'
  >
    <title>{title}</title>
    <path d={PROVINCE_PATH} />
  </svg>
);

export default SorsogonMark;
