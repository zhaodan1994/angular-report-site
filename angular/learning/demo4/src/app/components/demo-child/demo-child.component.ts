import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-demo-child',
  templateUrl: './demo-child.component.html',
  styleUrls: ['./demo-child.component.scss']
})
export class DemoChildComponent implements OnInit {

  @Input()  userName: string;
  // @Input()  set userName(value: string) {
  //   this.getUserInfo(value);
  // }
  @Output() deleteUserName = new EventEmitter<string>();
  userInfo = {
    user1: {
      name: 'user1',
      age: 12
    },
    user2: {
      name: 'user2',
      age: 22
    },
    user3: {
      name: 'user3',
      age: 32
    },
    user4: {
      name: 'user4',
      age: 42
    }
  };
  count = 0;
  currentUser = null;
  constructor() { }

  ngOnInit(): void {
    this.getUserInfo(this.userName);
  }

  getUserInfo(name: string): void {
    if (name) {
      this.currentUser = this.userInfo[name];
    }
  }

  deleteName(): void {
    const name = Object.keys(this.userInfo)[this.count];
    this.deleteUserName.emit(name);
    this.count ++;
  }

}
