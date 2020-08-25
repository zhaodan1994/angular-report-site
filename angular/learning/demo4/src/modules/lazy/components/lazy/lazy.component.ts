import { Component, OnInit } from '@angular/core';
import { LazyService } from '../../service/lazy.service';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss']
})
export class LazyComponent implements OnInit {

  constructor(
    private lazyService: LazyService
  ) { }

  data: string;

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'change the lazy data in the lazy service from lazy module';
    this.lazyService.setLazyData(this.data);
  }

  getData(): void {
    this.data = this.lazyService.loadLazy();
  }
}
