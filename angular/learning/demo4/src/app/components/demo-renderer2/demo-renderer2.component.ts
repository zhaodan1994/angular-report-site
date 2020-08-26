import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-demo-renderer2',
  templateUrl: './demo-renderer2.component.html',
  styleUrls: ['./demo-renderer2.component.scss']
})
export class DemoRenderer2Component implements OnInit, AfterViewInit {

  name = 'Kitty';
  showHello2 = true;
  @ViewChild('hello', { static: true}) helloDiv: ElementRef;
  @ViewChild('hello2', { static: false}) hello2Div: ElementRef;
  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    // this.useViewChild(this.helloDiv);
    // this.useViewChild(this.hello2Div);
    // this.useElementRef();
    this.useRenderer2(this.helloDiv);
  }

  ngAfterViewInit(): void {
   // this.useViewChild(this.hello2Div);
   // this.useRenderer2(this.hello2Div);
  }

  useViewChild(element: ElementRef): void {
    const divElement = element.nativeElement;
    divElement.style.backgroundColor = 'lightpink';
  }

  useElementRef(): void {
    const divElement = this.el.nativeElement.querySelector('div');
    divElement.style.backgroundColor = 'lightgreen';
  }

  useRenderer2(element: ElementRef): void {
    const divElement = element.nativeElement;
    this.render.setStyle(divElement, 'backgroundColor', 'orange');
    this.render.addClass(divElement, 'text');
  }

}
