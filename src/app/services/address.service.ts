import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
}
