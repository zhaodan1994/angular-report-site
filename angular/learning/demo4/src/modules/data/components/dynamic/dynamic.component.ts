import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

  @Input() name: string;
  @Output() changeEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  changeName() {
    this.name = 'User20';
    this.changeEvent.emit('User20');
  }

}
