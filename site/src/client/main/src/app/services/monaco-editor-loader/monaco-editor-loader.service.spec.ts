import { TestBed } from '@angular/core/testing';

import { MonacoEditorLoaderService } from './monaco-editor-loader.service';

describe('MonacoEditorLoaderService', () => {
  let service: MonacoEditorLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonacoEditorLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
