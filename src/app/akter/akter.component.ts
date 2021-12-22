import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, Module } from 'ag-grid-community';

@Component({
  selector: 'app-akter',
  templateUrl: './akter.component.html',
  styleUrls: ['./akter.component.css']
})
export class AkterComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  public button="<button>add</button>"


  public columnDefs;
  public defaultColDef;
  public detailCellRendererParams;
  public rowData;
  public modules;


  columnDef: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price'}
];

rowDat = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];
  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: 'Athlete Details',
        marryChildren: true,
        children: [
          {
            field: 'athlete',
            colId: 'athlete',
          },
          {
            field: 'country',
            colId: 'country',
          },
        ],
      },
      {
        field: 'age',
        colId: 'age',
      },
      {
        headerName: 'Sports Results',
        marryChildren: true,
        children: [
          {
            field: 'sport',
            colId: 'sport',
          },
          {
            field: 'total',
            colId: 'total',
          },
          {
            field: 'gold',
            colId: 'gold',
          },
          {
            field: 'silver',
            colId: 'silver',
          },
          {
            field: 'bronze',
            colId: 'bronze',
          },
        ],
      },
    ];
    this.defaultColDef = {
      resizable: true,
      width: 160,
    };


    
   }

  ngOnInit(): void {
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => params.api.setRowData(data));
  }
}
