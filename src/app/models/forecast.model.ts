import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Forecast {
    constructor(
        public weatherCode: number,
        public weatherDescription: string,
        public weatherIcon: string,
        public date: string,
        public dayOfWeek: string,
        public currentTemperature: string,
        public minTemperature: string,
        public maxTemperature: string,
    ) { }
}

@Injectable({
    providedIn: 'root'
})

export class ForecastAdapter implements Adapter<Forecast> {

    adapt(item: any): Forecast {
      return new Forecast(
        item.hourly[4].weatherCode,
        item.hourly[4].weatherDesc[0].value,
        item.hourly[4].weatherIconUrl[0].value,
        item.date,
        'converter dia da semana',
        'pegar temperatura atual',
        item.mintempC,
        item.maxtempC
      );
    }
  }
