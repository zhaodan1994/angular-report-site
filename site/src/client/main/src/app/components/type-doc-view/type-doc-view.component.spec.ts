import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocViewComponent } from './type-doc-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { TypeDocSearchComponent } from '../type-doc-search/type-doc-search.component';
import { FormsModule } from '@angular/forms';

describe('TypeDocViewComponent', () => {
  let component: TypeDocViewComponent;
  let fixture: ComponentFixture<TypeDocViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
    ],
      declarations: [ TypeDocViewComponent, TypeDocSearchComponent ],
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
    fixture = TestBed.createComponent(TypeDocViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
