import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { ShareServicesModule } from 'share-services/share-services.module';
import { PlotViewerExternalComponent } from './plot-viewer-external.component';

describe('PlotViewerExternalComponent', () => {
  let component: PlotViewerExternalComponent;
  let fixture: ComponentFixture<PlotViewerExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotViewerExternalComponent ],
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
    fixture = TestBed.createComponent(PlotViewerExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
