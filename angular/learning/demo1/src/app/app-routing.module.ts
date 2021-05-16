import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // 导航路径和 你的组件 关联起来
 // { path: 'globals', component: TypeDocGlobalsComponent },
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
