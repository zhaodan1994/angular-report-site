import { TestBed } from '@angular/core/testing';

import { DynamicVersionLoaderService } from './dynamic-version-loader.service';

describe('DynamicVersionLoaderService', () => {
  let service: DynamicVersionLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicVersionLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
