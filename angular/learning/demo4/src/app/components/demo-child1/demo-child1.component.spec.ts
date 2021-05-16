import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChild1Component } from './demo-child1.component';

describe('DemoChild1Component', () => {
  let component: DemoChild1Component;
  let fixture: ComponentFixture<DemoChild1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChild1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
