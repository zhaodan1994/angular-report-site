import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child4',
  templateUrl: './child4.component.html',
  styleUrls: ['./child4.component.css']
})
export class Child4Component implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    // 这个方法被 父组件调用
    greeting(name: string) {
        console.log ('hello: ' + name);
    }
}
