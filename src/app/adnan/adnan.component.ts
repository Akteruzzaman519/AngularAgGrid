import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adnan',
  templateUrl: './adnan.component.html',
  styleUrls: ['./adnan.component.css']
})
export class AdnanComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular

  private gridApi: any; //a property of grid
  private gridColumnApi: any; //a property of grid hold columns
  public sideBar: any;
  public frameworkComponents: any;

  constructor(private http: HttpClient) {

    //this.frameworkComponents = { customStatsToolPanel: CustomStatsToolPanel };
    //this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
  }

  columnDefs = [
    { field: "make", sortable: true, editable: true, filter: true, checkboxSelection: true },
    { field: "model", sortable: true, editable: true, filter: true },
    { field: "price", sortable: true, editable: true, filter: true }];

  // autoGroupColumnDef = {
  //   minWidth: 300,
  //   cellRendererParams: {
  //     innerRenderer: (params: any) => {
  //       debugger
  //       if (params.node.footer) {
  //         const isRootLevel = true;
  //         if (isRootLevel) {
  //           //return `<span style="color:navy; font-weight:bold">Grand Total</span>`;
  //           return 'Grand Total';
  //         }
  //         //return `<span style="color:navy">Sub Total ${params.value}</span>`;
  //       }
  //       return params.value;
  //     },
  //   },
  // };

  rowData: Observable<any[]>;

  ngOnInit(): void {
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onGridReady(params: any) {
    debugger
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    setTimeout(() => {
      let pinnedBottomData = this.generatePinnedBottomData();
      this.gridApi.setPinnedBottomRowData([pinnedBottomData]); // create the total row.
    }, 500)
  }

  //#region Codes for creating a footer row
  generatePinnedBottomData() {
    debugger
    // generate a row-data with null values
    let result = {};
    this.gridColumnApi.getAllGridColumns().forEach(item => {
      debugger
      result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any) {
    debugger
    //console.log(target);
    //list of columns fo aggregation
    let columnsWithAggregation = ['price']
    columnsWithAggregation.forEach(element => {
      debugger
      console.log('element', element);
      this.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
        //if(rowNode.index < 10){
        //console.log(rowNode);
        //}
        if (rowNode.data[element])
          target[element] += Number(rowNode.data[element].toFixed(2));
      });
      if (target[element])
        target[element] = `${target[element].toFixed(2)}`;
    })
    //console.log(target);
    target['make'] = 'Total';
    return target;
  }
  //#endregion

}
