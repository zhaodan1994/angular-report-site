import { Injectable } from '@angular/core';
import { DataModule } from '../data.module';

@Injectable({
  providedIn: DataModule
})
export class DataService {

  constructor() { }

  getData(): string {
    return 'getData from service of the dataModule';
  }


}
