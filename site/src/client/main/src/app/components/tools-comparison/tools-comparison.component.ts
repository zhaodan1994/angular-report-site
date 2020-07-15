import { Component, HostBinding, OnInit, EventEmitter, AfterViewChecked, Output, ViewChild } from '@angular/core';
import { merge } from 'lodash';



import { editor } from 'monaco-editor';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { UseCaseViewModel } from '../../models/use-case.view.model';
import { ApiService } from '../../services/api/api.service';
import { isUseCaseModel } from '../../models/model.typeguard';
import { Option } from '../../models/option';
import { DynamicVersionLoaderService } from 'share-services/services/dynamic-version-loader/dynamic-version-loader.service';
import { RecordCaseRelationService } from '../../services/record-case-relation/record-case-relation.service';
import { ReportModel } from '../../models/report.model';




@Component({
  selector: 'app-tools-comparison',
  templateUrl: './tools-comparison.component.html',
  styleUrls: ['./tools-comparison.component.scss']
})
export class ToolsComparisonComponent implements OnInit, AfterViewChecked {

  @HostBinding('attr.class') class = 'app-use-case-snippet';
  @ViewChild('fullModelEditor', { static: false }) fullModelEditor: CodeEditorComponent;
  @ViewChild('codeModelEditor', { static: false }) codeModelEditor: CodeEditorComponent;
  @Output() getKeys = new EventEmitter();
  @Output() setNodeState = new EventEmitter<{index: string, state: number, isExpand: boolean}>();

  keys: string[] = [];
  left: string;
  orientation: string;
  domString = { localDom: '', existDom: '' } ;
  useCase: UseCaseViewModel = null;
  option: Option = null;
  waiting = false;
  playing = false;
  keysArray = [];
  selectedCases = [[]];
  excuteStrategy = 'continue';
  renderMethod = 'Canvas' ;
  layoutMenu = 'auto';
  nodeIndex: string;
  showMenu = true;
  fullModelOption: editor.IEditorConstructionOptions;
  codeModelOption: editor.IEditorConstructionOptions;
  scriptJs = {pre: '' , post: '', modelProcessor: ''};
  contentWidth: number;
  currentTab = 0;
  firstVersion: string;
  secondVersion: string;
  firstUrl = 'expected';
  secondUrl = 'local';

  currentVersion: string;
  content: { first: { type: string, content: string }, second: { type: string, content: string } } = { first: null, second: null };
  showCodeEditor = false;
  manualRefresh = false;
  showSecondIframe = true;
  showFirstIframe = true;

  startTime : Date;
  totalCases: number;
  failedCasesArray = [];
  selectedDate = "";
  comparedDateList = [];
  comparedReportList = {};




  constructor(
    private apiService: ApiService,
    private dynamicVersionLoaderService: DynamicVersionLoaderService,
    private recordCaseRelation: RecordCaseRelationService
  ) { }

  ngOnInit() {
    this.currentVersion = this.apiService.version();
    this.apiService.comparedReportList()
    .subscribe( (data) => {
      this.comparedReportList = data;
      if (this.renderMethod === 'SVG') {
        this.comparedDateList = data.svg;
        if (data.svg.length > 0) {
          this.selectedDate = data.svg[data.svg.length-1];
        } 
        
      } else {
        this.comparedDateList = data.canvas;
        if (data.canvas.length > 0) {
          this.selectedDate = data.canvas[data.canvas.length-1];
        } 
      }
    });
    this.dynamicVersionLoaderService.load(this.currentVersion).then(
     (value) => {
        this.showCodeEditor = true;
     }
   );
    this.firstVersion = this.currentVersion;
    this.secondVersion = this.currentVersion;
    this.contentWidth = (document.querySelector('.content') as any).offsetWidth;
    this.judgeAutoLayout();
    this.fullModelOption = {
      value: '',
      language: 'json',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: 'vc',
      minimap: {
        enabled: false
      },
      readOnly: false,
      showUnused: false
    };

    this.codeModelOption = {
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

    this.recordCaseRelation.loadRelationData(this.renderMethod.toLocaleLowerCase());

  }

  getCurrentDate(): string {
    return this.recordCaseRelation.getDateFromKeys(this.useCase.keys);
  }

  setIframeUrl(pane: string): string {    
    if (pane === 'first') {
      if (this.firstUrl === 'expected') {
        const date = this.getCurrentDate();
        return '/plot/' + this.firstVersion + '/' + date;
      } else {
        return '/plot/' + this.firstVersion + '/' + this.firstUrl;
      }
    } else {
      if (this.secondUrl === 'expected'){
        const date = this.getCurrentDate();
        return '/plot/' + this.secondVersion + '/' + date;
      } else {
        return '/plot/' + this.secondVersion + '/' + this.secondUrl;
      }
    }
  }

  

  ngAfterViewChecked(): void {
    const newContentWidth = (document.querySelector('.content') as any).offsetWidth;
    if (newContentWidth !== this.contentWidth) {
      this.left = newContentWidth - 310 + 'px';
      this.contentWidth = newContentWidth;
      if (this.currentTab !== 2 && document.querySelector('app-code-editor div div')) {
        (document.querySelector('app-code-editor div div') as any).style.width = newContentWidth - 3 + 'px';
      }
    }

    if (this.keysArray.length === 0 ) {
      this.showMenu = true;
    } else  {
      this.showMenu = false;
    }
  }

  selectedTab(index: number) {
    this.currentTab = index;
    if (index === 0) {
      this.fullModelEditor.writeValue(this.fullModelOption.value);
    }
    if (index === 1) {
      this.codeModelEditor.writeValue(this.codeModelOption.value);
    }
  }

  setExcuteStrategy(value: string) {
    this.excuteStrategy = value;
  }

  judgeAutoLayout() {
    if (document.body.clientHeight > document.body.clientWidth) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }

  }

  setRender(render: string) {
    this.renderMethod = render;
    if (this.renderMethod === 'SVG') {
      this.comparedDateList = (this.comparedReportList as any).svg;
    } else {
      this.comparedDateList = (this.comparedReportList as any).canvas;   
    }
    if (this.comparedDateList.length > 0) {
      this.selectedDate = this.comparedDateList[this.comparedDateList.length-1];
    } else {
      this.selectedDate = ""
    } 
  }


  setLayout(layout: string) {
    this.layoutMenu = layout;
    switch (layout) {

      case 'horizontal':
          this.orientation = 'horizontal';
          break;

      case 'vertical':
          this.orientation = 'vertical';
          break;
      default:
          this.judgeAutoLayout();
          break;
      }

  }

  getKeysArray(keys: any) {
    const first = keys[0].every(item => this.selectedCases[0].indexOf(item) > -1);
    const second  = this.selectedCases[0].every(item => keys[0].indexOf(item) > -1);
    if (!(first && second)) {
      this.selectedCases = keys.slice(0);
      this.keysArray = keys;
      this.totalCases = this.keysArray[0].length;
      this.keysArray.shift();
    }
  }



  play(isManual: boolean) {
    if (isManual) {
      this.startTime =  new Date();     
      this.failedCasesArray = [];
      this.getKeys.emit();
    }
    this.playing = true;
    this.manualRefresh = false;
    if (this.codeModelOption.value !== '') {
      this.option = null;
    }
    if (this.firstUrl === 'expected') {
      this.showFirstIframe = false;
    }
    if (this.secondUrl === 'expected') {
      this.showSecondIframe = false;
    }
    this.fullModelOption.value = '';
    this.codeModelOption.value = '';
    if (this.fullModelEditor) {
      this.fullModelEditor.writeValue('');
    }
    if (this.codeModelEditor) {
      this.codeModelEditor.writeValue('');
    }
    const urlKeys = this.getNextKeys();
    this.domString = null;
    if (urlKeys == null ) { 
      this.useCase = null;
      this.option = null;
      if (this.excuteStrategy === 'continue') {
        const endTime = new Date();
        const result = new ReportModel(this.startTime, endTime, this.totalCases, this.failedCasesArray, this.selectedDate, this.renderMethod);   
        this.apiService.createReport(result)
        .subscribe((data: any) => {       
          if (data.data == 'ok') {
            this.playing = false;
          } 
        })
      }
    } else {
      this.loadUseCase(urlKeys.slice(1), (model: UseCaseViewModel) => {
        this.useCase = model;
        this.nodeIndex = urlKeys[0];
  
        this.refresh(false);
      });
    }

  }


  getNextKeys() {
    if (this.keysArray.length > 0) {
      return this.keysArray.shift();
    } else {
      return null;
    }
  }

  pause() {
    this.playing = false;
    const model = this.option ? this.option.fullModel : null;
    if ((!this.manualRefresh) && model !== null) {
      this.fullModelOption.value = JSON.stringify(model, null , 4);
    }
    if (this.fullModelEditor) {
     this.fullModelEditor.writeValue(this.fullModelOption.value);
    }
    if (this.codeModelEditor) {
      this.codeModelEditor.writeValue(this.codeModelOption.value);
     }

  }

  refresh(isManual: boolean) {
    if (isManual) {
      this.manualRefresh = true;
      this.option = {
        fullModel: null,
        snippet: null,
        data: null,
        geojson: null

      };
      try {
        const model = this.getNewModel(this.fullModelOption.value);
        model.renderMethod = this.renderMethod;
        this.option.fullModel = model;
      } catch (error) {
      }
    } else {
      if (this.useCase !== null) {
        this.showFirstIframe = true;
        this.showSecondIframe = true;
        this.content = { first: null, second: null };
        (this.useCase.model.fullModel as any).renderMethod = this.renderMethod;
        this.option = this.useCase.model;
        this.codeModelOption.value = this.useCase.pre;
        this.scriptJs.pre = this.useCase.pre;
        this.scriptJs.post =  this.useCase.post;
        this.scriptJs.modelProcessor = this.useCase.modelProcessor;
      } else {
        this.pause();
      }
    }
  }

  getNewModel(str: string) {
    const jsString = 'const model = ' + str + '; return model;';
    const plugin = new Function(jsString);
    return plugin();
  }


  onFirstContentChange(value: { type: string, content: string }) {
    this.content.first = value;
    if (this.content.second != null && this.nodeIndex) {
      this.runCase();

    }
  }
  onSecondContentChange(value: { type: string, content: string }) {
    this.content.second = value;
    if (this.content.first != null && this.nodeIndex) {
      this.runCase();
    }
  }

  runCase() {
    if (this.excuteStrategy === 'stop') {
      if (this.compare(this.content.first, this.content.second) && this.playing) {
        this.setNodeState.emit({index: this.nodeIndex, state: 2, isExpand: false});
        this.play(false);
      } else {
        this.domString = { localDom: '', existDom: '' };
        this.domString.localDom = this.content.first.content;
        this.domString.existDom = this.content.second.content;
        this.setNodeState.emit({index: this.nodeIndex, state: 1, isExpand: true});
        this.pause();
      }
    } else {
      if (this.compare(this.content.first, this.content.second) && this.playing) {      
        this.setNodeState.emit({index: this.nodeIndex, state: 2, isExpand: false});
      } else {
        this.failedCasesArray.push(this.useCase.keys);
        this.setNodeState.emit({index: this.nodeIndex, state: 1, isExpand: false});
      }
      this.play(false);
    }
  }

  protected loadUseCase(keys: string[], success: (result: UseCaseViewModel) => void) {
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
  protected loadData(keys: string[], success: (data: object) => void) {
    this.waiting = true;
    this.apiService.data(keys).subscribe((result) => {
      this.waiting = false;
      if (result) {
        success(result);
      } else {
        success(null);
      }
    });
  }
  protected loadGeoJson(keys: string[], success: (geojson: object) => void) {
    this.waiting = true;
    this.apiService.geojson(keys).subscribe((result) => {
      this.waiting = false;
      if (result) {
        success(result);
      } else {
        success(null);
      }
    });
  }

  protected compare(first: { type: string, content: string }, second: { type: string, content: string }): boolean {
    first.content = this.convertSvgContent(first.content);
    second.content = this.convertSvgContent(second.content);
    return first.content === second.content;
  }

  protected convertSvgContent(content: any): any {
    content = content.replace(/headerClip[0-9]{5}/g, 'headerClip');
    content = content.replace(/headerClip[0-9]{4}/g, 'headerClip');
    content = content.replace(/headerClip[0-9]{3}/g, 'headerClip');
    content = content.replace(/headerClip[0-9]{2}/g, 'headerClip');
    content = content.replace(/headerClip[0-9]{1}/g, 'headerClip');

    content = content.replace(/plotAreaViewClip[0-9]{5}/g, 'plotAreaViewClip');
    content = content.replace(/plotAreaViewClip[0-9]{4}/g, 'plotAreaViewClip');
    content = content.replace(/plotAreaViewClip[0-9]{3}/g, 'plotAreaViewClip');
    content = content.replace(/plotAreaViewClip[0-9]{2}/g, 'plotAreaViewClip');
    content = content.replace(/plotAreaViewClip[0-9]{1}/g, 'plotAreaViewClip');

    content = content.replace(/footerClip[0-9]{5}/g, 'footerClip');
    content = content.replace(/footerClip[0-9]{4}/g, 'footerClip');
    content = content.replace(/footerClip[0-9]{3}/g, 'footerClip');
    content = content.replace(/footerClip[0-9]{2}/g, 'footerClip');
    content = content.replace(/footerClip[0-9]{1}/g, 'footerClip');

    content = content.replace(/axisClip[0-9]{5}/g, 'axisClip');
    content = content.replace(/axisClip[0-9]{4}/g, 'axisClip');
    content = content.replace(/axisClip[0-9]{3}/g, 'axisClip');
    content = content.replace(/axisClip[0-9]{2}/g, 'axisClip');
    content = content.replace(/axisClip[0-9]{1}/g, 'axisClip');

    content = content.replace(/gradient[0-9]{5}/g, 'gradientClip');
    content = content.replace(/gradient[0-9]{4}/g, 'gradientClip');
    content = content.replace(/gradient[0-9]{3}/g, 'gradientClip');
    content = content.replace(/gradient[0-9]{2}/g, 'gradientClip');
    content = content.replace(/gradient[0-9]{1}/g, 'gradientClip');

    content = content.replace(/legendClip[0-9]{5}/g, 'legendClip');
    content = content.replace(/legendClip[0-9]{4}/g, 'legendClip');
    content = content.replace(/legendClip[0-9]{3}/g, 'legendClip');
    content = content.replace(/legendClip[0-9]{2}/g, 'legendClip');
    content = content.replace(/legendClip[0-9]{1}/g, 'legendClip');

    content = content.replace(/cartesianClip[0-9]{5}/g, 'cartesianClip');
    content = content.replace(/cartesianClip[0-9]{4}/g, 'cartesianClip');
    content = content.replace(/cartesianClip[0-9]{3}/g, 'cartesianClip');
    content = content.replace(/cartesianClip[0-9]{2}/g, 'cartesianClip');
    content = content.replace(/cartesianClip[0-9]{1}/g, 'cartesianClip');

    content = content.replace(/scrollingClip[0-9]{5}/g, 'scrollingClip');
    content = content.replace(/scrollingClip[0-9]{4}/g, 'scrollingClip');
    content = content.replace(/scrollingClip[0-9]{3}/g, 'scrollingClip');
    content = content.replace(/scrollingClip[0-9]{2}/g, 'scrollingClip');
    content = content.replace(/scrollingClip[0-9]{1}/g, 'scrollingClip');

    content = content.replace(/axisTitleClip[0-9]{5}/g, 'axisTitleClip');
    content = content.replace(/axisTitleClip[0-9]{4}/g, 'axisTitleClip');
    content = content.replace(/axisTitleClip[0-9]{3}/g, 'axisTitleClip');
    content = content.replace(/axisTitleClip[0-9]{2}/g, 'axisTitleClip');
    content = content.replace(/axisTitleClip[0-9]{1}/g, 'axisTitleClip');

    content = content.replace(/trellisRowHeaderCellClip[0-9]{5}/g, 'trellisRowHeaderCellClip');
    content = content.replace(/trellisRowHeaderCellClip[0-9]{4}/g, 'trellisRowHeaderCellClip');
    content = content.replace(/trellisRowHeaderCellClip[0-9]{3}/g, 'trellisRowHeaderCellClip');
    content = content.replace(/trellisRowHeaderCellClip[0-9]{2}/g, 'trellisRowHeaderCellClip');
    content = content.replace(/trellisRowHeaderCellClip[0-9]{1}/g, 'trellisRowHeaderCellClip');

    content = content.replace(/graphcoordinategeo-viewport-trellisColumnHeaderCellClip[0-9]{5}/g, 'graphcoordinategeo-viewport-trellisColumnHeaderCellClip');
    content = content.replace(/graphcoordinategeo-viewport-trellisColumnHeaderCellClip[0-9]{4}/g, 'graphcoordinategeo-viewport-trellisColumnHeaderCellClip');
    content = content.replace(/graphcoordinategeo-viewport-trellisColumnHeaderCellClip[0-9]{3}/g, 'graphcoordinategeo-viewport-trellisColumnHeaderCellClip');
    content = content.replace(/graphcoordinategeo-viewport-trellisColumnHeaderCellClip[0-9]{2}/g, 'graphcoordinategeo-viewport-trellisColumnHeaderCellClip');
    content = content.replace(/graphcoordinategeo-viewport-trellisColumnHeaderCellClip[0-9]{1}/g, 'graphcoordinategeo-viewport-trellisColumnHeaderCellClip');

    content = content.replace(/floatLegendsViewsClip[0-9]{5}/g, 'floatLegendsViewsClip');
    content = content.replace(/floatLegendsViewsClip[0-9]{4}/g, 'floatLegendsViewsClip');
    content = content.replace(/floatLegendsViewsClip[0-9]{3}/g, 'floatLegendsViewsClip');
    content = content.replace(/floatLegendsViewsClip[0-9]{2}/g, 'floatLegendsViewsClip');
    content = content.replace(/floatLegendsViewsClip[0-9]{1}/g, 'floatLegendsViewsClip');


    content = content.replace(/TextOverlayClipId[0-9]{5}/g, 'TextOverlayClipId');
    content = content.replace(/TextOverlayClipId[0-9]{4}/g, 'TextOverlayClipId');
    content = content.replace(/TextOverlayClipId[0-9]{3}/g, 'TextOverlayClipId');
    content = content.replace(/TextOverlayClipId[0-9]{2}/g, 'TextOverlayClipId');
    content = content.replace(/TextOverlayClipId[0-9]{1}/g, 'TextOverlayClipId');

    content = content.replace(/TextOverlayCliped[0-9]{5}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{4}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{3}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{2}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{1}/g, 'TextOverlayCliped');

    content = content.replace(/gradientClip[0-9]{5}/g, 'gradientClip');
    content = content.replace(/gradientClip[0-9]{4}/g, 'gradientClip');
    content = content.replace(/gradientClip[0-9]{3}/g, 'gradientClip');
    content = content.replace(/gradientClip[0-9]{2}/g, 'gradientClip');
    content = content.replace(/gradientClip[0-9]{1}/g, 'gradientClip');

    content = content.replace(/trellisColumnHeaderCellClip[0-9]{1,5}/g, 'trellisColumnHeaderCellClip');
    content = content.replace(/transformablecoordinate[0-9]{1,5}/g, 'transformablecoordinate');
    content = content.replace(/LabelViewClipId[0-9]{1,8}/g, 'LabelViewClipId');
    content = content.replace(/pattern[0-9]{1,5}/g, 'pattern');

    return content;
  }


}
