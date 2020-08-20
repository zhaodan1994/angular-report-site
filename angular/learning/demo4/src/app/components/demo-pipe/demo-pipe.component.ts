import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-pipe',
  templateUrl: './demo-pipe.component.html',
  styleUrls: ['./demo-pipe.component.scss']
})
export class DemoPipeComponent implements OnInit {

  jsonArray = [
    {
      name: 'test',
      age: 12
    },
    {
      name: 'test2',
      age: 22
    },
    {
      name: 'test3',
      age: 32
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
