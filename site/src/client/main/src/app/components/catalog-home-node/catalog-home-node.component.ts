import { Component, HostBinding, Input, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { CatalogViewModel } from '../../models/catalog.view.model';

@Component({
  selector: 'app-catalog-home-node',
  templateUrl: './catalog-home-node.component.html',
  styleUrls: ['./catalog-home-node.component.scss']
})
export class CatalogHomeNodeComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-category-home-category';
  @Input() model: CatalogViewModel;
  @Input() page: string;
  isEditPage = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.checkPath('/testing/edit') || this.checkPath('/samples/edit') || this.checkPath('/userstories/edit') ) {
      this.isEditPage = true;
    }
   }

  checkPath(path: string): boolean {
    const url = (this.route.snapshot as any )._routerState.url;
    let result = false;
    if (url.indexOf(path) > -1) {
      result = true;
    }
    return result;
  }

}
