import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
    console.log ('create fileService');
   }

  fileName = 'Original';
  getFileName(): string {
    return this.fileName;
  }

  setFileName(name: string) {
    this.fileName = name;
  }
}
