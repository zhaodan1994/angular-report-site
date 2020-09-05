import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyComponent } from './components/lazy/lazy.component';


const routes: Routes = [
  {
    path: '', component: LazyComponent
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
export class LazyRoutingModule { }
