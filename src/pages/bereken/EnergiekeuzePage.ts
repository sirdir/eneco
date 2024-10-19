import { type Locator, type Page } from 'playwright';

export enum Energiekeuze {
  ELECTRICITY,
  GAS,
  ELECTRICITY_AND_GAS,
}

export class EnergiekeuzePage {
  readonly page: Page;
  readonly electricityAndGas: Locator;
  readonly gas: Locator;
  readonly electricity: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.electricityAndGas = page.locator('button[value=electricityAndGas]');
    this.gas = page.locator('button[value="gas"]');
    this.electricity = page.locator('button[value=electricity]');
    this.nextButton = page.locator('button[data-label=Volgende]');
  }

  async goto() {
    await this.page.goto('https://www.eneco.nl/duurzame-energie/bestellen2/energiekeuze/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async selectOfEnergy(select: Energiekeuze) {
    switch (select) {
      case Energiekeuze.ELECTRICITY:
        await this.electricity.click();
        break;
      case Energiekeuze.GAS:
        await this.gas.click();
        break;
      case Energiekeuze.ELECTRICITY_AND_GAS:
        await this.electricityAndGas.click();
        break;
      default:
        throw new Error(`Unknown energy choice: ${select}, all options are: ${Object.values(Energiekeuze)}`);
    }
    await this.nextButton.click();
  }
}
