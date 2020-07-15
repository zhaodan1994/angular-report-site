import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../services/documentation/documentation.service';

@Component({
  selector: 'app-type-doc-globals',
  templateUrl: './type-doc-globals.component.html',
  styleUrls: ['./type-doc-globals.component.scss']
})
export class TypeDocGlobalsComponent implements OnInit {

  documentJson: any;
  documentObject: any;
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
        this.documentJson = DocumentationService.jsonData.children;
        this.documentObject = DocumentationService.documentObject;

      });
    } else {
      this.documentJson = DocumentationService.jsonData.children;
      this.documentObject = DocumentationService.documentObject;
    }

  }

}
