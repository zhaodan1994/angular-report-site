import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { reflectionKind } from './reflectionKind';

interface DocumentObject {
  [key: string]: number;
}

interface DocumentJson {
  [key: number]: any;
}

interface InterfaceObject {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private http: HttpClient
  ) {

  }
  static documentArray: DocumentObject = {};
  static documentObject: DocumentJson = {};

  static jsonData: any;
  kindArray = [2, 4, 128, 256];

  documentation(): Observable<any> {
    return this.http.get<any>('api/' + this.version() + '/documentation');
  }

  protected version(): string {
    switch (this.baseHref) {
      case '/':
        return 'develop';
      case '/sjs':
          return 'sjs';
      case '/gces':
        return 'gces';
      case '/ar':
        return 'ar';
      default:
        return 'develop';
    }
  }


  getDocumentArray(obj: any, keyName: string, parentId: number, parentKind: number) {
    if (obj.children) {
      obj.parentId = parentId;
      obj.parentKind = parentKind;
      DocumentationService.documentArray[keyName] = obj.id;
      DocumentationService.documentObject[obj.id] = obj;
      for (const iter of obj.children) {
        if (iter.children) {
          const parentName = keyName + '.' + iter.name;
          DocumentationService.documentArray[parentName] = iter.id;
          this.getDocumentArray(iter, parentName, iter.id, iter.kind);
          iter.routerName = parentName;
        } else {
          this.getDocumentArray(iter, keyName, iter.id, iter.kind);
          if ( this.kindArray.includes(iter.kind) ) {
            iter.routerName = keyName + '.' + iter.name;
          } else {
            iter.routerName = keyName + '-' + iter.name;
          }
        }
        iter.parentId = parentId;
        iter.parentKind = parentKind;
        DocumentationService.documentObject[iter.id] = iter;

      }
    }
  }

  setNgClass(module: any, type?: string) {
    const ngClass: InterfaceObject = {};
    for (const key in reflectionKind) {
      if (reflectionKind.hasOwnProperty(key)) {
        ngClass[key] = module.kind === reflectionKind[key];
      }
    }
    if (module.flags) {
      if (module.flags.isProtected) {
        ngClass['tsd-is-protected'] = true;
      }
      if (module.flags.isStatic) {
        ngClass['tsd-is-static'] = true;
      }
      if (module.flags.isPrivate) {
        ngClass['tsd-is-private'] = true;
      }
    }
    if (module.overwrites) {
      ngClass['tsd-is-overwrite'] = true;
    }
    if (module.getSignature) {
      ngClass['tsd-kind-get-signature'] = true;
    }
    if (module.inheritedFrom) {
      ngClass['tsd-is-inherited'] = true;
    }
    if (module.setSignature) {
      ngClass['tsd-kind-set-signature'] = true;
    }
    if (type === 'classes') {
      ngClass['tsd-parent-kind-class'] = true;
    }
    if (type === 'interfaces') {
      ngClass['tsd-parent-kind-interface'] = true;
    }
    return ngClass;
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

  setRouter(id: number , documentObject: any): any {
    if (id) {
      let obj = documentObject[id];
      const routerName = documentObject[id].routerName;
      let component = this.getComponent(obj.kindString);
      while (!component) {
        obj = documentObject[obj.parentId];
        component = this.getComponent(obj.kindString);
      }
      const pathName = window.location.pathname;
      if (pathName.indexOf('/globals') > -1) {
        return [component.substring(component.indexOf('/') + 1), routerName];
      }
      if (this.checkPath('/interfaces') || this.checkPath('/classes') || this.checkPath('/modules') || this.checkPath('/enums')) {
        return [component, routerName];
      }
      return [component.substring(component.lastIndexOf('/') + 1), routerName];
    }

  }

  checkPath(checkString: string): boolean {
    const pathName = window.location.pathname;
    let result = false;
    if (pathName.indexOf(checkString) > -1) {
      result = true
    }
    return result;
  }

}
