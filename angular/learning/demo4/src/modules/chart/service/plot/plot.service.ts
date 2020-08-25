import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class PlotService {

  data = 'chart module';

  constructor() {
    console.log('create plotService');
   }

  loadChart(): string {
    return this.data;
  }

  setChart(type: string) {
    this.data = type;
  }
}
