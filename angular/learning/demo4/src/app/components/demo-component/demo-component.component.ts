import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.scss']
})
export class DemoComponentComponent implements OnInit {

  constructor() { }

  showComponent = false;
  name: string;
  ngOnInit(): void {

  }

  createComponent(): void {
    this.showComponent = true;
  }


}
