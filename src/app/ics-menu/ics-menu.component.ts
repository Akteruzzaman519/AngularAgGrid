import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from '../ics-tree/ics-tree.component';
import { ICSTree, ITreeNode } from '../tree/TreeObjects';

@Component({
  selector: 'app-ics-menu',
  templateUrl: './ics-menu.component.html',
  styleUrls: ['./ics-menu.component.css']
})
export class IcsMenuComponent implements OnInit {

  public iTreeOptions: ITreeOptions;
  public treeNode: ITreeNode;
  public reload = 0;
  public menuIDs: number[] = [];
  public StaticMenuTree = [

    { objGUID: "", objID: 2, parentID: 1, menuName: "Menu", menuSequence: 1, actionName: "" },
    { objGUID: "", objID: 3, parentID: 2, menuName: "Home", menuSequence: 1, actionName: "Home" },
    { objGUID: "", objID: 4, parentID: 2, menuName: "Bazars", menuSequence: 2, actionName: "BazarCollection" },
    { objGUID: "", objID: 5, parentID: 2, menuName: "product gallery", menuSequence: 3, actionName: "ProductGallery" }
  ];

  constructor() { }

  ngOnInit(): void {
    this.treeNode = { NodeID: 0, ParentID: 0, Text: '' };
    this.iTreeOptions = {
      TreeData: new ICSTree(),
      MultipleSelection: false,
      collapsible: true
    };
    this.getMenuList();
  }


  public getMenuList(): void {
    let moCollection = [];
    moCollection = this.StaticMenuTree;  // need to fix later..
    // this.iTreeOptions.TreeData.clear();
    moCollection.forEach(item => {
      const nodeItem: ITreeNode = {
        NodeID: item.objID,
        ParentID: item.parentID,
        Text: item.menuName,
        TagValue: item.actionName,
        ItemSequence: item.menuSequence
      };
      this.menuIDs.push(nodeItem.NodeID);
      this.iTreeOptions.TreeData.addNode(nodeItem);
    });
    // call data reload member
    // this.reload = ETreeOperation.PROPAGATE_NODE;
    console.log(this.menuIDs);
    console.log(this.iTreeOptions)
  }

}
