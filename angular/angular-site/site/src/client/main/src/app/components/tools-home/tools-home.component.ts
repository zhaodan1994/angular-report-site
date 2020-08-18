import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools-home',
  templateUrl: './tools-home.component.html',
  styleUrls: ['./tools-home.component.scss']
})
export class ToolsHomeComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-tools-home';

  constructor() { }

  ngOnInit() { }

}
