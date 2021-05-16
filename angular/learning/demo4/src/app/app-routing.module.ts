import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoPipeComponent } from './components/demo-pipe/demo-pipe.component';
import { DemoListComponent } from './components/demo-list/demo-list.component';
import { DemoServiceComponent } from './components/demo-service/demo-service.component';
import { DemoLazyComponent } from './components/demo-lazy/demo-lazy.component';
import { DemoComponentComponent } from './components/demo-component/demo-component.component';
import { DemoProvideInComponent } from './components/demo-provide-in/demo-provide-in.component';
import { DemoProvidersComponent } from './components/demo-providers/demo-providers.component';
import { DemoRenderer2Component } from './components/demo-renderer2/demo-renderer2.component';
import { DemoNgTemplateComponent } from './components/demo-ng-template/demo-ng-template.component';
import { DemoTemplatePropertyComponent } from './components/demo-template-property/demo-template-property.component';
import { DemoParentComponent } from './components/demo-parent/demo-parent.component';
import { DemoDirectiveComponent } from './components/demo-directive/demo-directive.component';
import { DemoLifeCycleComponent } from './components/demo-life-cycle/demo-life-cycle.component';


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
    path: 'demo-ng-template', component: DemoNgTemplateComponent
  },
  {
    path: 'demo-template-property', component: DemoTemplatePropertyComponent
  },
  {
    path: 'demo-parent', component: DemoParentComponent
  },
  {
    path: 'demo-directive', component: DemoDirectiveComponent
  },
  {
    path: 'demo-life-cycle', component: DemoLifeCycleComponent
  },
  {
    path: 'module-lazy',
    loadChildren: () => import('../modules/lazy/lazy.module') .then(m => m.LazyModule),
  },

  {
    path: 'module-line',
    loadChildren: () => import('../modules/line/chart-line.module') .then(m => m.ChartLineModule),
  },
  {
    path: 'module-bar',
    loadChildren: () => import('../modules/bar/chart-bar.module') .then(m => m.ChartBarModule),
  },

  {
    path: 'module-plot',
    loadChildren: () => import('../modules/plot/plot.module') .then(m => m.PlotModule),
  },
  { path: '', redirectTo: 'demo', pathMatch: 'full' }
];
// 路由服务 是属于全级的,所有的路由模块应该只有一个 router服务实例
// 用 forRoot方法 可以把Providers 从 RouterModule分离出来
// 只在 根路由模块 使用 RouterModule.forRoot(routes) 导入路由服务和指令
// 所有其它路由模块都是子模块，在子模块 要使用 RouterModule.forChild(routes)
// 只导入路由指令,不导入路由服务

// 然后路由模块会重新导出这个 RouterModule，以便其配套模块中的组件可以访问路由器指令，
// 比如常用的 RouterLink 和 RouterOutlet

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
