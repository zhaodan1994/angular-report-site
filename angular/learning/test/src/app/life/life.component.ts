import {
    Component, DoCheck, OnInit, AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnChanges, OnDestroy, Input, SimpleChanges
} from '@angular/core';

let logIndex: number = 1;

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.css']
})
export class LifeComponent implements OnInit
    , OnChanges, DoCheck,OnDestroy
    , AfterContentInit, AfterContentChecked
    , AfterViewInit, AfterViewChecked
{
    @Input()
    name: string;

    logIt (msg: string) {
        console.log(`#${logIndex++} ${msg}`);
    }

    constructor() {
        this.logIt('name 属性在 constructor 里的值是： ' + name);
    }

    ngOnInit() {

        this.logIt('ngOnInit');
    }

    ngOnChanges(changes: SimpleChanges) {

        let name = changes['name'].currentValue;

        this.logIt('name 属性在 ngOnChanges 里的值是： ' + name);
    }

    ngDoCheck() {

        this.logIt('ngDoCheck');
    }

    ngOnDestroy() {

        this.logIt('ngOnDestroy');
    }

    ngAfterContentInit() {

        this.logIt('ngAfterContentInit');
    }

    ngAfterContentChecked():void {

        this.logIt('ngAfterContentChecked');
    }

    ngAfterViewInit() {

        this.logIt('ngAfterViewInit');
    }

    ngAfterViewChecked() {

        this.logIt('ngAfterViewChecked');
    }


}






































