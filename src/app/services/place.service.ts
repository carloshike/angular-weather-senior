import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Place, PlaceAdapter} from '../models/place.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PlaceService {

  baseUrl = 'https://places.cit.api.here.com/places/v1/discover/explore?';
  appId = 'WMpm8hM4lbWOkf24KR0i';
  appCode = 'NSHV3QNRx_bDd5dU98mKRQ';

  constructor(
    private http: HttpClient,
    private adapter: PlaceAdapter,
  ) { }

  generatePlaceSuggestion(forecast, coordinates): Observable<Array<Place>> {
    let activityType: string;
    if (forecast.suggestActivityType === 'indoor') {
      activityType = 'natural-geographical%2Cadministrative-areas-buildings';
    } else {
      activityType = 'natural-geographical%2Cadministrative-areas-buildings'
    }

    return this.http.get(this.baseUrl + 'at=' + coordinates +
    '&cat=' + activityType + '&size=100&Accept-Language=pt-BR%3B&app_id=' +
    this.appId + '&app_code=' + this.appCode).pipe(
      map((data: any) => data.results.items.map(item => this.adapter.adapt(item)))
    );    
  }

}
