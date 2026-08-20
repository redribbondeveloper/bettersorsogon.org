import { defineConfig, devices } from '@playwright/test';

/**
 * Minimal smoke-test config for BetterGov Sorsogon.
 * The preview server (vite preview --port 4173) is managed externally,
 * so there is intentionally no `webServer` autostart here.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
