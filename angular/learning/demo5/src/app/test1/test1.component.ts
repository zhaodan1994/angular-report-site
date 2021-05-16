import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  data: string;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.data = this.apiService.getData();
  }

}
