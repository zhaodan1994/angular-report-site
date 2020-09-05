import { Injectable } from '@angular/core';
import { LazyModule } from '../lazy.module';

@Injectable({
  providedIn: LazyModule
})
export class LazyService {

  constructor() {
    console.log('create lazy service ');
  }

  lazyData = 'this is a property from lazy service';
  loadLazy(): string {
    return this.lazyData;
  }

  setLazyData(data: string) {
    this.lazyData = data;
  }
}
