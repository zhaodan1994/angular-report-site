import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../chart/chart.module';
import { PlotBarComponent } from './components/plot-bar/plot-bar.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { BarRoutingModule } from './bar-routing.module';
import { BarComponent } from './components/bar/bar.component';



@NgModule({
  declarations: [ChartBarComponent, PlotBarComponent, BarComponent],
  imports: [
    CommonModule,
    BarRoutingModule,
    ChartModule
  ],
  exports: [
    ChartBarComponent,
    PlotBarComponent
  ]
})
export class ChartBarModule { }
