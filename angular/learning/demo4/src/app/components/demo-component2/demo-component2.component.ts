import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/file/file.service';

@Component({
  selector: 'app-demo-component2',
  templateUrl: './demo-component2.component.html',
  styleUrls: ['./demo-component2.component.scss']
})
export class DemoComponent2Component implements OnInit {

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
    this.fileService.setFileName('Change File name from Component2');
  }

}
