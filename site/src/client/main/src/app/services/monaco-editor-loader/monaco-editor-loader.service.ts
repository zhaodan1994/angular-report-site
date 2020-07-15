import { Injectable, NgZone } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader/dynamic-script-loader.service';

@Injectable({
  providedIn: 'root'
})
export class MonacoEditorLoaderService {
  private static isLoaded = false;

  constructor(
    private dynamicScriptLoaderService: DynamicScriptLoaderService
  ) { }

  load(callback: () => void) {
    if (MonacoEditorLoaderService.isLoaded) {
      callback();
    }

    this.dynamicScriptLoaderService.load('monaco-editor', `${'assets/monaco-editor/min/vs'}/loader.js`, () => {
      (window as any).amdRequire = (window as any).require;
      (window as any).amdRequire.config({ paths: { vs: 'assets/monaco-editor/min/vs' } });
      (window as any).amdRequire(['vs/editor/editor.main'], () => {
        MonacoEditorLoaderService.isLoaded = true;
        callback();
      });
    });
  }
}
