import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { PlotLineComponent } from './components/plot-line/plot-line.component';
import { LineRoutingModule } from './line-routing.module';



@NgModule({
  declarations: [ChartLineComponent, PlotLineComponent],
  imports: [
    CommonModule,
    ChartModule,
    LineRoutingModule
  ],
  exports: [
    ChartLineComponent,
    PlotLineComponent
  ]
})
export class ChartLineModule { }
