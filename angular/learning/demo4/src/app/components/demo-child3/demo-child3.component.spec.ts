import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChild3Component } from './demo-child3.component';

describe('DemoChild3Component', () => {
  let component: DemoChild3Component;
  let fixture: ComponentFixture<DemoChild3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChild3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChild3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
