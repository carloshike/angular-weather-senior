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
    expect(page.getRegion().getText()).toEqual('Santa Catarina');
  });

  it('should display default city', () => {
    expect(page.getCity().getAttribute('value')).toEqual('Blumenau');
  });

  it('should start at first tab', () => {
    expect(page.getFirstTab().isDisplayed()).toBe(true);
  });

  it('should start at todays tab', () => {
    const today = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    expect(page.getFirstTabDate().getText()).toContain(today);
  });

  it('should respect favorite place search', () => {
    expect(page.getEmptyStar().isDisplayed()).toBe(true)
    page.getCity().clear();
    page.getCity().sendKeys('Joinville');
    page.getFavoriteLink().click();
    expect(page.getGoldStar().isDisplayed()).toBe(true);
    page.navigateTo();
    expect(page.getGoldStar().isDisplayed()).toBe(true);
    expect(page.getCity().getAttribute('value')).toEqual('Joinville');
  });

  it('should show options by clicking state select', () => {
    page.getRegion().click();
    expect(page.getStateSelectOption().isDisplayed()).toBe(true);
  });

  it('should clear city field by choosing new state', () => {
    page.getStateSelectOption().click();
    expect(page.getCity().getText()).toEqual('');
  });

  it('should show new content by changing day tab', () => {
    const tomorrow = formatDate(new Date().getTime() + (1000 * 60 * 60 * 24), 'dd/MM/yyyy', 'en');
    page.getSecondTab().click();
    expect(page.getSecondTabDate().isDisplayed()).toBe(true);
    expect(page.getSecondTab().getAttribute('class')).toContain('mat-tab-label-active');
    expect(page.getSecondTabDate().getText()).toContain(tomorrow);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
