import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTemplatePropertyComponent } from './demo-template-property.component';

describe('DemoTemplatePropertyComponent', () => {
  let component: DemoTemplatePropertyComponent;
  let fixture: ComponentFixture<DemoTemplatePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoTemplatePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTemplatePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
