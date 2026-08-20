// Standalone screenshot capture for BetterGov Sorsogon smoke run.
// Not a Playwright test (filename lacks .spec/.test) so it is never collected.
// Run: node e2e/capture-screens.mjs
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173';
const OUT =
  '/private/tmp/claude-501/-Users-john-Documents/b218d2df-5d3d-40b6-9764-728180e13d05/scratchpad/screens';

const DESKTOP = [
  { file: 'home.png', path: '/' },
  { file: 'hotlines.png', path: '/hotlines' },
  { file: 'lgu-donsol.png', path: '/directory/donsol' },
  { file: 'tourism.png', path: '/tourism' },
];

const written = [];

const browser = await chromium.launch();
try {
  // Desktop, full-page, 1280 wide.
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  for (const shot of DESKTOP) {
    const page = await desktop.newPage();
    await page.goto(BASE + shot.path, { waitUntil: 'domcontentloaded' });
    await page.locator('h1:visible').first().waitFor({ timeout: 15000 });
    await page.waitForTimeout(600);
    const dest = `${OUT}/${shot.file}`;
    await page.screenshot({ path: dest, fullPage: true });
    written.push(dest);
    await page.close();
  }
  await desktop.close();

  // Mobile 375x812 home.
  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mp = await mobile.newPage();
  await mp.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await mp.locator('h1:visible').first().waitFor({ timeout: 15000 });
  await mp.waitForTimeout(600);
  const mdest = `${OUT}/home-mobile.png`;
  await mp.screenshot({ path: mdest, fullPage: true });
  written.push(mdest);
  await mobile.close();
} finally {
  await browser.close();
}

console.log('SCREENSHOTS ' + JSON.stringify(written));
