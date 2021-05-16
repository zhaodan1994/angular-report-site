import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() name: string;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.name = 'New Customer';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('name has been changed by static componnet!');
  }


}
