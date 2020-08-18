import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-doc-comment',
  templateUrl: './type-doc-comment.component.html',
  styleUrls: ['./type-doc-comment.component.scss']
})
export class TypeDocCommentComponent implements OnInit {
  @Input() comment: any;
  @Input() obj: any;
  @Input() array: any;

  linkName: string;
  constructor() { }

  ngOnInit() {
  }

  setRouter(str: string) {
      const index = str.indexOf(']{@link');
      const param = str.substring(0, index);
      this.linkName = param.substring(param.lastIndexOf('[') + 1);
      let routerName = str.substring(index + 7, str.indexOf(this.linkName + '}') + this.linkName.length);
      routerName = routerName.replace(/(^\s*)|(\s*$)/g, '');
      const linkObj = this.obj[this.array['core.' + routerName]];
      return [this.getComponent(linkObj.kindString), linkObj.routerName];

  }

  getStartIndex(str: string): number {
    return str.indexOf('<pre>');
  }

  getEndIndex(str: string): number {
    return str.indexOf('</pre>');
  }

  returnPre(text: string): string {
    return text.substring(this.getStartIndex(text) + 5, this.getEndIndex(text)).replace(/(^\s*)|(\s*$)/g, '');
  }

  linkStartIndex(str: string): number {
    const index = str.indexOf(']{@link');
    const param = str.substring(0, index);
    this.linkName = param.substring(param.lastIndexOf('[') + 1);
    const startIndex = '[' + this.linkName + ']{@link';
    return str.indexOf(startIndex);
  }

  linkEndIndex(str: string): number {
    const param = this.linkName + '}';
    return str.indexOf(param) + param.length;
  }

  codeStartIndex(str: string): number {
    return str.indexOf('     {\n');
  }

  codeEndIndex(str: string): number {
    return str.indexOf('\n     }');
  }

  returnCode(text: string): string {
    const content = text.substring(this.codeStartIndex(text) , this.codeEndIndex(text) + 7);
    return '\n' + content;
  }

  ulStartIndex(str: string): number {
    return str.indexOf('*');
  }

  returnUl(text: string): string {
    return text.substring(this.ulStartIndex(text) + 1);
  }


  getComponent(str: string): string {
    let component: string;
    switch (str) {
      case 'Module':
      case 'Modules':
        component = '../../modules';
        break;
      case 'Enumeration':
      case 'Enumerations':
        component = '../../enums';
        break;
      case 'Interface':
      case 'Interfaces':
        component = '../../interfaces';
        break;
      case 'Class':
      case 'Classes':
        component = '../../classes';
        break;
      case 'External module':
        component = '../../modules';
        break;
      default:
        break;
    }
    return component;
  }

  getScliceType(str: string): string {
    let sliceType = 'text';
    if (this.getStartIndex(str) > -1 && this.getEndIndex(str) > -1) {
      sliceType = 'pre';
    }
    if (this.ulStartIndex(str) > -1) {
      sliceType = 'ul';
    }
    if (this.linkStartIndex(str) > -1 && this.linkEndIndex(str) > -1) {
      sliceType = 'link';
    }
    if (this.codeStartIndex(str) > -1 && this.codeEndIndex(str) > -1) {
      sliceType = 'code';
    }

    return sliceType;
  }

}
