import { Component, OnInit, HostListener, ViewChild, HostBinding, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { DynamicVersionLoaderService } from 'share-services/services/dynamic-version-loader/dynamic-version-loader.service';
import { merge } from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('attr.class') class = 'app-root';
  @ViewChild('plot', { static: false }) element: ElementRef<HTMLDivElement>;
  load = 'unload';
  data: { id: string, response: string, model: object, js: { pre: string, modelProcessor: string } };
  currentRender = 'SVG';
  constructor(
    private dynamicVersionLoaderService: DynamicVersionLoaderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const pathes = this.location.path(false).split('/').filter((item) => item);
    let version: string = null;
    if (pathes.length > 1) {
      version = pathes[1];
    }


    if (pathes[2] === 'local') {
      this.dynamicVersionLoaderService.load(version)
        .then(
          (value) => {
            this.load = 'success';
            this.loadChart();
          },
          (error) => {
            this.load = 'fail';
          }
        );
    } else if (pathes[2] === 'http') {
      this.dynamicVersionLoaderService.loadExistJs(version)
        .then(
          (value) => {
            this.load = 'success';
            this.loadChart();
          },
          (error) => {
            this.load = 'fail';
          }
        );
    } else if (pathes[2] === 'empty') {
      this.load = 'empty';
    } else {

      this.dynamicVersionLoaderService.loadDateJs(version, pathes[2])
        .then(
          (value) => {
            this.load = 'success';
            this.loadChart();
          },
          (error) => {
            this.load = 'fail';
          }
        );
    }
  }

  @HostListener('window:message', ['$event.data'])
  onMessage(data: { id: string, response: string, model: object, js: { pre: string, modelProcessor: string } }) {
    this.data = data;
    if (this.load === 'success') {
      this.loadChart();
    }
    if (this.load === 'empty') {
      if (window.parent) {
        const message = {
          id: 'empty',
          type: this.currentRender,
          content: 'Empty'
        };

        window.parent.postMessage(message, '*');
      }
    }
  }

  loadChart() {
    if (this.data?.model) {
      let chart: dv.FlexDV = dv.Control.getControl(this.element.nativeElement) as dv.FlexDV;
      if (chart == null) {
        chart = new dv.FlexDV(this.element.nativeElement);
      }
      try {
        let chartModel: any = {};
        if (this.data.js.modelProcessor === 'NaNModelProcessor') {
          const dataModel = {data: {}};
          dataModel.data = this.getNewModel(JSON.stringify((this.data.model as any).data).replace(/"NaN"/g, 'NaN'));
          chartModel = merge(chartModel, this.data.model, dataModel);
          chart.load(chartModel);
        } else {
          chart.load(this.data.model);
        }
        if (this.data.js.pre !== '') {
          if (this.data.js.pre.indexOf('dv') > -1) {
            this.excutePlugin(this.data.js.pre);
          } else {
            this.excuteScript(this.data.js.pre);
          }
        }

      } catch (e) {
        console.warn('===> Warning: A dv internal error invoked!', e);
        chart.dispose();
      }

      if (this.data.response === 'Content') {
        setTimeout(() => {
          this.setContent(this.data.id);
        }, 200);
      }
    }
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


  private setContent(identity: string): void {
    if (window.parent) {
      const message = {
        id: identity,
        type: null,
        content: null
      };

      const chart: dv.FlexDV = dv.Control.getControl(this.element.nativeElement) as dv.FlexDV;
      if (chart) {

        if (chart.renderMethod === dv.RenderMethod.SVG) {
          message.type = 'SVG';
          message.content = this.element.nativeElement.innerHTML;
        } else {
          message.type = 'Canvas';
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
        this.currentRender = message.type;
      } else {
        message.content = 'Empty';
      }

      window.parent.postMessage(message, '*');
    }
  }

}
