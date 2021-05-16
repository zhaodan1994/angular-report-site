import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAttributeInput]'
})
export class AttributeInputDirective implements OnInit, OnChanges{

  @Input() defaultColor: string;
  @Input('appAttributeInput') color: string;

  constructor(private el?: ElementRef) {  }

  ngOnInit(): void {
    this.setColor();
  }

  ngOnChanges(): void {
    this.setColor();
  }

  setColor(): void {
    this.el.nativeElement.style.color = this.color || this.defaultColor;

  }




}
