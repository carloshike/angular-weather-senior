import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { DatePipe } from '@angular/common';


export class Forecast {
    constructor(
        public weatherCode: number,
        public weatherDescription: string,
        public weatherIcon: string,
        public date: string,
        public dayOfWeek: string,
        public currentTemperature: string,
        public currentFeelsLike: string,
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
    constructor(
      private datePipe: DatePipe
    ) { }

    adapt(item: any, forecastDefaults: any, currentTemperature: string, feelsLike: string): Forecast {
      const dayOfWeek = { Sunday :  'Domingo', Monday :  'Segunda', Tuesday :  'Terça',
        Wednesday :  'Quarta', Thursday :  'Quinta', Friday :  'Sexta', Saturday :  'Sábado' };
      const forecastDefaultItem = forecastDefaults.map(df => df).filter(dfItem => dfItem.id.toString() === item.hourly[4].weatherCode)[0];
      return new Forecast(
        item.hourly[4].weatherCode,
        item.hourly[4].weatherDesc[0].value,
        item.hourly[4].weatherIconUrl[0].value,
        this.datePipe.transform(new Date(item.date + 'T00:00:00'), 'dd/MM/yyyy'),
        dayOfWeek[this.datePipe.transform(new Date(item.date + 'T00:00:00'), 'EEEE')],
        currentTemperature,
        feelsLike,
        item.mintempC,
        item.maxtempC,
        item.hourly.map(t => t.tempC),
        forecastDefaultItem.sugestActivity,
        forecastDefaultItem.title
      );
    }
  }
