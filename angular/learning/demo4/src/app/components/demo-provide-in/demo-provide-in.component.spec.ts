import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoProvideInComponent } from './demo-provide-in.component';

describe('DemoProvideInComponent', () => {
  let component: DemoProvideInComponent;
  let fixture: ComponentFixture<DemoProvideInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoProvideInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoProvideInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
