import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyService {

  static count = 0;
  constructor() {
    console.log('create service ' + LazyService.count++);
  }

  lazyData = 'this is a property from lazy service';
  loadLazy(): string {
    return this.lazyData;
  }

  setLazyData(data: string) {
    this.lazyData = data;
  }
}
