import { Component, HostBinding, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit, OnDestroy  {

  @HostBinding('attr.class') class = 'app-samples';
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    subscription: Subscription = null;
    constructor(
      private breakpointObserver: BreakpointObserver,
      private layoutService: LayoutService
    ) { }

  ngOnInit(): void {
    this.subscription = this.layoutService.sideBarToggle$.subscribe(() => {
      this.drawer.toggle();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

