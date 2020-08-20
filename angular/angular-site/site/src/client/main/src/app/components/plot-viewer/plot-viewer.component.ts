import { Component, OnInit, ViewChild, ElementRef, Input, HostBinding, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { merge } from 'lodash';
import { DynamicVersionLoaderService } from 'share-services/services/dynamic-version-loader/dynamic-version-loader.service';
import { PlotService } from '../../services/plot/plot.service';




@Component({
  selector: 'app-plot-viewer',
  templateUrl: './plot-viewer.component.html',
  styleUrls: ['./plot-viewer.component.scss']
})
export class PlotViewerComponent implements OnInit {

  @ViewChild('plotView', { static: false }) element: ElementRef<HTMLDivElement>;
  @HostBinding('attr.class') class = 'app-plot-viewer';
  @Input() set model(value: object) {
    this.ready(() => { this.waiting = false; this.refresh(value); });
  }
  @Input() js: {pre: string, post: string, modelProcessor: string};
  @Output() contentChanged: EventEmitter<{type: string, content: string}> = new EventEmitter();
  @Output() isLoaded = new EventEmitter<boolean>();
  @Input() isEventView: boolean;
  waiting = false;

  constructor(
    private dynamicVersionLoaderService: DynamicVersionLoaderService,
    private plotService: PlotService
    ) { }

  ngOnInit() {
    const version = this.plotService.version();
    this.dynamicVersionLoaderService.load(version);
    const lastEndJs = this.plotService.getEndJs();
    if (lastEndJs.indexOf('dv') > -1) {
      this.excutePlugin(lastEndJs);
    }
  }



  refresh(fullModel: object): void {
    this.isLoaded.emit(true);
    if (fullModel && !this.waiting) {
      this.waiting = true;
      let chart: dv.FlexDV = dv.Control.getControl(this.element.nativeElement) as dv.FlexDV;
      if (chart == null) {
        chart = new dv.FlexDV(this.element.nativeElement);
      }
      if (this.isEventView) {
        chart.hitTested.addHandler((e) => {
          console.log('hitTested', e);
        });
        chart.rendered.addHandler((e) => {
          console.log('rendered', e);
        });
      }
      try {
        let chartModel = {};
        if (this.js.modelProcessor === 'NaNModelProcessor') {
          const dataModel = {data: {}};
          dataModel.data = this.getNewModel(JSON.stringify((fullModel as any).data).replace(/"NaN"/g, 'NaN'));
          chartModel = merge(chartModel, fullModel, dataModel);
          chart.load(chartModel);
        } else {
          chart.load(fullModel);
        }
        this.plotService.setEndJs(this.js.post);
        if (this.js.pre !== '') {
          if (this.js.pre.indexOf('dv') > -1) {
            this.excutePlugin(this.js.pre);
          } else {
            this.excuteScript(this.js.pre);
          }
        }
      } catch (e) {
        console.warn('===> Warning: A dv internal error invoked!', e);
        chart.dispose();
      }

      if (window.location.pathname.indexOf('/tools/compare') > -1) {
        setTimeout(() => {
          this.setContent(chart, (fullModel as any).renderMethod);
        }, 200);
      }
    }
  }

  private setContent(chart: dv.FlexDV, render: string): void {
    const message = {
      type: render,
      content: null
    };
    if (chart) {
      if (render === 'SVG') {
        message.content = this.element.nativeElement.innerHTML;
      } else {
        for (const child of this.element.nativeElement.children) {
          if (child instanceof HTMLCanvasElement) {
            try {
              message.content = child.toDataURL();
            } catch (e) {
              console.warn('===> Warning: The option model contain the CORS image!');
              message.content = 'Empty';
            }
            break;
          }
        }
      }
    } else {
      message.content = 'Empty';
    }
    this.contentChanged.emit(message);
  }

  private excutePlugin(js: string): void {
    const plugin = new Function('dv', js);
    plugin(dv);
  }

  private excuteScript(js: string): void {
    const plugin = new Function(js);
    plugin();
  }

  private getNewModel(str: string) {
    const jsString = 'const model = ' + str + '; return model;';
    const plugin = new Function(jsString);
    return plugin();
  }

  protected ready(callback: () => void): void {
    setTimeout(() => {
      try {
        if (dv) {}
      } catch (error) {
        this.ready(callback);
        return;
      }

      const contentDocument = this.element.nativeElement;
      if (!contentDocument) {
        this.ready(callback);
        return;
      }

      callback();
    }, 10);
  }

}
