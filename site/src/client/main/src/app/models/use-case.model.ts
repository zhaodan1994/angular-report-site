import { Option } from './option';
import { Model } from './model';

export class UseCaseModel extends Model {
  readonly description: string;
  readonly model: Option;
  readonly pre: string;
  readonly post: string;
  readonly modelProcessor: string;
  readonly view: number;


  // tslint:disable-next-line: max-line-length
  constructor(title: string, key: string, index: number, description: string, model: Option, pre: string, post: string, modelProcessor: string, view: number) {
    super(title, key, index);

    this.description = description;
    this.model = model;
    this.pre = pre;
    this.post = post;
    this.modelProcessor = modelProcessor;
    this.view = view;
  }

}
