import { Injectable } from '@angular/core';
import { CaseModule } from '../case.module';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor() { }

  loadCase(): string {
    return 'loadCase from service of the caseModule';
  }
}
