import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.name = 'New Customer';
  }

}
