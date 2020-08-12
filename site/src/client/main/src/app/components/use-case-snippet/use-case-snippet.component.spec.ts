import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformLocation, APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SnippetEditorComponent } from '../snippet-editor/snippet-editor.component';
import { UseCaseSnippetComponent } from './use-case-snippet.component';
import { CodeEditorComponent } from '../code-editor/code-editor.component';

describe('UseCaseSnippetComponent', () => {
  let component: UseCaseSnippetComponent;
  let fixture: ComponentFixture<UseCaseSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        HttpClientTestingModule
      ],
      declarations: [
        CodeEditorComponent,
        SnippetEditorComponent,
        UseCaseSnippetComponent
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
    fixture = TestBed.createComponent(UseCaseSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
