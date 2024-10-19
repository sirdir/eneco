import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { faker } from '@faker-js/faker';
import {
  AanbodPage,
  Energiekeuze,
  MainPage,
  EnergiekeuzePage,
  VerbruikBekendPage,
  VerbruikPage,
  ZonnepanelenPage,
  VerhuizenPage,
  GegevensPage,
  ControleKeuzePage,
} from '../pages';
import { toLocaleDateString } from '../utils';

describe('user journey to request energy contract', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  let energiekeuzePage: EnergiekeuzePage;
  let verbruikBekendPage: VerbruikBekendPage;
  let verbruikPage: VerbruikPage;
  let zonnepanelenPage: ZonnepanelenPage;
  let verhuizenPage: VerhuizenPage;
  let aanbodPage: AanbodPage;
  let gegevensPage: GegevensPage;
  let controleKeuzePage: ControleKeuzePage;

  const name = faker.person.firstName();
  const initials = name.slice(0, 1);
  const surname = faker.person.lastName();
  const dateOfBirth = faker.date.birthdate();
  const phone = `0${faker.number.int({ min: 100000000, max: 999999999 })}`;
  const email = faker.internet.email();
  let totalAmountPerMonth: string | null;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    page = await context.newPage();

    // bereken pages
    energiekeuzePage = new EnergiekeuzePage(page);
    verbruikBekendPage = new VerbruikBekendPage(page);
    verbruikPage = new VerbruikPage(page);
    zonnepanelenPage = new ZonnepanelenPage(page);
    verhuizenPage = new VerhuizenPage(page);

    // aanbod page(s)
    aanbodPage = new AanbodPage(page);

    // gegevens page(s)
    gegevensPage = new GegevensPage(page);

    // controle page(s)
    controleKeuzePage = new ControleKeuzePage(page);
  });

  afterAll(async () => {
    await context?.close();
    await browser?.close();
  });

  it('user navigates to eneco main page', async () => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.acceptCookies();
    await mainPage.startCalculationForAdress('9713RD', '63');
  });

  it('user fulfills "Bereken" steps', async () => {
    await energiekeuzePage.selectOfEnergy(Energiekeuze.ELECTRICITY_AND_GAS);
    await verbruikBekendPage.doYouKnowYourConsumption(true);
    await verbruikPage.provideUserConsumption(true, 1250, 1250, 800);
    await zonnepanelenPage.selectSunPanelsAwailability(false);
    await verhuizenPage.selectMoving(false);
    await page.waitForURL('https://www.eneco.nl/duurzame-energie/bestellen2/productkeuze/looptijd/');
  });

  it('user fulfills "Aanbod" steps', async () => {
    await aanbodPage.selectContract(true, '1 jaar stroom en gas');
    await aanbodPage.co2Compensation(false);
    totalAmountPerMonth = await aanbodPage.getTotalAmountPerMonth();
    await aanbodPage.confirmYourOffer();
    await page.waitForURL('https://www.eneco.nl/duurzame-energie/bestellen2/je-gegevens/start-leverdatum/');
  });

  it('user fulfills "Gegevens" steps', async () => {
    const now = new Date();
    const nextMonth = now.setMonth(now.getMonth() + 1);
    const overNextMonth = now.setMonth(now.getMonth() + 2);
    const soonDate = toLocaleDateString(faker.date.between({ from: nextMonth, to: overNextMonth }));
    await gegevensPage.selectDeliveryDate(soonDate);
    await gegevensPage.setIfThisLivingOrWorkingAddress(true);
    await gegevensPage.fillPersonalInformation(true, name, initials, surname, dateOfBirth);
    await gegevensPage.fillContactInfo(phone, email, false, false, false);
    await page.waitForURL('https://www.eneco.nl/duurzame-energie/bestellen2/je-gegevens/controle-keuze/');
  });

  it('user ends up at "Controle" step', async () => {
    const expectedPersonalInfo = `Naam: ${name} ${surname}Geboortedatum: ${toLocaleDateString(dateOfBirth)}Telefoon: ${phone}E-mail: ${email}`;
    expect(await controleKeuzePage.getPersonalData()).toBe(expectedPersonalInfo);
    expect(await controleKeuzePage.getTotalAmountPerMonth()).toBe(totalAmountPerMonth);
  });
});
