import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public hideshow = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];


  @HostListener('click', ['$event'])
  private itemClick(event): void {
    const itemID = event.target.id;
    if (itemID === "addDetail") {
      this.hideshow = true;
    }
    if (itemID === "saveDetail") {
      this.hideshow = false;
    }
    if (itemID === "editDetail") {
      this.hideshow = true;
    }
    if (itemID === "deleteDetail") {

    }
    if (itemID === "detailClose") {
      this.hideshow = false;
    }
    if (itemID === "saveEmployee") {
      this.router.navigate(['employees']);
    }
    if (itemID === "employeeClose") {
      this.router.navigate(['employees']);
    }



    

   
  }
}
