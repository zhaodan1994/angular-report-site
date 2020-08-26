import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoPipeComponent } from './components/demo-pipe/demo-pipe.component';
import { DemoListComponent } from './components/demo-list/demo-list.component';
import { DemoServiceComponent } from './components/demo-service/demo-service.component';
import { DemoLazyComponent } from './components/demo-lazy/demo-lazy.component';
import { DemoComponentComponent } from './components/demo-component/demo-component.component';
import { DemoComponent2Component } from './components/demo-component2/demo-component2.component';
import { DemoComponent3Component } from './components/demo-component3/demo-component3.component';
import { DemoProvideInComponent } from './components/demo-provide-in/demo-provide-in.component';
import { DemoProvidersComponent } from './components/demo-providers/demo-providers.component';
import { PlotBarComponent } from 'src/modules/bar/components/plot-bar/plot-bar.component';
import { PlotLineComponent } from 'src/modules/line/components/plot-line/plot-line.component';
import { DemoRenderer2Component } from './components/demo-renderer2/demo-renderer2.component';


const routes: Routes = [
  {
    path: 'demo-pipe', component: DemoPipeComponent
  },
  {
    path: 'demo-service', component: DemoServiceComponent
  },
  {
    path: 'demo', component: DemoListComponent
  },
  {
    path: 'demo-lazy', component: DemoLazyComponent
  },
  {
    path: 'demo-component', component: DemoComponentComponent
  },
  {
    path: 'demo-provide-in', component: DemoProvideInComponent
  },
  {
    path: 'demo-providers', component: DemoProvidersComponent
  },
  {
    path: 'demo-renderer2', component: DemoRenderer2Component
  },

  {
    path: 'module-lazy',
    loadChildren: () => import('../modules/lazy/lazy.module') .then(m => m.LazyModule),
  },
  {
    path: 'module-bar',
    loadChildren: () => import('../modules/bar/chart-bar.module') .then(m => m.ChartBarModule),
  },
  {
    path: 'module-line',
    loadChildren: () => import('../modules/line/chart-line.module') .then(m => m.ChartLineModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
