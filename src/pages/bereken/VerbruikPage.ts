import { type Locator, type Page } from 'playwright';

export class VerbruikPage {
  readonly page: Page;
  readonly slimmeMeter: Locator;
  readonly geenSimmeMeter: Locator;
  readonly stroomNormaalVerbruik: Locator;
  readonly stroomDalVerbruik: Locator;
  readonly gasVerbruik: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.slimmeMeter = page.locator('label[data-label="Ja, ik heb een slimme meter"]');
    this.geenSimmeMeter = page.locator('label[data-label="Nee, ik heb geen slimme meter"]');
    this.stroomNormaalVerbruik = page.locator('input[name="usageElectricityHigh"]');
    this.stroomDalVerbruik = page.locator('input[name="usageElectricityLow"]');
    this.gasVerbruik = page.locator('input[name="usageGas"]');
    this.nextButton = page.locator('button[data-label=Volgende]');
  }

  async goto() {
    await this.page.goto('https://www.eneco.nl/duurzame-energie/bestellen2/verbruik/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async provideUserConsumption(hasSmartMeter: boolean, electicityNormaal: number, electicityDal: number, gas: number) {
    if (hasSmartMeter) {
      await this.slimmeMeter.click();
      await this.stroomDalVerbruik.fill(electicityDal.toString());
    } else {
      await this.geenSimmeMeter.click();
    }
    await this.stroomNormaalVerbruik.fill(electicityNormaal.toString());
    await this.gasVerbruik.fill(gas.toString());
    await this.nextButton.click();
  }
}
