import { Component, OnInit, Input, ElementRef, Inject, ViewChild, TemplateRef } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { ApiService } from '../../services/api/api.service';
import { TodoItemNode, BuildReportTree } from '../../models/report.catalog.builder';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';



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
  selected: boolean
}

@Component({
  selector: 'app-report-catalog',
  templateUrl: './report-catalog.component.html',
  styleUrls: ['./report-catalog.component.scss']
})
export class ReportCatalogComponent implements OnInit {


    @Input() urlKey: string;
    @ViewChild('dialogTemplate') customDialog: TemplateRef<any>;

    dialogData = 'Update Successfully !';
    waiting = false;
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    selectedParent: TodoItemFlatNode | null = null;

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
    numberId = 0;

    constructor(
      private apiService: ApiService,
      private el: ElementRef,
      public dialog: MatDialog
    ) {  }

    ngOnInit(): void {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.waiting = true;
      this.apiService.reportDetails(this.urlKey)
      .subscribe((data) => {
        const tree: BuildReportTree  = new BuildReportTree();
         this.dataSource.data = tree.buildTreeData(data);
      })

    }


    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

    // tslint:disable-next-line: variable-name
    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
      const existingNode = this.nestedNodeMap.get(node);
      const flatNode = existingNode && existingNode.item === node.item
          ? existingNode
          : new TodoItemFlatNode();
      flatNode.item = node.item;
      flatNode.level = level;
      flatNode.keys = node.keys;
      flatNode.expandable = !!node.children;
      flatNode.selected = false;
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
      return flatNode;
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
    clickParentNode(node: TodoItemFlatNode): void {
      const childNode = this.treeControl.getDescendants(node);
      node.selected = node.selected ? false : true;
        childNode.forEach(child => {
          child.selected = node.selected;
        });
    //  this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    clickLeafNode(node: TodoItemFlatNode): void {
      node.selected = node.selected ? false : true;
      this.checkAllParentsSelection(node);
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



    getAllCheckedNode(): string[][] {
      const keysArray = [];
      this.treeControl.dataNodes.forEach(node => {
        if (node.selected && (!node.expandable)) {
          const keys = node.keys.slice(0);
          keys.unshift('cases');
          keysArray.push(keys);
        }

      });
      return keysArray;
    }


    updateCases() {
      const keysArray = this.getAllCheckedNode();
      this.apiService.updateCases(keysArray)
      .subscribe( (data: any) => {       
        if (data.data !== 'ok') {
          this.dialogData = 'Update Failed !' + data.data;
        } 
        const dialogConfig = new MatDialogConfig();      
        dialogConfig.width = '250px';
        dialogConfig.position = {
           top: '150px' ,
           left: '350px'
        }

        this.dialog.open(this.customDialog, dialogConfig);

      })
    }
}
