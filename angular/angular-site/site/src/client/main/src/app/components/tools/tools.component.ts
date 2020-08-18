import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-tools';

  constructor() { }

  ngOnInit() { }

}
