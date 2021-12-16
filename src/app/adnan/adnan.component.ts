import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  private gridApi: any; //a property of grid
  private gridColumnApi: any; //a property of grid hold columns
  public sideBar: any;
  //public frameworkComponents: any;
  public rowData;
  constructor(private http: HttpClient) {

  }

  columnDefs = [
    { field: "make", sortable: true, editable: true, filter: true, checkboxSelection: true },
    { field: "model", sortable: true, editable: true, filter: true },
    { field: "price", sortable: true, editable: true, filter: true },
    { field: "Date", sortable: true, editable: true, filter: true, cellRenderer: "customcell" } //new column with a custom cell. The cell will render a component
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
    //this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    setTimeout(() => {
      let pinnedBottomData = this.generatePinnedBottomData();
      this.gridApi.setPinnedBottomRowData([pinnedBottomData]); // create the total row.
    }, 500)
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

}
