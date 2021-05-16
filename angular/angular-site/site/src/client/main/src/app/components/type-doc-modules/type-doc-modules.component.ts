import { AfterViewChecked, Component, OnDestroy } from '@angular/core';


import { ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DocumentationService } from '../../services/documentation/documentation.service';

interface GroupsObject {
  [key: string]: any;
}

@Component({
  selector: 'app-type-doc-modules',
  templateUrl: './type-doc-modules.component.html',
  styleUrls: ['./type-doc-modules.component.scss']
})
export class TypeDocModulesComponent implements OnDestroy, AfterViewChecked {

  documentJson: any;
  page: string;
  documentArray: any;
  documentObject: any;
  pageArray = [];
  moduleObject: any;
  groups: GroupsObject = {};
  navigationSubscription: any;
  eventId: number;
  jumpFlag: boolean;

  constructor(
    private documentService: DocumentationService,
    // ActivatedRoute 专门用于由 Angular 路由器加载的每个路由组件。
    // 它包含关于该路由，路由参数以及与该路由关联的其它数据的信息。
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
    // 获取路由参数
    this.page = this.route.snapshot.paramMap.get('page');

    if (this.page.indexOf('-') > -1) {
      this.page = this.page.substring(0, this.page.indexOf('-'));
      const url = window.location.pathname;
      window.location.assign(url.substring(0, url.lastIndexOf('-')) + '#' + url.substring(url.lastIndexOf('-') + 1));


    }
    this.moduleObject = this.documentObject[this.documentArray[this.page]];
    this.setPageArray();
    this.setGroups();

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
  }

  setNgClass(module: any) {
    return this.documentService.setNgClass(module);
  }

  returnZero() {
    return 0;
  }

  jumpTypeAlias(alias: any) {
    window.location.hash = '#' + alias.name;
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
    if (this.moduleObject) {
      for (const item of this.moduleObject.groups) {
        const array = [];
        for (const iterator of item.children) {
          array.push(this.documentObject[iterator]);
        }
        this.groups[item.title] = array;
      }
    }
  }

  getComponent(str: string): string {
    return this.documentService.getComponent(str);
  }

  setRouter(id: number): any {
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
