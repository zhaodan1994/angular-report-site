import { Model } from './model';

export class CatalogModel extends Model {

    public static isCatalogModel(model: Model): model is CatalogModel {
        return (model as CatalogModel).children !== undefined;
    }

    public readonly children: Model[] = [];
    public readonly datas: {[key: string]: object} = {};
    public readonly geojsons: { [key: string]: object} = {};

    public modelFromKeys(keys: string[], onlyComment: boolean): Model | null {
        if (keys.length > 0) {
          let key = keys.shift();
          if (key == null) {
            console.warn('===> Warning: Unexpected empty data key is found!');
            return null;
          } else {
            key = key.toLowerCase();
          }

          for (const item of this.children) {
            if (item.key === key) {
              return item.modelFromKeys(keys, onlyComment);
            }
          }
          return null;
        } else if (onlyComment) {
          const model = new CatalogModel(this.title, this.key, this.index);
          for (const item of this.children) {
            const child = item.modelFromKeys(keys, onlyComment);
            if (child != null) {
              model.children.push(child);
            }
          }
          return model;
        } else {
          return this;
        }
    }

    public dataFromKeys(keys: string[]): object | null {
        return this.objectFromKeys(keys, 'data');
    }

    public geojsonFromKeys(keys: string[]): object | null {
        return this.objectFromKeys(keys, 'geojson');
    }

    protected objectFromKeys(keys: string[], type: string): object | null {
        if (keys.length <= 0) {
          return null;
        }
        let key = keys.shift();
        if (key == null) {
          console.warn('===> Warning: Unexpected empty data key is found!');
          return null;
        } else {
          key = key.toLowerCase();
        }

        if (keys.length <= 0) {
          return type === 'data' ? this.datas[key] : this.geojsons[key];
        } else {
          for (const item of this.children) {
            if (CatalogModel.isCatalogModel(item) && (item.key === key)) {
              return item.objectFromKeys(keys, type);
            }
          }
          return null;
        }
    }

}
