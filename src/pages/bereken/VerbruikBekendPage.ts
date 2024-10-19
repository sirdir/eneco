import { type Locator, type Page } from 'playwright';

export class VerbruikBekendPage {
  readonly page: Page;
  readonly ikVulMijnVerbruikZelfIn: Locator;
  readonly helpMijInschatten: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ikVulMijnVerbruikZelfIn = page.locator('button[value="exactUsage"]');
    this.helpMijInschatten = page.locator('button[value="estimateUsage"]');
    this.nextButton = page.locator('button[data-label=Volgende]');
  }

  async goto() {
    await this.page.goto('https://www.eneco.nl/duurzame-energie/bestellen2/verbruik-bekend/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async doYouKnowYourConsumption(knowsConsumption: boolean) {
    if (knowsConsumption) {
      await this.ikVulMijnVerbruikZelfIn.click();
    } else {
      await this.helpMijInschatten.click();
    }
    await this.nextButton.click();
  }
}
