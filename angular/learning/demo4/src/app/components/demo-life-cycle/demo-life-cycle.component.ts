// tslint:disable-next-line:max-line-length
import { Component, OnInit, OnChanges, OnDestroy, DoCheck, AfterViewChecked, AfterViewInit, AfterContentChecked, SimpleChanges, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DemoChild4Component } from '../demo-child4/demo-child4.component';


// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-demo-life-cycle',
  templateUrl: './demo-life-cycle.component.html',
  styleUrls: ['./demo-life-cycle.component.scss']
})
// tslint:disable-next-line:max-line-length
export class DemoLifeCycleComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewChecked, AfterViewInit, AfterContentChecked, AfterContentInit {

  @ViewChild('child4Component', { static: false }) child4Component: DemoChild4Component;
  name = 'user1';
  showChild4 = true;
  constructor(private cd: ChangeDetectorRef) { }


  // 在 ngOnInit() 之前以及所绑定的一个或多个输入属性的值发生变化时都会调用。
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges - parent');
  }

   // 在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件.
   // 在第一轮 ngOnChanges() 完成之后调用，只调用一次。
   ngOnInit(): void {
    console.log('ngOnInit  - parent');
  }

  // 紧跟在每次执行变更检测时的 ngOnChanges() 和 首次执行变更检测时的 ngOnInit() 后调用
  ngDoCheck(): void {
    console.log('ngDoCheck  - parent');
  }

  // 当 Angular 把外部内容投影进组件视图或指令所在的视图之后调用。
  // 第一次 ngDoCheck() 之后调用，只调用一次。
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit  - parent');
  }

  // ngAfterContentInit() 和每次 ngDoCheck() 之后调用
  // 每当 Angular 检查完被投影到组件或指令中的内容之后调用
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked  - parent');

  }


  // 当 Angular 初始化完组件视图及其子视图或包含该指令的视图之后调用。
  // 第一次 ngAfterContentChecked() 之后调用，只调用一次。
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit  - parent');
  }

  // 每当 Angular 做完组件视图和子视图或包含该指令的视图的变更检测之后调用。
  // ngAfterViewInit() 和每次 ngAfterContentChecked() 之后调用。
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked  - parent' );
   // console.log(this.child4Component.userName);
   // this.cd.detectChanges();
  }


  // 每当 Angular 每次销毁指令/组件之前调用并清扫
  ngOnDestroy(): void {
    console.log('ngOnDestroy  - parent');
  }

  deleteChild4(): void {
    this.showChild4 = false;
  }
  addChild4(): void {
    this.showChild4 = true;
  }

}
