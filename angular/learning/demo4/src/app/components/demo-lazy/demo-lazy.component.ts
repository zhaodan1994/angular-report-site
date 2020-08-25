import { Component, OnInit } from '@angular/core';
import { LazyService } from 'src/modules/lazy/service/lazy.service';

@Component({
  selector: 'app-demo-lazy',
  templateUrl: './demo-lazy.component.html',
  styleUrls: ['./demo-lazy.component.scss']
})
export class DemoLazyComponent implements OnInit {

  constructor(
    private lazyService: LazyService
  ) { }

  data: string;

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'change the lazy data in the demo-lazy service from appModule';
    this.lazyService.setLazyData(this.data);
  }

  getData(): void {
    this.data = this.lazyService.loadLazy();
  }

}
