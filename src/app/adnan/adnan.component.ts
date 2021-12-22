import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CustomCellCompComponent } from '../custom-cell-comp/custom-cell-comp.component';

@Component({

  selector: 'app-adnan',
  templateUrl: './adnan.component.html',
  styleUrls: ['./adnan.component.css']
})
export class AdnanComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular
  //@ViewChild("UserLoginID") Id: ElementRef
  @ViewChild('bottomrowcount', { read: ElementRef }) private bottomRowCount ; 
  @ViewChild('toprowcount', { read: ElementRef }) private topRowCount;
  private gridApi: any; //a property of grid
  private gridColumnApi: any; //a property of grid hold columns
  public sideBar: any;
  //public frameworkComponents: any;
  public rowData;
  public pinnedTopRowData;
  public pinnedBottomRowData;
  public selectionOption = [{ no: "Single Select" }, { no: "MultiSelect" }];
  public rows = [0,1,2,3]
  public selectedSOption = "MultiSelect";
  public multiSelect = "multiple";
  constructor(private http: HttpClient) {

  }

  columnDefs = [
    {
      headerName: '#',
      colId: 'rowNum',
      valueGetter: 'node.id',
      width: 80,
      pinned: 'left',
    },
    {
      
      field: "make", sortable: true, editable: true, filter: true, 
      cellClassRules: { //x: maps value, ctx: maps context, node: maps node, data: maps data, colDef: maps colDef ,rowIndex: maps rowIndex

        'rag-green': 'x === "Toyota"',
        'rag-amber': 'x === "Porsche" ',
        'rag-red': 'x === "Ford"',
      }, // cell style using cellClassRules which applies css class on conditions.
      minWidth: 300,
    },
    { field: "model", sortable: true, editable: true, filter: true, resizable: true, cellStyle: { color: '#ECF0F1', 'background-color': '#5D6D7E' }, minWidth: 300, }, // static cell style
    { // cell style using cellstyle function
      field: "price", sortable: true, editable: true,
      filter: true, resizable: true,
      cellStyle: params => { //value,coldef,data,node,rowIndex
        if (params.value > 0 && params.value < 50000) {

          return { color: '#5D6D7E', backgroundColor: '#58D68D' };
        }
        return null;
      },
      minWidth: 300,
    },
    { field: "Date", sortable: true, editable: true, filter: true, cellRenderer: "customcell", minWidth: 280, }, //new column with a custom cell. The cell will render a component

    { headerName: "Rating", sortable: true, editable: true, filter: true, resizable: true,   
      valueGetter :   function ratingValueGetter(params) {
        if(params.node.id ==="b-0" ){
          return ""
        }
        return Math.floor(Math.random() * 1000);
      },
      minWidth: 300 },

    { headerName: "Remarks", colId: 'Remarks', sortable: true, editable: true, filter: true, resizable: true,
    valueGetter : function remarksValueGetter(params) {

      if(params.node.id ==="b-0" ){
        return ""
      }
      
      if(Math.floor(Math.random() * 1000) < 200 ){
        return "Very Poor";
      } 
      if(Math.floor(Math.random() * 1000) < 400 ){
        return "Poor";
      }
      if(Math.floor(Math.random() * 1000) < 600 ){
        return "Ok";
      }
      if(Math.floor(Math.random() * 1000) < 800 ){
        return "Good";
      }
      if(Math.floor(Math.random() * 1000) < 1000 ){
        return "Excellent";
      }
      else{
        return "nothing";
      }
    }, 
    minWidth: 300, }

  ];



  frameworkComponents = {
    //all definitions for customcell will be written here.

    customcell: CustomCellCompComponent // custom cell for the Date column.
  }




  ngOnInit(): void {
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onGridReady(params: any) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    // this.rowData = [
    //   { make: 'Toyota', model: 'Celica', price: 35000 },
    //   { make: 'Ford', model: 'Mondeo', price: 32000 },
    //   { make: 'Porsche', model: 'Boxter', price: 72000 }
    // ];
    setTimeout(() => {
      let pinnedBottomData = this.generatePinnedBottomData();
      this.gridApi.setPinnedBottomRowData([pinnedBottomData]); // create the total row.
    }, 500)

    this.pinnedTopRowData = this.createData(1, "Top");
    this.pinnedBottomRowData = this.createData(1, "Bottom");
    this.multiSelect = "multiple";
  }

  //#region Codes for creating a footer row
  generatePinnedBottomData() {

    // generate a row-data with null values
    let result = {};
    this.gridColumnApi.getAllGridColumns().forEach(item => {

      result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any) {


    //list of columns fo aggregation
    let columnsWithAggregation = ['price']
    columnsWithAggregation.forEach(element => {

      console.log('element', element);
      this.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {

        if (rowNode.data[element])
          target[element] += Number(rowNode.data[element].toFixed(2));
      });
      if (target[element])
        target[element] = `${target[element].toFixed(2)}`;
    })

    target['make'] = 'Total';

    return target;
  }
  //#endregion


  //#region Frozen Column
  clearPinned() {
    this.gridColumnApi.applyColumnState({ defaultState: { pinned: null } });
  }

  resetPinned() {
    this.gridColumnApi.applyColumnState({
      state: [
        {
          colId: 'rowNum',
          pinned: 'left',
        },
        {
          colId: 'make',
          pinned: 'left',
        },

        {
          colId: 'Remarks',
          pinned: 'right',
        },
      ],
      defaultState: { pinned: null },
    });
  }

  pinModel() {
    this.gridColumnApi.applyColumnState({
      state: [
        {
          colId: 'model',
          pinned: 'left',
        },
      ],
      defaultState: { pinned: null },
    });
  }

  //#endregion



  //#region Freezing Rows..Top and Bottom

  onPinnedRowTopCount() {
    debugger
    // var headerRowsToFloat = this.topRowCount.value;
    // var count = Number(headerRowsToFloat);
    var rows = this.createData(3, 'Top');
    this.gridApi.setPinnedTopRowData(rows);
  }

  onPinnedRowBottomCount() {
    // var footerRowsToFloat = this.bottomRowCount.value;
    // var count = Number(footerRowsToFloat);
    var rows = this.createData(3, 'Bottom');
    this.gridApi.setPinnedBottomRowData(rows);
  }

  freezeTopRowChanged(event) {
    debugger
    var headerRowsToFloat = Number(event.target.value.split(':').pop().trim());
    // var count = Number(headerRowsToFloat);
    var rows = this.createData(headerRowsToFloat, 'Top');
    this.gridApi.setPinnedTopRowData(rows);
  }

  freezeBottomRowChanged(event) {
     var footerRowsToFloat = Number(event.target.value.split(':').pop().trim());
    // var count = Number(footerRowsToFloat);
    var rows = this.createData(footerRowsToFloat, 'Bottom');
    this.gridApi.setPinnedBottomRowData(rows);
  }

  createData(count, prefix) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        athlete: prefix + " make " + i,
        age: prefix + " model " + i,
        country: prefix + " price " + i,
        year: prefix + " Date " + i,
        date: prefix + " Rating " + i,
        sport: prefix + " Remarks " + i
      });
    }
    return result;
  }

  //#endregion


  public SelectionOptChanged(event) {
    debugger
    //this.selectedSOption = event.target.value.split(':').pop().trim();
    if( this.selectedSOption === "Single Select"){
      this.multiSelect = "single";
    }
    if(this.selectedSOption === "MultiSelect"){
      this.multiSelect = "multiple"
    }
  }
}
