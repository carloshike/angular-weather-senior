import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'angular-weather-senior';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getWeekForecast('Joinville', 'Santa Catarina')
        .subscribe(forecast => { console.log(forecast); });
  }
}
