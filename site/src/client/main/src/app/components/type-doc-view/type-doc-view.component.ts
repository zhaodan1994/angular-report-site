import { Component, HostBinding, OnInit } from '@angular/core';
import { DocumentationService } from '../../services/documentation/documentation.service';



@Component({
  selector: 'app-type-doc-view',
  templateUrl: './type-doc-view.component.html',
  styleUrls: ['./type-doc-view.component.scss']
})
export class TypeDocViewComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-type-doc-view';

  documentJson: any;
  documentObject: any;
  dataFlag = true;
  constructor(
    private documentService: DocumentationService
  ) { }


  ngOnInit() {
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
    this.documentObject = DocumentationService.documentObject
  }

}

