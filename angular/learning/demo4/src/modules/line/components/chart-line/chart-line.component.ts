import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/modules/chart/service/chart/chart.service';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {

  data: string;
  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'chart-line module';
    this.chartService.setChart(this.data);
  }

  getData(): void {
    this.data = this.chartService.loadChart();
  }

}
