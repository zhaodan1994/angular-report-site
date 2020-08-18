import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformLocation, APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';


import { ToolsComparisonComponent } from './tools-comparison.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { DiffCanvasComponent } from '../diff-canvas/diff-canvas.component';
import { DiffDomComponent } from '../diff-dom/diff-dom.component';

describe('ToolsComparisonComponent', () => {
  let component: ToolsComparisonComponent;
  let fixture: ComponentFixture<ToolsComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatMenuModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
