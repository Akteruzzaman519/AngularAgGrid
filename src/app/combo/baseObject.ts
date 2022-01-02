import { Injectable } from '@angular/core';
import { EnumImageType, EnumPhotoUses } from '../Enums';
// this module is for all core business objects
export class CoreBO {
}
export type GUID = string & { isGuid: true };
export function getGUID(guid?: string): GUID {
  if (guid === undefined || guid === null) {
    return '00000000-0000-0000-0000-000000000000' as GUID;
  }
  return guid as GUID; // maybe add validation that the parameter is an actual guid ?
}

export class IDValue {
  constructor(id?: number, private Text?: string, private Value?: string) {
    this.objID = id;
    this.text = Text;
    this.value = (Value === undefined || Value === null) ? this.text : Value;
  }
  objID: number;
  text: string;
  value: string;
}


// security notice!! don't keep names same as Database tables/fields. there must be a mapping in API side
export class IDValueParam {
  constructor() {
    this.Entity = '';
    this.Name = '';
    this.Value = '';
    this.Condition = '=';
  }
  Entity: string; // parameter entiry name ex Employee
  Name: string; // entity field name ex Age
  Value: string; // where age = 25, value is 25
  Condition: string; // ex is greater then
}



// security notice!! don't keep names same as Database tables/fields. there must be a mapping in API side
export class IDValueObject {
  constructor(idvalEntityName?: string, private ValueField?: string) {
    this.compName = idvalEntityName;
    this.valueField = ValueField;
    this.note = '';
    this.token = '';
  }
  compName: string; // component name example -> Contractor
  valueField: string; // entity field name ex Age
  paramList: Array<IDValueParam>;
  iDValueList: Array<IDValue>; // array list of IDValue object
  note: string; // optional
  token: string;
}

@Injectable()
export class ObjectField {
  constructor() {
    this.objectID = 0;
    this.fieldName = '';
    this.fieldValue = '';
    this.dataType = '';
    this.message = '';
    this.transferableAS = { key: '' }
    this.token = null;
  }
  objGUID?: GUID;
  objectID: number;
  fieldName: string;
  fieldValue: any;
  dataType: string;
  message: string;
  public transferableAS?: any;
  public token?: any;
}

