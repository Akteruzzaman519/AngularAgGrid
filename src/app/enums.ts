
// session Tag
export enum SessionTag {
  ROUTES = 'MENU_ROUTES',
  CURRENT_URL = 'CURRENT_URL',
  LOGIN_USER = 'LOGINUSER',
  LIVE_CHAT_USER = 'LIVE_CHAT_USER',
  USER_MENU = 'User_Menu_Keys',
  DB_OP = 'DB_OPERATION',
  CUR_INDEX = 'CURRENT_INDEX',
  CUR_OBJ = 'CURRENT_OBJECT',
  COL_OBJ = 'COLLECTION_OBJECT',
  DB_OBJ = 'DB_OBJECT',
  LOGIN_PAGE = 'LOGIN_PAGE',
  LOGIN_STATUS = 'LOGIN_STATUS',
  CURR_USER_IMAGE = 'CURR_USER_IMAGE',
  WINDOW_CLOSED = 'WINDOW_CLOSED',
  PREVIOUS_URL = 'PREVIOUS_URL',
  SELECTED_CATEGORY = 'SELECTED_CATEGORY',
  SELECTED_BASE_PROD = 'SELECTED_BASE_PROD',
  Img_Binarys = 'Img_Binary',
  BAZAR_MARKET_INTRO = "BAZAR_MARKET_INTRO=",
  LANGUAGE = "LANGUAGE",
  SMS_USER = "SMSUSER"
}

export enum EResponse {
  None = 0,
  Successful = 1,
  Failed = 2,
  Save = 3,
  Update = 4
}

export enum ButtonStatus {
  DISABLE = 'disable',
  ENABLE = 'enable',
  INVISIBLE = 'invisible'
}

export enum DBStatus {
  START = 'START',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum EWeekDays {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}

export enum EHourFormat {
  TWELVEHOUR = 0,
  TWENTYFOURHOUR = 1
}

export enum EDPLangugeFormat {
  BAN = 1,
  ENG = 2,
  JPN = 3
}

export enum IconType {
  currency = 1,
  color = 2,
  size = 3
}

export enum ETreeOperation {
  NONE = 0,
  REFRESH_ITEM = 1,  // set selectedIDs from db....
  RELOAD_TREE = 2,
  PROPAGATE_NODE = 3,
  REFRESH_SELECTED_ITEMS = 4

}
export enum MasterData {
  None = 'None',
  MD_USER = 'MD_USER',
  MD_B_Location = 'MD_B_Location',
  MD_User = 'MD_User',
  MD_AddressValues = 'MD_AddressValues',
  MD_AV_COUNTRY = 'MD_AV_COUNTRY',
  MD_Markets = 'MD_Markets',
  MD_Markets_By_Bazar = 'MD_Markets_By_Bazar',
  MD_Markets_By_AV = 'MD_Markets_By_AV',
  MD_PROD_SKU = 'MD_PROD_SKU',
  MD_P_Filter = 'MD_P_Filter',
  MD_P_Filter_Value = 'MD_P_Filter_Value',
  MD_P_Filtered = 'MD_P_Filtered',
  MD_Division = 'MD_Division',
  MD_Bazars = 'MD_Bazars',
  MD_Bazars_By_AV = 'MD_Bazars_By_AV',
  MD_PROD_DETAILS = 'MD_PROD_DETAILS',
  MD_PACKAGETYPE = 'MD_PACKAGETYPE',
  MD_GET_DISTINCT_MARKETNAME_PARTS = 'MD_GET_DISTINCT_MARKETNAME_PARTS',
  MD_PROD_BASES = 'MD_PROD_BASES',
  MD_PROD_CATEGORY_LEAFS = 'MD_PROD_CATEGORY_LEAFS',
  MD_PROD_BASES_BY_CAT = 'MD_PROD_BASES_BY_CAT',
  MD_District = 'MD_District',
  MD_Upazila = 'MD_Upazila',

  EActionType = 'EActionType',
  EnumUserType = 'EnumUserType',
  EExtUserType = 'EExtUserType',
  EnumBoolean = 'EnumBoolean',
  EnumLanguageType = 'EnumLanguageType',
  EnumAddressPart = 'EnumAddressPart',
  EnumUseType = 'EnumUseType',
  EnumMeasureType = 'EnumMeasureType',
  EnumDetailsType = 'EnumDetailsType',
  EnumCardParent = 'EnumCardParent',
  EnumHeaderView = 'EnumHeaderView',
  EnumShape = 'EnumShape',
  EnumSize = 'EnumSize',
  EnumCardType = 'EnumCardType',
  EnumSizeBtn = 'EnumSizeBtn',
  EnumCrudBtn = 'EnumCrudBtn',
  EnumInnerBtn = 'EnumInnerBtn',
  EAccountType = 'EAccountType',
  EWeekdays = 'EWeekdays',
  EPackageType = 'EPackageType',
  EFeatureType = 'EFeatureType',
  EnumPhotos = 'EnumPhotos',
  EnumImageType = 'EnumImageType',
  EnumTimesCard = 'EnumTimesCard',
  ProductCardType = 'ProductCardType',
  SearchCriteria = 'SearchCriteria'
}

export enum ProductCardType {
  NewArrival = 1,
  DiscountItems = 2,
  UpcomingItems = 3,
  CurrentProducts = 4
}


export enum EnumImageType {
  None = 0,
  Original = 1,
  Medium = 2,
  Large = 3,
  Thumbnail = 4,
  Icon = 5
}

export enum EnumDBName {//Enums will be used for Image related operation
  None = 0,
  Account = 1,
  Basic = 2,
  Jogajog = 3,
  Shinamono = 4,
  Stat = 5,
  Thikana = 6
}

export enum ETableName { // tables related to description template
  None = 0,
  MysiteDesc = 1,
}

export enum EnumPhotoUses {//Enums will be used for Image related operation
  None = 0,
  Bazar = 1,
  BusinessUnit = 2,
  User = 3,
  ProdBase = 4,
  ProdSKU = 5,
  ProdCategory = 6,
  Address = 7
}


export enum EnumUserType {
  None = 0,
  ICSAdmin = 1,
  ICSSupport = 2,
  Customer = 3,
  LiveChatUser = 4,
  NonLoginUser = 5,
  Mooktobazar = 6
}
export enum EnumReqType {
  ForgotPass = 1,
  Registration = 2, // during a contractor self registration
  LCLogin = 3, //Live chat user
  PackgeRequest = 4, //while user asks for a new package, payment involved.
  RegistrationByIcsUser = 5 // while a ICS user performs a registration in favor of a contractor (specially for buyers)
}

export enum EnumLoginAuthType {
  Token = 0,
  Link = 1,
}

export enum EnumInnerBtn {
  None = 0,
  Details = 1,
  Chat = 2,
  Share = 3,
  SMS = 4
}
export enum EnumSizeBtn {
  None = 0,
  Grid = 1,
  List = 2,
  Default = 3
}

export enum EnumCrudBtn {
  none = 0,
  add = 1,
  select = 2,
  remove = 3,
  close = 4
}

export enum EEntryText {
  NONE = 0,
  SHIPPING_LINE = 1,
  PORT = 2,
  CARRIER_NAME = 3,
  TSUKAN_ATT_DOC = 4,
  TSUKAN_REMARK = 5,
  LOCAL_DEST = 6,
  YOSO_STORE_LOC = 7,
  YOSO_REMARK = 8,
  PRODUCT = 9,
  PRODUCT_UNIT = 10,
  B_Location = 11,
  User = 12
}

export enum EImageType {
  Original = 1,
  Medium = 2,
  Large = 3,
  Thumbnail = 4,
  Icon = 5
}

export enum EnumAddressPart {
  None = 0,
  Country = 11,
  Division = 14,
  Zone = 17,
  District = 20,
  City = 23,
  Upazila = 26,
  Thana = 29,
  Town = 32,
  Union = 35,
  Ward = 38,
  Village = 41,
  PostOffice = 44,
  PostCode = 47,
  Area = 50,
  Bazar = 53,
  Road = 56,
  Lane = 59,
  MarketName = 62,
  Block = 65,
  HouseName = 68,
  HoldingNo = 71,
  Floor = 74,
  Apartment = 77,
  ShopNo = 80
}
export enum EAccountType {
  None = 0,
  Buyer = 1,
  Seller = 2,
  Both = 3
}
export enum EPackageType {
  None = 0,
  Basic = 1,
  Standard = 2,
  Premium = 3,
  CustomPackage = 4
}
export enum EPackRequestType {
  None = 0,
  PackageRequest = 1,
  FeatureRequest = 2
}
export enum EFeatureType {
  None = 0,
  user = 1,
  ownCustomerList = 2,
  smsMobile = 3,
  promotionProductDisplay = 4,
  newProductDisplay = 5,
  runningProductDisplay = 6,
  upcommingProductDispaly = 7
}
export enum EFeatureTypeBang {
  None = 0,
  user = 'ব্যবহারকারীর সংখ্যা',
  ownCustomerList = 'নিজস্ব গ্রাহক',
  smsMobile = 'এসএমএস',
  promotionProductDisplay = 'মূল্য ছাড় পণ্য প্রদর্শন',
  newProductDisplay = 'নতুন ডিজাইন প্রদর্শন',
  runningProductDisplay = 'চলতি আইটেম প্রদর্শন',
  upcommingProductDispaly = 'শীঘ্রই আসছে পণ্য প্রদর্শন'
}
export enum EPublishSettingType {
  None = 0,
  Mysite = 1,
  NewArrival = 2,
  Discount = 3,
  Upcoming = 4,
  Current = 5,
}
export enum EPublishStatusType {
  None = 0,
  meOnly = 1,
  partnersOnly = 2,
  publicView = 3
}
export enum EAccountRole {
  None = 0,
  BUMain = 1,
  BUAssosiate = 2,
  BUAssitant = 3
}
export enum EDefaultArticleVal {
  LABEL_NAME1 = 'প্রাথমিক পরিচিতি',
  LABEL_NAME2 = 'সুযোগ সুবিধা',
  LABEL_NAME3 = 'ইতিবৃত্ত',
  ARTICLE_1 = 'ইহা একটি পরিচিতিমূলক রচনা। বাজারের অবস্থান, ভৌত কাঠামো, পণ্যের পরিচিতি, বাণিজ্য ব্যাবস্থা, সাপ্তাহিক হাটবার ইত্যাদি তথ্য প্রদান করে।',
  ARTICLE_2 = 'ইহা একটি সহায়তামূলক রচনা। বাজারে আগত বাবসায়ীগণের প্রয়োজনীয় যোগাযোগ ব্যাবস্থা, থাকা - খাওয়া, কিংবা মালামাল পরিবহন সুবিধাদি বর্ণনা করে।',
  ARTICLE_3 = 'ইহা একটি তথ্যমূলক প্রবন্ধ। বাজারের ইতিহাস - ঐতিহ্য, গুরুত্ব সঠিক তথ্য উপাত্তের মাধ্যমে তুলে ধরা এই প্রবন্ধের উদ্দেশ্য।'
}
export enum ECardSizeOptions {
  Profile = 0,
  Default = 1,
  Grid = 2,
  List = 3,
  Large = 4,
  OnlyText = 5
}
export enum EMagnifierType {
  none = 0,
  mouseHover = 1,
  mouseClick = 2,
  both = 3
}
export enum EImageCropView {
  none = 0,
  square = 1,
  rectangle = 2,
  small = 3
}
export enum ENewcropViewOptions {
  NoCropper = 0,
  Always = 1,
  SquareCropper = 2,
  RectangleCropper = 3
}
export enum EThumbnailView {
  none = 0,
  horizontal_square = 1,
  vertical_rect = 4
}
//jam above EThumbnailView and EModalView should be marge into one
export enum EModalView {
  potrait = 1,
  landscape = 2
}
export enum ESelectionType {
  none = 0,
  single = 2,
  multiple = 3
}
//message box related ... concept from Microsoft but modified
export enum EMessageType {
  DialogBox = 0, // regular message box. this is default value.
  FlashToast = 32, //a defalult OK or Close button appear at the footer
  // this type of message dialog will be used for avoiding yes/no/cancel questions. This is more user friendly.
  // also can be used for survey.
  // a defalult Close button appear at the footer
  SelectionOptions = 64,
}
export enum EMessageBoxButtons {
  OK = 0,
  OKCancel = 1, // please try to ignor this option [jm]
  AbortRetryIgnore = 2,
  YesNoCancel = 3, // this is default value
  YesNo = 4,
  RetryCancel = 5,
  Close = 6,//close will be used for flash/toast message
  Cancel = 7 //close will be used for flash/toast message
}
export enum EMessageBoxResponse {
  // for regular message box and flash/toast message
  OK = 0,
  Cancel = 1,
  Abort = 2,
  Retry = 3,
  Ignore = 4,
  Yes = 5,
  No = 6,
  Close = 7,
  // for option message dialog. Note that there will be maximum 5 (five) message options.
  OptionOne = 33,
  optionTwo = 34,
  OptionThree = 35,
  optionFour = 36,
  OptionFive = 37,
}
//concept from Microsoft but modified here
export enum EMessageBoxIcon {
  //The message box contain no symbols.
  None = 0, //OK Close

  // a symbol consisting of a lowercase letter i in a circle.
  Information = 2, //OK

  //A golden check symbol in a silver circular background
  Confirmation = 4, //OkCancel, YesNo, YesNoCancel, AbortRetryIgnore

  // a symbol consisting of an exclamation point in a triangle with a yellow background.
  Warning = 8, // OKCancel, YesNo, YesNoCancel, AbortRetryIgnore

  //a symbol consisting of a white error sign in a circle with a red background.
  Error = 16, //RetryCancel

  // a symbol consisting of a white stop sign in a circle with a red background.
  Stop = 32, // Close
}

export enum EHALIGNMENT {
  // in future convert to CSS
  LEFT = 1,
  CENTER = 2,
  RIGHT = 3
}
export enum EVALIGNMENT {
  // in future convert to CSS
  TOP = 1,
  MID = 2,
  BOTTOM = 3
}

export enum EProdType {
  none = 0,
  category = 1,
  base = 2,
  sku = 3
}

export enum EState {
  category = 1,
  base = 2,
  sku = 3
}


export enum EnumSize {
  Profile = 0,
  Default = 1,
  Grid = 2,
  List = 3,
  Large = 4
}

export enum EnumCardParent {
  None = 0,
  Account = 1,
  Bazar = 2,
  Products = 3,
  Market = 4,
  Thikana = 5,
  Basic = 6
}

export enum EnumProductParentType {
  None = 0,
  Buyer = 1,
  Seller = 2,
  Bazar = 3,
}

export enum EnumCardType {
  None = 0,
  NewArrival = 1,
  DiscountItems = 2,
  UpcomingItems = 3,
  CurrentProducts = 4,
  ProductCollection = 5,
  ProductPickerCollection = 6,
  AllMySiteProducts = 7,

  BazarHomePage = 20,
  BazarCollectionPage = 21,
  MarketPickerLayout = 22,
  MarketCollection = 23,
  BazarCollection = 24,

  AccountCollection = 30,
  AcountLocationCollection = 31,
  AccountofMarket = 32,

  AddressValueCollection = 40,
  AddressSearchCollection = 41,
  MysiteServiceDescription = 50,

  ProdCategorySupplier = 60,
  SellerCollectionCategorywise = 61
}

export enum EnumDetailsType {
  None = 0,
  Description = 1,
  PriceNote = 2,
  PromotionNote = 3,
  SaleNote = 4,
  Category = 5
}

export enum Messages {
  YesNo = 'Do you want to delete?',
  OK = 'Event Successfully done!!',
  OKCancel = 'Do you want to Save the Changes?',
  RetryCancel = 'Do you want to try again?'
}
export enum EnumValueType {
  objID = "objID",
  partID = "partID"
}
export enum EnumWeekDays {
  None = 0,
  শনিবার = 1,
  রবিবার = 2,
  সোমবার = 3,
  মঙ্গলবার = 4,
  বুধবার = 5,
  বৃহস্পতিবার = 6,
  শুক্রবার = 7
}
export enum EnumProdBaseView {
  grid = 0,
  bubble = 1,
  card = 2
}

export enum ETokenMessages {
  matchMsg = "Token Matched",
  notMatchMsg = "Token Didn't Matched",
  expiredMsg = "Token Expired"
}

export enum EASTableKey {
  account = 'account.ObjID',
  market = 'market.ObjID',
  bazar = 'bazar.ObjID'
}

export enum CustomerOrNot {
  customer = 1,
  user = 2
}
export enum EApprovalState {
  None = 0,
  Initial = 1,
  WaitingForApprove = 2,
  BackForRevise = 3,
  Approved = 4,
  NotApproved = 5,
  CancelDuetoLastRequest = 6,
  CancelRequest = 7
}

export enum EPackReqOrigin {
  none = 0,
  nonLoginOTP = 1,
  loginOTP = 2,
  loginPassword = 3,
  backOfficeSupportOTP = 4
}

export enum EActionType //user role
{
  None = 0,
  PackageRequest = 1,
  PackageApproval = 2,
  GiveActionPermission = 3
}

export enum EMarketSrchType {
  all = 1,
  free = 2,
  underABazar = 3,
  allExptABazars = 4
}

export enum EComboSelection {
  single = 0,
  multiCheck = 1,
  multiObj = 3
}

export enum EMainSearchOptions {
  Market = 1,
  Product = 2,
  Seller = 3,
  Buyer = 4
}

export enum EMarketSearchPurpose {
  GET_ALL = 1,
  GET_EXCEPT_SELECTED_BAZAR = 2,
  GET_SELECTED_BAZARS = 3
}

export enum EPackReqApprovalAction {
  approve = 1,
  revise = 2,
  undo = 3,
  cancel = 4
}

export enum EDayMonthYear {
  day = 1,
  month = 2,
  year = 3
}

export enum EPackFeatureStatus {
  None = 0,
  Ok = 1,
  Expired = 2,
  LimitExceeded = 3
}

