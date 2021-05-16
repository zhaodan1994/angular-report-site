import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChild4Component } from './demo-child4.component';

describe('DemoChild4Component', () => {
  let component: DemoChild4Component;
  let fixture: ComponentFixture<DemoChild4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChild4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChild4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
