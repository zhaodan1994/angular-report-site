import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCatalogComponent } from './compare-catalog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';

describe('CompareCatalogComponent', () => {
  let component: CompareCatalogComponent;
  let fixture: ComponentFixture<CompareCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTreeModule,
        MatCheckboxModule,
        MatBadgeModule
      ],
      providers: [{
        provide: APP_BASE_HREF,
        deps: [PlatformLocation],
        useFactory(platformLocation: PlatformLocation): string {
          return platformLocation.getBaseHrefFromDOM();
        }
      }],
      declarations: [ CompareCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
