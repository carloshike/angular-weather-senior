import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {City} from '../city.class';

@Injectable()
export class AddressService {

  regionUrl = '../assets/regions.json';
  citiesUrl = '../assets/cities/';

  constructor(public http: HttpClient) {
  }

  getRegions(): Observable<any> {
    return this.http.get(this.regionUrl);
  }

  getCities(regionCode: string): Observable<any> {
    return this.http.get(this.citiesUrl + regionCode + '.json');
  }

  searchCities(regionCode, filter: {cityName: string} = {cityName: ''}, page = 1): Observable<any> {
    return this.http.get(this.citiesUrl + regionCode + '.json')
    .pipe(
      tap(cities => {
        cities.cidades = cities.cidades
        .map(city => new City(city.id, city.cidade))
        .filter(city => city.cidade.toLowerCase().includes(filter.cityName));
        console.log(filter.cityName);
        return cities;
    }));
  }

}
