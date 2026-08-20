/**
 * BetterGov Sorsogon — Directory data & types
 * -------------------------------------------
 * A single typed entry point for the Directory pages. The JSON sources carry
 * many honestly-null fields (unpublished phones, addresses, emails), so the
 * loose inferred JSON types are narrowed here to explicit interfaces that make
 * the real gaps first-class. Render only non-null fields — never fake presence.
 */
import lgusJson from '../../../data/sorsogon/lgus.json';
import officesJson from '../../../data/sorsogon/capitol_offices.json';
import hotlinesJson from '../../../data/sorsogon/hotlines.json';

export interface OfficialRef {
  name: string;
}

export interface Lgu {
  name: string;
  slug: string;
  type: string;
  zip_code: string;
  income_class: string | null;
  population_2020: number | null;
  barangays: number | null;
  mayor: OfficialRef;
  vice_mayor: OfficialRef;
  address: string | null;
  phone: string[];
  email: string | null;
  facebook: string | null;
  website: string | null;
  sources: string[];
  verification: string;
}

export interface OfficeHead {
  name: string;
  title: string;
}

export interface CapitolOffice {
  office: string;
  abbreviation: string | null;
  head: OfficeHead | null;
  phone: string[];
  email: string | null;
  location: string | null;
  services: string[];
  sources: string[];
  verification: string;
  notes?: string;
}

export interface Hotline {
  name: string;
  category: string;
  scope: string;
  numbers: string[];
  facebook: string | null;
  notes: string | null;
  sources: string[];
  verification: string;
}

export const lgus = lgusJson.lgus as unknown as Lgu[];
export const capitolOffices = officesJson.offices as unknown as CapitolOffice[];
export const hotlines = hotlinesJson.hotlines as unknown as Hotline[];

/** Verification value that marks not-yet-independently-confirmed data. */
export const isUnverified = (verification: string): boolean =>
  verification === 'single-source';

/** Build a dial-safe tel: href, keeping a leading + and digits only. */
export const telHref = (num: string): string =>
  `tel:${num.replace(/[^\d+]/g, '')}`;

/** A human-friendly URL: strip the scheme and any trailing slash. */
export const displayUrl = (url: string): string =>
  url.replace(/^https?:\/\//, '').replace(/\/+$/, '');

/** Capitalise the first letter (e.g. "city" -> "City"). */
export const titleCase = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);
