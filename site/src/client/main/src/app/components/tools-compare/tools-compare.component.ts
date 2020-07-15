import { Component, HostBinding, ViewChild, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutService } from '../../services/layout/layout.service';
import {CompareCatalogComponent} from '../compare-catalog/compare-catalog.component';
import {ToolsComparisonComponent} from '../tools-comparison/tools-comparison.component';
import { ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-tools-compare',
  templateUrl: './tools-compare.component.html',
  styleUrls: ['./tools-compare.component.scss']
})
export class ToolsCompareComponent implements OnInit, AfterViewChecked {
  @HostBinding('attr.class') class = 'app-tools-compare';
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  @ViewChild('catalogComponent', { static: false }) catalogComponent: CompareCatalogComponent;
  @ViewChild('comparisonComponent', { static: false }) comparisonComponent: ToolsComparisonComponent;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  urlKey: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute


  ) { }

  ngOnInit(): void {
    this.layoutService.sideBarToggle$.subscribe(
      () => {
        this.drawer.toggle();
      });
    const path = (this.route as any)._routerState.snapshot.url;
    this.urlKey = path.substring(path.indexOf('tools/compare') + 14);
  }

  ngAfterViewChecked(): void {
   this.cd.detectChanges();
  }






  getSelectedNodes() {
    this.comparisonComponent.getKeysArray(this.catalogComponent.getAllCheckedNode());
  }

  setNodeState(index: string, state: number, isExpand: boolean) {
    this.catalogComponent.setNodeState(index, state, isExpand);
  }



}

