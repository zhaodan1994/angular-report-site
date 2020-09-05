import { Injectable } from '@angular/core';
import { ChartModule } from '../../chart.module';


export class ChartService {

  data = 'chart service loaded';
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
