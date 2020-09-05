import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  {
    path: '', component: TestComponent
  },
  {
    path: 'module-bar',
    loadChildren: () => import('../bar/chart-bar.module') .then(m => m.ChartBarModule),
  },
  {
    path: 'module-line',
    loadChildren: () => import('../line/chart-line.module') .then(m => m.ChartLineModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlotRoutingModule { }
