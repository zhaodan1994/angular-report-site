import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformLocation, APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { SnippetEditorComponent } from '../snippet-editor/snippet-editor.component';
import { UseCaseSnippetComponent } from '../use-case-snippet/use-case-snippet.component';
import { UseCaseListComponent } from './use-case-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

describe('UseCaseListComponent', () => {
  let component: UseCaseListComponent;
  let fixture: ComponentFixture<UseCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatTabsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        SnippetEditorComponent,
        UseCaseSnippetComponent,
        UseCaseListComponent
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
    fixture = TestBed.createComponent(UseCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
