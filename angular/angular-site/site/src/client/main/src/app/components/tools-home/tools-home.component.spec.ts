import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsHomeComponent } from './tools-home.component';

describe('ToolsHomeComponent', () => {
  let component: ToolsHomeComponent;
  let fixture: ComponentFixture<ToolsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
