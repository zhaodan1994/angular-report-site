import { Component, ChangeDetectionStrategy, forwardRef, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { editor } from 'monaco-editor';

import { MonacoEditorLoaderService } from '../../services/monaco-editor-loader/monaco-editor-loader.service';
import { OnChanges, HostBinding, ViewChild, ElementRef, Input, Output, SimpleChanges } from '@angular/core';


declare const monaco: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true,
    }
  ]
})
export class CodeEditorComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
  @HostBinding('attr.class') class = 'app-code-editor';
  @ViewChild('editor', { static: true }) monacoEditorElement: ElementRef<HTMLDivElement>;
  @Input() options: editor.IEditorConstructionOptions;
  @Output() getValue = new EventEmitter<string>();

  value: string;
  private monacoEditor: editor.IStandaloneCodeEditor;
  private parseError: boolean;
  private onValidatorChange: () => void = () => { };
  private onTouched: () => void = () => { };
  private onChange: (_: any) => any = (_: any) => { };


  constructor(
    private monacoEditorLoaderService: MonacoEditorLoaderService,
  ) { }

  ngOnInit() {
    this.monacoEditorLoaderService.load(() => {
      if (!this.monacoEditor) {
        this.monacoEditor = monaco.editor.create(this.monacoEditorElement.nativeElement, this.options);
      }
      this.monacoEditor.layout();
      setTimeout(() => {
        this.monacoEditor.getAction('editor.action.formatDocument').run();
      }, 0);

      this.monacoEditor.onDidChangeModelContent(() => {
        this.onChange(this.monacoEditor.getValue());
        this.getValue.emit(this.monacoEditor.getValue());
      });

      this.monacoEditor.onDidChangeModelDecorations(() => {
        const pastParseError = this.parseError;
        if (monaco.editor.getModelMarkers({}).map(m => m.message).join(', ')) {
          this.parseError = true;
        } else {
          this.parseError = false;
        }

        if (pastParseError !== this.parseError) {
          this.onValidatorChange();
        }
      });

      this.monacoEditor.onDidBlurEditorText(() => {
        try {
          this.onTouched();
          this.monacoEditor.getAction('editor.action.formatDocument').run();
        } catch (error) {
        }

      });
    });
  }
  ngOnDestroy() {
    if (this.monacoEditor) {
       this.monacoEditor.dispose();
       this.monacoEditor = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.monacoEditor && changes.options && !changes.options.firstChange) {
      if (changes.options.previousValue.language !== changes.options.currentValue.language) {
        monaco.editor.setModelLanguage(this.monacoEditor.getModel(), this.options && this.options.language ? this.options.language : 'javascript');
      }
      if (changes.options.previousValue.theme !== changes.options.currentValue.theme) {
        monaco.editor.setTheme(changes.options.currentValue.theme);
      }
      if (changes.options.previousValue.readOnly !== changes.options.currentValue.readOnly) {
        this.monacoEditor.updateOptions({ readOnly: changes.options.currentValue.readOnly });
      }
    }
  }


  writeValue(value: string): void {
    this.value = value;
    this.options.value = value;
    if (this.monacoEditor && value) {
      this.monacoEditor.setValue(value);
    } else if (this.monacoEditor) {
      this.monacoEditor.setValue('');
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
  validate(): ValidationErrors {
    return (!this.parseError) ? null : {
      parseError: {
        valid: false,
      }
    };
  }
}
