import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChild5Component } from './demo-child5.component';

describe('DemoChild5Component', () => {
  let component: DemoChild5Component;
  let fixture: ComponentFixture<DemoChild5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChild5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChild5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
