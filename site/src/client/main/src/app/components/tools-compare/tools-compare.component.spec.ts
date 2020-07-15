import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsCompareComponent } from './tools-compare.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CompareCatalogComponent } from '../compare-catalog/compare-catalog.component';
import { ToolsComparisonComponent } from '../tools-comparison/tools-comparison.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DiffCanvasComponent } from '../diff-canvas/diff-canvas.component';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { DiffDomComponent } from '../diff-dom/diff-dom.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';

describe('ToolsCompareComponent', () => {
  let component: ToolsCompareComponent;
  let fixture: ComponentFixture<ToolsCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatMenuModule,
        MatFormFieldModule,
        MatTreeModule,
        MatCheckboxModule,
        MatBadgeModule

      ],
      declarations: [
        ToolsCompareComponent,
        CompareCatalogComponent,
        ToolsComparisonComponent,
        CodeEditorComponent,
        DiffCanvasComponent,
        DiffDomComponent
      ],
      providers: [{
        provide: APP_BASE_HREF,
        deps: [PlatformLocation],
        useFactory(platformLocation: PlatformLocation): string {
          return platformLocation.getBaseHrefFromDOM();
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
