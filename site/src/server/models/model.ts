export abstract class Model {
    public title: string;
    public key: string;
    public index: number;

    constructor(title: string, key: string | null, index: number | null ) {
        title = title.trim();
        if (title) {
            this.title = title;
        } else {
            throw new Error('The title is empty!');
        }

        if (key) {
            this.key = key;
        } else {
            this.key = this.toKey(title).replace(/ /g, '');
        }

        if (index == null) {
            this.index = -1;
        } else {
            this.index = index;
        }
    }

    public toKey(key: string): string {
        key = key.trim().toLowerCase().replace(/[\/\\'%"\$\*\?]/g, '');
        return key;
    }

    public abstract modelFromKeys(keys: string[], onlyComment: boolean): Model | null;
}
