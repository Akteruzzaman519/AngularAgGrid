import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-cell-comp',
  templateUrl: './custom-cell-comp.component.html',
  styleUrls: ['./custom-cell-comp.component.css']
})
export class CustomCellCompComponent implements OnInit, ICellRendererAngularComp {
  private cellValue;
  public showDate = true;
  public date;
  constructor() { }
  refresh(params: any): boolean {

    this.cellValue = "";
    return true;
  }
  agInit(params: ICellRendererParams): void {

    if (params.data['make'] === 'Total') {
      this.showDate = false;
      return
    }
    this.cellValue = params.value;
  }


  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10)

  }

}
