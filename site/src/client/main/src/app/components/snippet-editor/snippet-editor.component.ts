import { Renderer2, OnInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy} from '@angular/core';
import { ComponentFactory, AfterViewChecked, HostBinding, AfterViewInit,  ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SnippetService } from '../../services/snippet/snippet.service';
import { SelectElementComponent } from '../select-element/select-element.component';

declare var prettyPrint: any;

@Component({
  selector: 'app-snippet-editor',
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.scss']
})
export class SnippetEditorComponent implements  OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @HostBinding('attr.class') class = 'app-snippet-editor';
  @Input() model: object;
  @Output() switchEnumValue = new EventEmitter<object>();
  @ViewChild('snippetNode', { static: false }) element: ElementRef<HTMLDivElement>;


  topPixel: number;
  leftPixel: number;
  hasClick = false;
  snippetJson = [];
  componentRef: ComponentRef<SelectElementComponent>;
  currentSelectedElement: any;
  allType = ['RenderMethod', 'PlotType', 'ExcludeNulls', 'Symbols', 'SwapAxes', 'AxisMode', 'ClippingMode', 'LineAspect', 'ShowNulls', 'LinePosition', 'AnimationMode', 'AnimationEasing', 'Palette', 'Orientation', 'Position', 'SelectionMode'];
  booleanTyple = ['ExcludeNulls', 'Symbols', 'SwapAxes'];
  factory: ComponentFactory<SelectElementComponent> = this.resolver.resolveComponentFactory(SelectElementComponent);


  @ViewChild('selectContainer', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver,
    private snippetService: SnippetService,
    private el: ElementRef,
    private render: Renderer2,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.snippetJson = [];
    const snippetModel = this.snippetService.applySnippetEnumType(this.model);
    const snippetString = snippetModel ? JSON.stringify(snippetModel, null, 2) : '';
    this.snippetJson.push(snippetString);
  }

  ngAfterViewInit(): void {
    const snippetElements = this.el.nativeElement.querySelectorAll('#snippet');
    snippetElements.forEach(snippetElement => {
      if (!snippetElement.hasAttribute('prettyed')) {
        this.initSnippetElement(snippetElement);

      }
    });

  }

  ngAfterViewChecked(): void {
    const boxElement: any = document.querySelector('.cdk-overlay-pane');
    if (boxElement && boxElement.style.left !== '' && this.hasClick) {
      boxElement.style.top = this.topPixel + 'px';
      boxElement.style.left = this.leftPixel + 'px';
      boxElement.style.display = 'block';
      boxElement.style.transform = 'none';
      this.hasClick = false;

    }
  }


  createComponent(enumParam: string): void {
   this.container.clear();
   this.componentRef = this.container.createComponent(this.factory);

   this.componentRef.instance.enumParam = enumParam;
   this.componentRef.instance.selectElement.subscribe((value: string) => {
      if (value === 'true' || value === 'false') {
        this.currentSelectedElement.innerText = value;
      } else {
        this.currentSelectedElement.innerText = '"' + value + '"';
      }
      const snippetElement = this.element.nativeElement.querySelector('pre');
      this.model = JSON.parse(snippetElement.innerText.replace(new RegExp(String.fromCharCode(160), 'g'), ''));
      this.switchEnumValue.emit(this.model);

    });
   this.cd.detectChanges();

  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  initSnippetElement(snippetElement: any): void {

    prettyPrint();
    this.render.setAttribute(snippetElement, 'prettyed', 'ok');
    const stringElements = snippetElement.querySelectorAll('.str');
    stringElements.forEach(stringElement => {
      if (stringElement.childElementCount <= 0) {
        const text = stringElement.innerText;
        const array = text.substring(1, text.length - 1).split('::');
        const isSwitch = this.allType.includes(array[array.length - 1]);
        const colonIndex = text.indexOf('::');
        if (colonIndex !== -1 && isSwitch) {
          let value = text.substring(0, colonIndex) + '"';
          const enumType = text.substring(colonIndex + 2, text.length - 1);


          if (this.booleanTyple.includes(enumType)) {
            value = text.substring(1, colonIndex);
          }
          this.render.addClass(stringElement, 'enum');
          this.render.addClass(stringElement, enumType);
          stringElement.innerText = value;
          this.render.listen(stringElement, 'click', (clickEvent) => {
            this.topPixel = clickEvent.currentTarget.getBoundingClientRect().y + clickEvent.currentTarget.getBoundingClientRect().height;
            this.leftPixel = clickEvent.currentTarget.getBoundingClientRect().x;
            this.hasClick = true;
            let enumText = stringElement.innerText;
            if (enumText !== 'true' && enumText !== 'false') {
              enumText = enumText.substring(1, enumText.length - 1);
            }
            this.createComponent(enumText + '::' + enumType);
            this.currentSelectedElement = stringElement;
            const selectBox: any = document.querySelectorAll('#selectView');

            selectBox.forEach(boxElement => {
             boxElement.style.display = 'none';
            });

          });




        }
      }
    });
  }

}
