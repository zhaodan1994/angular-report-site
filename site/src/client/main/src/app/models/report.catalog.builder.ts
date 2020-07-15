export class BuildReportTree {

    constructor() {
      
    }

    buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
      return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
        const value = obj[key];
        const node = new TodoItemNode();
        node.item = key;
        if (value != null) {
          if (typeof value === 'object') {
            node.children = this.buildFileTree(value, level + 1);
          } else {
            node.item = value;
          }
        }
  
        return accumulator.concat(node);
      }, []);
    }


    buildTreeData(data: {[key: string]: any}):TodoItemNode[] {
      const treeData: TodoItemNode[]= [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const caseNames = data[key];
          const node = new TodoItemNode();
          node.item = key;
          node.children = [];
          caseNames.forEach((element: string) => {
            const childrenNode = new TodoItemNode();     
            const keys = key + '-' + element;
            childrenNode.keys = keys.split('-');
            childrenNode.item = element;
            node.children.push(childrenNode);
          });
          treeData.push(node);
        }
      }
      return treeData;

    }

  }

  export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
    keys: string[] | null;
  }