import { Component, Input, HostListener, Output, EventEmitter, ViewChild, ViewContainerRef, Renderer2, OnChanges, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { EComboSelection, IconType, MasterData } from '../Enums';
import { IcsCommonService } from '../ics-common.service';
import { IDValue, IDValueObject } from './baseObject';
@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {


  @Output() selectionChanged = new EventEmitter();
  @Output() selectionsChanged = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Output() inputValueChange = new EventEmitter();
  @Output() comboCleared = new EventEmitter();
  @Output() deselectingItem = new EventEmitter();
  @Input() public iStrick: boolean = false;;
  @Input() PickerOptions: IPickerOptions = { SelectedItem: new IDValue(), DataSource: { Type: '', SourceName: MasterData.None }, withCountInfo: true };
  @Input() disableCombo?: boolean = false;
  @Input() reloadDB = 0;
  @Input() Caption: string;
  @Input() ParentUniqeId: any;

  @ViewChild('container', { read: ViewContainerRef }) private eContainer;
  @ViewChild('inputBox', { read: ViewContainerRef }) private eInputBox;
  @ViewChild('caption', { read: ViewContainerRef }) private eCaption;
  @ViewChild('textClosebtn', { read: ViewContainerRef }) private etextClosebtn;

  public count = '';//show total combo loaded value And no. of matched item as string
  public selectedItem = new IDValue(0, '', ''); //selected item in combo
  public countSelectedItems: string; //show if combo selected value are greater than 2
  public selectedItems: IDValue[] = [];//checked/selected items on comboBox
  public dropdownToggler = false;
  public myCompId = "";
  public showCount = true;
  private dataSource: any; //data source of combo value loading
  private inputTxt = '';//text show on input box
  private listItemID = 'LISTITEM';// div element ID of loaded combo value
  private inputBGColor = 'snow'; //inputbox background Color
  private matchedCV = 0; //matching value no. of combo loaded value based on input typing letters
  private default: boolean = false; //if true  then combo will display as capsule type or else dropdown type
  private totalCV = 0; //total combo loaded value
  private currentFocus; //focus
  private spaceClickCount = 0;
  private nativeElement: Node;
  private selectedTxt: string = '';
  private click = 0;
  private HTMLEleName = {
    MultiPanel: '-i-MULTIPANEL-', SingleDIV: '-i-SingleDIV-', ItemsDIV: '-i-ItemsDIV-', ListItem: '-i-LISTITEM-', CheckBox: '-i-CHKBOX-',
    InputBOX: '-i-INPUTBOX-', AutoCompleteList: '-i-AutoCompleteList-'
  };

  constructor(private cs: IcsCommonService, private renderer: Renderer2) {
    this.Caption = '';
    this.setDefaultComboOptions();
  }

  ngOnInit(): void { this.myCompId = this.constructor[this.cs.getComponentID()].id + this.cs.getID(); }

  ngOnChanges(): void {
    if (!this.PickerOptions) { return; }
    this.setDefaultValues();
    this.selectedItem = this.PickerOptions.SelectedItem;
    if (this.PickerOptions.withCountInfo !== undefined) {
      this.showCount = this.PickerOptions.withCountInfo;
    }
    if (this.PickerOptions.Caption !== undefined) {
      this.Caption = this.PickerOptions.Caption;
    }
    const condition = (this.selectedItem.objID > 0) ? 1 : 0;
    if (this.reloadDB > condition) {
      this.selectedItem = new IDValue(0, '');
    }
    this.setSelection(this.selectedItem, true);
    this.loadDataFromDB();
    this.shapeElements();
    if (this.PickerOptions.SelectionType === EComboSelection.multiCheck) { // for multipleChk option selectedItems will be checked and user can write on the field
      if (this.PickerOptions.SelectedItems) {
        if (this.PickerOptions.SelectedItems.length > 0) {
          this.setSelectedItems(this.PickerOptions.SelectedItems);
        }
      }
    }
    else if (this.PickerOptions.SelectionType === EComboSelection.multiObj) { // for multipleObj option selectedItems won't display on picker and user can write on the field
      if (this.PickerOptions.SelectedItems) {
        if (this.PickerOptions.SelectedItems.length > 0) {
          this.setSelectedItems(this.PickerOptions.SelectedItems);
        }
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.PickerOptions === undefined || this.PickerOptions === null) { return; }
    let text = this.cs.convertIDValArrayToStringOfText(this.selectedItems);
    this.renderer.setProperty(this.eInputBox, 'id', this.ParentUniqeId + this.HTMLEleName.InputBOX);
    if (this.PickerOptions.SelectionType === EComboSelection.single) {
      this.eInputBox.element.nativeElement.value = this.selectedItem.text.trim()
    }
  }

  private setDefaultComboOptions(): void {
    if (!this.PickerOptions) { this.PickerOptions = { SelectedItem: new IDValue(0, '', ''), DataSource: null }; }
    if (!this.PickerOptions.SelectionType) { this.PickerOptions.SelectionType = EComboSelection.single }
    if (!this.PickerOptions.SingleLine) { this.PickerOptions.SingleLine = false; }
  }

  private removeSelectedItemsFromCollection(items: IDValue[], isSelected?: boolean): void {
    items.forEach(item => {
      this.selectedItems = this.cs.spliceAnyArrayWithObjID(this.selectedItems, item.objID);
    });
    this.countSelectedItems = this.CountSelectedItemsOver2(this.selectedItems);
    var val = this.eInputBox.element.nativeElement.value;
    if (isSelected === true) {
      this.eInputBox.element.nativeElement.value = this.cs.convertIDValArrayToStringOfText(this.selectedItems)
    }
    else {
      if (this.selectedItems.length === 0) {
        this.eInputBox.element.nativeElement.value = val.trim().slice(0, -1);
      }
      if (this.selectedItems.length == 2) {
        var arr = val.split(',');
        arr.splice(0, 1);
        val = arr.join(',');
        this.eInputBox.element.nativeElement.value = this.selectedItems[0].text.trim() + ', ' + val.trim().slice(0, -1);
      }
      else if (this.selectedItems.length > 2) {
        var txt = val.slice(val.lastIndexOf(',') + 1);
        this.eInputBox.element.nativeElement.value = this.textSelectedItemsOver2(this.selectedItems, true) + ', ' + txt;
      }
    }
  }

  private setSelectedItems(items: IDValue[]): void {
    let text = this.cs.convertIDValArrayToStringOfText(items);
    this.eInputBox.element.nativeElement.value = text;
    this.selectedItems = items;
  }

  private setDefaultValues() {
    if (this.PickerOptions.SingleLine === undefined || this.PickerOptions.SingleLine === null) { this.PickerOptions.SingleLine = false; }
    if (!this.PickerOptions.SelectedItems) {
      this.inputTxt = '';
      this.PickerOptions.SelectedItems = [];
    }
  }

  private countString() {
    this.count = (this.matchedCV > 0) ? this.matchedCV.toString() + '/' : '';
    this.count = `[${this.count}${this.totalCV.toString()}]`;
  }

  private setSelection(selectedItem: IDValue, inputClear: boolean = false): void {
    if (selectedItem === undefined || selectedItem === null) { return; }
    if (this.eInputBox === undefined || this.eInputBox === null) { return; }
    if (selectedItem.objID === 0) {
      (this.eInputBox) ? this.eInputBox.element.nativeElement.value = this.eInputBox.element.nativeElement.value : '';
      // return;
    }
    if (inputClear === true) { this.eInputBox.element.nativeElement.value = selectedItem.text.trim(); }
    this.PickerOptions.SelectedItem = selectedItem;
    this.selectedItem = this.PickerOptions.SelectedItem;
    this.selectionChanged.emit(this.PickerOptions.SelectedItem);
    if (selectedItem.objID) {
      this.valueChange.emit(selectedItem)
    }
    if (this.PickerOptions.FormControl === undefined || this.PickerOptions.FormControl === null) { return; }
    this.PickerOptions.FormControl.setValue(this.PickerOptions.SelectedItem);
  }

  private shapeElements() {
    if (this.PickerOptions === undefined) { return; }
    if (this.eCaption === undefined) { return; }
    let idw = 30;
    if (this.PickerOptions.SingleLine === true) {
      this.renderer.setProperty(this.eCaption.element.nativeElement, 'innerText', this.Caption + ' ');
      idw += this.eCaption.element.nativeElement.offsetWidth;
      this.renderer.setStyle(this.eContainer.element.nativeElement, 'height', '25px');
    }
    else { this.renderer.setStyle(this.eContainer.element.nativeElement, 'height', '29px'); }
    const inputw = 'calc(100% - ' + idw.toString() + 'px)';
    this.renderer.setStyle(this.eInputBox.element.nativeElement, 'width', inputw);
  }

  private closeAllLists() {/* close all autocomplete lists in the document, except the one passed as an argument: */
    this.click = 1;
    if (this.default == false) { var x = document.getElementsByClassName('autocomplete-items'); }
    else { var x = document.getElementsByClassName('autocomplete-items1'); }
    for (let i = 0; i < x.length; i++) {
      this.renderer.removeChild(x[i].parentNode, x[i], true);
    }
    this.matchedCV = 0;
    this.countString();
  }

  public loadDataFromDB() {
    if (this.disableCombo === true) { return; }
    if (this.PickerOptions === undefined || this.PickerOptions === null) { return; }
    if (this.PickerOptions.DataSource.Type.toLowerCase() === 'local') {
      this.dataSource = this.PickerOptions.DataSource.IDValueList;
      this.totalCV = this.dataSource.length;
      this.matchedCV = 0;
      this.countString();
      return;
    }
    const oIDValObj: IDValueObject = new IDValueObject();
    oIDValObj.valueField = this.PickerOptions.DataSource.SourceName;
    oIDValObj.note = this.PickerOptions.DataSource.Param;
    let getMember = '';
    if (this.PickerOptions.DataSource.Type.toLowerCase() === 'enum') {
      getMember = '/IDValueEnumGet';
    }
    else { getMember = '/IDValueObjectGet'; }
    // this.hs.postReq(getMember, oIDValObj, true)
    //   .subscribe((data) => {
    //     const oIDValObj1: IDValueObject = JSON.parse(JSON.stringify(data));
    //     oIDValObj1.iDValueList.sort((a, b) => { return (a.objID - b.objID); });
    //     this.dataSource = oIDValObj1.iDValueList;
    //     this.totalCV = this.dataSource.length;
    //     this.matchedCV = 0;
    //     this.countString();
    //   }, (err) => { console.log(err); });
  }

  private inputTyping(event, focusIn?: boolean): boolean {
    this.default = this.PickerOptions.SingleLine;
    if (event.target.id !== this.eInputBox.element.nativeElement.id) { return false; }
    if (this.dataSource === undefined || this.dataSource === null) { return false; }
    if (this.selectedItems.length > 2 && event.type !== 'input') {
      this.eInputBox.element.nativeElement.value = this.textSelectedItemsOver2(this.selectedItems, true);
    }
    var val = this.eInputBox.element.nativeElement.value;
    if (val.includes(',')) { val = val.split(/[,]+/).pop(); }
    if (event.type === 'input') {
      for (let i = val.length - 1; i >= 0; i--) {
        if (i === 0 && val[0] === ' ') {
          this.spaceClickCount = 0;
          break;
        }
        if (val[i] === ' ') {
          this.spaceClickCount++;
          if (val[i] !== val[i - 1]) { break; }
        }
        else {
          this.spaceClickCount = 0;
          break;
        }
      }
    }
    let a = val;
    let b = val;
    let i = val;
    this.closeAllLists();// close already open lists of autocompleted values
    this.currentFocus = -1;
    a = this.renderer.createElement('div'); // create a DIV element that will contain the items (values):
    this.renderer.setProperty(a, 'id', this.eInputBox.element.nativeElement.id + 'autocomplete-list');
    if (this.default == false) { this.renderer.addClass(a, 'autocomplete-items'); }
    else { this.renderer.addClass(a, 'autocomplete-items1'); }
    this.renderer.appendChild(this.eContainer.element.nativeElement, a);
    this.matchedCV = 0;
    this.countString();
    let fi = (focusIn === true) ? this.dataSource : "";
    if (this.selectedItems.length > 0 && this.spaceClickCount === 1) {
      let listItems: any;
      listItems = this.selectedItems;
      fi = fi.filter(p => !listItems.some(p1 => p1.objID === p.objID));
    }
    for (i = 0; i < fi.length; i++) {
      this.matchedCV++;
      this.countString();
      b = this.renderer.createElement('div'); // create a DIV element for each matching element:
      this.renderer.setProperty(b, 'id', this.listItemID + i.toString());
      b.innerHTML = (val.length > 0) ? this.boldString(fi[i].text, val) : fi[i].text;
      b.innerHTML += "<input type='hidden' value='" + JSON.stringify(fi[i]) + "'>";
      if (i === 0 && this.spaceClickCount === 1) {
        this.currentFocus = i;
        this.renderer.addClass(b, 'autocomplete-active');
      } // add checkbox for multiple selection. (3/11/2020)
      if (this.PickerOptions.SelectionType === EComboSelection.multiCheck || this.PickerOptions.SelectionType === EComboSelection.multiObj) {
        const rCHK = this.renderer.createElement('input');
        this.renderer.setProperty(rCHK, 'type', 'checkbox');
        this.renderer.addClass(rCHK, 'float-left');
        this.renderer.addClass(rCHK, 'mr-2');
        this.renderer.setStyle(rCHK, 'margin-top', '5px');
        this.renderer.setProperty(rCHK, 'id', this.listItemID + this.HTMLEleName.CheckBox + fi[i].objID.toString());
        this.renderer.setAttribute(rCHK, 'disabled', 'true');
        if (this.selectedItems.length > 0) {
          if (this.cs.hasIDOnIDValArray(this.selectedItems, fi[i].objID)) {
            this.renderer.setProperty(rCHK, 'checked', true);
            this.renderer.addClass(b, 'autocomplete-active');
          }
        }
        this.renderer.appendChild(b, rCHK);
      }
      this.renderer.appendChild(a, b);
      if (fi[i].Text === val) {
        b.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        this.currentFocus = i;
      }
    }
    if (this.PickerOptions.SelectionType !== EComboSelection.single) {
      const div = this.renderer.createElement('div');
      this.renderer.addClass(div, 'combo-close');
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'btn');
      this.renderer.addClass(button, 'btn-secondary');
      this.renderer.addClass(button, 'btn-cross');
      this.renderer.appendChild(div, button);
      this.renderer.appendChild(a, div);
    }

    return true;
  }

  private setMultiSelection(checkBox: HTMLInputElement, currItem: IDValue): void {
    debugger
    if (checkBox == null || checkBox == undefined) { return; }
    if (checkBox.checked === true) {
      this.renderer.setProperty(checkBox, 'checked', false);
      this.selectedItems = this.cs.spliceIDValueArray(this.selectedItems, currItem);
      this.countSelectedItems = this.CountSelectedItemsOver2(this.selectedItems);
      if (this.selectedItems.length >= 1) {
        this.inputTxt = this.textSelectedItemsOver2(this.selectedItems, false);
      }
      else {
        this.inputTxt = '';
        this.disableCombo = true;
      }
      this.deselectingItem.emit(currItem);
    }
    else { //need to work when another combo value choosen
      // if(this.PickerOptions.SelectedItems.length===0){
      //   this.selectedItems=[];
      //   this.eInputBox.element.nativeElement.value='';
      // }
      this.renderer.setProperty(checkBox, 'checked', true);
      this.selectedItems.push(this.selectedItem);
      if (this.selectedItems) {
        this.inputTxt = this.textSelectedItemsOver2(this.selectedItems, false);
        this.countSelectedItems = this.CountSelectedItemsOver2(this.selectedItems);
        this.disableCombo = false;
      }
    }
    this.renderer.setProperty(this.eInputBox.element.nativeElement, 'value', this.inputTxt);
    this.selectionsChanged.emit(this.selectedItems);
  }

  textSelectedItemsOver2(items: IDValue[], isEdit?: boolean): string {
    let txt = '';
    if (items.length == 0) { return txt; }
    if (items.length <= 2) {
      items.forEach(item => {
        txt = txt + item.text.trim() + ', ';
      });
      return txt.trimEnd().slice(0, -1);
    }
    else {
      if (isEdit == true) {
        for (let i = items.length; i > items.length - 2; i--) {
          txt = items[i - 1].text.trim() + ', ' + txt;
        }
        return '..., ' + txt.trimEnd().slice(0, -1);
      }
      else {
        for (let i = 0; i < 2; i++) {
          txt = txt + items[i].text.trim() + ', ';
        }
        return txt.trimEnd() + '...';
      }

    }

  }

  CountSelectedItemsOver2(items: IDValue[]): string {
    if (items.length <= 2) { return ''; }
    else return this.cs.convertBangNumber(this.selectedItems.length - 2);// when more than 2 items are selected
  }

  private boldString(str, substr) {
    const strRegExp = new RegExp(substr, 'g');
    return str.replace(strRegExp, '<strong>' + substr + '</strong>');
  }

  private addActive(x): boolean {    /* a function to classify an item as 'active': */
    if (!x) { return false; }
    this.removeActive(x);    /* start by removing the 'active' class on all items: */
    if (this.currentFocus >= x.length) { this.currentFocus = 0; }
    if (this.currentFocus < 0) { this.currentFocus = (x.length - 1); }
    this.renderer.addClass(x[this.currentFocus], 'autocomplete-active');    /* add class 'autocomplete-active': */
    x[this.currentFocus].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    return true;
  }

  private removeActive(x) {    /*a function to remove the 'active' class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) { this.renderer.removeClass(x[i], 'autocomplete-active'); }
  }

  @HostListener('input', ['$event'])
  private startTyping(event): void {
    this.selectedTxt = '';
    const sItem = (this.eInputBox.element.nativeElement.value === this.selectedItem.text) ? this.selectedItem : new IDValue(0, '');
    this.setSelection(sItem);
    this.PickerOptions.WrittenText = this.eInputBox.element.nativeElement.value;
    this.inputValueChange.emit(this.PickerOptions.WrittenText);
    this.inputTyping(event, false);
  }
  public SelectedText(event) {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    this.selectedTxt = event.target.value.substr(start, end - start);
  }

  @HostListener('focusin', ['$event'])
  private inputFocusIn($event) {
    //select a word on focus
    const input = this.eInputBox.element.nativeElement;
    let val = this.eInputBox.element.nativeElement.value;
    let endL = val.length;

    let startL = val.includes(',') ? val.substring(0, val.lastIndexOf(",")).length + 1 : 0;
    input.focus();
    input.setSelectionRange(startL, endL);
    let str = val.substring(startL, endL).trim();
    if (val !== '' && str !== '...' && this.click === 1) {
      this.selectedTxt = val.substring(startL, endL);
    }
    this.click = 0;
    this.renderer.setStyle(this.eInputBox.element.nativeElement, 'background-color', this.inputBGColor);
    this.inputTyping($event, true);
    this.dropdownToggler = true;
  }

  @HostListener('keydown', ['$event'])
  private inputKeyDown(e) {
    let x;
    const y = document.getElementById(this.eInputBox.element.nativeElement.id + 'autocomplete-list');
    if (y) { x = y.getElementsByTagName('div'); }
    if (e.keyCode === 27) { // Escape Key:
      e.preventDefault();
      if (this.selectedItem.objID > 0) {
        this.setSelection(this.selectedItem, true);
      }
    }
    else if (e.keyCode === 40) {  // If the arrow DOWN key is pressed, increase the currentFocus variable:
      this.currentFocus++; // and and make the current item more visible:
      this.addActive(x);
    }
    else if (e.keyCode === 38) { // up   // If the arrow UP key is pressed, decrease the currentFocus variable:
      this.currentFocus--; // and and make the current item more visible:
      this.addActive(x);
    }
    else if (e.keyCode === 13) { // If the ENTER key is pressed, prevent the form from being submitted,
      e.preventDefault();
      if (this.currentFocus > -1) {
        if (x) {
          x[this.currentFocus].click();  // and simulate a click on the 'active' item
        }
      }
    }
    // Clear the selection
    else if (e.keyCode === 8) { // Backspace Key:
      e.preventDefault();
      let isSelected: boolean = false;
      let inputText = this.eInputBox.element.nativeElement.value;
      if (this.eInputBox.element.nativeElement.value !== '') {
        if (this.selectedTxt !== '') {
          inputText = this.selectedTxt.trim();
          isSelected = true;
          this.selectedTxt = '';
        }
        if (inputText.includes(',')) { inputText = inputText.split(/[,]+/).pop().trim(); }
        if (inputText !== '' || inputText !== ',') {
          let item = this.selectedItems.find(x => x.text.trim() === inputText);
          if (item) {
            if (item.objID > 0) {
              var items: IDValue[] = [];
              items.push(item)
              this.removeSelectedItemsFromCollection(items as IDValue[], isSelected);
            }
          }
          else { this.eInputBox.element.nativeElement.value = this.eInputBox.element.nativeElement.value.slice(0, -1); }
        }
        if (inputText.length === 1) {
          this.selectedItem = new IDValue();
          this.disableCombo = true;
          this.comboCleared.emit({ cleared: true });
        }
      }
      this.inputTyping(e, true);
    }
  }

  @HostListener('click', ['$event'])
  public itemClick(event) {
    //this.selectedItem.text = event.target.innerText
    const sItem = (this.eInputBox.element.nativeElement.value === this.selectedItem.text) ? this.selectedItem : new IDValue(0, '');
    const itemID = event.target.id;
    if (itemID === this.eInputBox.element.nativeElement.id) {
      this.inputTyping(event, true);
      this.loadDataFromDB();
      this.setSelection(sItem);
    }

    if (itemID === "dropDownhide") {
      this.dropdownToggler = false;
    }
    if (event.target.tagName === 'LABEL') {
      this.closeAllLists();
      return;
    }

    if (itemID == this.myCompId + 'textClosebtn') {
      this.eInputBox.element.nativeElement.value = '';
      this.PickerOptions.SelectedItem = new IDValue(0, '', '');
      for (let i = this.selectedItems.length - 1; i < this.selectedItems.length; i--) {
        if (i === -1) { break; }
        let checkB: HTMLInputElement = document.getElementById(this.listItemID + this.HTMLEleName.CheckBox + this.selectedItems[i].objID) as HTMLInputElement; // get the attached checkbox with the selected item
        this.setMultiSelection(checkB, this.selectedItems[i]);
      }
      this.selectedItems = [];
      this.comboCleared.emit({ cleared: true });
      return;
    }

    if (!event.target.id.includes(this.listItemID)) {
      if (!event.target.id.includes(this.eInputBox.element.nativeElement.id)) {
        this.closeAllLists();
      }
      return;
    }
    const elem = event.target.getElementsByTagName('input')[0]; // be careful, always first item can not be desire item.
    if (elem === undefined || elem === null || elem.value === '') { return; }
    this.selectedItem = JSON.parse(elem.value);
    this.setSelection(this.selectedItem, true);
    this.renderer.setStyle(this.eInputBox.element.nativeElement, 'background-color', this.inputBGColor);
    this.matchedCV = 1;
    this.countString();
    if (this.PickerOptions.SelectionType === EComboSelection.multiCheck) {
      let checkB: HTMLInputElement = document.getElementById(this.listItemID + this.HTMLEleName.CheckBox + this.selectedItem.objID) as HTMLInputElement; // get the attached checkbox with the selected item
      this.setMultiSelection(checkB, this.selectedItem);
    }
    else {
      this.setSelection(this.selectedItem, true);
      this.closeAllLists();
    }
  }

  @HostListener('focusout', ['$event'])
  private clearList(event) {
    this.selectedTxt = '';
    const ele = event.target;
    const color = (this.PickerOptions.SelectedItem.objID === 0 && this.PickerOptions.EntryMust === true) ? 'lightsalmon' : this.inputBGColor;
    this.renderer.setStyle(this.eInputBox.element.nativeElement, 'background-color', color);
    this.renderer.setProperty(this.eInputBox.element.nativeElement, 'placeholder', (this.PickerOptions.EntryMust === undefined) ? 'type here...' : (this.PickerOptions.EntryMust === true) ? 'type here...' : 'type here...');
    if (ele.id.includes(this.eInputBox.element.nativeElement.id)) {
      if (event.relatedTarget !== null) { // if we click on list item, then related target is null. otherwise item click not work
        this.closeAllLists();
      }
    }
  }

}

export interface IPickerOptions {
  Caption?: string;
  SelectedItem: IDValue;
  DataSource: IDataSource;
  EntryMust?: boolean;
  FormControl?: any;
  SingleLine?: boolean;
  WrittenText?: string;
  SelectionType?: EComboSelection;
  WithAdvSearch?: boolean;
  SelectedItems?: IDValue[];
  withCountInfo?: boolean;
  iconType?: IconType;
  disableText?: boolean;
}
export interface IDataSource {
  Type: string; // DB, ENUM, local
  SourceName: MasterData;
  Param?: string;
  IDValueList?: IDValue[]; // for type local
  HideValueColumn?: boolean; // by deafult its hidden, HideValueColumn=false
}
