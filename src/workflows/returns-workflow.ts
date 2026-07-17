import type { Page } from '@playwright/test';
import type { CountryConfig } from '../config/countries';
import type { UserCredentials } from '../config/users';
import type { PersonaProfile } from '../personas/persona';
import { ReturnsHomePage } from '../pages/returns-home-page';

export class ReturnsWorkflow {
  private readonly homePage: ReturnsHomePage;

  constructor(
    private readonly page: Page,
    private readonly country: CountryConfig,
    private readonly persona: PersonaProfile,
    private readonly credentials: UserCredentials,
  ) {
    this.homePage = new ReturnsHomePage(page, country);
  }

  async signIn(): Promise<void> {
    await this.homePage.goto();
    await this.page.getByLabel(/username|email/i).fill(this.credentials.username);
    await this.page.getByLabel(/password/i).fill(this.credentials.password);
    await this.page.getByRole('button', { name: /sign in|log in/i }).click();
  }

  async openPersonaLandingPage(): Promise<void> {
    await this.signIn();

    if (this.persona.channel === 'internal') {
      await this.homePage.associateQueueLink.click();
      return;
    }

    await this.homePage.startReturnLink.click();
  }

  async createReturnForOrder(orderNumber: string): Promise<void> {
    await this.openPersonaLandingPage();
    await this.page.getByLabel(/order number/i).fill(orderNumber);
    await this.page.getByRole('button', { name: /find order|continue/i }).click();
  }

  countryCode(): string {
    return this.country.code;
  }
}
