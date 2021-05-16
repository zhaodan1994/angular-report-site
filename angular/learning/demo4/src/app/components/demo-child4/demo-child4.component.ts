// tslint:disable-next-line:max-line-length
import { Component, OnInit, OnChanges, OnDestroy, DoCheck, AfterViewChecked, AfterViewInit, AfterContentChecked, AfterContentInit, SimpleChanges, Input } from '@angular/core';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-demo-child4',
  templateUrl: './demo-child4.component.html',
  styleUrls: ['./demo-child4.component.scss']
})
// tslint:disable-next-line:max-line-length
export class DemoChild4Component implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewChecked, AfterViewInit, AfterContentChecked, AfterContentInit {

  @Input() userName: string;
  constructor() { }
   ngOnChanges(changes: SimpleChanges): void {
     console.log(changes);
     console.log('ngOnChanges - child4');
  }

   ngOnInit(): void {
    console.log('ngOnInit  - child4');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck  - child4');
  }

  ngAfterContentInit(): void {

    console.log('ngAfterContentInit  - child4');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked  - child4');

  }


  ngAfterViewInit(): void {
   // this.userName = 'New Customer';
    console.log('ngAfterViewInit  - child4');

  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked  - child4' );
  }


  ngOnDestroy(): void {
    console.log('ngOnDestroy  - child4');
  }

}
