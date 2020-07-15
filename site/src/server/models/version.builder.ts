import { existsSync, statSync, readFileSync } from 'fs';
import { join, parse } from 'path';

import { CatalogModel } from './catalog.model';
import { VersionModel } from './version.model';

import { CatalogBuilder } from './catalog.builder';


export const MAX_INDEX = 10000;



export class VersionBuilder {
  public build(path: string): VersionModel | null {
    if (statSync(path).isDirectory()) {
      if (!existsSync(join(path, 'lib', 'dv', 'index.min.js'))) {
        console.warn('===> Warning: Cannot find the dv js in version folder! Please refer to the path ', path);
      }

      const name = parse(path).name;
      const documentation = this.buildDocumentation(join(path, 'documentation', 'dv.json'));
     
      const result = new VersionModel(name, documentation);
      const catalog = this.buildCatalog(join(path, 'models'), name);
      if (catalog != null) {
        result.children.push(...catalog.children);
      }
      return result;
    } else {
      return null;
    }
  }

  protected buildDocumentation(path: string): object | null {
    if (existsSync(path) && statSync(path).isFile()) {
      const buffer = readFileSync(path, 'utf8');
      try {
        return JSON.parse(buffer);
      } catch (e) {
        throw new Error('Documentation file is invalid!');
      }
    } else {
      return null;
    }
  }

  protected buildCatalog(path: string, name: string): CatalogModel | null {
    if (existsSync(path) && statSync(path).isDirectory) {
      const builder = new CatalogBuilder();
      return builder.build(path, name);
    }

    return null;
  }


}
