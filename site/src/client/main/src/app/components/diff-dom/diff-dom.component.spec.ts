import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffDomComponent } from './diff-dom.component';

describe('DiffDomComponent', () => {
  let component: DiffDomComponent;
  let fixture: ComponentFixture<DiffDomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffDomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffDomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
