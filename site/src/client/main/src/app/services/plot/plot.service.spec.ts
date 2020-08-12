import { TestBed } from '@angular/core/testing';

import { PlotService } from './plot.service';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

describe('PlotService', () => {
  let service: PlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: APP_BASE_HREF,
        deps: [PlatformLocation],
        useFactory(platformLocation: PlatformLocation): string {
          return platformLocation.getBaseHrefFromDOM();
        }
      }]
    });
    service = TestBed.inject(PlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
