import { AfterViewInit, Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ETreeOperation, ICSTree, ITreeNode } from '../tree/TreeObjects';

@Component({
  selector: 'app-ics-tree',
  templateUrl: './ics-tree.component.html',
  styleUrls: ['./ics-tree.component.css']
})
export class IcsTreeComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() TreeOptions: ITreeOptions;
  @ViewChild('container', { read: ViewContainerRef }) private eContainer;
  editDIV: any;
  firstElement: boolean;
  isRoot: boolean;
  nodeIDPart: string;
  root: ITreeNode;
  maxID: number;
  refreshDB: any;
  refreshItem: ETreeOperation;
  newNode: ITreeNode;
  constructor(private renderer: Renderer2) { }
  ngOnChanges(): void {
    debugger
    if (this.TreeOptions === undefined || this.TreeOptions === null) { return; }
    if (this.refreshDB === ETreeOperation.PROPAGATE_NODE) {
      this.hookTree();
    }
    if (this.refreshDB === ETreeOperation.RELOAD_TREE) {
      // for reload case clear tree then this.hooktree()
      const childElements = this.eContainer?.element.nativeElement.children;
      for (let child of childElements) {
        this.renderer.removeChild(this.eContainer.element.nativeElement, child);
      }
      this.hookTree();
    }
    if (this.refreshItem === ETreeOperation.REFRESH_ITEM) { //  jam
      this.newNode = this.TreeOptions.addedItem;
      this.addNodeToTree();
    }
    this.hookTree();
  }
  addNodeToTree() {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    debugger
    const hr = this.renderer.createElement('hr');
    this.renderer.addClass(hr, 'hrLine');
    this.renderer.setProperty(hr, 'id', 'firstDragger');
    this.renderer.setProperty(hr, 'draggable', true);
    const hr2 = this.renderer.createElement('hr');
    this.renderer.addClass(hr2, 'hrLine');
    this.renderer.setProperty(hr2, 'id', 'secondDragger');
    this.renderer.setProperty(hr2, 'draggable', true);
    this.renderer.setStyle(hr2, 'left', '80%');
    this.renderer.appendChild(this.eContainer.element.nativeElement, hr);
    this.renderer.appendChild(this.eContainer.element.nativeElement, hr2);
  }

  ngOnInit(): void {
    debugger
    console.log(this.TreeOptions);
  }

  private hookTree(): void {
    debugger
    this.root = this.TreeOptions.TreeData.getRoot();
    this.maxID = this.TreeOptions.TreeData.getMaxNodeID();
    // if (!(this.refreshDB == ETreeOperation.PROPAGATE_NODE || this.refreshDB == ETreeOperation.RELOAD_TREE)) {
    //   return;
    // }
    // if (!this.eContainer) {
    //   return;
    // }

    const DIV = this.renderer.createElement('div');
    this.renderer.addClass(DIV, 'rootDIV');
    this.renderer.appendChild(this.eContainer?.element.nativeElement, DIV);
    this.propagateNodes(DIV, [this.root]);
  }
  //  #region New Added..................(25/06/2020).....
  private createEditDIV(parentElem, refChild): void {
    debugger
    this.editDIV = this.renderer.createElement('div');
    this.renderer.insertBefore(parentElem, this.editDIV, refChild);
    this.renderer.addClass(this.editDIV, 'card');
    this.renderer.addClass(this.editDIV, 'rounded-0');
    this.renderer.addClass(this.editDIV, 'overflow-hidden');
    this.renderer.addClass(this.editDIV, 'position-absolute');

    const editDIVh = this.renderer.createElement('div');
    this.renderer.appendChild(this.editDIV, editDIVh);
    editDIVh.innerHTML = 'Configure Menu';
    this.renderer.addClass(editDIVh, 'card-header');
    this.renderer.addClass(editDIVh, 'rounded-0');
    this.renderer.addClass(editDIVh, 'p-2');
    this.renderer.addClass(editDIVh, 'bg-warning');

    const editDIVb = this.renderer.createElement('div');
    this.renderer.appendChild(this.editDIV, editDIVb);
    this.renderer.addClass(editDIVb, 'card-body');
    this.renderer.addClass(editDIVb, 'rounded-0');
    this.renderer.addClass(editDIVb, 'p-2');

    const editDIVf = this.renderer.createElement('div');
    this.renderer.appendChild(this.editDIV, editDIVf);
    this.renderer.addClass(editDIVf, 'card-footer');
    this.renderer.addClass(editDIVf, 'bg-secondary');
    this.renderer.addClass(editDIVf, 'rounded-0');
    this.renderer.addClass(editDIVf, 'p-2');

    const rowDiv1 = this.renderer.createElement('div');
    this.renderer.addClass(rowDiv1, 'row');
    this.renderer.addClass(rowDiv1, 'no-gutters');
    this.renderer.addClass(rowDiv1, 'form-group');

    const span1 = this.renderer.createElement('span');
    span1.innerHTML += 'Display Text';
    this.renderer.addClass(span1, 'col-md-6');
    this.renderer.addClass(span1, 'col-sm-12');

    const span2 = this.renderer.createElement('span');
    span2.innerHTML += 'Node Value(Json Obj.)';
    this.renderer.addClass(span2, 'col-md-6');
    this.renderer.addClass(span2, 'col-sm-12');


    const rowDiv = this.renderer.createElement('div');
    this.renderer.addClass(rowDiv, 'row');
    this.renderer.addClass(rowDiv, 'no-gutters');
    this.renderer.addClass(rowDiv, 'form-group');

    const br2 = this.renderer.createElement('br');

    const input = this.renderer.createElement('input');
    this.renderer.setProperty(input, 'type', 'text');
    this.renderer.setProperty(input, 'id', 'txtMenuName');
    this.renderer.setProperty(input, 'placeholder', 'Menu-Name');
    this.renderer.setAttribute(input, 'autocomplete', 'off');
    this.renderer.addClass(input, 'form-control');
    this.renderer.addClass(input, 'form-control');
    this.renderer.addClass(input, 'col-md-6');
    this.renderer.addClass(input, 'col-sm-12');

    const input2 = this.renderer.createElement('input');
    this.renderer.setProperty(input2, 'type', 'text');
    this.renderer.setProperty(input2, 'id', 'txtTagValue');
    this.renderer.setProperty(input2, 'placeholder', 'TagValue');
    this.renderer.setAttribute(input2, 'autocomplete', 'off');
    this.renderer.addClass(input2, 'form-control');
    this.renderer.addClass(input2, 'form-control');
    this.renderer.addClass(input2, 'col-md-6');
    this.renderer.addClass(input2, 'col-sm-12');

    const br = this.renderer.createElement('br');

    const childBtn = this.renderer.createElement('button');
    this.renderer.setProperty(childBtn, 'id', 'btnChild');
    childBtn.innerHTML += 'Add as child';
    this.renderer.addClass(childBtn, 'btn');
    this.renderer.addClass(childBtn, 'btn-add');
    this.renderer.addClass(childBtn, 'btn-secondary');


    const siblingBtn = this.renderer.createElement('button');
    this.renderer.setProperty(siblingBtn, 'id', 'btnSibling');
    siblingBtn.innerHTML += 'Add as sibling';
    this.renderer.addClass(siblingBtn, 'btn');
    this.renderer.addClass(siblingBtn, 'btn-secondary');

    const updateBtn = this.renderer.createElement('button');
    this.renderer.setProperty(updateBtn, 'id', 'btnUpdate');
    updateBtn.innerHTML += 'Update';
    this.renderer.addClass(updateBtn, 'btn');
    this.renderer.addClass(updateBtn, 'btn-secondary');

    const deleteBtn = this.renderer.createElement('button');
    this.renderer.setProperty(deleteBtn, 'id', 'btnDelete');
    deleteBtn.innerHTML += 'Delete';
    this.renderer.addClass(deleteBtn, 'btn-del');
    this.renderer.addClass(deleteBtn, 'btn');
    this.renderer.addClass(deleteBtn, 'btn-secondary');

    const closeBtn = this.renderer.createElement('button');
    this.renderer.setProperty(closeBtn, 'id', 'btnClose');
    closeBtn.innerHTML += 'Close';

    this.renderer.addClass(closeBtn, 'btn-cross');
    this.renderer.addClass(closeBtn, 'btn');
    this.renderer.addClass(closeBtn, 'btn-secondary');

    this.renderer.appendChild(rowDiv, span1);
    this.renderer.appendChild(rowDiv, input);
    this.renderer.appendChild(editDIVb, rowDiv);

    this.renderer.appendChild(rowDiv1, span2);
    this.renderer.appendChild(rowDiv1, input2);
    this.renderer.appendChild(editDIVb, rowDiv1);

    this.renderer.appendChild(editDIVf, childBtn);
    this.renderer.appendChild(editDIVf, siblingBtn);
    this.renderer.appendChild(editDIVf, updateBtn);
    this.renderer.appendChild(editDIVf, deleteBtn);
    this.renderer.appendChild(editDIVf, closeBtn);
  }
  private propagateNodes(elem: HTMLElement, nodes: ITreeNode[]): void {
    //  LI contains one UL if it has children. UL propagate LIs for children.
    const nUL = this.renderer.createElement('ul');
    let firstItem = true;
    nodes.forEach(node => {
      const nLI = this.renderer.createElement('li');
      node.haveChild = this.TreeOptions.TreeData.getHaveChild(node);
      if (this.isRoot === true) {
        if (node.haveChild === true) {
          const childs = this.TreeOptions.TreeData.getChildren(node.NodeID);
          this.isRoot = false;
          this.propagateNodes(nUL, childs);
        }
        return;
      }
      nLI.setAttribute('id', this.nodeIDPart + node.NodeID.toString());
      if (node.haveChild === true) { // parent items, at first propagation tree wll be expanded
        if (node.expanded === true) {
          this.renderer.addClass(nLI, 'fold');
        }
        else {
          this.renderer.removeClass(nLI, 'fold');
        }
      }
      else {// leaf items
        if (firstItem === true) {
          firstItem = false;
        }
        this.renderer.addClass(nLI, 'read');
      }
      //  if multi item selection then add check box
      if (this.TreeOptions.MultipleSelection === true) {
        const rCHK = this.renderer.createElement('input');
        this.renderer.setProperty(rCHK, 'type', 'checkbox');
        this.renderer.setProperty(rCHK, 'id', 'chkbx' + node.NodeID.toString());

        this.renderer.addClass(rCHK, 'checkbox');
        if (this.TreeOptions.TreeData.getIndeterminate(node)) {
          this.renderer.setProperty(rCHK, 'indeterminate', true);
        }
        else {
          const state: boolean = this.TreeOptions.TreeData.getCheckBoxVal(node);
          if (state === true) {
            this.renderer.setAttribute(rCHK, 'checked', 'true');
          }
        }
        this.renderer.appendChild(nLI, rCHK);
      }
      //   if tree is editable.....................(25/06/2020)
      if (this.TreeOptions.Editable === true) {
        const nImg = this.renderer.createElement('img');
        this.renderer.setAttribute(nImg, 'src', '../../../../assets/iconsOps/menu-edit.png');
        this.renderer.setProperty(nImg, 'id', 'imgAdd');
        this.renderer.setStyle(nImg, 'margin-bottom', '4px');
        this.renderer.setStyle(nImg, 'margin-right', '4px');
        this.renderer.addClass(nImg, 'nodeImage');
        this.renderer.appendChild(nLI, nImg);
      }

      nLI.innerHTML += node.Text;
      //  menu configure
      if (this.TreeOptions.extendedProperty !== null && this.TreeOptions.extendedProperty !== undefined) {
        let strID = '';
        let strCodeID = '';
        if (this.firstElement === true) {
          strID = 'extendedDiv~top';
          strCodeID = 'codeDIV~top';
          this.firstElement = false;
        }
        else {
          strID = 'extendedDiv~';
          strCodeID = 'codeDIV~';
        }
        const extendedDIV = this.renderer.createElement('div');
        this.renderer.addClass(extendedDIV, 'extendedDIV');
        this.renderer.setProperty(extendedDIV, 'id', strID + node.NodeID);
        const codeDIV = this.renderer.createElement('div');
        codeDIV.innerHTML += node.TagValue;
        this.renderer.addClass(codeDIV, 'divCode');
        this.renderer.setProperty(codeDIV, 'id', strCodeID + node.NodeID);
        const ItemSequenceDIV = this.renderer.createElement('div');
        this.renderer.addClass(ItemSequenceDIV, 'divCode');
        this.renderer.setProperty(ItemSequenceDIV, 'id', 'ItemSequenceDIV~' + node.NodeID);
        ItemSequenceDIV.innerHTML += node.ItemSequence;

        this.renderer.appendChild(extendedDIV, codeDIV);
        this.renderer.appendChild(extendedDIV, ItemSequenceDIV);
        this.renderer.appendChild(nLI, extendedDIV);
      }

      this.renderer.appendChild(nUL, nLI); //  add list item to unordered list

      if (node.haveChild === true) {
        const childs = this.TreeOptions.TreeData.getChildren(node.NodeID);
        this.propagateNodes(nLI, childs);
      }
      if (this.TreeOptions.collapsible === true) {
        this.renderer.addClass(nLI, 'collapsible');

        this.renderer.addClass(nUL, 'collapsedUL');
        if (node.haveChild) {
          this.renderer.addClass(nLI, 'parentNode');
        }
      }
    });

    this.renderer.appendChild(elem, nUL);
  }
}
export interface ITreeOptions {
  TreeData: ICSTree;
  MultipleSelection?: boolean;
  ParentIDs?: any;
  SelectedIDs?: number[];
  SelectedItem?: any;
  Editable?: any;
  addedItem?: ITreeNode;
  extendedProperty?: any;
  collapsible?: boolean;
}

