import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-template-property',
  // templateUrl: './demo-template-property.component.html',
  template: `
     <p>demo-template-property works!</p>
  `,
  styleUrls: ['./demo-template-property.component.scss']
})
export class DemoTemplatePropertyComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

}
