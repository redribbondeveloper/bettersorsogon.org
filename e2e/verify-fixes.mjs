// One-off empirical verification of two user-reported bugs.
// Run with the preview server up on :4173.
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173';
const SHOTS = process.env.SHOTS_DIR ?? '/tmp';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const results = {};

// --- Bug 1: tourism "Plan your visit" must not affect sibling cards -------
await page.goto(`${BASE}/tourism`, { waitUntil: 'networkidle' });
const cards = page.locator('article');
const before = await cards.nth(1).boundingBox();
const openCountBefore = await page.locator('details[open]').count();
await cards.nth(0).locator('summary').first().scrollIntoViewIfNeeded();
await cards.nth(0).locator('summary').first().click();
await page.waitForTimeout(300);
const openCountAfter = await page.locator('details[open]').count();
const after = await cards.nth(1).boundingBox();
results.tourism = {
  openBefore: openCountBefore,
  openAfter: openCountAfter,
  siblingHeightBefore: Math.round(before.height),
  siblingHeightAfter: Math.round(after.height),
  pass: openCountAfter === 1 && Math.round(before.height) === Math.round(after.height),
};
await page.screenshot({ path: `${SHOTS}/verify-tourism-expanded.png`, fullPage: false });

// --- Bug 2: services sticky bar geometry + opacity -------------------------
await page.goto(`${BASE}/services`, { waitUntil: 'networkidle' });
await page.mouse.wheel(0, 1600);
await page.waitForTimeout(400);
const bar = page.locator('div.sticky').first();
const barBox = await bar.boundingBox();
const barStyle = await bar.evaluate(el => {
  const cs = getComputedStyle(el);
  return { position: cs.position, background: cs.backgroundColor, top: cs.top };
});
const navBox = await page.locator('nav').first().boundingBox();
results.services = {
  navBottom: Math.round(navBox.y + navBox.height),
  barTop: Math.round(barBox.y),
  flush: Math.abs(navBox.y + navBox.height - barBox.y) <= 1,
  ...barStyle,
  opaque: barStyle.background === 'rgb(255, 255, 255)',
};
await page.screenshot({ path: `${SHOTS}/verify-services-sticky.png`, clip: { x: 0, y: 0, width: 1440, height: 260 } });

await browser.close();
console.log(JSON.stringify(results, null, 1));
