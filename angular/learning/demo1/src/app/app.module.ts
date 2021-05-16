import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular 应用是模块化的，它拥有自己的模块化系统，称作 NgModule

// 和组件一样用 @NgModule装饰器 告诉 Angular 这个类是 模块

@NgModule({
 /* --声明某些组件、指令和管道属于这个模块。
 （这些可声明的类只是供Angular编译器用的。如果使用未声明的组件，Angular会报错）
 可声明对象类 只能属于 一 个NgModule，否则编译器报错
 */
  declarations: [
    AppComponent
  ],
  // 导入其它带有组件、指令和管道的模块 （这里的模块指的是NgModel 而不是常规的 JavaScript模块）
  imports: [
    // 对于运行在浏览器中的应用来说，都必须在根模块中 AppModule
    // 导入 BrowserModule，因为它提供了启动和运行浏览器应用时某些必须的服务。
    BrowserModule,
    AppRoutingModule
  ],
  // 公开其中的部分组件、指令和管道，以便其它模块中的组件模板中可以使用它们
  exports: [],
  //  各种服务提供者。即此模块需要哪些服务， 这些服务能被本应用中的任何部分注入
  providers: [],
  /*应用的主视图，称为根组件, 在引导根模块的过程中，
  会创建bootstrap 数组中列出的组件，并把它们逐个插入到浏览器的DOM中(index.html)
  (即 index.html 页面,  注意必须在 index.html中声明 组件的选择器，
    否则  组件的选择器在 index.html找不到对应的位置插入，就会报错)
  */
  bootstrap: [AppComponent]
})
export class AppModule { }
