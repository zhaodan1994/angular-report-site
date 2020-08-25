import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLazyComponent } from './demo-lazy.component';

describe('DemoLazyComponent', () => {
  let component: DemoLazyComponent;
  let fixture: ComponentFixture<DemoLazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLazyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
