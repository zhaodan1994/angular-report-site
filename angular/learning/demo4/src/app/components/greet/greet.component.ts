import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.scss']
})
export class GreetComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  @Output() changeEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  changeName() {
    this.changeEvent.emit('User2');
  }

  ngAfterViewInit(): void {
    // this.name = 'New Name';
  }



}
