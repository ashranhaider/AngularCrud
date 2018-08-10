import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

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

  constructor(private departmentService: DepartmentsServiceService) { }
  
  ngOnInit() {
    this.getDepartments();
  }
  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  locationFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  displayedColumns: string[] = ['Name', 'Location'];
  getDepartments(): void{
    this.departmentService.getDepartments().subscribe(deps => this.departments = deps);   
  }
}
