import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { ApiService } from '../../services/api/api.service';

import { Subscription } from 'rxjs';
import { CatalogViewModel } from '../../models/catalog.view.model';
import { isCatalogModel } from '../../models/model.typeguard';
import { CatalogViewBuilder } from '../../models/catalog.view.builder';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-category';

  waiting = false;
  model: CatalogViewModel = null;
  isEditPage: boolean;
  subscription: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    const keys = this.route.snapshot.url.map(segment => segment.path.toLowerCase());
    this.loadModel(keys, (model: CatalogViewModel) => {
      this.model = model;
    });

    this.subscription = this.route.url.subscribe(segments => {
      const urlKeys = this.keys(this.route.snapshot);
      if (urlKeys[1] === 'edit') {
        this.isEditPage = true;
      } else {
        this.isEditPage = false;
      }
    });
  }

  loadModel(keys: string[], success: (model: CatalogViewModel) => void): void {
    this.waiting = true;
    this.apiService.model(keys).subscribe((result) => {
      this.waiting = false;
      if (result && isCatalogModel(result)) {
        const builder = new CatalogViewBuilder();
        success(builder.build([], result));
      }
    });
  }

  isOpenedCatalog(catalog: CatalogViewModel): boolean {
    const urlKeys = this.keys(this.route.snapshot).join('/');
    let catalogKeys = catalog.keys.join('/');
    if (this.isEditPage) {
      catalogKeys = catalog.keys[0] + '/edit/' + catalog.keys.slice(1).join('/');
   }
    return urlKeys.startsWith(catalogKeys);
  }

  protected keys(snapshot: ActivatedRouteSnapshot): string[] {
    const keys = snapshot.url.map(segment => segment.path);
    if (snapshot.children.length > 0) {
      for (const item of snapshot.children) {
        keys.push(...this.keys(item));
      }
    }
    return keys;
  }

}
