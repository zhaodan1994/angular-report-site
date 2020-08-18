import { AfterViewChecked, Component, ElementRef, Input, OnInit, Renderer2, HostListener } from '@angular/core';


import { Router } from '@angular/router';
import { DocumentationService } from '../../services/documentation/documentation.service';

interface SearchObject {
  [key: string]: any;
}

@Component({
  selector: 'app-type-doc-search',
  templateUrl: './type-doc-search.component.html',
  styleUrls: ['./type-doc-search.component.scss']
})
export class TypeDocSearchComponent implements OnInit, AfterViewChecked {
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private documentService: DocumentationService,
    private router: Router
  ) { }


  searchContent = '';
  searchObj: SearchObject = {};
  searchArray = [];
  isEmptyObj = false;
  hasFocused: boolean;
  currentIndex: number;

  @Input() documentObject: any;

  ngOnInit() {
    if (!this.documentObject) {
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
          this.documentObject = DocumentationService.documentObject;

        });
      } else {
        this.documentObject = DocumentationService.documentObject;
      }

    }

  }

  @HostListener('window:click', ['$event'])
  click(event) {
    if (!(event.target.getAttribute('for') === 'tsd-search-field' || event.target.getAttribute('id') === 'tsd-search-field' )) {
      document.querySelector('#tsd-search').classList.remove('has-focus');
    }
 }

  ngAfterViewChecked() {
    if (this.el.nativeElement.querySelector('#list0') && (!this.hasFocused)) {
      this.hasFocused = true;
      const currentFocus = this.el.nativeElement.querySelector('#list0');
      currentFocus.focus();
      currentFocus.style.backgroundColor = '#eee';
      this.currentIndex = 0;

    }
  }

  setKeyDown(event: any) {
    const list = this.el.nativeElement.querySelectorAll('.searchList');
    switch (event.keyCode) {
      case 38: {
                if (this.currentIndex > 0 && this.currentIndex < list.length) {
                  this.currentIndex--;
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex].style.background = '#eee';
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex].focus();
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex + 1].style.background = '#fdfdfd';
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex + 1].blur();
                }
                break;
      }
      case 13: {
                if (this.currentIndex || this.currentIndex === 0) {
                    const href = this.el.nativeElement.querySelector('#list' + this.currentIndex).querySelector('a').getAttribute('href');
                    const index = href.indexOf('/documentation');
                    this.router.navigateByUrl(href.substring(index));
                    document.querySelector('#tsd-search').classList.remove('has-focus');
                }
                break;
      }
      case 40: {
                if (this.currentIndex < list.length) {
                  this.currentIndex++;
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex].style.background = '#eee';
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex].focus();
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex - 1].style.background = '#fdfdfd';
                  this.el.nativeElement.querySelectorAll('ul li')[this.currentIndex - 1].blur();

                  if (this.currentIndex === list.length) {
                    this.el.nativeElement.querySelectorAll('ul li')[list.length - 1].style.background = '#eee';
                    this.el.nativeElement.querySelectorAll('ul li')[list.length - 1].focus();
                    this.currentIndex = list.length - 1;
                  }
                }
                break;
      }

    }
  }



  setNgClass(module: any) {
    let ngClass: SearchObject = {};
    ngClass = this.documentService.setNgClass(module);
    if (module.parentKind === 128) {
      ngClass['tsd-parent-kind-class'] = true;
    }
    if (module.parentKind === 256) {
      ngClass['tsd-parent-kind-interface'] = true;
    }
    if (module.parentKind === 4) {
      ngClass['tsd-parent-kind-enum'] = true;
    }
    if (module.parentKind === 2) {
      ngClass['tsd-parent-kind-module'] = true;
    }
    if (module.parentKind === 1) {
      ngClass['tsd-parent-kind-external-module'] = true;
    }

    return ngClass;
  }

  setRouter(id: number) {
    return this.documentService.setRouter(id, this.documentObject);
  }

  startSearch(event: any) {
    this.searchContent = '';
    this.searchObj = {};
    const element: ElementRef = this.el.nativeElement.querySelector('#tsd-search');
    this.render.addClass(element, 'has-focus');
  }


  checkName(name: string) {
    this.searchObj = {};
    if (name.replace(/(^\s*)|(\s*$)/g, '')) {
      this.searchArray = [];
      let numberCount = 0 ;
      for (const key in this.documentObject) {
        if (this.documentObject.hasOwnProperty(key)) {
          const element = this.documentObject[key];
          const keyName = element.routerName.replace('-', '.');
          if (numberCount < 10 && element.name.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())) {
            this.searchObj[key] = element;
            numberCount++;
          } else {
            if (keyName.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())) {
              this.searchArray.push(element);
            }
          }
        }
      }
      if (numberCount < 10 && this.searchArray.length > 0) {
        for (let i = 0 ; i < 10 - numberCount; i++) {
          if (this.searchArray[i]) {
            this.searchObj[this.searchArray[i].id] = this.searchArray[i];
          }
        }
      }
      if (JSON.stringify(this.searchObj) === '{}') {
        this.isEmptyObj = true;
        this.currentIndex = null;
      } else {
        this.isEmptyObj = false;
        this.hasFocused = false;
      }
    } else {
      this.searchContent = '';
    }

  }
}
