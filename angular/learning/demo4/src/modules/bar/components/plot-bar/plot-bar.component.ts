import { Component, OnInit } from '@angular/core';
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
    this.data = 'chart-bar module';
    this.plotService.setChart(this.data);
  }

  getData(): void {
    this.data = this.plotService.loadChart();
  }

}
