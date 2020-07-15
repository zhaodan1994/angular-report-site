import { Model } from './model';
import { CatalogModel } from './catalog.model';
import { UseCaseModel } from './use-case.model';

export function isCatalogModel(model: Model): model is CatalogModel {
  return (model != null) && ((model as CatalogModel).children !== undefined);
}

export function isUseCaseModel(model: Model): model is UseCaseModel {
  return (model != null) && ((model as UseCaseModel).model !== undefined);
}