import { test as base, expect, type Page } from '@playwright/test';
import { resolveCountryConfig, type CountryConfig } from '../config/countries';
import { resolveCredentials, type UserCredentials } from '../config/users';
import { personas, type PersonaProfile, type UserPersona } from '../personas/persona';
import { ReturnsHomePage } from '../pages/returns-home-page';
import { ReturnsWorkflow } from '../workflows/returns-workflow';

export interface ReturnsTestOptions {
  countryCode: string;
  persona: UserPersona;
}

export interface ReturnsTestFixtures {
  country: CountryConfig;
  personaProfile: PersonaProfile;
  credentials: UserCredentials;
  returnsHomePage: ReturnsHomePage;
  returnsWorkflow: ReturnsWorkflow;
}

export const test = base.extend<ReturnsTestFixtures, ReturnsTestOptions>({
  countryCode: [process.env.COUNTRY ?? 'US', { option: true }],
  persona: ['customer', { option: true }],

  country: async ({ countryCode }, use) => {
    await use(resolveCountryConfig(countryCode));
  },

  personaProfile: async ({ persona }, use) => {
    await use(personas[persona]);
  },

  credentials: async ({ persona, country }, use) => {
    await use(resolveCredentials(persona, country.code));
  },

  returnsHomePage: async ({ page, country }, use) => {
    await use(new ReturnsHomePage(page, country));
  },

  returnsWorkflow: async ({ page, country, personaProfile, credentials }, use) => {
    await use(new ReturnsWorkflow(page, country, personaProfile, credentials));
  },
});

export { expect, type Page };
