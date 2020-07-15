import { Model } from './model';
import { UseCaseType } from './use-case-type'

export class UseCaseModel extends Model {
    public readonly pre: string;
    public readonly post: string;
    public readonly modelProcessor: string;
    public readonly description: string;
    public readonly view: UseCaseType;
    public readonly model: { snippet: object | null, fullModel: object | null, data: string | null, geojson: string | null}

    constructor(title: string, key: string | null, index: number | null, pre: string, post: string, modelProcessor: string, description: string, view: UseCaseType, model: { snippet: object | null, fullModel: object | null, data: string | null, geojson: string | null}) {
        super(title, key, index);

        this.pre = pre;
        this.post = post;
        this.modelProcessor = modelProcessor;
        this.description = description;
        this.view = view;
        this.model = model;

    }

    public modelFromKeys(keys: string[], onlyComment: boolean): Model | null {
        if (keys.length > 0) {
            return null;
          } else if (onlyComment) {
            return new UseCaseModel(this.title, this.key, this.index, this.pre, this.post, this.modelProcessor, this.description, this.view, { snippet: null, fullModel: {}, data: null, geojson: null });
          } else {
            return this;
          }
    }
}
