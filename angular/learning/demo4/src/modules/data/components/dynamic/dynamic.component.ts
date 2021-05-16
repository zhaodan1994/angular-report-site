import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Output() changeEvent = new EventEmitter<string>();
  constructor() { }


  ngOnInit(): void {

  }

  changeName() {
    this.name = 'User20';
    this.changeEvent.emit('User20');
  }

  ngOnChanges(): void {
    console.log('name has been changed by dynamic componnet!');
  }

}
