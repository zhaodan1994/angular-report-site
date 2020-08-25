import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponent1Component } from './demo-component1.component';

describe('DemoComponent1Component', () => {
  let component: DemoComponent1Component;
  let fixture: ComponentFixture<DemoComponent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoComponent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
