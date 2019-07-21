import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs';

import { WeatherService } from './services/weather.service';
import { AddressService } from './services/address.service';
import { PlaceService } from './services/place.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import 'hammerjs';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { MyGestureConfig } from './config/my-gesture-config';

import { AppComponent } from './app.component';

const dummyForecastInfo = [
  {"id": 395, "sugestActivity": "indoor", "title": "Neve moderada ou pesada em área com trovão", "icon": "wsymbol_0012_heavy_snow_showers"},
  {"id": 392, "sugestActivity": "indoor", "title": "Neve fraca e irregular em área com trovão", "icon": "wsymbol_0016_thundery_showers"}
]

const dummyRegionInfo = [
  {"id": "SC", "estado": "Santa Catarina"}
]

const dummyCitiesInfo = [
  {"id": "SC", "cidade": "Abdon Batista"},
  {"id": "SC", "cidade": "Blumenau"}
]

const dummyForecasts = [
  {"weatherCode":"119","weatherDescription":"Cloudy","weatherIcon":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0003_white_cloud.png","date":"21/07/2019","dayOfWeek":"Domingo","currentTemperature":"20","currentFeelsLike":"20","minTemperature":"13","maxTemperature":"23","hourlyTemperature":["15","13","13","16","20","23","22","19"],"suggestActivityType":"outdoor","weatherTranslated":"Nublado"},
  {"weatherCode":"116","weatherDescription":"Partly cloudy","weatherIcon":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png","date":"22/07/2019","dayOfWeek":"Segunda","currentTemperature":"20","currentFeelsLike":"20","minTemperature":"14","maxTemperature":"26","hourlyTemperature":["16","15","14","17","23","26","23","21"],"suggestActivityType":"outdoor","weatherTranslated":"Parcialmente nublado"},
  {"weatherCode":"116","weatherDescription":"Partly cloudy","weatherIcon":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png","date":"23/07/2019","dayOfWeek":"Terça","currentTemperature":"20","currentFeelsLike":"20","minTemperature":"15","maxTemperature":"29","hourlyTemperature":["17","15","15","18","24","28","28","26"],"suggestActivityType":"outdoor","weatherTranslated":"Parcialmente nublado"},
  {"weatherCode":"116","weatherDescription":"Partly cloudy","weatherIcon":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png","date":"24/07/2019","dayOfWeek":"Quarta","currentTemperature":"20","currentFeelsLike":"20","minTemperature":"14","maxTemperature":"27","hourlyTemperature":["19","16","15","18","24","27","25","21"],"suggestActivityType":"outdoor","weatherTranslated":"Parcialmente nublado"},
  {"weatherCode":"122","weatherDescription":"Overcast","weatherIcon":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png","date":"25/07/2019","dayOfWeek":"Quinta","currentTemperature":"20","currentFeelsLike":"20","minTemperature":"13","maxTemperature":"22","hourlyTemperature":["17","16","15","17","21","21","18","14"],"suggestActivityType":"indoor","weatherTranslated":"Nublado com nuvens carregadas"},
  {"weatherCode":"293","weatherDescription":"Patchy light rain","weatherIcon":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0017_cloudy_with_light_rain.png","date":"26/07/2019","dayOfWeek":"Sexta","currentTemperature":"20","currentFeelsLike":"20","minTemperature":"15","maxTemperature":"20","hourlyTemperature":["16","17","16","16","17","19","18","16"],"suggestActivityType":"indoor","weatherTranslated":"Chuva fraca irregular"},
  {"weatherCode":"113","weatherDescription":"Sunny","weatherIcon":"http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png","date":"27/07/2019","dayOfWeek":"Sábado","currentTemperature":"20","currentFeelsLike":"20","minTemperature":"12","maxTemperature":"24","hourlyTemperature":["15","14","12","15","20","23","21","18"],"suggestActivityType":"outdoor","weatherTranslated":"Ensolarado"}
]

const dummyCoordinate = [
  {"lat":"-26.9195567","lon":"-49.0658025"}
]

class FakeWeatherSerivce {
  getforecastDefaults() {
    return of(dummyForecastInfo);
  }

  getWeekForecast() {
    return of(dummyForecasts);
  }

  getForecastLocationInfo() {
    return of(dummyCoordinate)
  }
}

class FakeAddressSerivce {
  getRegions() {
    return of(dummyRegionInfo);
  }

  getCities() {
    return of(dummyCitiesInfo);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatIconModule,
        MatTooltipModule
      ],      
      declarations: [ 
        AppComponent 
      ],
      providers: [
        {provide: WeatherService, useClass: FakeWeatherSerivce},
        {provide: AddressService, useClass: FakeAddressSerivce},
        CookieService,
        PlaceService,
        DatePipe,
        {
          provide: HAMMER_GESTURE_CONFIG,
          useClass: MyGestureConfig
        }       
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial variables correctly', () => {
    component.ngOnInit();
    expect(component.forecasts.length).toBeGreaterThan(0);
    expect(component.addressForm.value.region).toEqual('SC');
    expect(component.addressForm.value.cityInput).toEqual('Blumenau');
    expect(component.selectedTab).toEqual(0);
    expect(component.cityCoordinates).toEqual('-26.9195567,-49.0658025');
  });
});