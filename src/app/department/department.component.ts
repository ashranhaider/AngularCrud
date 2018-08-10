import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher,MatSort, MatTableDataSource,MatPaginator, MatTable } from '@angular/material';

import {Department} from '../Models/Departments';
import {DepartmentsServiceService} from '../Services/departments-service.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  departments: Department[];
  
  displayedColumns: string[] = ['ID','Name', 'Location'];
  dataSource = new MatTableDataSource<Department>(this.departments);

  @ViewChild(MatPaginator) paginator: MatPaginator;  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Department>;
  
  constructor(private departmentService: DepartmentsServiceService) { }
  
  ngOnInit() {
    this.getDepartments();
    this.dataSource.paginator = this.paginator;
  }
  
  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  locationFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();  

  getDepartments(): void{
    this.departmentService.getDepartments().subscribe(deps => this.departments = deps);   
  }

  saveDepartment():void{

    var department = new Department();
    department.Name = this.nameFormControl.value;
    department.Location = this.locationFormControl.value;

    this.departmentService.saveDepartment(department).subscribe(dep => this.departments.push(dep));
    this.table.renderRows();
  }
}
