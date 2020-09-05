import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/modules/chart/service/chart/chart.service';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {

  data: string;
  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'component1 in chart-bar module';
    this.chartService.setChart(this.data);
  }

  getData(): void {
    this.data = this.chartService.loadChart();
  }

}
