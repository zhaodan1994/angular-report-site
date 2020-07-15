import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentationService } from './documentation.service';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

describe('DocumentationService', () => {
  let service: DocumentationService;

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
    service = TestBed.inject(DocumentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
