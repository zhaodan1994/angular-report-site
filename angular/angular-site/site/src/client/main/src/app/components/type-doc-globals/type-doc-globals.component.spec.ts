import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocGlobalsComponent } from './type-doc-globals.component';
import { TypeDocSearchComponent } from '../type-doc-search/type-doc-search.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('TypeDocGlobalsComponent', () => {
  let component: TypeDocGlobalsComponent;
  let fixture: ComponentFixture<TypeDocGlobalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
    ],
      declarations: [ TypeDocGlobalsComponent, TypeDocSearchComponent ],
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
    fixture = TestBed.createComponent(TypeDocGlobalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
