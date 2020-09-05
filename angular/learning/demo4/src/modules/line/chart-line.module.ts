import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { PlotLineComponent } from './components/plot-line/plot-line.component';
import { LineRoutingModule } from './line-routing.module';
import { LineComponent } from './components/line/line.component';



@NgModule({
  declarations: [ChartLineComponent, PlotLineComponent, LineComponent],
  imports: [
    CommonModule,
    LineRoutingModule,
    ChartModule
  ],
  exports: [
    ChartLineComponent,
    PlotLineComponent
  ]
})
export class ChartLineModule { }
