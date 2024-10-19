import { type Locator, type Page } from 'playwright';

export class ControleKeuzePage {
  readonly page: Page;
  readonly personalData: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.personalData = page.locator('//span[contains(.,"Persoonlijke gegevens")]/following-sibling::div');
    this.total = page.locator('//div[./div/h3[text()="Totaal"]]/following-sibling::div//span[@aria-label]');
  }

  async getPersonalData(): Promise<string | null> {
    return await this.personalData.textContent();
  }

  async getTotalAmountPerMonth(): Promise<string | null> {
    return await this.total.textContent();
  }
}
