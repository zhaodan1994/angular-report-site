import {
    AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';

import 'rxjs';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck
    , AfterContentInit, AfterContentChecked
    , AfterViewInit, AfterViewChecked
{

    @Input()
    greeting: string;

    @Input()
    user: {name: string};

    message = '初始化消息';
    oldUsername: string;
    changeDetected = false;
    noChangeCount = 0;

    constructor() { }

    ngOnInit() {

    }

    // 只有 @Input() 变量改变时才会调用这个函数，
    // 而且对象只是属性的值改变也不会调用这个函数，
    // greeting的值改变时才会调用这个函数，因为greeting是字符串类型，
    // 而字符串是不可变的，greeting的值改变时，greeting是指向其他地方的。
    ngOnChanges(changes: SimpleChanges): void {

        // console.log( JSON.stringify(changes, null, 4));
    }

    // 只要点击了页面中有 @Input()类型相关的地方都会调用这个函数
    // 而且 是所有组件中有 Check关键字的勾子函数都会被调用。
    // 所以 这个关键字相关的函数 尽量 短小 简洁 快速
    ngDoCheck (): void {

        if (this.user.name !== this.oldUsername) {
            this.changeDetected = true;
            console.log( `ngDoCheck--> old name: ${this.oldUsername}, new name: ${this.user.name}` );
            this.oldUsername = this.user.name;
        }

        if ( this.changeDetected ) {
            this.noChangeCount = 0;
        }else {
            this.noChangeCount = this.noChangeCount + 1;
            console.log ( 'count is : ' + this.noChangeCount );
        }

        this.changeDetected = false;
    }


    ngAfterContentInit(): void {
        console.log ( '子组件--投影--内容--初始化--完毕');
    }

    ngAfterContentChecked(): void {
        console.log ( '子组件--投影--内容--变更--完毕');
    }

    ngAfterViewInit(): void {
        console.log ( '子组件--视图--内容--初始化--完毕');
    }

    ngAfterViewChecked(): void {
        console.log ( '子组件--视图--内容--变更--完毕');
    }
}
























