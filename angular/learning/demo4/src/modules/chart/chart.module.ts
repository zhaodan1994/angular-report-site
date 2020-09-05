import {ModuleWithProviders,  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { ChartService } from './service/chart/chart.service';
import { CommonService } from './service/common/common.service';



@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule
  ],
  providers: [
    ChartService
  ]
})
export class ChartModule {
  static forRoot(): ModuleWithProviders<ChartModule> {
    return {
      ngModule: ChartModule,
      providers: [
       CommonService
      ]
    };
  }

 }
