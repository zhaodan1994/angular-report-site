import { Component, OnInit, ViewChild, AfterViewChecked, HostBinding, Output, EventEmitter, OnDestroy } from '@angular/core';
import { merge } from 'lodash';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { UseCaseViewModel } from '../../models/use-case.view.model';
import { editor } from 'monaco-editor';
import { ApiService } from '../../services/api/api.service';
import { DynamicVersionLoaderService } from 'share-services/services/dynamic-version-loader/dynamic-version-loader.service';
import { RecordCaseRelationService } from '../../services/record-case-relation/record-case-relation.service';
import { isUseCaseModel } from '../../models/model.typeguard';
import { Option } from '../../models/option';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-report-content',
  templateUrl: './report-content.component.html',
  styleUrls: ['./report-content.component.scss']
})
export class ReportContentComponent implements OnInit, AfterViewChecked, OnDestroy {

  @HostBinding('attr.class') class = 'app-use-case-snippet';
  @ViewChild('fullModelEditor', { static: false }) fullModelEditor: CodeEditorComponent;
  @ViewChild('codeModelEditor', { static: false }) codeModelEditor: CodeEditorComponent;


  keys: string[] = [];
  left: string;
  orientation: string;
  domString = { localDom: '', existDom: '' } ;
  useCase: UseCaseViewModel = null;
  option: Option = null;
  waiting = false;
  renderMethod = 'SVG' ;
  layoutMenu = 'auto';
  fullModelOption: editor.IEditorConstructionOptions;
 
  scriptJs = {pre: '' , post: '', modelProcessor: ''};
  contentWidth: number;
  currentTab = 0;
  currentVersion: string;
  content: { first: { type: string, content: string }, second: { type: string, content: string } } = { first: null, second: null };
  showCodeEditor = false;
  showSecondIframe = false;
  showFirstIframe = false;
  subscription: Subscription = null;
  firstTitle = "Checked";
  secondTitle = "Failed";
  date: string;
  jiraId = "DAT-233";
  showDiffDom = false;


  constructor(
    private apiService: ApiService,
    private dynamicVersionLoaderService: DynamicVersionLoaderService,
    private recordCaseRelation: RecordCaseRelationService,
    private route: ActivatedRoute
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() { 
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
      readOnly: true,
      showUnused: false
    };


    
    this.subscription = this.route.url.subscribe(segments => {
      this.recordCaseRelation.loadRelationData();
      this.showSecondIframe = false;
      this.showFirstIframe = false;
      this.showDiffDom = false;
      this.renderMethod = this.route.parent.snapshot.data.render === 'canvas' ? 'Canvas' : 'SVG';
      const keys = [];
      keys.push(...this.route.snapshot.url.map(segment => segment.path.toLowerCase().split('-')));
      keys[1].unshift('cases');
      this.play(keys[1]);
    
    });
    this.currentVersion = this.apiService.version();
    this.dynamicVersionLoaderService.load(this.currentVersion).then(
     (value) => {
        this.showCodeEditor = true;
     }
   );


  }

  getCurrentDate(): string {
    return this.recordCaseRelation.getDateFromKeys(this.useCase.keys);
  }

 

  setIframeUrl(): string {
        return '/plot/' + this.currentVersion + '/' + this.date;

  }

  ngAfterViewChecked(): void {
    const newContentWidth = (document.querySelector('.content') as any).offsetWidth;
    if (newContentWidth !== this.contentWidth) {
      this.left = newContentWidth - 130 + 'px';
      this.contentWidth = newContentWidth;
      if (this.currentTab !== 2 && document.querySelector('app-code-editor div div')) {
        (document.querySelector('app-code-editor div div') as any).style.width = newContentWidth - 3 + 'px';
      }
    }
  }



  judgeAutoLayout() {
    if (document.body.clientHeight > document.body.clientWidth) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
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


  // selectedTab(index: number) {
  //   this.currentTab = index;
  //   if (index === 0) {
  //     this.fullModelEditor.writeValue(this.fullModelOption.value);
  //   }
  //   if (index === 1) {
  //     this.codeModelEditor.writeValue(this.codeModelOption.value);
  //   }
  // }

  play(urlKeys: string[]) {
    this.fullModelOption.value = '';  
    if (this.fullModelEditor) {
      this.fullModelEditor.writeValue('');
    }

    this.domString = null;
    this.loadUseCase(urlKeys, (model: UseCaseViewModel) => {
      this.useCase = model;
      this.refresh();
    });

  }



  pause() {

    const model = this.option ? this.option.fullModel : null;
    if ( model !== null) {
      this.fullModelOption.value = JSON.stringify(model, null , 4);
    }
    if (this.fullModelEditor) {
     this.fullModelEditor.writeValue(this.fullModelOption.value);
    }

  }

  refresh() {
    if (this.useCase !== null) {
      this.date = this.getCurrentDate();
      if (this.date === 'empty') {
        this.showFirstIframe = true;
        this.firstTitle = "Unchecked";
        this.secondTitle = "None";
      } else {
        this.showFirstIframe = true;
        this.showSecondIframe = true;
        this.firstTitle = "Checked";
        this.secondTitle = "Failed";
      };
      this.content = { first: null, second: null };
      (this.useCase.model.fullModel as any).renderMethod = this.renderMethod;
      this.option = this.useCase.model;
      this.scriptJs.pre = this.useCase.pre;
      this.scriptJs.post =  this.useCase.post;
      this.scriptJs.modelProcessor = this.useCase.modelProcessor;
      this.pause();
      
    } else {
      this.firstTitle = "None";
      this.secondTitle = "None"
    }
    
  }



  onFirstContentChange(value: { type: string, content: string }) {
    this.content.first = value;
    if (this.content.second != null ) {
      this.runCase();

    } else if (this.date == 'empty' && value.content.indexOf('ErrorInfo') == 0){
      this.domString = { localDom: '', existDom: '' } ;
      this.showDiffDom = true;
      this.domString.localDom = this.content.first.content;

    }
    
  }
  onSecondContentChange(value: { type: string, content: string }) {
    this.content.second = value;
    if (this.content.first != null ) {
      this.runCase();
    }
  }

  runCase() {
    if (!this.compare(this.content.first, this.content.second)) {
      this.domString = { localDom: '', existDom: '' };
      this.domString.localDom = this.content.first.content;
      this.domString.existDom = this.content.second.content;
      if (this.content.first.content.indexOf('ErrorInfo') === 0 || this.content.second.content.indexOf('ErrorInfo') === 0) {
        this.showDiffDom = true;
      } else if (this.renderMethod === 'SVG') {
        let firstSvg = this.content.first.content.substring(this.content.first.content.indexOf('<svg'), this.content.first.content.indexOf('</svg>') + 6);
        firstSvg = '<svg xmlns="http://www.w3.org/2000/svg" ' + firstSvg.substring(4);
        let secondSvg = this.content.second.content.substring(this.content.second.content.indexOf('<svg'), this.content.second.content.indexOf('</svg>') + 6);
        secondSvg = '<svg xmlns="http://www.w3.org/2000/svg" ' + secondSvg.substring(4);
        this.domString.localDom = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(firstSvg)));
        this.domString.existDom = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(secondSvg)));
      }      
   
    } else {
      this.firstTitle = 'Checked';
      this.secondTitle = 'None';
      this.showSecondIframe = false;
      if (this.content.first.content.indexOf('ErrorInfo') === 0) {
        this.domString = { localDom: '', existDom: '' };
        this.domString.localDom = this.content.first.content;
        this.domString.existDom = this.content.first.content;
        this.showDiffDom = true;
      }
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
      } else {
        success(null);
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

    content = content.replace(/TextOverlayCliped[0-9]{5}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{4}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{3}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{2}/g, 'TextOverlayCliped');
    content = content.replace(/TextOverlayCliped[0-9]{1}/g, 'TextOverlayCliped');

    return content;
  }


}
