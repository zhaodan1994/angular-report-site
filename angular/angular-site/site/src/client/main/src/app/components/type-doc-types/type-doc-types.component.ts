import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-doc-types',
  templateUrl: './type-doc-types.component.html',
  styleUrls: ['./type-doc-types.component.scss']
})
export class TypeDocTypesComponent implements OnInit {

  @Input() documentObject: any;
  @Input() param: any;
  @Input() id: number;
  constructor() { }

  ngOnInit() {}


  inSamePage(id: number, refId: number): boolean {
    if (refId && id) {
      let routerName = this.documentObject[refId].routerName;
      let reName = this.documentObject[id].routerName;
      if (routerName.indexOf('-') > -1) {
        routerName = routerName.substring(0, routerName.indexOf('-'));
      }
      if (reName.indexOf('-') > -1) {
        reName = reName.substring(0, reName.indexOf('-'));
      }
      return (reName === routerName);
    } else {
      return false;
    }
  }

  jumpTypeAlias(alias: any): void {
    window.location.hash = '#' + alias.name;
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

  setRouter(id: number): string[] {
    if (id) {
      let obj = this.documentObject[id];
      const routerName = this.documentObject[id].routerName;
      let component = this.getComponent(obj.kindString);
      while (!component) {
        obj = this.documentObject[obj.parentId];
        component = this.getComponent(obj.kindString);
      }
      return [component, routerName];
    }

  }



}
