import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sideBarToggleSource = new Subject();
  sideBarToggle$ = this.sideBarToggleSource.asObservable();

  constructor() { }

  sideBarToggle() {
    this.sideBarToggleSource.next();
  }

}
