import { CatalogModel } from './catalog.model';

export class VersionModel extends CatalogModel {

  public readonly documentation: object | null;
  public  relation: object | null;
  public  reportList: object | null;

  constructor(name: string, documentation: object | null, relation: object | null, reportList: object | null) {
    super(name, null, 0);

    this.documentation = documentation;
    this.relation = relation;
    this.reportList = reportList;
  }

}
