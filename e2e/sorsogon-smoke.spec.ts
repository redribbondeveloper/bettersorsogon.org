import { test, expect, type Page } from '@playwright/test';

/**
 * Smoke tests for BetterGov Sorsogon.
 *
 * For each route we assert:
 *  - the page loads,
 *  - there is exactly one visible <h1> and it contains the expected words,
 *  - no severe console errors were emitted (favicon / asset-404 / network
 *    noise is ignored),
 *  - and, for /hotlines, at least one <a href="tel:..."> exists.
 *
 * Each test logs a machine-readable `ROUTE_RESULT {json}` line so the run can
 * be summarized programmatically.
 */

interface RouteCase {
  /** Route path to visit. */
  path: string;
  /** Lower-cased phrase that the single visible <h1> must contain. */
  h1: string;
  /** Require at least one `tel:` link on the page. */
  requireTel?: boolean;
}

const ROUTES: RouteCase[] = [
  { path: '/', h1: 'government services and emergency lines' },
  { path: '/hotlines', h1: 'emergency hotlines', requireTel: true },
  { path: '/disaster', h1: 'disaster' },
  { path: '/directory', h1: 'directory of offices' },
  { path: '/directory/donsol', h1: 'donsol' },
  { path: '/services', h1: 'government service' },
  { path: '/tourism', h1: 'explore sorsogon' },
  { path: '/about', h1: 'about bettergov sorsogon' },
];

/** Console/error text that is expected environmental noise, not a real bug. */
const IGNORE_ERROR = [
  /favicon/i,
  /failed to load resource/i,
  /net::err/i,
  /err_[a-z_]+/i,
  /status of 404/i,
  /404 \(not found\)/i,
  /the server responded with a status/i,
  /manifest/i,
  /fonts\.(googleapis|gstatic)\.com/i,
];

const isSevere = (text: string): boolean =>
  !IGNORE_ERROR.some(re => re.test(text));

/** Collapse whitespace and lower-case for tolerant text matching. */
const norm = (s: string): string => s.replace(/\s+/g, ' ').trim().toLowerCase();

for (const rc of ROUTES) {
  test(`route ${rc.path}`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err =>
      consoleErrors.push(`pageerror: ${err.message}`)
    );

    const issues: string[] = [];

    const response = await page.goto(rc.path, {
      waitUntil: 'domcontentloaded',
    });
    if (response && response.status() >= 400) {
      issues.push(`HTTP ${response.status()}`);
    }

    // Exactly one visible <h1> (auto-waits for the lazy route to mount).
    const h1 = page.locator('h1:visible');
    try {
      await expect(h1).toHaveCount(1, { timeout: 15000 });
    } catch {
      const n = await h1.count();
      issues.push(`expected exactly one visible <h1>, found ${n}`);
    }

    const h1Text = (await h1.count()) ? await h1.first().innerText() : '';
    if (!norm(h1Text).includes(rc.h1)) {
      issues.push(`h1 "${h1Text.trim()}" does not contain "${rc.h1}"`);
    }

    // /hotlines must expose at least one dialable tel: link.
    if (rc.requireTel) {
      const telCount = await page.locator('a[href^="tel:"]').count();
      if (telCount < 1) issues.push('no <a href="tel:..."> link found');
    }

    // Let late console errors (post-load fetches) surface, then filter noise.
    await page.waitForTimeout(700);
    const severe = consoleErrors.filter(isSevere);
    if (severe.length) {
      issues.push(`console errors: ${severe.join(' | ')}`);
    }

    const result = {
      route: rc.path,
      ok: issues.length === 0,
      issues: issues.join('; '),
      consoleErrors: severe,
    };
    // Machine-readable summary line + annotation for reporters.
    console.log(`ROUTE_RESULT ${JSON.stringify(result)}`);
    testInfo.annotations.push({
      type: 'route-result',
      description: JSON.stringify(result),
    });

    expect(issues, JSON.stringify(result, null, 2)).toEqual([]);
  });
}

/**
 * Regression: expanding one tourism card's "Plan your visit" must neither
 * open nor resize any sibling card (user-reported twice; root causes were
 * grid row-stretch via items-stretch, then h-full on the card article).
 */
test('tourism: expanding one card leaves siblings untouched', async ({
  page,
}) => {
  await page.goto('/tourism');
  const cards = page.locator('article');
  const sibling = cards.nth(1);
  const before = await sibling.boundingBox();

  const summary = cards.nth(0).locator('summary').first();
  await summary.scrollIntoViewIfNeeded();
  await summary.click();
  await page.waitForTimeout(250);

  await expect(page.locator('details[open]')).toHaveCount(1);
  const after = await sibling.boundingBox();
  expect(Math.round(after!.height)).toBe(Math.round(before!.height));
});
