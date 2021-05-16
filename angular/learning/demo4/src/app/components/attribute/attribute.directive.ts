import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAttribute]'
})
export class AttributeDirective {

  // 你可以在属性指令的构造函数中使用 ElementRef 来注入宿主 DOM 元素的引用，
  // 也就是你放置 appAttribute 的那个元素。
  //  ElementRef 通过其 nativeElement 属性 可以直接访问宿主 DOM 元素。
  constructor( private el?: ElementRef) {
      this.setStyle('green', '15px');
  }


    // @HostListener 装饰器让你订阅某个属性型指令所在的宿主 DOM 元素的事件
   @HostListener('mouseenter') onMouseEnter() {
    this.setStyle('blue', '11px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setStyle(null, null);
  }

  setStyle(color: string, fontSize: string) {
    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style.fontSize = fontSize;
  }

}
