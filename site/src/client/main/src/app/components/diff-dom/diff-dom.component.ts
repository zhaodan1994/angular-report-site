import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MonacoEditorLoaderService } from '../../services/monaco-editor-loader/monaco-editor-loader.service';

declare var monaco: any;

@Component({
  selector: 'app-diff-dom',
  templateUrl: './diff-dom.component.html',
  styleUrls: ['./diff-dom.component.scss']
})
export class DiffDomComponent implements OnInit {

  @Input() domString: { localDom: string, existDom: string };
  private diffEditor;
  constructor(
    private monacoEditorLoaderService: MonacoEditorLoaderService
  ) { }

  ngOnInit() {

    this.monacoEditorLoaderService.load(() => {
      const localDom = this.domString.localDom.replace(/ /g, '\n');
      const existDom = this.domString.existDom.replace(/ /g, '\n');
      const originalModel = monaco.editor.createModel(localDom, 'html');
      const modifiedModel = monaco.editor.createModel(existDom, 'html');
      if (!this.diffEditor) {
        this.diffEditor = monaco.editor.createDiffEditor(document.getElementById('diffContainer'), {automaticLayout: true});
      }
      this.diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel
      });
    });


  }

}
