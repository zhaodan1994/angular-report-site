import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-parent',
  templateUrl: './demo-parent.component.html',
  styleUrls: ['./demo-parent.component.scss']
})
export class DemoParentComponent implements OnInit {

  constructor() { }
  personInfo = {
    name: 'user1',
    age: 30
  };
  title = '小蜜蜂';
  imageUrl = 'http://xa-at-sys/Images/Applications.ico';
  hideButton = true;
  colorArray = [
    'red',
    'green',
    'blue',
    'orange',
    'pink'
  ];
  enterValue = '';
  blurValue = '';
  color = 'white';
  userNames = [
   // null,
    'user1',
    'user2',
    'user3'
  ];
  hasColor = true;
  classArray = ['class1', 'class2', 'class3'];
  classObject = {
    class1: true,
    class2: false,
    class3: true
  };

  ngOnInit(): void {
  }

  changeComponentProperty(): void {
    this.personInfo.name = 'user2';
    this.personInfo.age = 10;
    this.hideButton = false;
  }

  getClickEvent(event: any): void  {
    console.log(event);
  }

  onEnter(value: string): void  {
    this.enterValue = value;
  }
  update(value: string): void  {
    this.blurValue = value;
  }

  deleteUserName(name: string): void {
      alert(`delete user ${name}`);
      const index = this.userNames.indexOf(name);
      if (index > -1) {
        this.userNames.splice(index, 1);
      }
  }




}
