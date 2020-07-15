import { CatalogModel } from './catalog.model';
import { UseCaseViewModel } from './use-case.view.model';
import { isCatalogModel, isUseCaseModel } from './model.typeguard';

export class CatalogViewModel extends CatalogModel {
  readonly keys: string[] = [];

  childCatalogs(): CatalogViewModel[] {
    return this.children.filter((item) => isCatalogModel(item)) as CatalogViewModel[];
  }

  childUseCases(): UseCaseViewModel[] {
    return this.children.filter((item) => isUseCaseModel(item)) as UseCaseViewModel[];
  }

}