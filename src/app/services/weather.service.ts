import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Forecast, ForecastAdapter} from '../models/forecast.model';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {

  baseUrl = 'https://api.worldweatheronline.com/premium/v1/';
  apiKey = '07949ee74496483aa1003225191607';

  constructor(
    private http: HttpClient,
    private adapter: ForecastAdapter,
  ) { }

  getWeekForecast(city: string): Observable<Forecast[]> {
    return this.http.get(
      this.baseUrl + 'weather.ashx?key=' + this.apiKey +
      '&q=' + city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '+') + ', Brazil' +
      '&num_of_days=7&tp=3&format=json'
    ).pipe(
      map((data: any) => data.data.weather.map(item => this.adapter.adapt(item)))
    );
  }

  getForecastLocationInfo(city: string, region: string) {
    return  this.http.get('https://nominatim.openstreetmap.org/search?city=' + city + '&state=' + region + '&country=BRAZIL&format=json');
  }

}
