import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/file/file.service';

@Component({
  selector: 'app-demo-component3',
  templateUrl: './demo-component3.component.html',
  styleUrls: ['./demo-component3.component.scss']
})
export class DemoComponent3Component implements OnInit {

  constructor(
    private fileService: FileService
  ) { }

  name: string;
  ngOnInit(): void {
    this.getName();
  }

  getName() {
    this.name = this.fileService.getFileName();
  }

  changeName() {
    this.fileService.setFileName('Change File name from Component3');
  }

}
