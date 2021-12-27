import { Component, HostListener, OnInit } from '@angular/core';
import { ITreeOptions } from '../tree/tree.component';
import { ITreeNode, ICSTree, ETreeOperation } from '../tree/TreeObjects';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.css']
})
export class MenuTreeComponent implements OnInit {
  public StaticMenuTree = [

    { objGUID: "", objID: 2, parentID: 1, menuName: "Menu", menuSequence: 1, actionName: "" },
    { objGUID: "", objID: 3, parentID: 2, menuName: "Home", menuSequence: 1, actionName: "Home" },
    { objGUID: "", objID: 4, parentID: 2, menuName: "Bazars", menuSequence: 2, actionName: "BazarCollection" },
    { objGUID: "", objID: 5, parentID: 2, menuName: "product gallery", menuSequence: 3, actionName: "ProductGallery" }
  ];
  private myPT = 'SingleUser'; // mySessionTag
  public flashMessage = '';
  public iTreeOptions: ITreeOptions;
  public reload = 0;
  public reload2 = 0;
  private selectedMenuIDs: number[] = [];
  constructor() { }
  ngOnInit(): void {
    this.getMenuPermissionList();
    this.iTreeOptions = {
      TreeData: new ICSTree(),
      MultipleSelection: true,
      Editable: false
    };
  }
  public convertToNumArray(strValue: string): number[] { // get string of numbers and convert it into array of numbers
    const numArray: number[] = [];
    if (strValue === '' || strValue.length <= 0) {
      return numArray;
    }
    const separatedValue = strValue.split(',');
    separatedValue.forEach(value => {
      numArray.push(parseInt(value, 10));
    });
    return numArray;
  }
  private getMenuPermissionList(): void {

    const resArray = this.StaticMenuTree;
    this.iTreeOptions.TreeData.SelectedIDs = this.convertToNumArray(resArray.values.toString());
    this.reload = ETreeOperation.REFRESH_SELECTED_ITEMS;
    this.getMenuList();
  }
  public MapMenu(oMenu, currTreeNode?: ITreeNode): ITreeNode {
    const treeNode: ITreeNode = { NodeID: 0, ParentID: 0, Text: '' };
    treeNode.NodeID = oMenu.objID;
    treeNode.ParentID = oMenu.parentID;
    treeNode.Text = oMenu.menuName;
    treeNode.TagValue = oMenu.actionName;
    treeNode.ItemSequence = oMenu.menuSequence;
    treeNode.canAddChild = (treeNode.TagValue.toString() === '');
    (currTreeNode !== undefined && currTreeNode !== null) ? treeNode.eventType = currTreeNode.eventType : treeNode.eventType = '';
    return treeNode;
  }
  private getMenuList(): void {

    let moCollection = [];
    moCollection = this.StaticMenuTree;
    this.iTreeOptions.TreeData.clear();
    moCollection.forEach(item => {
      const nodeItem = this.MapMenu(item);
      this.iTreeOptions.TreeData.addNode(nodeItem);
    });
    // call data reload member
    this.reload = ETreeOperation.PROPAGATE_NODE;

  }

  public menusSelected(event): void {
    event.forEach(nodeID => {
      if (!this.selectedMenuIDs.includes(nodeID)) {
        this.selectedMenuIDs.push(nodeID);
      }
    });
    this.setFlashMessage(this.selectedMenuIDs.toString(), 10000);
  }

  public removeSelected(event): void {
    this.selectedMenuIDs = event;
    this.setFlashMessage(this.selectedMenuIDs.toString(), 10000);
  }

  private setFlashMessage(message: string, duration?: number): void {
    if (duration === undefined || duration === null) {
      duration = 1500;
    }
    this.flashMessage = ' >>> ' + message;
    let flag = true;
    const handler = setInterval(() => {
      if (flag) {
        this.flashMessage = '';
        flag = false;
      }
    }, duration);
    if (!flag) {
      clearInterval(handler);
    }
  }
}
