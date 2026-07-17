export interface CountryConfig {
  readonly code: string;
  readonly displayName: string;
  readonly locale: string;
  readonly currency: string;
  readonly baseUrl: string;
  readonly featureFlags?: Record<string, boolean>;
}

const defaultBaseUrl = process.env.RETURNS_BASE_URL ?? 'https://example.com/returns';

export const countryConfigs: Record<string, CountryConfig> = {
  US: {
    code: 'US',
    displayName: 'United States',
    locale: 'en-US',
    currency: 'USD',
    baseUrl: process.env.RETURNS_BASE_URL_US ?? defaultBaseUrl,
  },
  CA: {
    code: 'CA',
    displayName: 'Canada',
    locale: 'en-CA',
    currency: 'CAD',
    baseUrl: process.env.RETURNS_BASE_URL_CA ?? defaultBaseUrl,
  },
  GB: {
    code: 'GB',
    displayName: 'United Kingdom',
    locale: 'en-GB',
    currency: 'GBP',
    baseUrl: process.env.RETURNS_BASE_URL_GB ?? defaultBaseUrl,
  },
};

export function resolveCountryConfig(countryCode = process.env.COUNTRY ?? 'US'): CountryConfig {
  const normalizedCode = countryCode.toUpperCase();
  const config = countryConfigs[normalizedCode];

  if (!config) {
    throw new Error(`Unsupported country code "${countryCode}". Add it to src/config/countries.ts before running tests.`);
  }

  return config;
}
