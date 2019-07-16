import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class WeatherService {

  baseUrl = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?';
  apiKey = '07949ee74496483aa1003225191607';

  constructor(public http: HttpClient) {
  }

  getWeekForecast(state: string, city: string): Observable<any> {
    return this.http.get(
      this.baseUrl + 'key=' + this.apiKey +
      '&q=' + city.replace(' ', '+') + ',' + state.replace(' ', '+') +
      '&num_of_days=7&tp=1&format=json'
    );
  }

}
