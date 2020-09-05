import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/modules/chart/service/common/common.service';
import { ChartService } from 'src/modules/chart/service/chart/chart.service';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss']
})
export class DemoListComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
  }

}
