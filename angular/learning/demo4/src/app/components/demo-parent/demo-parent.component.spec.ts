import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoParentComponent } from './demo-parent.component';

describe('DemoParentComponent', () => {
  let component: DemoParentComponent;
  let fixture: ComponentFixture<DemoParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
