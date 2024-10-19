import { type Locator, type Page } from 'playwright';

export class ZonnepanelenPage {
  readonly page: Page;
  readonly zelfStroomOp: Locator;
  readonly geenZelfStroomOp: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.zelfStroomOp = page.locator('label[data-label="Ja, ik wek zelf stroom op"]');
    this.geenZelfStroomOp = page.locator('label[data-label="Nee, ik wek zelf geen stroom op"]');
    this.nextButton = page.locator('button[data-label=Volgende]');
  }

  async goto() {
    await this.page.goto('https://www.eneco.nl/duurzame-energie/bestellen2/zonnepanelen/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async selectSunPanelsAwailability(hasSunPanels: boolean) {
    if (hasSunPanels) {
      await this.zelfStroomOp.click();
    } else {
      await this.geenZelfStroomOp.click();
    }
    await this.nextButton.click();
  }
}
