import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { CatalogViewModel } from '../../models/catalog.view.model';
import { ApiService } from '../../services/api/api.service';
import { CatalogViewBuilder } from '../../models/catalog.view.builder';
import { CatalogModel } from '../../models/catalog.model';



enum CaseState {
  NotExecute,
  Fail,
  Success

}

export class TodoItemFlatNode {
  item: string;
  level: number;
  keys: string[];
  number: number;
  expandable: boolean;
  state: CaseState;
  selected: boolean;
  matBadge: number;
}



@Component({
  selector: 'app-compare-catalog',
  templateUrl: './compare-catalog.component.html',
  styleUrls: ['./compare-catalog.component.scss']
})
export class CompareCatalogComponent implements OnInit {


    @Input() urlKey: string;
    waiting = false;
    flatNodeMap = new Map<TodoItemFlatNode, CatalogViewModel>();

    nestedNodeMap = new Map<CatalogViewModel, TodoItemFlatNode>();

    selectedParent: TodoItemFlatNode | null = null;

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<CatalogViewModel, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<CatalogViewModel, TodoItemFlatNode>;
    numberId = 0;

    constructor(
      private apiService: ApiService,
      private el: ElementRef
    ) {  }

    ngOnInit(): void {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.waiting = true;
      let urlKeys = [];
      if (this.urlKey !== '') {
        urlKeys = this.urlKey?.split('/');
        this.apiService.model(urlKeys).subscribe((result) => {
          this.waiting = false;
          if (result) {
            const builder = new CatalogViewBuilder();
            urlKeys.pop();
            const model = builder.build(urlKeys, result as CatalogModel);
            this.dataSource.data = [ model as CatalogViewModel ] ;
          }
        });
      } else {
        this.apiService.model(urlKeys).subscribe((result) => {
          this.waiting = false;
          if (result) {
            const builder = new CatalogViewBuilder();
            const dataArray = [];
            for (let index = 0; index < (result as any).children.length; index++) {
              dataArray[index] = builder.build([], (result as any).children[index]);
            }
            // const bugs = builder.build([], (result as any).children[0]);
            // const samples = builder.build([], (result as any).children[1]);
            // const testing =  builder.build([], (result as any).children[2]);
            this.dataSource.data = dataArray;
          }
        });
      }






    }

    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: CatalogViewModel): CatalogViewModel[] => node.children as CatalogViewModel[];

    // tslint:disable-next-line: variable-name
    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: CatalogViewModel, level: number) => {
      const existingNode = this.nestedNodeMap.get(node);
      const flatNode = existingNode && existingNode.item === node.title
          ? existingNode
          : new TodoItemFlatNode();
      flatNode.item = node.title;
      flatNode.level = level;
      flatNode.keys = node.keys;
      flatNode.expandable = !!node.children;
      flatNode.state = CaseState.NotExecute;
      flatNode.selected = true;
      flatNode.matBadge = 0;
      flatNode.number = this.numberId++;
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
      return flatNode;
    }


    setNodeStyle(node: TodoItemFlatNode ) {
      const style = {
        'font-weight': 'normal',
        color: 'rgba(0,0,0,.87)'
      };
      if (node.selected) {
        style['font-weight'] = 'bold';
      }
      if (node.state === 1) {
        style.color = 'red';
      }
      if (node.state === 2 ) {
        style.color = 'limegreen';
      }
      return style;
    }

    selectAll(): void {
      this.treeControl.dataNodes.forEach(node => {
        node.selected = true;
      });
    }

    clearAll(): void {
      this.treeControl.dataNodes.forEach(node => {
        node.selected = false;
      });
    }


    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    clickParentNode(node: TodoItemFlatNode , ctrlKey: boolean, metaKey: boolean): void {
      const childNode = this.treeControl.getDescendants(node);
      const ctrlClick = ctrlKey || metaKey ;
      if (!ctrlClick) {
        this.clearAll();
        node.selected = true;
        childNode.forEach(child => {
          child.selected = true;
        });
      } else {
        node.selected = node.selected ? false : true;
        childNode.forEach(child => {
          child.selected = node.selected;
        });
        this.checkAllParentsSelection(node);
      }

    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    clickLeafNode(node: TodoItemFlatNode, ctrlKey: boolean, metaKey: boolean): void {
      const ctrlClick = ctrlKey || metaKey ;
      if (!ctrlClick) {
        this.clearAll();
        node.selected = true;
      } else {
        node.selected = node.selected ? false : true;
        this.checkAllParentsSelection(node);
      }
    }

    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
          this.checkRootNodeSelection(parent);
          parent = this.getParentNode(parent);
        }
      }

    checkRootNodeSelection(node: TodoItemFlatNode): void {
      const nodeSelected = node.selected;
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected = descendants.every(child => child.selected);

      if (nodeSelected && !descAllSelected) {
          node.selected = false;
      } else if (!nodeSelected && descAllSelected) {
          node.selected = true;

      }
    }

    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);
        if (currentLevel < 1) {
            return null;
        }
        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
            return currentNode;
            }
        }
        return null;
    }



    getAllCheckedNode(): string[] {
      const keysArray = [];
      const indexArray = [];
      let index = 0;
      this.treeControl.dataNodes.forEach(node => {
        if (node.selected && (!node.expandable)) {
          if (node.keys[0] !== index.toString()) {
            node.keys.unshift(index.toString());
          }
          indexArray.push(index);
          keysArray.push(node.keys);
        }
        index ++ ;

      });
      keysArray.unshift(indexArray);
      return keysArray;
    }

    setParentBadge(node: TodoItemFlatNode): void {
      node.matBadge = 0;
      const descendants = this.treeControl.getDescendants(node);
      descendants.forEach(child => {
        if (child.state  === CaseState.Fail) {
          node.matBadge ++ ;
        }

      });
    }

    setNodeState(index: string, state: CaseState, isExpand: boolean): void {
      const node = this.treeControl.dataNodes[ Number(index)];
      node.state = state;
      node.matBadge = (node.state === CaseState.Fail) ? 1 : 0;

      let parent: TodoItemFlatNode | null = this.getParentNode(node);
      const parentArray = [];
      while (parent) {
        parentArray.unshift(parent);
        this.setParentBadge(parent);
        parent = this.getParentNode(parent);
      }

      if (isExpand) {
        this.treeControl.collapseAll();
        parentArray.forEach(element => {
          this.treeControl.expand(element);
        });
        document.querySelector(`#treeId${node.number - 1}`).scrollIntoView(true);
        (document.querySelector(`#treeId${node.number}`) as any).style.backgroundColor = 'lightgrey';
      }


    }




}
