import { type Locator, type Page } from 'playwright';

export class VerhuizenPage {
  readonly page: Page;
  readonly ikGaVerhuizen: Locator;
  readonly ikGaNietVerhuizen: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ikGaVerhuizen = page.locator('label[data-label="Ja, ik ga verhuizen"]');
    this.ikGaNietVerhuizen = page.locator('label[data-label="Nee, ik ga niet verhuizen"]');
    this.nextButton = page.locator('button[data-label=Volgende]');
  }

  async goto() {
    await this.page.goto('https://www.eneco.nl/duurzame-energie/bestellen2/je-gegevens/verhuizen/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async selectMoving(hasToMove: boolean) {
    if (hasToMove) {
      await this.ikGaVerhuizen.click();
    } else {
      await this.ikGaNietVerhuizen.click();
    }
    await this.nextButton.click();
  }
}
