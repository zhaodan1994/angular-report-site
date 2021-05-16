import {
    AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit,
    ViewChild
} from '@angular/core';
import {Child4Component} from './child4/child4.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
    , AfterContentChecked
    , AfterContentInit
    , AfterViewInit, AfterViewChecked
{

    title = 'kitty';

    greeting = 'hello';
    user: {name: string} = {name: 'rose'};

    divContent = `<div>这是内部div内容</div>`;

    // 这样就可以在之后引用子组件中的函数
    @ViewChild('child4_1')
        child4_1: Child4Component;

    ngOnInit(): void {
        // 执行子组件中的函数
        this.child4_1.greeting('ngOnInit + kitty');
    }

    ngAfterContentInit(): void {
        console.log ( 'ngAfterContentInit + 父组件投影内容--初始化--完毕');
    }

    ngAfterContentChecked(): void {
        console.log ( 'ngAfterContentChecked +父组件投影内容--变更--完毕');
    }

    // 在这个函数中是不能修改组件 变量的值的
    ngAfterViewInit(): void {
        // this.title = 'rose';  这会报错，可以用定时器来完成 setTimeout()
        console.log ( 'ngAfterViewInit + 父组件--视图--内容初始化完毕');
    }

    ngAfterViewChecked(): void {
        console.log ( 'ngAfterViewChecked + 父组件--视图--内容--变更--完毕');
    }

}





















