import { Component, HostBinding, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Subscription } from 'rxjs';
import { CatalogViewModel } from '../../models/catalog.view.model';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ApiService } from '../../services/api/api.service';
import { isCatalogModel } from '../../models/model.typeguard';
import { CatalogViewBuilder } from '../../models/catalog.view.builder';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') class = 'app-catalog';
  isEditPage: boolean;

  subscription: Subscription = null;
  waiting = false;
  treeControl = new NestedTreeControl<CatalogViewModel>(node => node.childCatalogs());
  dataSource: MatTreeNestedDataSource<CatalogViewModel> = new MatTreeNestedDataSource<CatalogViewModel>();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const keys = this.route.snapshot.url.map(segment => segment.path.toLowerCase());
    this.loadModel(keys, (model: CatalogViewModel) => {
      this.dataSource.data = model.childCatalogs();
      const urlKeys = this.keys(this.route.snapshot).join('/');
      for (const node of this.dataSource.data) {
        this.initializeNodeStatus(urlKeys, node);
      }
    });

    this.subscription = this.route.url.subscribe(segments => {
      this.treeControl.collapseAll();
      const urlKeys = this.keys(this.route.snapshot).join('/');
      if (urlKeys.indexOf('testing/edit') > -1) {
        this.isEditPage = true;
      } else {
        this.isEditPage = false;
      }
      for (const node of this.dataSource.data) {
        this.initializeNodeStatus(urlKeys, node);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  hasChild = (_: number, node: CatalogViewModel) => node.childCatalogs().length > 0;

  protected keys(snapshot: ActivatedRouteSnapshot): string[] {
    const keys = snapshot.url.map(segment => segment.path);
    if (snapshot.children.length > 0) {
      for (const item of snapshot.children) {
        keys.push(...this.keys(item));
      }
    }
    return keys;
  }

  protected initializeNodeStatus(urlKeys: string, model: CatalogViewModel): void {
    let catalogKeys = model.keys.join('/');
    if (this.isEditPage) {
       catalogKeys = model.keys[0] + '/edit/' + model.keys.slice(1).join('/');
    }
    if (urlKeys.startsWith(catalogKeys)) {
      this.treeControl.expand(model);
      for (const node of model.childCatalogs()) {
        this.initializeNodeStatus(urlKeys, node);
      }
    }
  }

}
