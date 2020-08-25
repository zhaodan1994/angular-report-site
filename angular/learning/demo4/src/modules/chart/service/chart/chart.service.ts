import { Injectable } from '@angular/core';
import { ChartModule } from '../../chart.module';

@Injectable({
  providedIn: ChartModule
})
export class ChartService {

  data = 'chart module';
  constructor() {
    console.log('create chartService');
   }

  loadChart(): string {
    return this.data;
  }

  setChart(type: string) {
    this.data = type;
  }
}
