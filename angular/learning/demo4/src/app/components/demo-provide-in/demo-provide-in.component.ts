import { Component, OnInit } from '@angular/core';
import { PlotService } from 'src/modules/chart/service/plot/plot.service';

@Component({
  selector: 'app-demo-provide-in',
  templateUrl: './demo-provide-in.component.html',
  styleUrls: ['./demo-provide-in.component.scss']
})
export class DemoProvideInComponent implements OnInit {

  data: string;
  constructor(
    private plotService: PlotService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changeData(): void {
    this.data = 'component in App module';
    this.plotService.setChart(this.data);
  }

  getData(): void {
    this.data = this.plotService.loadChart();
  }

}
