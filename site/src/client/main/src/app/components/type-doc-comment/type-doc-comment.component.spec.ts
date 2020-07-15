import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocCommentComponent } from './type-doc-comment.component';

describe('TypeDocCommentComponent', () => {
  let component: TypeDocCommentComponent;
  let fixture: ComponentFixture<TypeDocCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDocCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDocCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
