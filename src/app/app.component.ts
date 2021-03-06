import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { PlaceService } from './services/place.service';
import { AddressService } from './services/address.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Forecast } from './models/forecast.model';
import { Place } from './models/place.model';
import { Chart } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  regions: Array<any>;
  cities: Array<any>;
  forecasts: Array<Forecast>;
  addressForm: FormGroup;
  selectedRegion: string;
  selectedCity: string;
  showResult;
  dailyForecastCharts = [];
  weekForecastChart = [];
  selectedTab: number;
  defaultRegion = 'SC';
  defaultCity = 'Blumenau';
  favoriteAddressCookie: string;
  cityCoordinates: string;
  placeSuggestion: Array<any>;
  forecastDefaults: any;
  placeList: Array<Array<Place>> = [];
  loading;

  constructor(
    private weatherService: WeatherService,
    private placeService: PlaceService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.favoriteAddressCookie = this.cookieService.get('favoriteAddress');

    if (this.favoriteAddressCookie) {
      this.defaultRegion = this.favoriteAddressCookie.split('1')[0];
      this.defaultCity = this.favoriteAddressCookie.split('1')[1];
    }
    
    this.addressForm = this.fb.group({
      cityInput: this.defaultCity,
      region: this.defaultRegion
    });
  
    this.weatherService.getforecastDefaults().subscribe(data => {
      this.forecastDefaults = data;
      this.onSelectCity(this.addressForm.get('cityInput').value);
    });

    this.addressService.getRegions().subscribe(data => {
      this.regions = data;
    });

    this.addressForm.get('cityInput').valueChanges
    .pipe(
      switchMap(value => this.addressService.getCities(this.addressForm.value.region))
    )
    .subscribe(data => {
      this.cities = data.filter(city => city.cidade.toLowerCase().indexOf(this.addressForm.get('cityInput').value.toLowerCase()) !== -1);
    });
  }

  toggleFavorite() {
    const addressString = this.addressForm.get('region').value + '1' + this.addressForm.get('cityInput').value;

    if (!this.favoriteAddressCookie || this.favoriteAddressCookie !== addressString) {
      this.cookieService.set('favoriteAddress', addressString);
      this.favoriteAddressCookie = addressString;
    } else {
      this.cookieService.delete('favoriteAddress');
      this.favoriteAddressCookie = undefined;
    }

  }

  onSelectRegion(regionId) {
    this.addressService.getCities(regionId.value).subscribe(data => {
      this.cities = data;
      this.addressForm.get('cityInput').setValue('');
    });
  }

  onSelectCity(city) {
    this.loading = true;
    this.selectedRegion = this.addressForm.value.region;
    this.selectedCity = this.addressForm.value.cityInput;
    this.weatherService.getWeekForecast(city, this.forecastDefaults)
        .subscribe(forecasts => {
          this.selectedTab = 0;
          this.showResult = true;
          this.forecasts = forecasts;
          this.createDailyForecastCharts(0);
          this.createWeekForecastCart(forecasts);
          this.loadPlacesSuggestion(forecasts);
         });
  }

  loadPlacesSuggestion(forecasts) {
    this.weatherService.getForecastLocationInfo(this.addressForm.value.cityInput, this.addressForm.value.region)
    .subscribe((data: any[]) => {
      this.cityCoordinates = data[0].lat + ',' + data[0].lon;
      this.generatePlaceSuggestion(forecasts);
    });
  }

  generatePlaceSuggestion(forecasts) {
    this.placeList = [];
    forecasts.forEach((forecast, index) => {
      this.placeService.generatePlaceSuggestion(forecast, this.cityCoordinates).subscribe((data: Array<Place>) => {
        this.placeList[index] = data;
        this.loading = false;
      });
    });
  }

  tabChange(event: any): void {
    this.createDailyForecastCharts(event.index);
  }

  createDailyForecastCharts(index) {
    const forecast = this.forecasts[index];

    setTimeout (() => {
      this.createDailyChart(forecast, index);
    }, 300);
  }

  createDailyChart(forecast, index) {
    this.dailyForecastCharts = [];
    const htmlRef = document.querySelector('#forecastDailyChart' + index);
    this.dailyForecastCharts.push(new Chart( htmlRef, {
      type: 'line',
      data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          datasets: [{
            label: 'temperatura °C',
            backgroundColor: 'rgba(0, 0, 255, 0.35)',
            borderColor: 'blue',
            data: forecast.hourlyTemperature
          }]
      },

      options: {responsive: true,
        maintainAspectRatio: false}
    }));
  }

  createWeekForecastCart(forecasts) {
    const maxTemp = [];
    const minTemp = [];
    const dateLabels = [];

    forecasts.forEach(forecast => {
      maxTemp.push(forecast.maxTemperature);
      minTemp.push(forecast.minTemperature);
      dateLabels.push(forecast.date);
    });

    const htmlRef = document.querySelector('#forecastWeekChart');
    this.weekForecastChart = new Chart( htmlRef, {
      type: 'line',
      data: {
          labels: dateLabels,
          datasets: [{
            label: 'temperatura máxima °C',
            borderColor: 'red',
            data: maxTemp
          }, {
            label: 'temperatura mínima °C',
            borderColor: 'blue',
            data: minTemp
          }]
      },

      options: {responsive: true,
        maintainAspectRatio: false}
    });
  }
}
