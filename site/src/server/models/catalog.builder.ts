import { readdirSync, readFileSync, statSync } from 'fs';
import { extname, join, parse } from 'path';

import { CatalogModel } from './catalog.model';
import { UseCaseType } from './use-case-type';
import { UseCaseModel } from './use-case.model';
import { TransformData } from './transform-data'

export const MAX_INDEX = 10000;

export class CatalogBuilder {
  private static keyCounter = 0;

  public build(path: string, title: string): CatalogModel | null {
    if (statSync(path).isDirectory()) {
      return this.visitFolder(path, title, [], {}, {});
    } else {
      return null;
    }
  }

  protected visitFolder(path: string, title: string | null, keys: string[], dataKeys: { [key: string]: string }, geojsonKeys: { [key: string]: string }): CatalogModel {
    const result = new CatalogModel(title ? title : parse(path).name.toLowerCase(), null, MAX_INDEX);

    readdirSync(path).forEach((name) => {
      const itemPath = join(path, name);
      if (!statSync(itemPath).isDirectory()) {
        if (name.toLowerCase() === 'index.js') {
          const json = require(itemPath).default;
          if (typeof json === 'object') {
            title = json.title;
            if (title && (typeof title === 'string')) {
              result.title = title;
              result.key = result.toKey(title).replace(/ /g, '');
            }

            const key = json.key;
            if (key && (typeof key === 'string')) {
              result.key = result.toKey(key);
            }

            const index = json.index;
            if (typeof index === 'number') {
              result.index = index;
            }
          } else {
            console.warn('===> Warning: Invalid index definition is found! Please refer to the path ', itemPath);
          }
        }
      }
    });

    keys = keys.concat(result.key);
    dataKeys = Object.assign({}, dataKeys);
    geojsonKeys = Object.assign({}, geojsonKeys);
    readdirSync(path).forEach((name) => {
      const itemPath = join(path, name);
      if (!statSync(itemPath).isDirectory()) {
        if (name.toLowerCase() === 'data.js') {
          const json = require(itemPath).default;
          if (typeof json === 'object') {
            result.datas.data = json;
            dataKeys.data = keys.concat('data').join('/');
          } else {
            console.warn('===> Warning: Invalid data definition is found! Please refer to the path ', itemPath);
          }
        } else if (name.toLowerCase() === 'geojson.js') {
          const json = require(itemPath).default;
          if (typeof json === 'object') {
            result.geojsons.geojson = json;
            geojsonKeys.geojson = keys.concat('geojson').join('/');
          } else {
            console.warn('===> Warning: Invalid geo data definition is found! Please refer to the path ', itemPath);
          }
        }
      }
    });

    readdirSync(path).forEach((name) => {
      const itemPath = join(path, name);

      if (statSync(itemPath).isDirectory()) {
        const model = this.visitFolder(itemPath, null, keys, dataKeys, geojsonKeys);
        if (result.children.some((child) => child.key === model.key)) {
          console.warn('===> Warning: The key is repeated! Please refer to the key ', model.key);
        } else if (model.children.length > 0) {
          result.children.push(model);
        }
      } else if ((name.toLowerCase() !== 'index.js') && (name.toLowerCase() !== 'data.js') && (name.toLowerCase() !== 'geojson.js')) {
        if (extname(itemPath).toLowerCase() === '.js') {
          const model = this.visitJsFile(itemPath, dataKeys, geojsonKeys);
          if (result.children.some((child) => child.key === model.key)) {
            console.warn('===> Warning: The key is repeated! Please refer to the key ', model.key);
          } else if (model.children.length > 0) {
            result.children.push(model);
          }
        } else if (extname(itemPath).toLowerCase() === '.json') {
          const model = this.visitJsonFile(itemPath);
          if (result.children.some((child) => child.key === model.key)) {
            console.warn('===> Warning: The key is repeated! Please refer to the key ', model.key);
          } else {
            result.children.push(model);
          }
        } else if (name.toLowerCase() !== '.ds_store') {
          console.warn('===> Warning: Invalid file is found! Please refer to the path ', itemPath);
        }
      }
    });

    result.children.sort((a, b) => {
      if (CatalogModel.isCatalogModel(a) && !CatalogModel.isCatalogModel(b)) {
        return 1;
      } else if (!CatalogModel.isCatalogModel(a) && CatalogModel.isCatalogModel(b)) {
        return -1;
      } else if (a.index !== b.index) {
        return a.index - b.index;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return result;
  }

  protected visitJsFile(path: string, dataKeys: { [key: string]: string }, geojsonKeys: { [key: string]: string }): CatalogModel {
    const result = new CatalogModel(parse(path).name.toLowerCase(), null, MAX_INDEX);
    const json = require(path).default;

    const title = json.title;
    if (title && (typeof title === 'string')) {
      result.title = title;
      result.key = result.toKey(title).replace(/ /g, '');
    }

    const key = json.key;
    if (key && (typeof key === 'string')) {
      result.key = result.toKey(key);
    }

    const index = json.index;
    if (typeof index === 'number') {
      result.index = index;
    }

    const view = TransformData.parseView(json.view);

    const usecases = json.usecases;
    if (Array.isArray(usecases)) {
      for (const usecase of usecases) {
        if (typeof usecase === 'object') {
          const model = new UseCaseModel(TransformData.toUseCaseTitle(usecase.title), TransformData.toUseCaseKey(usecase.key), TransformData.toUseCaseIndex(usecase.index), TransformData.toUseCaseJs(usecase.pre), TransformData.toUseCaseJs(usecase.post), TransformData.toModelProcessor(usecase.modelProcessor), TransformData.toUseCaseDescription(usecase.description), view, TransformData.toUseCaseModel(usecase.model, dataKeys, geojsonKeys));
          if (result.children.some((child) => child.key === model.key)) {
            model.key = 'usecase' + CatalogBuilder.keyCounter++;
          }
          if (result.children.some((child) => child.key === model.key)) {
            console.warn('===> Warning: The key is repeated! Please refer to the key ', model.key);
          } else if (model.model != null) {
            result.children.push(model);
          }
        }
      }
    }

    return result;
  }
  protected visitJsonFile(path: string): UseCaseModel {
    const result = new UseCaseModel(parse(path).name.toLowerCase(), null, MAX_INDEX, '', '', '', '', UseCaseType.Prototype, { snippet: null, fullModel: {}, data: null, geojson: null });
    try {
      const rawdata = readFileSync(path, { encoding: 'utf8' });
      const model = JSON.parse(rawdata);
      if (typeof model === 'object') {
        result.model.fullModel = model;
      } else {
        console.warn('===> Warning: invalid json file is found! Please refer to the file', path);
      }
    } catch (e) {
      console.warn('===> Warning: invalid json file is found! Please refer to the file', path);
    }

    return result;
  }


}
