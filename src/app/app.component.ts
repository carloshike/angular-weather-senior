import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { AddressService } from './services/address.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {Forecast} from './models/forecast.model';

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
          console.log(forecasts);
          this.showResult = true;
          this.forecasts = forecasts;
         });
  }
}
