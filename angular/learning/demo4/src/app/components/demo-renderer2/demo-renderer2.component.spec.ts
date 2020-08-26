import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRenderer2Component } from './demo-renderer2.component';

describe('DemoRenderer2Component', () => {
  let component: DemoRenderer2Component;
  let fixture: ComponentFixture<DemoRenderer2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoRenderer2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoRenderer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
