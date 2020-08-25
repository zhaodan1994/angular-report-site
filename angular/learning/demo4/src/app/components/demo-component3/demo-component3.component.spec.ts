import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponent3Component } from './demo-component3.component';

describe('DemoComponent3Component', () => {
  let component: DemoComponent3Component;
  let fixture: ComponentFixture<DemoComponent3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoComponent3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
