import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogViewModel } from '../../models/catalog.view.model';
import { ApiService } from '../../services/api/api.service';
import { isCatalogModel } from '../../models/model.typeguard';
import { CatalogViewBuilder } from '../../models/catalog.view.builder';



@Component({
  selector: 'app-catalog-home',
  templateUrl: './catalog-home.component.html',
  styleUrls: ['./catalog-home.component.scss']
})
export class CatalogHomeComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-catalog-home';

  waiting = false;
  model: CatalogViewModel = null;
  page: string;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const keys = [];
    if (this.route.snapshot.parent) {
      keys.push(...this.route.snapshot.parent.url.map(segment => segment.path.toLowerCase()));
    }
    keys.push(...this.route.snapshot.url.map(segment => segment.path.toLowerCase()));
    if (keys[1] === 'edit') {
      keys.pop();
    }
    this.page = keys[0],
    this.loadModel(keys, (model: CatalogViewModel) => {
      this.model = model;
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

}
