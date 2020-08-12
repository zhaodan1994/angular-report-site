import { CatalogModel } from './catalog.model';
import { isCatalogModel, isUseCaseModel } from './model.typeguard';
import { CatalogViewModel } from './catalog.view.model';
import { Model } from './model';
import { UseCaseViewModel } from './use-case.view.model';

export const MAX_INDEX = 10000;

export class CatalogViewBuilder {
  build(keys: string[], model: CatalogModel): CatalogViewModel {
    return this.buildViewModel(keys, model);
  }

  protected buildViewModel(keys: string[], model: Model): CatalogViewModel {
    if (isCatalogModel(model)) {
      const result = new CatalogViewModel(model.title, model.key, model.index);
      result.keys.push(...keys);
      result.keys.push(result.key);

      for (const child of model.children) {
        if (isUseCaseModel(child)) {
          // tslint:disable-next-line: max-line-length
          const childViewModel = new UseCaseViewModel(child.title, child.key, child.index, child.description, child.model, child.pre, child.post, child.modelProcessor, child.view);
          childViewModel.keys.push(...result.keys);
          childViewModel.keys.push(childViewModel.key);
          result.children.push(childViewModel);
        } else if (isCatalogModel(child)) {
          const childViewModel = this.buildViewModel(result.keys, child);
          if (childViewModel != null) {
            result.children.push(childViewModel);
          }
        }
      }

      if (result.children.length > 0) {
        return result;
      }
    }
    return null;
  }

}
