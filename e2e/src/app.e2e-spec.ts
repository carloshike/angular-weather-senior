import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import {formatDate} from '@angular/common';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display default region', () => {
    page.navigateTo();
    expect(page.getRegionText()).toEqual('Santa Catarina');
  });

  it('should display default city', () => {
    expect(page.getCity().getAttribute('value')).toEqual('Blumenau');
  });

  it('should start at first tab', () => {
    expect(page.getFirstTab().isDisplayed()).toBe(true);
  });

  it('should start at todays tab', () => {
    const today = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    expect(page.getFirstTabDate()).toContain(today);
  });

  it('should respect favorite place search', () => {
    expect(page.emptyStar().isDisplayed()).toBe(true)
    page.getCity().sendKeys('Joinville');
    page.emptyStar().click();
    //expect(page.goldStar().isDisplayed()).toBe(true)
    //page.navigateTo(); faz recarregar
    
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
