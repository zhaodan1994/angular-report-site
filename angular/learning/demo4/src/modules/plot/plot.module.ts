import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotRoutingModule } from './plot-routing.module';
import { TestComponent } from './components/test/test.component';
import { ChartLineModule } from '../line/chart-line.module';
import { ChartBarModule } from '../bar/chart-bar.module';


@NgModule({
  declarations: [ TestComponent],
  imports: [
    CommonModule,
    PlotRoutingModule,
    ChartLineModule,
    ChartBarModule
  ]
})
export class PlotModule { }
