import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesComponent } from './samples.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from '../category/category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SamplesComponent', () => {
  let component: SamplesComponent;
  let fixture: ComponentFixture<SamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule

      ],
      declarations: [
        SamplesComponent,
        CategoryComponent
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
    fixture = TestBed.createComponent(SamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
