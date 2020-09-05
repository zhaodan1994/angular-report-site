import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/modules/chart/service/chart/chart.service';

@Component({
  selector: 'app-demo-providers',
  templateUrl: './demo-providers.component.html',
  styleUrls: ['./demo-providers.component.scss']
})
export class DemoProvidersComponent implements OnInit {

  data: string;
  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'component in app module';
    this.chartService.setChart(this.data);
  }

  getData(): void {
    this.data = this.chartService.loadChart();
  }

}
