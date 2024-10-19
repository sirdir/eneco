import { type Locator, type Page } from 'playwright';

export class GegevensPage {
  readonly page: Page;
  readonly deliveryDate: Locator;
  readonly iLeaveOrWorkHere: Locator;
  readonly iDoNotLeaveOrWorkHere: Locator;
  readonly male: Locator;
  readonly female: Locator;
  readonly name: Locator;
  readonly initials: Locator;
  readonly surname: Locator;
  readonly day: Locator;
  readonly month: Locator;
  readonly year: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly relevantInfo: Locator;
  readonly sendByPhone: Locator;
  readonly partnerAds: Locator;
  readonly nextButton: Locator;
  readonly checkYourOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliveryDate = page.locator('input[name="deliveryDate"]');
    this.iLeaveOrWorkHere = page.locator('label[data-label="Ja"]');
    this.iDoNotLeaveOrWorkHere = page.locator('label[data-label="Nee"]');

    this.male = page.locator('label[data-label="Dhr."]');
    this.female = page.locator('label[data-label="Mevr."]');
    this.name = page.locator('input[name="firstName"]');
    this.initials = page.locator('input[name="initials"]');
    this.surname = page.locator('input[name="surname"]');
    this.day = page.locator('input[name="day"]');
    this.month = page.locator('input[name="month"]');
    this.year = page.locator('input[name="year"]');

    this.phone = page.locator('input[name="phoneNumber"]');
    this.email = page.locator('input[name="emailAddress"]');
    this.relevantInfo = page.locator('input[name="C1"]');
    this.sendByPhone = page.locator('input[name="C2"]');
    this.partnerAds = page.locator('input[name="C3"]');
    this.nextButton = page.locator('button[data-label="Volgende"]');
    this.checkYourOrder = page.locator('button[data-label="Controleer je bestelling"]');
  }

  async selectDeliveryDate(date: string) {
    await this.deliveryDate.evaluate((element, value) => {
      element.setAttribute('value', value);
    }, date);
    await this.nextButton.click();
  }

  async setIfThisLivingOrWorkingAddress(leaveOrWork: boolean) {
    leaveOrWork ? await this.iLeaveOrWorkHere.click() : await this.iDoNotLeaveOrWorkHere.click();
    await this.nextButton.click();
  }

  async fillPersonalInformation(
    isMale: boolean,
    firstName: string,
    initials: string,
    surname: string,
    dateOfBirth: Date,
  ) {
    isMale ? await this.male.click() : await this.female.click();

    await this.name.fill(firstName);
    await this.initials.fill(initials);
    await this.surname.fill(surname);
    await this.day.fill(dateOfBirth.getDate().toString());
    const normilizedMonth = dateOfBirth.getMonth() + 1;
    await this.month.fill(normilizedMonth.toString());
    await this.year.fill(dateOfBirth.getFullYear().toString());

    await this.nextButton.click();
  }

  async fillContactInfo(
    phone: string,
    email: string,
    relevantInfo: boolean,
    sendByPhone: boolean,
    partnerAds: boolean,
  ) {
    await this.phone.fill(phone);
    await this.email.fill(email);
    // checkboxes are not visible, so we need to use workaround
    if ((await this.relevantInfo.isChecked()) !== relevantInfo) {
      await this.relevantInfo.locator('xpath=..').click();
    }
    if ((await this.sendByPhone.isChecked()) !== sendByPhone) {
      await this.sendByPhone.locator('xpath=..').click();
    }
    if ((await this.partnerAds.isChecked()) !== partnerAds) {
      await this.partnerAds.locator('xpath=..').click();
    }
    await this.checkYourOrder.click();
  }
}
