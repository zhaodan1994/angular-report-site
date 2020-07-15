import { TestBed } from '@angular/core/testing';

import { RecordCaseRelationService } from './record-case-relation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

describe('RecordCaseRelationService', () => {
  let service: RecordCaseRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule
      ],
      providers: [{
        provide: APP_BASE_HREF,
        deps: [PlatformLocation],
        useFactory(platformLocation: PlatformLocation): string {
          return platformLocation.getBaseHrefFromDOM();
        }
      }]
    });
    service = TestBed.inject(RecordCaseRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
