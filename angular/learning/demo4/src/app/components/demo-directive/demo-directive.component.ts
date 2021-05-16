import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-directive',
  templateUrl: './demo-directive.component.html',
  styleUrls: ['./demo-directive.component.scss']
})
export class DemoDirectiveComponent implements OnInit {

  color = 'orange';
  currentChild = 'child1';
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
