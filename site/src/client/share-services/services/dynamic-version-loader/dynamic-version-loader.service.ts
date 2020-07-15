import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DynamicVersionLoaderService {
  private version: string;
  private loadedLocal = false;
  private loadedExist = false;


  constructor() { }

  async load(version: string) {
    if (this.loadedLocal) {
      if (this.version !== version) {
        throw Error('The version ' + this.version + 'has been loaded. Cannot load ' + version + ' version');
      }
    } else {
      this.version = version;
      this.loadedLocal = true;
      await this.loadJs('/lib/' + version + '/calcengine/gc.spread.common.js');
      await this.loadJs('/lib/' + version + '/calcengine/gc.spread.calcengine.js');
      await this.loadJs('/lib/' + version + '/calcengine/gc.spread.calcengine.basicfunctions.js');
      await this.loadCss('/lib/' + version + '/dv/gcdv.css');
      return this.loadJs('/lib/' + version + '/dv/index.min.js');
    }

  }

  async loadDateJs(version: string, date: string) {
      await this.loadJs('/lib/' + version + '/calcengine/gc.spread.common.js');
      await this.loadJs('/lib/' + version + '/calcengine/gc.spread.calcengine.js');
      await this.loadJs('/lib/' + version + '/calcengine/gc.spread.calcengine.basicfunctions.js');
      await this.loadCss('/package/' + version + '/'+ date + '/gcdv.css');
      return this.loadJs('/package/' + version + '/'+ date + '/index.min.js');

  }

  async loadExistJs(version: string): Promise<boolean> {
    if (this.loadedExist) {
      if (this.version !== version) {
        throw Error('The version ' + this.version + 'has been loaded. Cannot load ' + version + ' version');
      }
    } else {
      this.version = version;
      this.loadedExist = true;
      if (version === 'develop') {
        await this.loadJs(`http://gcdv-${version}.azurewebsites.net/lib/calcengine/gc.spread.common.11.2.7.js`);
        await this.loadJs(`http://gcdv-${version}.azurewebsites.net/lib/calcengine/gc.spread.calcengine.11.2.7.js`);
        await this.loadJs(`http://gcdv-${version}.azurewebsites.net/lib/calcengine/gc.spread.calcengine.basicfunctions.11.2.7.js`);
      }

      if (version === 'ar') {
        await this.loadJs(`http://gcdv-${version}.azurewebsites.net/lib/calcengine/gc.spread.common.js`);
        await this.loadJs(`http://gcdv-${version}.azurewebsites.net/lib/calcengine/gc.spread.calcengine.js`);
      }

      await this.loadCss(`http://gcdv-${version}.azurewebsites.net/lib/dv/gcdv.css`);
      return this.loadJs(`http://gcdv-${version}.azurewebsites.net/lib/dv/index.min.js`);
    }

  }

  loadJs(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const element = document.createElement('script');
      element.type = 'text/javascript';
      element.src = path;
      if (element.readyState) {
        element.onreadystatechange = () => {
          if (element.readyState === 'loaded' || element.readyState === 'complete') {
            element.onreadystatechange = null;
            resolve(true);
          }
        }
      } else {
        element.onload = () => {
          resolve(true);
        }
      }
      element.onerror = (error: any) => resolve(false);
      document.getElementsByTagName('head')[0].appendChild(element);
    });
  }

  loadCss(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const element = document.createElement('link');
      element.rel = 'stylesheet';
      element.type = 'text/css';
      element.href = path;
      element.onerror = (error: any) => resolve(false);
      document.getElementsByTagName('head')[0].appendChild(element);
      resolve(true);
    });
  }
}
