import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './components/data/data.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';




@NgModule({
  declarations: [
    DataComponent,
    DynamicComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
   DataComponent
  ]
})
export class DataModule { }
