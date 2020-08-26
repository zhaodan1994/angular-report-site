import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNgTemplateComponent } from './demo-ng-template.component';

describe('DemoNgTemplateComponent', () => {
  let component: DemoNgTemplateComponent;
  let fixture: ComponentFixture<DemoNgTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoNgTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoNgTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
