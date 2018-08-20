import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Department} from '../Models/Departments';
import {AppConstants} from '../Shared/AppConstants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DepartmentsServiceService {

  private departmentURL = 'Departments';
  private url = AppConstants.ServerBaseURL + this.departmentURL;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  saveDepartment(department: Department): Observable<Department> {

    return this.http.post<Department>(this.url, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(this.url + '/' + department.ID, department);
  }
}
