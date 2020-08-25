import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/file/file.service';

@Component({
  selector: 'app-demo-component1',
  templateUrl: './demo-component1.component.html',
  styleUrls: ['./demo-component1.component.scss'],
  providers: [FileService]
})
export class DemoComponent1Component implements OnInit {

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
    this.fileService.setFileName('Change File name from Component1');
  }

}
