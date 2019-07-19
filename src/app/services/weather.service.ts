import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Forecast, ForecastAdapter} from '../models/forecast.model';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {

  baseUrl = 'https://api.worldweatheronline.com/premium/v1/';
  apiKey = '07949ee74496483aa1003225191607';
  forecastJson = '../assets/weather.json';

  constructor(
    private http: HttpClient,
    private adapter: ForecastAdapter,
  ) { }

  getforecastDefaults() {
    return this.http.get(this.forecastJson);
  }

  getWeekForecast(city: string, forecastDefaults: any): Observable<Forecast[]> {
    return this.http.get(
      this.baseUrl + 'weather.ashx?key=' + this.apiKey +
      '&q=' + city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '+') + ', Brazil' +
      '&num_of_days=7&tp=3&format=json'
    ).pipe(
      map((data: any) => {
        const tempC = data.data.current_condition[0].temp_C;
        const feelsLike = data.data.current_condition[0].FeelsLikeC;
        return data.data.weather.map(item =>
          this.adapter.adapt(item, forecastDefaults, tempC, feelsLike)
        );
      }
      )
    );
  }

  getForecastLocationInfo(city: string, region: string) {
    return  this.http.get('https://nominatim.openstreetmap.org/search?city=' + city + '&state=' + region + '&country=BRAZIL&format=json');
  }

}
