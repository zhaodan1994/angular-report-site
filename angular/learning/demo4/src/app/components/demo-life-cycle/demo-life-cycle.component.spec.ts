import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLifeCycleComponent } from './demo-life-cycle.component';

describe('DemoLifeCycleComponent', () => {
  let component: DemoLifeCycleComponent;
  let fixture: ComponentFixture<DemoLifeCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLifeCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLifeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
