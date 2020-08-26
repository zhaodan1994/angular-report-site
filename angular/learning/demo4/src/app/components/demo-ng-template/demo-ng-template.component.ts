import { ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GreetComponent } from '../greet/greet.component';


@Component({
  selector: 'app-demo-ng-template',
  templateUrl: './demo-ng-template.component.html',
  styleUrls: ['./demo-ng-template.component.scss']
})
export class DemoNgTemplateComponent implements OnInit, OnDestroy {

  componentRef: ComponentRef<GreetComponent>;

  @ViewChild('dialogTemplate', {static: true}) customDialog: TemplateRef<any>;
  @ViewChild('dialogContainer', { read: ViewContainerRef, static: true }) dialogContainer: ViewContainerRef;
  @ViewChild('greetContainer', { read: ViewContainerRef, static: true }) greetContainer: ViewContainerRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  name = 'User1';
  ngOnInit(): void {
    this.createDialog();
    this.createComponent();
  }




  createDialog(): void {
    this.dialogContainer.createEmbeddedView(this.customDialog);
  }

  createComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GreetComponent);
    this.greetContainer.clear();
    this.componentRef = this.greetContainer.createComponent(componentFactory);
    this.componentRef.instance.name = this.name;
    this.componentRef.instance.changeEvent.subscribe((value: string) => {
      this.name = value;
    });
  }

 ngOnDestroy(): void {
   if (this.componentRef) {
     this.componentRef.destroy();
   }

 }

}
