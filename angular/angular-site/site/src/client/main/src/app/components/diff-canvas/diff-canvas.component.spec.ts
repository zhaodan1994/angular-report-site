import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffCanvasComponent } from './diff-canvas.component';

describe('DiffCanvasComponent', () => {
  let component: DiffCanvasComponent;
  let fixture: ComponentFixture<DiffCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
