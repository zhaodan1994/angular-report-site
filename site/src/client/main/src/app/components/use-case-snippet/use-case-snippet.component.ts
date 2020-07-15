import { Component, HostBinding, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { merge } from 'lodash';


import { editor } from 'monaco-editor';
import { UseCaseViewModel } from '../../models/use-case.view.model';
import { Option } from '../../models/option';
import { ApiService } from '../../services/api/api.service';
import { isUseCaseModel } from '../../models/model.typeguard';
declare var dv: any;

@Component({
  selector: 'app-use-case-snippet',
  templateUrl: './use-case-snippet.component.html',
  styleUrls: ['./use-case-snippet.component.scss']
})
export class UseCaseSnippetComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-use-case-snippet';
  @Input() model: UseCaseViewModel;
  @Input() isEditPage: boolean;
  @ViewChild('rightPan', { static: false }) element: ElementRef<HTMLDivElement>;

  waiting = false;
  option: Option = null;
  js = {pre: '', post: '', modelProcessor: ''};
  view: number ;
  script: string;
  isEdit = false;
  modelOption: editor.IEditorConstructionOptions;
  scriptOption: editor.IEditorConstructionOptions;
  pluginOption: editor.IEditorConstructionOptions;
  showFullModel = false;
  showPlotViewer = true;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.pluginOption = {
      value: '',
      language: 'javascript',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: 'vc',
      minimap: {
        enabled: false
      },
      readOnly: false,
      showUnused: false
    };
    this.modelOption = {
      value: '',
      language: 'json',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: 'vc',
      minimap: {
        enabled: false
      },
      readOnly: true,
      showUnused: false
    };
    if (this.isEditPage) {
      this.isEdit = true;
      this.modelOption.readOnly = false;
    }
    if (this.model) {
      this.loadUseCase(this.model.keys, (model: UseCaseViewModel) => {
        this.option = model.model;
        this.js.pre = model.pre;
        this.js.post = model.post;
        this.js.modelProcessor = model.modelProcessor;
        this.pluginOption.value =  this.js.pre;
        (this.option.fullModel as  any).renderMethod = 'SVG';
        this.modelOption.value = JSON.stringify(this.option.fullModel, null , 1);
        this.view = model.view;
        if (this.view === 2) {
          this.isEdit = true;
          this.modelOption.readOnly = false;
        }

        if (this.view === 1 && (!this.isEdit)) {
          this.showFullModel = true;
        }
      });
    }
  }

  refresh(snippetModel: any, render: string): void {
    this.showPlotViewer = false;
    this.option.fullModel = this.getNewModel(this.modelOption.value);
    if (render !== '') {
      (this.option.fullModel as  any).renderMethod = render;
      this.modelOption.value = JSON.stringify(this.option.fullModel, null , 1);
    }
    if (snippetModel !== null) {
      merge(this.option.fullModel, snippetModel);
      this.option.snippet = snippetModel;
      this.modelOption.value = JSON.stringify(this.option.fullModel, null , 1);
    }
    this.ready(() => { this.setShowPlotViewer(); });

  }

  setShowPlotViewer(): void {
    this.showPlotViewer = true;
  }


  protected ready(callback: () => void): void {
    setTimeout(() => {

      const plotViewerDocument = this.element.nativeElement.querySelector('app-plot-viewer');
      if (plotViewerDocument) {
        this.ready(callback);
        return;
      }

      callback();
    }, 2);
  }

  getNewModel(str: string) {
    const jsString = 'const model = ' + str + '; return model;';
    const plugin = new Function(jsString);
    return plugin();
  }

  protected loadUseCase(keys: string[], success: (model: UseCaseViewModel) => void): void {
    this.waiting = true;
    this.apiService.useCase(keys).subscribe((result) => {
      this.waiting = false;
      if (result && isUseCaseModel(result)) {
        // tslint:disable-next-line: max-line-length
        const model = new UseCaseViewModel(result.title, result.key, result.index, result.description, result.model, result.pre, result.post, result.modelProcessor, result.view);
        result.model.fullModel = merge(result.model.fullModel, result.model.snippet);
        model.keys.push(...keys);
        if (model.model.data != null) {
          this.loadData(model.model.data.split('/'), (data: object) => {
            (model.model.fullModel as any).data = data;
            if (model.model.geojson != null) {
              this.loadGeoJson(model.model.geojson.split('/'), (geojson: object) => {
                for (const plot of (model.model.fullModel as any).plots) {
                  if (plot.type === 'Map') {
                    if (plot.config.map.geojson == null) {
                      plot.config.map.geojson = geojson;
                    }
                  }
                }
                success(model);
              });
            } else {
              success(model);
            }
          });
        } else if (model.model.geojson != null) {
          this.loadGeoJson(model.model.geojson.split('/'), (geojson: object) => {
            for (const plot of (model.model.fullModel as any).plots) {
              if (plot.type === 'Map') {
                if (plot.config.map.geojson == null) {
                  plot.config.map.geojson = geojson;
                }
              }
            }
            success(model);
          });
        } else {
          success(model);
        }
      }
    });
  }

  protected loadData(keys: string[], success: (data: object) => void): void {
    this.waiting = true;
    this.apiService.data(keys).subscribe((result) => {
      this.waiting = false;
      if (result) {
        success(result);
      }
    });
  }

  protected loadGeoJson(keys: string[], success: (geojson: object) => void): void {
    this.waiting = true;
    this.apiService.geojson(keys).subscribe((result) => {
      this.waiting = false;
      if (result) {
        success(result);
      }
    });
  }

  public url(): string {
    return this.model.keys.join('/');
  }

}
