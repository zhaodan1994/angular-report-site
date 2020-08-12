import { AfterViewChecked, Component, OnDestroy } from '@angular/core';
import { DocumentationService } from '../../services/documentation/documentation.service';

import { ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-type-doc-enums',
  templateUrl: './type-doc-enums.component.html',
  styleUrls: ['./type-doc-enums.component.scss']
})
export class TypeDocEnumsComponent implements  OnDestroy, AfterViewChecked {

  documentJson: any;
  page: string;
  documentArray: any;
  documentObject: any;
  pageArray = [];
  enumObject: any;
  eventId: number;
  jumpFlag: boolean;
  navigationSubscription: any;

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
    if (this.page.indexOf('-') > -1) {
      this.page = this.page.substring(0, this.page.indexOf('-'));
      const url = window.location.pathname;
      window.location.assign(url.substring(0, url.lastIndexOf('-')) + '#' + url.substring(url.lastIndexOf('-') + 1));
    }
    this.enumObject = this.documentObject[this.documentArray[this.page]];
    this.setPageArray();
  }

  ngAfterViewChecked() {
    if (window.location.href.indexOf('#') > -1) {
      if (this.el.nativeElement.querySelector(window.location.hash) && this.eventId === 1 && (!this.jumpFlag)) {
        this.el.nativeElement.querySelector(window.location.hash).scrollIntoView(true);
        this.jumpFlag = true;

      }
    }

  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  jumpEnum(alias: any) {
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

  setRouter(id: number): any {
    if (id) {
      const obj = this.documentObject[id];
      let component: string;
      switch (obj.kindString) {
        case 'Module':
          component = '../../modules';
          break;
        case 'Enumeration':
          component = '../../enums';
          break;
        case 'Interface':
          component = '../../interfaces';
          break;
        case 'Class':
          component = '../../classes';
          break;
        case 'External module':
          component = '../../modules';
          break;
        default:
          break;
      }
      return [component, obj.routerName];
    }

  }

  setNavigateRouter(name: string): any {
    return this.setRouter(this.documentArray[name.substring(1)]);
  }


}
