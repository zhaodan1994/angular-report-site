import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoPipeComponent } from './components/demo-pipe/demo-pipe.component';
import { DemoListComponent } from './components/demo-list/demo-list.component';
import { DataModule } from 'src/modules/data/data.module';
import { DemoServiceComponent } from './components/demo-service/demo-service.component';
import { DemoLazyComponent } from './components/demo-lazy/demo-lazy.component';
import { DemoComponentComponent } from './components/demo-component/demo-component.component';
import { DemoComponent2Component } from './components/demo-component2/demo-component2.component';
import { DemoComponent3Component } from './components/demo-component3/demo-component3.component';
import { DemoProvideInComponent } from './components/demo-provide-in/demo-provide-in.component';
import { DemoComponent1Component } from './components/demo-component1/demo-component1.component';
import { DemoProvidersComponent } from './components/demo-providers/demo-providers.component';
import { DemoRenderer2Component } from './components/demo-renderer2/demo-renderer2.component';
import { DemoNgTemplateComponent } from './components/demo-ng-template/demo-ng-template.component';
import { FormsModule } from '@angular/forms';

import { GreetComponent } from './components/greet/greet.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ChartModule } from 'src/modules/chart/chart.module';
import { DemoTemplatePropertyComponent } from './components/demo-template-property/demo-template-property.component';
import { DemoParentComponent } from './components/demo-parent/demo-parent.component';
import { DemoChildComponent } from './components/demo-child/demo-child.component';
import { SizeComponent } from './components/size/size.component';
import { DemoChild1Component } from './components/demo-child1/demo-child1.component';
import { DemoChild2Component } from './components/demo-child2/demo-child2.component';
import { DemoChild3Component } from './components/demo-child3/demo-child3.component';
import { DemoDirectiveComponent } from './components/demo-directive/demo-directive.component';
import { AttributeDirective } from './components/attribute/attribute.directive';
import { StructuralDirective } from './components/structural/structural.directive';
import { AttributeInputDirective } from './components/attribute-input/attribute-input.directive';
import { DemoLifeCycleComponent } from './components/demo-life-cycle/demo-life-cycle.component';
import { DemoChild4Component } from './components/demo-child4/demo-child4.component';
import { DemoChild5Component } from './components/demo-child5/demo-child5.component';
import { DemoChild6Component } from './components/demo-child6/demo-child6.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPipeComponent,
    DemoListComponent,
    DemoServiceComponent,
    DemoLazyComponent,
    DemoComponentComponent,
    DemoComponent2Component,
    DemoComponent3Component,
    DemoProvideInComponent,
    DemoComponent1Component,
    DemoProvidersComponent,
    DemoRenderer2Component,
    DemoNgTemplateComponent,
    GreetComponent,
    CustomerComponent,
    DemoTemplatePropertyComponent,
    DemoParentComponent,
    DemoChildComponent,
    SizeComponent,
    DemoChild1Component,
    DemoChild2Component,
    DemoChild3Component,
    DemoDirectiveComponent,
    AttributeDirective,
    StructuralDirective,
    AttributeInputDirective,
    DemoLifeCycleComponent,
    DemoChild4Component,
    DemoChild5Component,
    DemoChild6Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule,
    FormsModule,
    ChartModule.forRoot()

  ],
  providers: [
    // ChartService, PlotService
    // CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
