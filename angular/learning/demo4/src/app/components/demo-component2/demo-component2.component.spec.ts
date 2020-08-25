import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponent2Component } from './demo-component2.component';

describe('DemoComponent2Component', () => {
  let component: DemoComponent2Component;
  let fixture: ComponentFixture<DemoComponent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoComponent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
