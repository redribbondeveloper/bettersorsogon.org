import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file:///private/tmp/claude-501/-Users-john-Documents/b218d2df-5d3d-40b6-9764-728180e13d05/scratchpad/og-card.html');
await page.waitForTimeout(400);
await page.screenshot({ path: '/Users/john/Documents/bettergov-sorsogon/public/og-image.png' });
await browser.close();
console.log('og-image.png written');
