#!/usr/bin/env node

/**
 * Generate public/sitemap.xml for BetterGov Sorsogon.
 * Self-contained: emits the portal's static routes. No external data reads.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://sorsogon.bettergov.ph';

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.8' },
  { path: '/directory', changefreq: 'weekly', priority: '0.8' },
  { path: '/hotlines', changefreq: 'weekly', priority: '0.9' },
  { path: '/disaster', changefreq: 'weekly', priority: '0.9' },
  { path: '/tourism', changefreq: 'weekly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.5' },
];

const lastmod = new Date().toISOString().split('T')[0];

const body = routes
  .map(
    r =>
      `  <url>\n` +
      `    <loc>${BASE_URL}${r.path}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${r.changefreq}</changefreq>\n` +
      `    <priority>${r.priority}</priority>\n` +
      `  </url>`
  )
  .join('\n');

const content = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Generated sitemap.xml with ${routes.length} routes -> ${outputPath}`);
