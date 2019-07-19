import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Place {
    constructor(
        public position: Array<string>,
        public title: string,
        public icon: string,
        public category: string,
        public address: string,
    ) { }
}

@Injectable({
    providedIn: 'root'
})

export class PlaceAdapter implements Adapter<Place> {

    adapt(item: any): Place {
      return new Place(
        item.position,
        item.title,
        item.icon,
        item.category.title,
        item.vicinity.replace('<br/>', ', ')
      );
    }
  }
