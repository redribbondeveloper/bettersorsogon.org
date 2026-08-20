/**
 * Tourism — shared types + presentation helpers.
 * Kept in one module so the page and its child components agree on shape
 * and formatting. Render strictly from tourism.json.
 */

export interface Photo {
  src: string;
  author: string;
  license: string;
  source: string;
  note?: string;
}

export interface Attraction {
  name: string;
  slug: string;
  municipality: string;
  category: string;
  summary: string;
  how_to_get_there: string | null;
  best_time: string | null;
  fees: string | null;
  contact: string | null;
  facebook: string | null;
  notes: string | null;
  sources: string[];
  verification: string;
  photo?: Photo;
}

export interface Video {
  id: string;
  title: string;
  channel: string;
  url: string;
}

/** Canonical display order for category pills; only those present render. */
export const CATEGORY_ORDER = [
  'nature',
  'beach',
  'diving',
  'heritage',
  'festival',
  'food',
  'wellness',
];

export const formatCategory = (cat: string): string =>
  cat.charAt(0).toUpperCase() + cat.slice(1);

/** "sorsogon-city" -> "Sorsogon City"; "province" -> "Province-wide". */
export const humanizeMunicipality = (slug: string): string =>
  slug === 'province'
    ? 'Province-wide'
    : slug
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

export const categoryVariant = (cat: string): 'amber' | 'teal' | 'slate' => {
  if (cat === 'festival') return 'amber';
  if (cat === 'nature' || cat === 'beach') return 'teal';
  return 'slate';
};
