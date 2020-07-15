import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotViewerComponent } from './plot-viewer.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { ShareServicesModule } from 'share-services/share-services.module';

describe('PlotViewerComponent', () => {
  let component: PlotViewerComponent;
  let fixture: ComponentFixture<PlotViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotViewerComponent ],
      imports:[ShareServicesModule],
      providers: [{
        provide: APP_BASE_HREF,
        deps: [PlatformLocation],
        useFactory(platformLocation: PlatformLocation): string {
          return platformLocation.getBaseHrefFromDOM();
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
