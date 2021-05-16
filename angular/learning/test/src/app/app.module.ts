import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LifeComponent } from './life/life.component';
import { ChildComponent } from './child/child.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Child2Component } from './child2/child2.component';
import {RouterModule, Routes} from "@angular/router";
import { Child3Component } from './child3/child3.component';
import { Child4Component } from './child4/child4.component';
import { Child5Component } from './child5/child5.component';

var routeConfig: Routes = [
    {path: '', component: Child2Component},
    {path: 'child3', component: Child3Component}
];


@NgModule({
  declarations: [
    AppComponent,
    LifeComponent,
    ChildComponent,
    Child2Component,
    Child3Component,
    Child4Component,
    Child5Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //  导入路由模块
    RouterModule.forRoot( routeConfig )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
