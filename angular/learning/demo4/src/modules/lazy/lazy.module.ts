import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './components/lazy/lazy.component';
import { ChartModule } from '../chart/chart.module';


@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    LazyRoutingModule,
    ChartModule
  ]
})
export class LazyModule { }
