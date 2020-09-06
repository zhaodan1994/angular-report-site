import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  @Input()  size: number;
  @Output() sizeChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  dec() { this.resize(-2); }
  inc() { this.resize(+2); }

  resize(delta: number) {
    this.size = this.size + delta;
    this.sizeChange.emit(this.size);
  }

}
