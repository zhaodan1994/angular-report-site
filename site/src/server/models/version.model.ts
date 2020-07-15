import { CatalogModel } from './catalog.model';

export class VersionModel extends CatalogModel {

  public readonly documentation: object | null;

  constructor(name: string, documentation: object | null) {
    super(name, null, 0);

    this.documentation = documentation;

  }


}
