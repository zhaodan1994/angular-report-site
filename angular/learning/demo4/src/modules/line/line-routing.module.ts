import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { PlotLineComponent } from './components/plot-line/plot-line.component';


const routes: Routes = [
  {
    path: '', component: ChartLineComponent
  },
  {
    path: 'plot', component: PlotLineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineRoutingModule { }
