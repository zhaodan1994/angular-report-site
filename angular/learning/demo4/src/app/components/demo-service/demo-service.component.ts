import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/modules/data/service/data.service';
import { CaseService } from 'src/modules/case/service/case.service';

@Component({
  selector: 'app-demo-service',
  templateUrl: './demo-service.component.html',
  styleUrls: ['./demo-service.component.scss']
})
export class DemoServiceComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private caseService: CaseService
  ) { }

  data: string;
  case: string;
  ngOnInit(): void {
    this.data = this.dataService.getData();
    this.case = this.caseService.loadCase();
  }

}
