import { defineConfig, devices } from '@playwright/test';
import { countryConfigs } from './src/config/countries';

const selectedCountries = (process.env.COUNTRIES ?? process.env.COUNTRY ?? 'US')
  .split(',')
  .map((country) => country.trim().toUpperCase())
  .filter(Boolean);

const personas = (process.env.PERSONAS ?? 'customer,reseller,associate')
  .split(',')
  .map((persona) => persona.trim())
  .filter(Boolean);

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html'], ['list']],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: selectedCountries.flatMap((countryCode) => {
    if (!countryConfigs[countryCode]) {
      throw new Error(`Unsupported country "${countryCode}". Add it to src/config/countries.ts.`);
    }

    return personas.map((persona) => ({
      name: `${countryCode}-${persona}-chromium`,
      use: {
        ...devices['Desktop Chrome'],
        countryCode,
        persona,
        baseURL: countryConfigs[countryCode].baseUrl,
        locale: countryConfigs[countryCode].locale,
      },
    }));
  }),
});
