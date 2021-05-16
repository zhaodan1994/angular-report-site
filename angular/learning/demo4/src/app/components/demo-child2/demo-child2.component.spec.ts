import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChild2Component } from './demo-child2.component';

describe('DemoChild2Component', () => {
  let component: DemoChild2Component;
  let fixture: ComponentFixture<DemoChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
