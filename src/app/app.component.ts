import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { AddressService } from './services/address.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {Forecast} from './models/forecast.model';
import { Chart } from 'chart.js';

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
  selectedRegion: any;
  showResult;
  dailyForecastCharts = [];
  selectedTab: number;

  constructor(
    private weatherService: WeatherService,
    private addressService: AddressService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addressService.getRegions().subscribe(data => {
      this.regions = data;
    });

    this.addressForm = this.fb.group({
      cityInput: null,
      region: null
    });

    this.addressForm.get('cityInput').valueChanges
    .pipe(
      switchMap(value => this.addressService.searchCities(this.addressForm.value.region, {cityName: value}, 1))
    )
    .subscribe(data => this.cities = data);
  }

  onSelectRegion(regionId) {
    this.addressService.getCities(regionId.value).subscribe(data => {
      this.cities = data;
      this.addressForm.get('cityInput').setValue('');
    });
  }

  onSelectCity(city) {
    this.weatherService.getWeekForecast(city)
        .subscribe(forecasts => {
          this.selectedTab = 0;
          this.showResult = true;
          this.forecasts = forecasts;
          console.log(forecasts);
          this.createDailyForecastCharts(0);
         });
  }

  tabChange(event: any): void {
    this.createDailyForecastCharts(event.index);
  }

  createDailyForecastCharts(index) {
    let forecast = this.forecasts[index];
   
    setTimeout (() => {
      this.createDailyChart(forecast, index);
    }, 300);
  }

  createDailyChart(forecast, index) {   
    this.dailyForecastCharts = []  
    let htmlRef = document.querySelector('#forecastDailyChart' + index);
    this.dailyForecastCharts.push(new Chart( htmlRef, {
      type: 'line',
      data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          datasets: [{
              label: 'temperatura °C',
              borderColor: 'blue',
              backgroundColor: 'transparent',
              data: forecast.hourlyTemperature
          }]
      },

      options: {responsive: true,
        maintainAspectRatio: false}
    }));
  }  
}
