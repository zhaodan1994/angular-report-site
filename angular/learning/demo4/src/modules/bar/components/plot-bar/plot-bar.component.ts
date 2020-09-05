import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/modules/chart/service/chart/chart.service';
import { PlotService } from 'src/modules/chart/service/plot/plot.service';

@Component({
  selector: 'app-plot-bar',
  templateUrl: './plot-bar.component.html',
  styleUrls: ['./plot-bar.component.scss']
})
export class PlotBarComponent implements OnInit {
  data: string;
  constructor(
    private plotService: PlotService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'component2 in chart-bar module';
    this.plotService.setChart(this.data);
  }

  getData(): void {
    this.data = this.plotService.loadChart();
  }

}
