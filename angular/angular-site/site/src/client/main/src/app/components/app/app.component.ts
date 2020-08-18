import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') class = 'app-root';
  hasSideBar = true;
  subscription: Subscription = null;
  hasmatDrawer = false;

  constructor(
    private router: Router,
    private layoutService: LayoutService
  ) {}


  ngOnInit() {
    this.subscription = this.router.events.subscribe((e) => {
      if (e instanceof ActivationEnd) {
        if (window.location.pathname.indexOf('/tools/compare') > -1) {
          this.hasSideBar = true;
        } else {
          this.hasSideBar = e.snapshot.data.hasSideBar;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle() {
    this.layoutService.sideBarToggle();

    if ((document.querySelector('mat-drawer') as any).style.visibility === 'visible') {
      this.hasmatDrawer = true;
    } else {
      this.hasmatDrawer = false;
    }

    const refreshButton = document.querySelectorAll('.refreshButton');
    if (refreshButton) {
      this.ready(() => {this.clickRefresh(refreshButton); });
    }
  }

  protected ready(callback: () => void): void {
    setTimeout(() => {

      if (this.hasmatDrawer) {
        if ((document.querySelector('mat-drawer') as any).style.visibility === 'visible') {
          this.ready(callback);
          return;
        }
      } else {
        if ((document.querySelector('mat-drawer') as any).style.visibility !== 'visible') {
          this.ready(callback);
          return;
        }
      }

      callback();
    }, 2);
  }

  clickRefresh(refreshButton: any) {
    if (this.hasSideBar) {
      setTimeout(() => {
        refreshButton.forEach(element => {
          (element as any).click();
        });
      }, 200);
    } else {
      refreshButton.forEach(element => {
        (element as any).click();
      });
    }

  }
}
