import { DatePipe, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { getGUID, IDValue } from './combo/baseObject';
import { EAccountType, EnumCardParent, SessionTag } from './Enums';
import { ITreeNode } from './tree/TreeObjects';

@Injectable({
  providedIn: 'root'
})
export class IcsCommonService {
  spliceIDValueArray(selectedItems: IDValue[], currItem: IDValue): IDValue[] {
    throw new Error('Method not implemented.');
  }
  convertBangNumber(arg0: number): string {
    throw new Error('Method not implemented.');
  }
  stringClean(text: any) {
    throw new Error('Method not implemented.');
  }
  spliceAnyArrayWithObjID(selectedItems: IDValue[], objID: number): IDValue[] {
    throw new Error('Method not implemented.');
  }

  public routeCount = 0;
  private static baseURL = '/';
  public errorStatus = '404';
  public errorTxt = 'Page Not Found..';
  public languageStatus;
  public selectedLanguage = 0;
  public rootWidth: number;
  public loginPage = false;
  public registration: boolean = false;
  public userLogIDForLogout: string;
  public iconImgSrc = '../../assets/iconsOps/profile-img.png';
  public accRegElem = null;
  public openForgetPass = false;
  public moveToLocationCardPos = false;

  public blobObject = new Blob();
  private ecmp = "ɵcmp";
  independentimage: any;
  private anyNumber = 1101;
  private keyForCurrAccType = 'CURR_ACC_TYPE_FOR_SEARCH';
  //index 0: nan, index 1: default, index 2: grid, index 3: list, index 4: large, index 5: onlyText
  private cardTxtMaxLengths = [[0], [100, 100, 100, 100, 100], [100, 100, 100, 100, 100], [100, 100, 100, 100, 100], [400, 400, 400, 400, 400], [500, 400, 300, 200, 100]];
  private currSelectedSrcAccType: EAccountType;

  constructor(private meta: Meta, private router: Router, private sanitizer: DomSanitizer, private httpClient: HttpClient, private viewportScroller: ViewportScroller) { }

  private componentDictionary = new Map<string, any>();
  private functionDictionary = new Map<string, string>();

  // pwa install start here
  promptIntercepted = false;
  isStandalone = false;
  deferredPrompt: any;
  userInstalled = false;
  whereIsShare = 'bottom';

  // user agent
  isChrome = false;
  isExplorer = false;
  isExplorer_11 = false;
  isFirefox = false;
  isSafari = false;
  isOpera = false;
  isEdgeDesktop = false;
  isEdgeiOS = false;
  isEdgeAndroid = false;
  userAgent = '';

  isIOS = false;
  isMobile = false;

  // For testing debug display only
  promptSaved = false;
  customButtonClicked = false;
  deferredPromptShown = false;
  deferredPromptRejected = false;

  public getIconImgSrc(): string {
    return this.iconImgSrc;
  }


  public setImageWithoutScope(val: any) {
    this.independentimage = val;
  }
  public getImageWithoutScope() {
    return this.independentimage;
  }
  public setIconImgSrc(val: string): void {
    this.iconImgSrc = val;
  }

  public getComponentID(): string {
    return this.ecmp;
  }

  public getRandomNumber(range: number): number {
    return Math.floor((Math.random() * range) + 1);
  }

  public getID(): number {
    return this.anyNumber++;
  }

  public setCurrSrcAccTypeSession(accType: EAccountType): void {
    this.ssSet(this.keyForCurrAccType, this.keyForCurrAccType, accType);
  }

  public getCurrSrcAccTypeSession(): any {
    return JSON.parse(this.ssGet(this.keyForCurrAccType, this.keyForCurrAccType));
  }

  setAccRegisterElem(nativeElement: any) {
    if (!nativeElement) { return; }
    this.accRegElem = nativeElement;
  }
  // we have to keep controller name should be same as menu pathName
  public registerComponent(component: any): void {
    const comName: string = this.getComponentName();
    this.componentDictionary.clear(); // only current component is enough, saving memory;
    this.componentDictionary.set(comName, component);
  }

  public getComponent(comName: string): any {
    return this.componentDictionary.get(comName);
  }

  public getFunction(comName: string, btnID: string): string {
    return this.functionDictionary.get(this.makeKey(comName, btnID));
  }

  // #region date fixing..
  public dateIsMin(dDate: any): boolean {
    if (dDate === null || dDate === undefined) { return true; }
    // in server side minimum date is 01 Jan 2000, so for GMT safely, here comparing with 02 Jan 2000
    const tDate = new Date('02 Jan 2000');
    if (dDate.constructor.name === 'String') {
      dDate = new Date(dDate);
    }
    return (dDate < tDate);
  }

  public getMinDate(dDate: Date): any {
    if (this.dateIsMin(dDate)) { return null; }
    if (dDate === undefined) { return null; }
    return dDate;
  }
  // #endregion

  // #region  navigation..
  private navRoutes(): string[] {
    const tempObj = this.ssGet(SessionTag.ROUTES, SessionTag.ROUTES);
    let tempRoutes: string[] = [];
    if (tempObj === null) {
      this.ssSet(SessionTag.ROUTES, SessionTag.ROUTES, tempRoutes);
    }
    else {
      tempRoutes = JSON.parse(tempObj) as string[];
    }
    return tempRoutes;
  }

  public fixDateFormatForISOConversion(date: Date): string {
    let timezonOffset = new Date().getTimezoneOffset();
    date.setMinutes(date.getMinutes() - timezonOffset); // set minutes for
    return date.toISOString().slice(0, 16)
  }

  private navRoutes_Push(menuPath: string): void {
    const tempRoutes = this.navRoutes();
    const index = tempRoutes.indexOf(menuPath, 0);
    if (index > -1) {
      tempRoutes.splice(index, 1);
    }
    tempRoutes.push(menuPath);
    this.ssSet(SessionTag.ROUTES, SessionTag.ROUTES, tempRoutes);
  }

  private navRoutes_Pop(): string {
    const tempRoutes = this.navRoutes();
    const rMenu = tempRoutes.pop();
    this.ssSet(SessionTag.ROUTES, SessionTag.ROUTES, tempRoutes);
    return rMenu;
  }

  private navRoutes_Reset(): void {
    const tempRoutes: string[] = [];
    this.ssSet(SessionTag.ROUTES, SessionTag.ROUTES, tempRoutes);
  }

  public navigateToMenu(menuPath: string, noBackTrack?: boolean): void {
    if (menuPath === 'Layout') {
      return;
    }
    if (menuPath.length > 0) {
      if (noBackTrack !== true) {
        this.navRoutes_Push(menuPath);
      }
    }
    if (this.router.url == IcsCommonService.baseURL && IcsCommonService.baseURL + menuPath == IcsCommonService.baseURL) {
      this.smoothScrolling(this.accRegElem);
      return;
    }
    this.ssSet(SessionTag.CURRENT_URL, SessionTag.CURRENT_URL, menuPath);
    this.router.navigate([IcsCommonService.baseURL + menuPath]);
  }

  public navigateToPrevious(): void {
    let previousMenu = this.navRoutes_Pop();
    const currUrl = this.ssGet(SessionTag.CURRENT_URL, SessionTag.CURRENT_URL);
    const currUrl2 = this.router.url;
    if (previousMenu === currUrl) // then pop again
    {
      previousMenu = this.navRoutes_Pop();
    }
    if (previousMenu === undefined || previousMenu === null || previousMenu.length === 0) {
      this.navigateToMenu('/');
    }
    else {
      this.navigateToMenu(previousMenu);
    }
  }
  // #endregion

  public makeKey(partOne: string, partTwo: any): string {
    const tKey: string = partOne + '_' + partTwo;
    return tKey;
  }

  public async delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // #region session normalization ....
  public sessionRemove(sKeyPart1: string, sKeypart2: string): void {
    sessionStorage.removeItem(this.makeKey(sKeyPart1, sKeypart2));
  }

  public ssGet(sKeyPart1: string, sKeypart2: string): string {

    return sessionStorage.getItem(this.makeKey(sKeyPart1, sKeypart2));
  }
  public ssGetLiveChatUser(sKeyPart1: string, sKeypart2: string): string {
    return sessionStorage.getItem(this.makeKey(sKeyPart1, sKeypart2));
  }

  public ssGetAndClear(sKeyPart1: string, sKeypart2: string): string {
    const val = sessionStorage.getItem(this.makeKey(sKeyPart1, sKeypart2));
    sessionStorage.removeItem(this.makeKey(sKeyPart1, sKeypart2));
    return val;
  }
  public ssClearAll(): void {
    sessionStorage.clear();
  }
  public localClearAll(): void {
    localStorage.clear();
  }

  public ssSet(sKeyPart1: string, sKeypart2: string, value: any): void {
    // first remove the item for better storage mgt.
    sessionStorage.removeItem(this.makeKey(sKeyPart1, sKeypart2));
    if (typeof (value) === 'string') {
      sessionStorage.setItem(this.makeKey(sKeyPart1, sKeypart2), value);
    }
    else {
      if (value) {
        sessionStorage.setItem(this.makeKey(sKeyPart1, sKeypart2), JSON.stringify(value));
      }
    }
  }
  public ssSetLiveChatUser(sKeyPart1: string, sKeypart2: string, value: any): void {
    // first remove the item for better storage mgt.
    sessionStorage.removeItem(this.makeKey(sKeyPart1, sKeypart2));
    if (typeof (value) === 'string') {
      sessionStorage.setItem(this.makeKey(sKeyPart1, sKeypart2), value);
    }
    else {
      if (value) {
        sessionStorage.setItem(this.makeKey(sKeyPart1, sKeypart2), JSON.stringify(value));
      }
    }
  }

  public localSet(sKeyPart1: string, sKeypart2: string, value: any): void {
    // first remove the item for better storage mgt.
    localStorage.removeItem(this.makeKey(sKeyPart1, sKeypart2));
    try {
      if (typeof (value) === 'string') {
        localStorage.setItem(this.makeKey(sKeyPart1, sKeypart2), value);
      }
      else {
        if (value) {
          localStorage.setItem(this.makeKey(sKeyPart1, sKeypart2), JSON.stringify(value));
        }
      }
    }
    catch {
      console.log("Local Storage is full, Please empty data");
    }
  }
  public localGet(sKeyPart1: string, sKeypart2: string): string {
    //Retrieve data from local storage by its key
    return localStorage.getItem(this.makeKey(sKeyPart1, sKeypart2));
  }
  public localRemove(sKeyPart1: string, sKeypart2: string): void {
    // remove item from local storage
    localStorage.removeItem(this.makeKey(sKeyPart1, sKeypart2));
  }

  // #endregion
  // #region collection management...
  public IndexUpdate(tempList, AscDes?: boolean): any { // AscDes :undefined ->do nothing,AscDes :true ->sort asc, AscDes :false ->sort desc..
    if (tempList.constructor.name === 'String' && tempList === '[]') { return tempList; }
    if (AscDes === true) {
      tempList.sort((a, b) => (a.objID > b.objID) ? -1 : 1);
    }
    if (AscDes === false) {
      tempList.sort((a, b) => (a.objID < b.objID) ? -1 : 1);
    }

    for (let i = 0; i < tempList.length; i++) {
      tempList[i].index = i;
      tempList[i].position = i + 1;
    }
    return tempList;
  }

  public IndexUpdateByPart(tempList, AscDes?: boolean): any { // AscDes :undefined ->do nothing,AscDes :true ->sort asc, AscDes :false ->sort desc..
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].index = i;
      tempList[i].position = i + 1;
    }
    return tempList;
  }

  public getTextByID(list: IDValue[], id: number): string {
    const rVal = list.filter(obj => obj.objID === id);
    return (rVal.length === 0) ? 'N/F' : rVal[0].text;
  }

  public hasIDOnIDValArray(list: IDValue[], id: number): boolean {
    const rVal = list.filter(obj => obj.objID === id);
    return (rVal.length === 0) ? false : true;
  }
  // #endregion

  // #region Convertions..
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

  public splitDateString(recievedDate: Date): string { // remove the part after 'GMT' of a dateString..
    const fullDateString: string = new Date(recievedDate).toString();
    const ss = fullDateString.split('GMT', 2);
    return ss[0];
  }
  // #endregion

  private getComponentName(): string {
    return window.location.pathname.slice(1); // component name is the path name
  }

  public fileSize(bytes): string {
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  public fileIcon(fileName): string {
    let ext = fileName.split('.').pop();
    const vailableExt: Array<string> = ['docx', 'xlsx', 'pdf', 'jpg'];
    if (!vailableExt.includes(ext)) { ext = 'ics'; }
    return '../../assets/fileTypeIcons/fileType_' + ext + '.png';
  }
  // #endregion

  public validateObject(paramObj: any, valueObj, dateNullify?: boolean): void {
    Object.keys(paramObj).forEach(member => {
      const typeName = (typeof (paramObj[member])).toLowerCase();

      if (Object.prototype.toString.call(paramObj[member]) === '[object Date]') {
        if (valueObj[member] === null || valueObj[member] === undefined || this.dateIsMin(valueObj[member])) {
          valueObj[member] = (dateNullify === true) ? null : new Date(0);
        }
      }
      if (typeName === 'number') {
        valueObj[member] = this.getNumber(valueObj[member]);
      }

      if (typeName === 'object') {
        const members2 = Object.keys(paramObj[member]);
        if (members2.length === 4 && members2[2] === 'ObjID' && members2[3] === 'Text') {
          if (typeof (valueObj[member]) === 'string') {
            valueObj[member] = new IDValue(0, valueObj[member]);
          }
        }
      }
    });
  }

  public getNumber(value: any): number {
    if (value === undefined || value === null) { return 0; }
    const tempString = value.toString().replace(/[^0-9\.]/g, '');
    return (isNaN(tempString)) ? 0 : Number(tempString);
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

  public validatePhoneNumber(givenPhoneNo: string): string {
    let returnValue = null;
    let phoneNumberLen = 10;
    let rightPart = givenPhoneNo;
    let regEx = /^1[13-9]\d{8}$/;
    if (givenPhoneNo.length >= phoneNumberLen) {
      let pattern: string[] = ['+880', '880', '0', ''];
      let leftDigits = givenPhoneNo.length - phoneNumberLen;
      rightPart = givenPhoneNo.slice(leftDigits);
      let leftPart = givenPhoneNo.slice(null, leftDigits);
      pattern.forEach(item => {
        if (leftPart === item && regEx.test(rightPart)) {
          returnValue = rightPart;
        }
      });
    }
    return returnValue;
  }
  public validateLogin(loginID: string): string {
    let phoneNumber = this.validatePhoneNumber(loginID);
    if (phoneNumber !== null) { return phoneNumber }
    return loginID;
  }

  // made by atik
  public dateFormate(data) {                // return date as 12 Apr 2021 . This date is our basic date format
    let date = new Date(data)
    let dateFormater: DatePipe = new DatePipe('en-US');
    return dateFormater.transform(date, 'd MMM y').toString();
  }

  public dateTimeFormate(data) {
    // return date as 12 Apr 2021 . This date is our basic date format
    let date = new Date(data)
    let dateFormater: DatePipe = new DatePipe('en-US');
    return dateFormater.transform(date, 'd MMM y h:mm a').toString();
  }

  public validateEmail(givenEmail: string): boolean {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(givenEmail).toLowerCase());

  }

  public pageNumberGenerate(pageNumber: number, numberOfPages?: number) {

    let pageArray = [];
    if (numberOfPages <= 5) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageArray.push(i);
      }
    }
    else {
      if (pageNumber === 1) {
        pageArray.push(pageNumber);
        pageArray.push(pageNumber + 1);
        pageArray.push(pageNumber + 2);
        if ((numberOfPages - 3) === 2) {
          pageArray.push(pageNumber + 3);
        }
        else if ((numberOfPages - 3) > 2) {
          pageArray.push('...');
        }
        pageArray.push(numberOfPages);
      }
      else if (pageNumber === numberOfPages) {
        pageArray.push(1);
        if (((numberOfPages - 2) - 1) === 2) {
          pageArray.push(2);
        }
        else if (((numberOfPages - 2) - 1) > 2) {
          pageArray.push('...');
        }
        pageArray.push(numberOfPages - 2);
        pageArray.push(numberOfPages - 1);
        pageArray.push(numberOfPages);
      }
      else {
        pageArray.push(1);
        if (((pageNumber - 1) - 1) === 2) {
          pageArray.push(2);
        }
        else if (((pageNumber - 1) - 1) > 2) {
          pageArray.push('...');
        }
        if ((pageNumber - 1) !== 1 && (pageNumber - 1) !== 0) {
          pageArray.push(pageNumber - 1);
        }
        pageArray.push(pageNumber);
        if ((pageNumber + 1) !== numberOfPages && (pageNumber + 1) !== (numberOfPages + 1)) {
          pageArray.push(pageNumber + 1);
        }

        if ((numberOfPages - (pageNumber + 1)) === 2) {
          pageArray.push(pageNumber + 2);
        }
        else if ((numberOfPages - (pageNumber + 1)) > 2) {
          pageArray.push('...');
        }
        pageArray.push(numberOfPages);
      }
    }
    return pageArray;
  }

  public base64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };




  public setLanguageStatus() {
    this.languageStatus = "yes";
  }

  public setLanguageStatusNo() {
    this.languageStatus = "No";
  }

  public getLanguageStatus() {
    return this.languageStatus;
  }

  public dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  public scrollToPosition(elementId: string): void { //
    this.viewportScroller.scrollToAnchor(elementId);
  }
  public HtmlToPlainText(HTMLContent: string, slicingText: number): number {
    if (!HTMLContent) {
      return slicingText;
    }
    let plaintext = HTMLContent.replace(/<(?:.|\n)*?>/gm, ' ');      // html to plaintext Convert
    let onlyText = plaintext.slice(0, slicingText);  // we want to show this text
    let subString = onlyText.substring(onlyText.length - 10, onlyText.length);      // show text last string
    let showLastIndexNumber = HTMLContent.indexOf(subString);    // html text slicing last index
    let finaltext = showLastIndexNumber + 10;
    if (finaltext == 10) {
      return slicingText;
    }
    return finaltext;
  }
  public scrollSmoothCenter(elem: any) { //viewport scroll position center
    if (!elem) { return; }
    elem.scrollIntoView({ behavior: "smooth", block: 'center' });
  }
  public smoothScrolling(elem: any) {

    if (!elem) { return; }
    elem.scrollIntoView({ behavior: "smooth" });
  }
  public splitToGetID(elID: string, key: string): number {
    const val = elID.split(key);
    const iid = parseInt(val[1]);
    return iid;
  }

  public convertNumArrayToString(arr: number[]): string {
    let res: string = '';
    arr.forEach(item => {
      res += item + ', ';
    });
    return res.slice(0, -2);
  }

  public convertIDValArrayToStringOfID(arr: IDValue[]): string {
    let res: string = '';
    if (!arr) { return res }
    arr.forEach(item => {
      res += item.objID + ', ';
    });
    return res.slice(0, -2);
  }

  public convertIDValArrayToStringOfText(arr: IDValue[]): string {
    let res: string = '';
    arr.forEach(item => {
      res += item.text.trim() + ', ';
    });
    return res.slice(0, -2);
  }

  public getLoginUserFromLocal(): any {
    return JSON.parse(this.localGet(SessionTag.LOGIN_USER, SessionTag.LOGIN_USER));
  }

  public isNullGUID(guid): boolean {
    if (guid === getGUID()) {
      return true;
    }
    return false;
  }



  // retrun new imgUrl, and new image file
  // compressSize->compress image upto this size in KB
  public compressImage(file, newX, newY, compressSize?: number) {
    debugger
    if (compressSize === null || compressSize === undefined || compressSize < 0) {
      compressSize = 256 * 1024;
    }
    return new Promise((res, rej) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        let img = new Image();
        img.src = reader.result.toString();
        img.onload = () => {
          let elem = document.createElement('canvas');
          elem.width = newX;
          elem.height = newY;
          let ctx = elem.getContext('2d');
          ctx.drawImage(img, 0, 0, newX, newY);
          let data = ctx.canvas.toDataURL();
          this.blobObject = this.blobCreationFromURL(data);
          while (this.blobObject.size > compressSize) {
            // we starts it from 1320 and according to dat analysis final output is 320
            // so we will deduct 1000 from initital value 1320
            let sizeDeduct = 1000;
            newX = newX - sizeDeduct;
            newY = newY - sizeDeduct;
            img = new Image(newX, newY);
            img.src = reader.result.toString();
            //img.onload = () => {
            elem = document.createElement('canvas');
            elem.width = newX;
            elem.height = newY;
            ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, newX, newY);
            data = ctx.canvas.toDataURL();
            this.blobObject = this.blobCreationFromURL(data);
          }
          res(new Object({ 'imgUrl': data, 'blobObject': this.blobObject }));
        }
        img.onerror = error => rej(error);
      }
    })
  }

  private blobCreationFromURL(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }
    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
  }

  public imageFileToObjURL(file, ext): string {
    let blobExt = 'image/' + ext;
    const blob = this.base64toBlob(file, blobExt);
    const blobUrl = window.URL.createObjectURL(blob);
    return blobUrl;
  }

  public ConvertEnumToIDValueArray(En: any): IDValue[] {
    let IDValList: IDValue[] = [];
    for (let index in En) {
      IDValList.push({ objID: parseInt(index), text: En[index], value: '' });
    }
    return IDValList;
  }

  public icsFormatPrice(val, dpoint?) {
    if (val == null) {
      val = 0.00;
    }
    if (typeof dpoint === "undefined" || dpoint === null || isNaN(parseFloat(dpoint))) { dpoint = 2; }
    //val = parseFloat(val);
    val = (val === null || val === undefined || isNaN(parseFloat(val))) ? 0.00 : parseFloat(val)
    var test = val.toFixed(parseInt(dpoint));
    var tests = this.icsAddComma(test);
    return tests;
  }

  public icsAddComma(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let process = /(\d+)(\d{3})/;
    while (process.test(x1)) {
      x1 = x1.replace(process, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  // app install code start here
  checkUserAgent() {
    this.userAgent = navigator.userAgent.toLowerCase();
    const uaString = this.userAgent;

    this.isChrome = /chrome/.test(uaString);
    this.isExplorer = /msie/.test(uaString);
    this.isExplorer_11 = /rv:11/.test(uaString);
    this.isFirefox = /firefox/.test(uaString);
    this.isSafari = /safari/.test(uaString);
    this.isOpera = /opr/.test(uaString);
    this.isEdgeDesktop = /edge/.test(uaString);
    this.isEdgeiOS = /edgios/.test(uaString);
    this.isEdgeAndroid = /edga/.test(uaString);

    this.isIOS = /ipad|iphone|ipod/.test(uaString);
    this.isMobile = /mobile/.test(uaString);
    if ((this.isChrome) && (this.isSafari)) { this.isSafari = false; }
    if ((this.isChrome) && ((this.isEdgeDesktop) ||
      (this.isEdgeiOS) ||
      (this.isEdgeAndroid))) { this.isChrome = false; }
    if ((this.isSafari) && ((this.isEdgeDesktop) ||
      (this.isEdgeiOS) ||
      (this.isEdgeAndroid))) { this.isSafari = false; }
    if ((this.isChrome) && (this.isOpera)) { this.isChrome = false; }

    if (/ipad/.test(uaString)) {
      this.whereIsShare = 'top';
    }

  }
  // showUserAgent() {
  //   this.userAgent = navigator.userAgent.toLowerCase();
  // }

  trackStandalone() {
    // called once from app.component
    if (this.checkStandalone()) {
      this.isStandalone = true;
      // this.gas.emitEvent('A2HS', 'Standalone', '' , 0);
    }
  }

  checkStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

  trackInstalled() {
    // called from listener in app.component
    // this.gas.emitEvent('A2HS', 'Installed', '' , 0);
    console.log('setting this.userInstalled true');
    this.userInstalled = true;
  }

  addToHomeScreen() {
    // call on custom button click
    this.customButtonClicked = true;

    if (!this.deferredPrompt) {
      console.log('deferredPrompt null');
      return;
    }

    // Show the prompt
    this.deferredPrompt.prompt();
    this.deferredPromptShown = true;

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult: { outcome: string; }) => {

        if (choiceResult.outcome === 'accepted') {
          // no matter the outcome, the prompt cannot be reused ON MOBILE
          // for 3 months or until browser cache is cleared?
        } else {
          this.deferredPromptRejected = true;
        }

      });
  }

  showHide(checkWhat: boolean) {
    if (checkWhat) {
      return 'block';
    } else {
      return 'none';
    }
  }

  browserPromptBtn() {
    if (this.promptIntercepted && !this.userInstalled) {
      return 'block';
    } else {
      return 'none';
    }
  }

  iOSSafariHow2() {
    if (this.isSafari && this.isIOS && !this.isStandalone) {
      return 'block';
    } else {
      return 'none';
    }
  }


  showHideButton_iOS() {
    if (this.isIOS && !this.userInstalled) {
      return 'block';
    } else {
      return 'none';
    }
  }

  trueOrFalse(checkWhat: boolean) {
    if (checkWhat) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
