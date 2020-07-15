import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocEnumsComponent } from './type-doc-enums.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TypeDocSearchComponent } from '../type-doc-search/type-doc-search.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('TypeDocEnumsComponent', () => {
  let component: TypeDocEnumsComponent;
  let fixture: ComponentFixture<TypeDocEnumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ TypeDocEnumsComponent, TypeDocSearchComponent ],
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
    fixture = TestBed.createComponent(TypeDocEnumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
