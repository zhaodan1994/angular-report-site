import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoProvidersComponent } from './demo-providers.component';

describe('DemoProvidersComponent', () => {
  let component: DemoProvidersComponent;
  let fixture: ComponentFixture<DemoProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
