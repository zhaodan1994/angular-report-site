import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { PlotBarComponent } from './components/plot-bar/plot-bar.component';


const routes: Routes = [

  {
    path: 'plot', component: PlotBarComponent
  },
  {
    path: '', component: ChartBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }
