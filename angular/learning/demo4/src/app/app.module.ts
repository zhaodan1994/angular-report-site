import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoPipeComponent } from './components/demo-pipe/demo-pipe.component';
import { DemoListComponent } from './components/demo-list/demo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPipeComponent,
    DemoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
