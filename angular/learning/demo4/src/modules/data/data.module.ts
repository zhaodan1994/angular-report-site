import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './components/data/data.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { ChartModule } from '../chart/chart.module';




@NgModule({
  declarations: [
    DataComponent,
    DynamicComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
   DataComponent
  ]
})
export class DataModule { }
