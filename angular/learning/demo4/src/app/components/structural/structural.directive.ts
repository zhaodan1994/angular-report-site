import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appStructural]'
})
export class StructuralDirective {

  @Input('appStructural') set hideElement(value: boolean) {
    if (!value) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
        this.viewContainer.clear();
    }
}
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  // 简单结构型指令会从 Angular 生成的 <ng-template> 元素中创建一个内嵌的视图，
  // 并把这个视图插入到一个视图容器中，紧挨着本指令原来的宿主元素

}
