import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {
  private scripts: { [name: string]: { loaded: boolean, src: string, callbacks: (() => void)[] } } = {};

  constructor(
  ) { }

  load(name: string, src: string, callback: () => void): void {
    let script = this.scripts[name];
    if (script != null) {
      if (script.src !== src) {
        throw new Error('Unexpected repeated naming script!');
      }

      if (script.loaded) {
        callback();
      } else {
        script.callbacks.push(callback);
      }
    } else {
      script = { loaded: false, src, callbacks: [callback] };
      this.scripts[name] = script;

      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.src = this.scripts[name].src;
      if (scriptElement.readyState) {  // IE
        scriptElement.onreadystatechange = () => {
          if (scriptElement.readyState === 'loaded' || scriptElement.readyState === 'complete') {
            scriptElement.onreadystatechange = null;

            script.loaded = true;
            script.callbacks.forEach((item) => { item(); });
            script.callbacks = [];
          }
        };
      } else { // Others
        scriptElement.onload = () => {
          script.loaded = true;
          script.callbacks.forEach((item) => { item(); });
          script.callbacks = [];
        };
      }
      document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }
  }
}
