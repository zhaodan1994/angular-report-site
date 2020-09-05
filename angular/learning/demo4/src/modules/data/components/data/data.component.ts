import { Component, OnInit } from '@angular/core';
import { LazyService } from 'src/modules/lazy/service/lazy.service';
import { ChartService } from 'src/modules/chart/service/chart/chart.service';
import { PlotService } from 'src/modules/chart/service/plot/plot.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(
    private chartService: ChartService,
    private plotService: PlotService
  ) { }

  chartData: string;
  plotData: string;

  ngOnInit(): void {
    this.getChartData();
    this.getPlotData();
  }

  changeChartData(): void {
    this.chartData = 'change the chart-service from data module';
    this.chartService.setChart(this.chartData);
  }

  changePlotData(): void {
    this.plotData = 'change the plot-service from data module';
    this.plotService.setChart(this.plotData);
  }

  getChartData(): void {
    this.chartData = this.chartService.loadChart();
  }

  getPlotData(): void {
    this.plotData = this.plotService.loadChart();
  }

}
