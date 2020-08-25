import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../service/chart/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  data = 'Chart';
  constructor(

  ) { }

  ngOnInit(): void {

  }



}
