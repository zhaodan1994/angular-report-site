import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { ShareServicesModule } from 'share-services/share-services.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShareServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
