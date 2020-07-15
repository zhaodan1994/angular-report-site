import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../services/layout/layout.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  render: string;
  path: string;
  keys: string[];
  urlKey: string;
  constructor(
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.layoutService.sideBarToggle$.subscribe(
      () => {
        this.drawer.toggle();
      });
    
    this.path = this.route.snapshot.paramMap.get('path');
    this.render = this.route.snapshot.data.render;
    this.urlKey = this.path.substring(4) + '/' + this.render + '-' + this.path.substring(0,3);
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
   }

}
