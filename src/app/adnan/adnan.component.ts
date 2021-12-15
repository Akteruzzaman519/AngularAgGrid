import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adnan',
  templateUrl: './adnan.component.html',
  styleUrls: ['./adnan.component.css']
})
export class AdnanComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
  }

  columnDefs = [
    { field: "make", sortable: true, editable: true, filter: true, checkboxSelection: true },
    { field: "model", sortable: true, editable: true, filter: true },
    { field: "price", sortable: true, editable: true, filter: true }];

  rowData: Observable<any[]>;

  ngOnInit(): void {
  }

}
