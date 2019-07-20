import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getRegionText() {
    return element(by.xpath('//*[@id="mat-select-0"]/div/div[1]/span/span')).getText() as Promise<string>;
  }

  getCity() {
    return element(by.xpath('/html/body/app-root/div[1]/form/mat-form-field[2]/div/div[1]/div/input'));
  }  

  getFirstTab() {
    return element(by.xpath('//*[@id="mat-tab-content-0-0"]'));
  }

  getFirstTabDate() {
    return element(by.xpath('//*[@id="mat-tab-content-0-0"]/div/div/div[1]/span[2]')).getText() as Promise<string>;
  }

  emptyStar() {
    return element(by.css('.ng-star-inserted'))
  }

  goldStar() {
    return element(by.css('.star-gold'))
  }
}
