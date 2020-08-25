import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotLineComponent } from './plot-line.component';

describe('PlotLineComponent', () => {
  let component: PlotLineComponent;
  let fixture: ComponentFixture<PlotLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
