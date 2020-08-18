import { AfterViewChecked, Component, OnDestroy } from '@angular/core';


import { ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DocumentationService } from '../../services/documentation/documentation.service';

declare var prettyPrint: any;

interface GroupsObject {
  [key: string]: any;
}

interface RouterObject {
  [key: number]: any;
}

@Component({
  selector: 'app-type-doc-classes',
  templateUrl: './type-doc-classes.component.html',
  styleUrls: ['./type-doc-classes.component.scss']
})
export class TypeDocClassesComponent implements OnDestroy, AfterViewChecked {

  documentJson: any;
  page: string;
  documentArray: any;
  documentObject: any;
  pageArray = [];
  classObject: any;
  groups: GroupsObject = {};
  navigationSubscription: any;
  beforeElements = [];
  afterElements = [];
  pageType: string;
  eventId: number;
  jumpFlag: boolean;


  constructor(
    private documentService: DocumentationService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.onInit();
        this.eventId = event.id;
      }
    });
  }

  onInit() {
    this.jumpFlag = false;
    if (!DocumentationService.jsonData) {
      this.documentService.documentation()
      .subscribe((data) => {
        DocumentationService.jsonData = data;
        for (const iterator of data.children) {
          this.documentService.getDocumentArray(iterator, iterator.name, iterator.id, iterator.kind);
          DocumentationService.documentObject[iterator.id].routerName = iterator.name;
          DocumentationService.documentObject[iterator.id].parentId = data.id;
          DocumentationService.documentObject[iterator.id].parentKind = data.kind;
        }
        this.load();


      });
    } else {
      this.load();
    }


  }

  load() {
    this.documentJson = DocumentationService.jsonData.children;
    this.documentArray = DocumentationService.documentArray;
    this.documentObject = DocumentationService.documentObject;
    this.page = this.route.snapshot.paramMap.get('page');
    this.pageType = this.route.snapshot.data.type;

    if (this.page.indexOf('-') > -1) {
      this.page = this.page.substring(0, this.page.indexOf('-'));
      const url = window.location.pathname;
      window.location.assign(url.substring(0, url.lastIndexOf('-')) + '#' + url.substring(url.lastIndexOf('-') + 1));


    }
    this.classObject = this.documentObject[this.documentArray[this.page]];
    this.setPageArray();
    this.setNavigateElements();
    this.setGroups();

    if (!window.location.hash) {
      document.querySelector('app-type-doc-search').scrollIntoView(true);
    }
  }


  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


  ngAfterViewChecked() {
    if (window.location.href.indexOf('#') > -1) {
      if (this.el.nativeElement.querySelector(window.location.hash) && this.eventId === 1 && (!this.jumpFlag)) {
        this.el.nativeElement.querySelector(window.location.hash).scrollIntoView(true);
        this.jumpFlag = true;

      }
    }
    prettyPrint();
  }

  setNavigateElements() {
    if (!window.location.hash) {
      this.beforeElements = [];
      this.afterElements = [];
    }
    const parentObj = this.documentObject[this.classObject.parentId];
    if (this.beforeElements.length === 0 && this.afterElements.length === 0) {
      if (parentObj.name === 'plugins' || this.pageArray[0] === '.trellis') {
        let index: number;
        for (let i = 1; i <= parentObj.children.length; i++) {
          if ((!index) && this.classObject.id === parentObj.children[i - 1].id) {
            index = i;
          }
          if (index && index < i) {
            this.afterElements.push(parentObj.children[i - 1]);
          }
          if (!index) {
            this.beforeElements.push(parentObj.children[i - 1]);
          }
        }
      }
    }

  }

  setTypeParam(): string {
    if (this.classObject.typeParameter) {
      let str = '<';
      for (const iterator of this.classObject.typeParameter) {
        str = str + iterator.name + ',';
      }
      return str.substring(0, str.length - 1) + '>';
    } else {
      return '';
    }

  }

  setNgClass(module: any) {
    return this.documentService.setNgClass(module, this.pageType);
  }

  returnZero(): number {
    return 0;
  }

  jumpClassElement(alias: any) {
    window.location.hash = alias.name;
  }

  setPageArray() {
    this.pageArray = [];
    let key = '';
    for (const item of this.page.split('.')) {
      key = key + '.' + item;
      this.pageArray.push(key);
    }

  }

  setGroups() {
    this.groups = {};
    for (const item of this.classObject.groups) {
      const array = [];
      for (const iterator of item.children) {
        array.push(this.documentObject[iterator]);
      }
      this.groups[item.title] = array;
    }
  }


  getComponent(str: string): string {
   return this.documentService.getComponent(str);
  }


  jumpOtherPage(index: number, obj: any, hashId: number) {
    let hashObj = this.documentObject[hashId];
    const length = obj.name.split('.').length;
    const routerJson: RouterObject = {};
    for (let i = 0; i < length; i++) {
      const kindString = hashObj.kindString;
      let component = this.getComponent(kindString);
      obj = this.documentObject[hashId];
      const routerParam = hashObj.routerName;
      let str: string;
      while (!component) {
        obj = this.documentObject[obj.parentId];
        component = this.getComponent(obj.kindString);
        str = obj.routerName;
      }

      hashId = hashObj.parentId;
      routerJson[length - i - 1] = [component.substring(component.lastIndexOf('/') + 1), routerParam];
      hashObj = this.documentObject[hashObj.parentId];
    }
    const url = window.location.pathname.substring(0, window.location.pathname.indexOf('/' + this.pageType) + 1);
    const docuIndex = url.indexOf('/documentation');
    return [url.substring(docuIndex) + routerJson[index][0], routerJson[index][1]];







  }

  setRouter(id: number) {
    if (id) {
      const obj = this.documentObject[id];
      const component = this.documentService.getComponent(obj.kindString);
      return [component, obj.routerName];
    }

  }

  setNavigateRouter(name: string): any {
    return this.setRouter(this.documentArray[name.substring(1)]);
  }

}
