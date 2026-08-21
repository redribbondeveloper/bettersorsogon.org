// Live probe: does the deployed site load Umami and expose window.umami?
import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
let scriptStatus = null;
page.on('response', r => {
  if (r.url().includes('cloud.umami.is/script.js')) scriptStatus = r.status();
});
await page.goto('https://bettersorsogon.org/', { waitUntil: 'networkidle' });
const probe = await page.evaluate(() => ({
  tag: !!document.querySelector('script[data-website-id]'),
  id: document
    .querySelector('script[data-website-id]')
    ?.getAttribute('data-website-id'),
  umami: typeof window.umami !== 'undefined',
}));
await browser.close();
console.log(JSON.stringify({ scriptStatus, ...probe }));
