import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  private lastEndJs = '';

  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string
  ) { }

  setEndJs(js: string) {
    this.lastEndJs = js;
  }

  getEndJs() {
    return this.lastEndJs;
  }

  version(): string {
    switch (this.baseHref) {
      case '/':
        return 'develop';
      case '/ar':
        return 'ar';
      case '/gces':
          return 'gces';
      case '/sjs':
            return 'sjs';
      default:
        return 'develop';
    }
  }
}
