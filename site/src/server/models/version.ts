import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { versionPath} from './version-path'

import { VersionBuilder } from './version.builder';
import { VersionModel } from './version.model';


export const versions: { [name: string]: VersionModel } = buildVersions(versionPath);

function buildVersions(path: string): { [name: string]: VersionModel } {
  if (!statSync(path).isDirectory()) {
    throw new Error('Unexcepted error!');
  }

  const result: { [name: string]: VersionModel } = {};
  const builder = new VersionBuilder();
  readdirSync(path).forEach((name: string) => {
    const model = builder.build(join(path, name));
    if (model != null) {
      result[name] = model;
    }
  });

  return result;
}
