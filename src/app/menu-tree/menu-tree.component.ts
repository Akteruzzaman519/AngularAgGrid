import { Component, HostListener, OnInit } from '@angular/core';
import { ITreeOptions } from '../tree/tree.component';
import { ITreeNode, ICSTree, ETreeOperation } from '../tree/TreeObjects';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.css']
})
export class MenuTreeComponent implements OnInit {
  public iTreeOptions: ITreeOptions;
  private treeNode: ITreeNode;
  public reload = 0;
  private menuIDs: number[] = [];

  constructor() {

  }
  ngOnInit(): void {
    debugger
    // this.loginUser = JSON.parse(this.cs.localGet(SessionTag.LOGIN_USER, SessionTag.LOGIN_USER));
    // if (this.loginUser == null) {
    //   this.loginUser = new LoginUser();
    // }
    this.treeNode = { NodeID: 0, ParentID: 0, Text: '' };
    this.iTreeOptions = {
      TreeData: new ICSTree(),
      MultipleSelection: false,
      collapsible: true
    };
    this.getMenuList();
  }

  public StaticMenuTree = [

    { objGUID: "", objID: 2, parentID: 1, menuName: "Menu", menuSequence: 1, actionName: "" },
    { objGUID: "", objID: 3, parentID: 2, menuName: "Home", menuSequence: 1, actionName: "Home" },
    { objGUID: "", objID: 4, parentID: 2, menuName: "Bazars", menuSequence: 2, actionName: "BazarCollection" },
    { objGUID: "", objID: 5, parentID: 2, menuName: "product gallery", menuSequence: 3, actionName: "ProductGallery" }
  ];

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

  }
  public menuSelected(params): void {
    let navigateTo = '';
    // if (params.TagValue !== 'Home') {
    //   navigateTo = params.TagValue;
    // }
    // if (params.TagValue.includes('mySite/')) {
    //   this.cs.routingToMySite();
    //   return;
    // }
    // if (params.TagValue.includes('liveChat_NC')) {
    //   const customer = this.cs.getLoginUserFromSession();
    //   this.chatService.mooktobazarLiveChat.next(customer);
    // }
    // this.cs.navigateToMenu(navigateTo);
  }
  public reloadTree(params): void {
  }
}
