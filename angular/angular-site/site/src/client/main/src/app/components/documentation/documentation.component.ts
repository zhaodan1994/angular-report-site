import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-documentation';
  constructor() { }

  ngOnInit(): void {
  }

}
