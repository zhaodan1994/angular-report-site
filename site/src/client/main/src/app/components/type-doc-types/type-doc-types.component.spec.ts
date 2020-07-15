import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocTypesComponent } from './type-doc-types.component';

describe('TypeDocTypesComponent', () => {
  let component: TypeDocTypesComponent;
  let fixture: ComponentFixture<TypeDocTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDocTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDocTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
