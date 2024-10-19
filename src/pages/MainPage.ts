import { type Locator, type Page } from 'playwright';

export class MainPage {
  readonly page: Page;
  readonly wiegeren: Locator;
  readonly postalCode: Locator;
  readonly homeNumber: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wiegeren = page.locator('button[data-label=Weigeren]');
    this.postalCode = page.locator('input[name=postalCode]');
    this.homeNumber = page.locator('input[name=houseNumber]');
    this.submitButton = page.locator('button', { hasText: /Bereken je maandbedrag/ });
  }

  async goto() {
    await this.page.goto('https://www.eneco.nl/', { waitUntil: 'domcontentloaded' });
  }

  async acceptCookies() {
    await this.wiegeren.click();
  }

  async startCalculationForAdress(postalCode: string, houseNumber: string) {
    await this.postalCode.fill(postalCode);
    await this.homeNumber.fill(houseNumber);
    await this.page.waitForLoadState('networkidle');
    await this.submitButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
