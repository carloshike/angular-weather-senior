import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getRegion() {
    return element(by.xpath('//*[@id="mat-select-0"]/div'));
  }

  getCity() {
    return element(by.xpath('/html/body/app-root/div[1]/form/mat-form-field[2]/div/div[1]/div/input'));
  }  

  getFirstTab() {
    return element(by.xpath('//*[@id="mat-tab-content-0-0"]'));
  }

  getSecondTab() {
    return element(by.xpath('//*[@id="mat-tab-label-0-1"]'));
  }

  getFirstTabDate() {
    return element(by.xpath('//*[@id="mat-tab-content-0-0"]/div/div/div[1]/span[2]'));
  }

  getSecondTabDate() {
    return element(by.xpath('//*[@id="mat-tab-content-0-1"]/div/div/div[1]/span[2]'));
  }

  getEmptyStar() {
    return element(by.xpath('/html/body/app-root/div[1]/form/a/i'));
  }

  getGoldStar() {
    return element(by.css('.star-gold'));
  }

  getFavoriteLink() {
    return element(by.css('.favorite'));
  }

  getStateSelectOption() {
    return element(by.xpath('//*[@id="mat-option-24"]/span'));
  }
}
