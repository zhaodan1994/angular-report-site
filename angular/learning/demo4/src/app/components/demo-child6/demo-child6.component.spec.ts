import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChild6Component } from './demo-child6.component';

describe('DemoChild6Component', () => {
  let component: DemoChild6Component;
  let fixture: ComponentFixture<DemoChild6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChild6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChild6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
