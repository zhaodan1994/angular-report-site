import { UseCaseType } from './use-case-type';
import { merge } from 'lodash';

export class TransformData {

  public static parseView(view: string): UseCaseType {
    if (view.toLowerCase() === 'feature') {
      return UseCaseType.Feature;
    } else if (view.toLowerCase() === 'extension') {
      return UseCaseType.Extension;
    } else if (view.toLowerCase() === 'prototype') {
      return UseCaseType.Prototype;
    } else if (view.toLowerCase() === 'api') {
      return UseCaseType.Api;
    } else if (view.toLowerCase() === 'event') {
      return UseCaseType.Event;
    } else if (view === null) {
      return UseCaseType.Prototype;
    } else {
      console.warn('Unexcepted view:', view);
      return UseCaseType.Prototype;
    }
  }

  public static toUseCaseTitle(value: any): string {
    if (value && (typeof value === 'string')) {
      return value;
    } else {
      throw new Error('The use case title is missed!');
    }
  }

  public static toUseCaseKey(value: any): string | null {
    return typeof value === 'string' ? value : null;
  }

  public static toUseCaseJs(value: any): string {
    return value ? value.toString().substring(value.toString().indexOf('{') + 1, value.toString().lastIndexOf('}')) : '';
  }

  public static  toUseCaseIndex(value: any): number | null {
    return typeof value === 'number' ? value : null;
  }

  public static  toModelProcessor(value: any): string {
    return typeof value === 'string' ? value : '';
  }

  public static  toUseCaseDescription(value: any): string {
    return typeof value === 'string' ? value : '';
  }

  public static  toUseCaseModel(value: any, dataKeys: { [key: string]: string }, geojsonKeys: { [key: string]: string }): { snippet: object | null, fullModel: object, data: string | null, geojson: string | null } {
    const result: { snippet: object | null, fullModel: object, data: string | null, geojson: string | null } = { snippet: {}, fullModel: {}, data: null, geojson: null };
    if (typeof value === 'object') {
      result.fullModel = this.toUseCaseFullModel(value.fullModel);
      result.snippet = this.toUseCaseSnippet(value.snippet);

      let model: any = {};
      model = merge(model, result.fullModel, result.snippet);
      if (model.data == null) {
        result.data = dataKeys.data;
      }
      const plots = model.plots;
      if (Array.isArray(plots)) {
        for (const plot of plots) {
          if (plot) {
            const type = plot.type;
            if (type === 'Map') {
              const config = plot.config;
              if (typeof config === 'object') {
                const map = config.map;
                if (typeof map === 'object') {
                  const geojson = map.geojson;
                  if (geojson == null) {
                    result.geojson = geojsonKeys.geojson;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
    return result;
  }

  public static  toUseCaseFullModel(value: any): object {
    return typeof value === 'object' ? value : {};
  }

  public static  toUseCaseSnippet(value: any): object {
    return typeof value === 'object' ? value : {};
  }
}
