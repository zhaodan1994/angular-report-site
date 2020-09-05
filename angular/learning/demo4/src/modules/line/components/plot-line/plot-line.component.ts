import { Component, OnInit } from '@angular/core';
import { PlotService } from 'src/modules/chart/service/plot/plot.service';

@Component({
  selector: 'app-plot-line',
  templateUrl: './plot-line.component.html',
  styleUrls: ['./plot-line.component.scss']
})
export class PlotLineComponent implements OnInit {

  data: string;
  constructor(
    private plotService: PlotService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'component1 in chart-line module';
    this.plotService.setChart(this.data);
  }

  getData(): void {
    this.data = this.plotService.loadChart();
  }


}
