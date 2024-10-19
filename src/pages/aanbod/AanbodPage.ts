import { type Locator, type Page } from 'playwright';

export class AanbodPage {
  readonly page: Page;
  readonly vastContract: Locator;
  readonly dynamischContract: Locator;
  readonly eenJaarGasEnStroom: Locator;
  readonly nextButton: Locator;
  readonly co2Gecompenseerd: Locator;
  readonly toTheOfferButton: Locator;
  readonly toMyDataButton: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.vastContract = page.locator('label[data-label="Vast"]');
    this.dynamischContract = page.locator('label[data-label="Dynamisch"]');
    this.eenJaarGasEnStroom = page.locator('button[data-label="1 jaar stroom en gas"]');
    this.co2Gecompenseerd = page.locator('#hasUpsellGas');
    this.nextButton = page.locator('button[data-label=Volgende]');
    this.toTheOfferButton = page.locator('button[data-label="Naar je aanbod"]');
    this.toMyDataButton = page.locator('button[data-label="Naar je gegevens"]');
    this.toMyDataButton = page.locator('button[data-label="Naar je gegevens"]');
    this.total = page.locator('//div[./div/h3[text()="Totaal"]]/following-sibling::div//span[@aria-label]');
  }

  async selectContract(isFixed: boolean, contractName: string) {
    if (isFixed) {
      await this.vastContract.click();
    } else {
      await this.dynamischContract.click();
    }

    const contract = this.page.locator(`button[data-label="${contractName}"]`);
    await contract.click();
    await this.nextButton.click();
  }

  async co2Compensation(compensate: boolean) {
    const currentState = await this.co2Gecompenseerd.getAttribute('aria-checked');
    if (currentState !== compensate.toString()) {
      await this.co2Gecompenseerd.click();
    }
    await this.toTheOfferButton.click();
  }

  async getTotalAmountPerMonth() {
    return await this.total.textContent();
  }

  async confirmYourOffer() {
    await this.toMyDataButton.click();
  }
}
