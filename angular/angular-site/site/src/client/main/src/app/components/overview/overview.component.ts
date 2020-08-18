import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-overview';

  constructor() { }

  ngOnInit(): void {
  }

}
