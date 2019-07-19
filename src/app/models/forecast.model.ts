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
        public hourlyTemperature: Array<number>,
        public suggestActivityType: string,
        public weatherTranslated: string
    ) { }
}

@Injectable({
    providedIn: 'root'
})

export class ForecastAdapter implements Adapter<Forecast> {

    adapt(item: any, forecastDefaults: any): Forecast {
      const forecastDefaultItem = forecastDefaults.map(df => df).filter(dfItem => dfItem.id.toString() === item.hourly[4].weatherCode)[0];
      return new Forecast(
        item.hourly[4].weatherCode,
        item.hourly[4].weatherDesc[0].value,
        item.hourly[4].weatherIconUrl[0].value,
        item.date,
        'converter dia da semana',
        'pegar temperatura atual',
        item.mintempC,
        item.maxtempC,
        item.hourly.map(t => t.tempC),
        forecastDefaultItem.sugestActivity,
        forecastDefaultItem.title
      );
    }
  }
