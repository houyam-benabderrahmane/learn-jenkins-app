// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // 📂 Folder that contains your test files
  testDir: './e2e',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail the build on CI if 'test.only' is left accidentally */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests only on CI */
  retries: process.env.CI ? 2 : 0,

  /* Use only 1 worker on CI to simplify logs */
  workers: process.env.CI ? 1 : undefined,

  /* 🧾 Reporters configuration */
  reporter: [
    ['list'], // Displays results in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report
    ['junit', { outputFile: 'test-results/junit.xml' }] // ✅ Jenkins will use this file
  ],

  /* 🌍 Shared settings for all tests */
  use: {
    // Base URL for your app (customize if needed)
    baseURL: process.env.CI_ENVIRONMENT_URL || 'http://localhost:3000',

    // Collect trace on first retry only
    trace: 'on-first-retry',
  },

  /* 🌐 Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to add more browsers:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  /* 🚀 Optional: Start dev server before tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
