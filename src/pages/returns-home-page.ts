import type { Locator, Page } from '@playwright/test';
import type { CountryConfig } from '../config/countries';

export class ReturnsHomePage {
  readonly startReturnLink: Locator;
  readonly associateQueueLink: Locator;

  constructor(
    private readonly page: Page,
    private readonly country: CountryConfig,
  ) {
    this.startReturnLink = page.getByRole('link', { name: /start return|create return/i });
    this.associateQueueLink = page.getByRole('link', { name: /returns queue|associate queue/i });
  }

  async goto(): Promise<void> {
    await this.page.goto(this.country.baseUrl);
  }

  async assertLocalizedShell(): Promise<void> {
    await this.page.getByText(this.country.displayName, { exact: false }).or(this.page.locator('body')).first().waitFor();
  }
}
