#!/usr/bin/env node

/**
 * Generate public/llms.txt for BetterGov Sorsogon.
 * Self-contained: describes the portal for AI crawlers. No external data reads.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://sorsogon.bettergov.ph';

const content = `# BetterGov Sorsogon

> An unofficial, community-maintained information portal for the Province of Sorsogon, Philippines (Bicol Region). Not affiliated with any government office. Forked from the open-source BetterGov.ph (CC0). All information should be verified with the relevant office before transacting.

## Pages

- [Home](${BASE_URL}/): Overview of the Province of Sorsogon.
- [Services](${BASE_URL}/services): How to transact with provincial and local government offices.
- [LGU Directory](${BASE_URL}/directory): The provincial capitol and the cities and municipalities of Sorsogon, with officials and contact information.
- [Emergency Hotlines](${BASE_URL}/hotlines): Emergency and public-service contact numbers across the province.
- [Disaster Preparedness Guide](${BASE_URL}/disaster): Typhoon, flood, and hazard preparedness information for residents.
- [Tourism](${BASE_URL}/tourism): Destinations, festivals, and travel guidance.
- [About](${BASE_URL}/about): About this portal and its community maintainers.

## Notes

- This is an unofficial civic-information project. It is not an official government website.
- Content is community-maintained and may be incomplete or out of date.
- Source information is public domain unless otherwise specified.
`;

const outputPath = path.join(__dirname, '../public/llms.txt');
fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Generated llms.txt -> ${outputPath}`);
