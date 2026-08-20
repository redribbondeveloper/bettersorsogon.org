import { NavigationItem } from '../types';

/**
 * Primary navigation for BetterGov Sorsogon.
 * Flat, single-level items (the Navbar renders no dropdowns).
 */
export const mainNavigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Directory', href: '/directory' },
  { label: 'Hotlines', href: '/hotlines' },
  { label: 'Disaster Guide', href: '/disaster' },
  { label: 'Tourism', href: '/tourism' },
  { label: 'About', href: '/about' },
];

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerNavigation: { sections: FooterSection[] } = {
  sections: [
    {
      title: 'Navigate',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Directory', href: '/directory' },
        { label: 'Hotlines', href: '/hotlines' },
        { label: 'Disaster Guide', href: '/disaster' },
        { label: 'Tourism', href: '/tourism' },
        { label: 'About', href: '/about' },
      ],
    },
    {
      title: 'Data sources',
      links: [
        { label: 'sorsogon.gov.ph', href: 'https://sorsogon.gov.ph' },
        { label: 'region5.dilg.gov.ph', href: 'https://region5.dilg.gov.ph' },
        { label: 'psa.gov.ph', href: 'https://psa.gov.ph' },
        { label: 'coastguard.gov.ph', href: 'https://coastguard.gov.ph' },
      ],
    },
  ],
};
