import { Component, OnInit } from '@angular/core';
import { LazyService } from 'src/modules/lazy/service/lazy.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(
    private lazyService: LazyService
  ) { }

  data: string;

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'change the lazy data in the lazy service from data module';
    this.lazyService.setLazyData(this.data);
  }

  getData(): void {
    this.data = this.lazyService.loadLazy();
  }

}
