import { Component, OnInit, HostBinding, ViewChild, ElementRef, Input, EventEmitter, Output, HostListener} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-plot-viewer-external',
  templateUrl: './plot-viewer-external.component.html',
  styleUrls: ['./plot-viewer-external.component.scss']
})
export class PlotViewerExternalComponent implements OnInit {
  @HostBinding('attr.class') class = 'app-plot-viewer-external';
  @ViewChild('plot', { static: false }) element: ElementRef<HTMLIFrameElement>;
  @Input() set model(value: object) {
    this.ready(() => {this.refresh(value)});
  }
  @Input() url: string;
  @Input() js: any;
  @Output() contentChanged: EventEmitter<{type: string, content: string}> = new EventEmitter();

  id: string = null;
  waiting = false;
  iframeUrl: any;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  @HostListener('window:message', ['$event.data'])
  onMessage(data: {id: string, type: string, content: string}): void {
    if (this.id === data.id) {
      this.waiting = false;
      this.id = null;
      this.contentChanged.emit({type: data.type, content: data.content});
    }

    if (data.id === 'empty') {
      this.contentChanged.emit({type: data.type, content: data.content});
    }
  }

  refresh(option: object): void {
    if (option && !this.waiting) {
      this.waiting = true;
      this.id = (100000 * Math.random()).toFixed();
    }

    if (this.contentChanged.observers.length > 0) {
      this.element.nativeElement.contentWindow.postMessage({ id: this.id, response: 'Content', model: option, js: this.js}, '*');
    } else {
      this.element.nativeElement.contentWindow.postMessage({ id: this.id, response: 'None', model: option, js: this.js}, '*');
      this.waiting = false;
      this.id = null;
    }
  }


  protected ready(callback: () => void): void {
    setTimeout(() => {
      const contentDocument = this.element.nativeElement.contentDocument;
      if (contentDocument == null) {
        this.ready(callback);
        return;
      }

      const body = contentDocument.body;
      if ((body == null) || (body.children.length <= 0)) {
        this.ready(callback);
        return;
      }

      const appElement = body.children[0];
      if ((appElement == null) || appElement.children.length <= 0) {
        this.ready(callback);
        return;
      }

      const plotElement = appElement.children[0];
      if ((plotElement == null) || (plotElement.attributes['data-load'] == null) || (plotElement.attributes['data-load'] === 'unload')) {
        this.ready(callback);
        return;
      }

      callback();


    }, 10)
  }

}
