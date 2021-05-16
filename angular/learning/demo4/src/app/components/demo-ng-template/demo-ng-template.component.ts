import { ViewContainerRef,  ComponentRef, OnDestroy, ChangeDetectorRef, ComponentFactory } from '@angular/core';
import { Component, OnInit, ViewChild, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { GreetComponent } from '../greet/greet.component';
import { DynamicComponent } from 'src/modules/data/components/dynamic/dynamic.component';



@Component({
  selector: 'app-demo-ng-template',
  templateUrl: './demo-ng-template.component.html',
  styleUrls: ['./demo-ng-template.component.scss']
})
export class DemoNgTemplateComponent implements OnInit, OnDestroy {

  greetComponentRef: ComponentRef<GreetComponent>;
  dynamicComponentRef: ComponentRef<DynamicComponent>;

  @ViewChild('dialogTemplate', {static: true}) customDialog: TemplateRef<any>;
  @ViewChild('dialogContainer', { read: ViewContainerRef, static: true }) dialogContainer: ViewContainerRef;
  @ViewChild('greetContainer', { read: ViewContainerRef, static: true }) greetContainer: ViewContainerRef;
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true }) dynamicContainer: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) { }

  name = 'User';
  currentIndex = 1;
  interval: any;
  ngOnInit(): void {
    this.createDialog();
    this.createComponentInCurrentModule();
    this.createComponentInOtherModule();
    // this.createMultipleComponent();
  }



  createDialog(): void {
    this.dialogContainer.createEmbeddedView(this.customDialog);
  }

  createComponentInCurrentModule(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GreetComponent);
    this.greetContainer.clear();
    this.greetComponentRef = this.greetContainer.createComponent(componentFactory);
    this.greetComponentRef.instance.name = this.name + this.currentIndex;
    this.greetComponentRef.instance.changeEvent.subscribe((value: string) => {
      this.name = value;
    });

  }

  createComponentInOtherModule(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    this.dynamicContainer.clear();
    this.dynamicComponentRef = this.greetContainer.createComponent(componentFactory);
    this.dynamicComponentRef.instance.name = this.name + this.currentIndex;
    this.dynamicComponentRef.instance.changeEvent.subscribe((value: string) => {
      this.name = value;
    });
  }


  changeName() {
    this.name = 'User5';
    // this.greetComponentRef.instance.name = 'User5';
    // this.dynamicComponentRef.instance.name = 'User5';

  }


  createMultipleComponent() {
    this.createComponentInCurrentModule();
    this.interval = setInterval(() => {
      this.currentIndex ++;
      this.createComponentInCurrentModule();
      if (this.currentIndex === 4) {
        clearInterval(this.interval);
      }
    }, 1500);
  }

 ngOnDestroy(): void {
   if (this.greetComponentRef) {
     this.greetComponentRef.destroy();
   }

   if (this.dynamicComponentRef) {
    this.dynamicComponentRef.destroy();
  }

 }


}
