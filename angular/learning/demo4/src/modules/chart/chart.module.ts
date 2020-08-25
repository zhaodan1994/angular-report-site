import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotService } from './service/plot/plot.service';
import { ChartComponent } from './components/chart/chart.component';



@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ChartComponent
  ],
  providers: [ PlotService ]
})
export class ChartModule { }
