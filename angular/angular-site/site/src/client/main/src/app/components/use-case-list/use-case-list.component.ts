import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from '../../services/api/api.service';
import { CatalogViewModel } from '../../models/catalog.view.model';
import { isCatalogModel } from '../../models/model.typeguard';
import { CatalogViewBuilder } from '../../models/catalog.view.builder';


@Component({
  selector: 'app-use-case-list',
  templateUrl: './use-case-list.component.html',
  styleUrls: ['./use-case-list.component.scss']
})
export class UseCaseListComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') class = 'app-use-case-list';

  subscription: Subscription = null;
  model: CatalogViewModel = null;
  isEditPage = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.url.subscribe(segments => {
      const keys = [];
      if (this.route.snapshot.parent) {
        keys.push(...this.route.snapshot.parent.url.map(segment => segment.path.toLowerCase()));
      }
      keys.push(...this.route.snapshot.url.map(segment => segment.path.toLowerCase()));
      if (keys[1]  === 'edit') {
        keys.splice(1, 1);
        this.isEditPage = true;
      }
      this.loadModel(keys, (model: CatalogViewModel) => {
        this.model = model;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadModel(keys: string[], success: (model: CatalogViewModel) => void): void {
    this.apiService.model(keys).subscribe((result) => {
      if (result && isCatalogModel(result)) {
        const builder = new CatalogViewBuilder();
        keys.pop();
        success(builder.build(keys, result));
      }
    });
  }

}
