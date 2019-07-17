import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { AddressService } from './services/address.service';
import { Config } from 'protractor';
import {FormBuilder, FormGroup} from '@angular/forms';
import {switchMap, debounceTime, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  regions: Array<any>;
  cities: Array<any>;
  addressForm: FormGroup;
  selectedRegion: any;

  constructor(
    private weatherService: WeatherService,
    private addressService: AddressService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addressService.getRegions().subscribe((data: Config) => {
      this.regions = data.estados;
    });

    this.addressForm = this.fb.group({
      cityInput: null,
      region: null
    });

    this.addressForm.get('cityInput').valueChanges
    .pipe(
      debounceTime(300),
      switchMap(value => this.addressService.searchCities(this.addressForm.value.region, {cityName: value}, 1))
    )
    .subscribe(data => this.cities = data.cidades);
  }

  onSelectRegion(regionId) {
    this.addressService.getCities(regionId.value).subscribe((data: Config) => {
      this.cities = data.cidades;
      this.addressForm.get('cityInput').setValue('');
    });
  }
}
