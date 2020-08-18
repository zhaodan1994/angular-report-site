export class Model {
    readonly title: string;
    readonly key: string;
    readonly index: number;

    constructor(title: string, key: string, index: number) {
        this.title = title;
        this.key = key;
        this.index = index;
    }

}
